import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PatientService } from 'src/patient/patient.service';
import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { CareOfBabyCreate } from './dtos/request/care_of_baby_create.request';
import { CareOfBabyResponse } from './dtos/response/care_of_baby.response';
import {
  mapRequestToCareOfBaby,
  mapRequestToCOBBabyCare,
  mapUpdateToCareOfBaby,
  mapUpdateToCOBBabyCare,
} from './mappers/request.mapper';
import {
  mapToCareOfBabyMetaResponse,
  mapToCareOfBabyResponse,
} from './mappers/response.mapper';
import { CareOfBabyUpdate } from './dtos/request/care_of_baby_update.request';
import { CareOfBabyMetaResponse } from './dtos/response/care_of_baby_meta.response';

@Injectable()
export class CareOfBabyService {
  constructor(
    @InjectRepository(RecordCareOfBaby, 'dynamicDB')
    private readonly recordCareOfBabyRepository: Repository<RecordCareOfBaby>,
    @InjectRepository(RecordCOBBabyCare, 'dynamicDB')
    private readonly recordCobBabyCareRepository: Repository<RecordCOBBabyCare>,
    private readonly patientService: PatientService,
    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async createCareOfBaby(
    creatorId: number,
    body: CareOfBabyCreate,
  ): Promise<CareOfBabyResponse> {
    await this.patientService.verifyPatient(body.patientId);
    return this.dataSource.transaction(async (manager) => {
      const form = mapRequestToCareOfBaby(creatorId, body);
      const savedForm = await manager.save(RecordCareOfBaby, form);

      let order: number = 0;
      const savedBabyCares = await Promise.all(
        body.babyCares.map((record) => {
          order++;
          const babyCare = mapRequestToCOBBabyCare(savedForm.id, record, order);
          return manager.save(RecordCOBBabyCare, babyCare);
        }),
      );
      return mapToCareOfBabyResponse(savedForm, savedBabyCares);
    });
  }

  async updateCareOfBaby(
    updaterId: number,
    formId: string,
    body: CareOfBabyUpdate,
  ): Promise<CareOfBabyResponse> {
    const form = await this.verifyCareOFBaby(formId);
    return this.dataSource.transaction(async (manager) => {
      const updatedForm = mapUpdateToCareOfBaby(updaterId, form, body);
      const savedForm = await manager.save(RecordCareOfBaby, updatedForm);
      const previousCobBabyCareForms =
        await this.recordCobBabyCareRepository.find({
          where: { isDelete: false, careOfBabyId: formId },
        });
      let order = previousCobBabyCareForms.length;
      const savedBabyCares = await Promise.all(
        body.babyCares.map(async (record) => {
          if (record.id) {
            const babyCare = await this.verifyCobBabyCare(record.id);
            const updatedPostPartumCare = mapUpdateToCOBBabyCare(
              babyCare,
              record,
            );
            return await manager.save(RecordCOBBabyCare, updatedPostPartumCare);
          } else {
            order++;
            const babyCare = mapRequestToCOBBabyCare(
              savedForm.id,
              record,
              order,
            );
            return await manager.save(RecordCOBBabyCare, babyCare);
          }
        }),
      );
      return mapToCareOfBabyResponse(savedForm, savedBabyCares);
    });
  }

  async getCareOfBabyById(id: string): Promise<CareOfBabyResponse> {
    const form = await this.verifyCareOFBaby(id);
    const postPartumCares = await this.recordCobBabyCareRepository.find({
      where: { isDelete: false, careOfBabyId: id },
      order: { order: 'ASC' },
    });

    return mapToCareOfBabyResponse(form, postPartumCares);
  }

  async verifyCareOFBaby(id: string): Promise<RecordCareOfBaby> {
    const form = await this.recordCareOfBabyRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Unable to find the Care of baby form');
    }
    return form;
  }

  async verifyCobBabyCare(id: string): Promise<RecordCOBBabyCare> {
    const form = await this.recordCobBabyCareRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Baby care form not found');
    }
    return form;
  }

  async getMetaCareOfBaby(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: CareOfBabyMetaResponse[]; total: number }> {
    const [forms, totalCount] =
      await this.recordCareOfBabyRepository.findAndCount({
        where: { patientId: patientId, isDelete: false },
        order: { createdAt: 'DESC' },
        skip: page * pageSize,
        take: pageSize,
      });
    return {
      data: forms.map((form) => mapToCareOfBabyMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }
}
