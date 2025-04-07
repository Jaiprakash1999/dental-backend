import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { PatientService } from '../../patient/patient.service';
import { DentalRecord } from 'src/entities/dynamic/dental_record.entity';
import { TeethData } from 'src/entities/dynamic/teeth_data.entity';
import { RecordStep } from 'src/entities/dynamic/record_step.entity';
import { mapDentalFormMetaResponse } from './mappers/response.mappers';

@Injectable()
export class DentalFormService {
  constructor(
    @InjectRepository(DentalRecord, 'dynamicDB')
    private readonly dentalRecordRepository: Repository<DentalRecord>,

    @InjectRepository(TeethData, 'dynamicDB')
    private readonly teethDataRepository: Repository<TeethData>,

    @InjectRepository(RecordStep, 'dynamicDB')
    private readonly recordStepRepository: Repository<RecordStep>,

    private readonly patientService: PatientService,

    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async saveDentalForm(creatorId: number, body: any) {
    const { patientId, diagnosis, typeOfTeeth, teethData } = body;

    const patient = await this.patientService.verifyPatient(patientId);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dentalRecord = this.dentalRecordRepository.create({
        patientId,
        diagnosis,
        typeOfTeeth,
        teethData: [],
        createdBy: creatorId,
        lastUpdatedBy: creatorId,
      });

      for (const td of teethData) {
        const steps: RecordStep[] = td.recordSteps.map((step) =>
          this.recordStepRepository.create(step),
        );

        const teethEntry = this.teethDataRepository.create({
          treatmentProcedure: td.treatmentProcedure,
          teethsInvolved: td.teethsInvolved,
          document: td.document,
          recordSteps: steps,
        });

        dentalRecord.teethData.push(teethEntry);
      }

      const savedRecord = await queryRunner.manager.save(
        DentalRecord,
        dentalRecord,
      );
      await queryRunner.commitTransaction();

      return {
        message: 'Dental form saved successfully',
        data: savedRecord,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getDentalFormMetaDetails(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: any[]; total: number }> {
    const [forms, totalCount] = await this.dentalRecordRepository.findAndCount({
      where: { patientId, isDelete: false },
      order: { createdAt: 'DESC' },
      skip: page * pageSize,
      take: pageSize,
    });

    return {
      data: forms.map((form) => mapDentalFormMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }

  async getDentalFormById(dentalFormId: string) {
    const dentalForm = await this.dentalRecordRepository.findOne({
      where: { id: dentalFormId, isDelete: false },
      relations: ['teethData', 'teethData.recordSteps'],
    });

    if (!dentalForm) {
      throw new NotFoundException('Dental form not found');
    }

    return dentalForm;
  }

  async updateDentalFormById(
    dentalFormId: string,
    updaterId: number,
    body: any,
  ): Promise<DentalRecord> {
    const { diagnosis, typeOfTeeth, teethData } = body;

    const existingRecord = await this.dentalRecordRepository.findOne({
      where: { id: dentalFormId, isDelete: false },
      relations: ['teethData', 'teethData.recordSteps'],
    });

    if (!existingRecord) {
      throw new NotFoundException('Dental record not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Remove old nested data
      for (const td of existingRecord.teethData) {
        if (td.recordSteps?.length) {
          await queryRunner.manager.remove(RecordStep, td.recordSteps);
        }
      }
      await queryRunner.manager.remove(TeethData, existingRecord.teethData);

      // Rebuild new nested data
      const newTeethData: TeethData[] = [];
      for (const td of teethData) {
        const steps: RecordStep[] = td.recordSteps.map((step) =>
          this.recordStepRepository.create(step),
        );

        const newTeeth = this.teethDataRepository.create({
          treatmentProcedure: td.treatmentProcedure,
          teethsInvolved: td.teethsInvolved,
          document: td.document,
          recordSteps: steps,
        });

        newTeethData.push(newTeeth);
      }

      existingRecord.diagnosis = diagnosis;
      existingRecord.typeOfTeeth = typeOfTeeth;
      existingRecord.teethData = newTeethData;
      existingRecord.lastUpdatedBy = updaterId;

      const updatedRecord = await queryRunner.manager.save(
        DentalRecord,
        existingRecord,
      );
      await queryRunner.commitTransaction();

      return updatedRecord;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
