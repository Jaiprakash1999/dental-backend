import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PatientService } from 'src/patient/patient.service';
import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { AntenatalCareCreate } from './dtos/request/antenatal_care_create.request';
import { AntenatalCareResponse } from './dtos/response/antenatal_care.response';
import {
  mapRequestToANCAntenatalVisit,
  mapRequestToAncOptionalInvestigation,
  mapRequestToAntenatalCare,
  mapToUpdateAncOptionalInvestigation,
  mapUpdateToANCAntenatalVisit,
  mapUpdateToAntenatalCare,
} from './mappers/request.mapper';
import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';
import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import {
  mapToAntenatalCareResponse,
  mapToAntenatalMetaResponse,
} from './mappers/response.mapper';
import { AntenatalCareUpdate } from './dtos/request/antenatal_care_update.request';
import { AntenatalCareMetaResponse } from './dtos/response/antenatal_care_meta.response';
import { RecordANCOptionalInvestigation } from 'src/entities/dynamic/records_anc_optional_investigations.entity';

@Injectable()
export class AntenatalCareService {
  constructor(
    @InjectRepository(RecordAntenatalCare, 'dynamicDB')
    private readonly recordAntenatalCareRepository: Repository<RecordAntenatalCare>,
    @InjectRepository(RecordANCAntenatalVisit, 'dynamicDB')
    private readonly recordCobBabyCareRepository: Repository<RecordANCAntenatalVisit>,
    @InjectRepository(RecordANCOptionalInvestigation, 'dynamicDB')
    private readonly optionalInvestigationRepository: Repository<RecordANCOptionalInvestigation>,
    private readonly patientService: PatientService,
    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async createAntenatalCare(
    creatorId: number,
    body: AntenatalCareCreate,
  ): Promise<AntenatalCareResponse> {
    await this.patientService.verifyPatient(body.patientId);
    return this.dataSource.transaction(async (manager) => {
      const form = mapRequestToAntenatalCare(creatorId, body);
      const savedForm = await manager.save(RecordAntenatalCare, form);

      let order: number = 0;
      const savedAntenatalVisits = await Promise.all(
        body.antenatalVisits.map((record) => {
          order++;
          const babyCare = mapRequestToANCAntenatalVisit(
            savedForm.id,
            record,
            order,
          );
          return manager.save(RecordANCAntenatalVisit, babyCare);
        }),
      );
      order = 0;
      const savedOpitonalInvestigations = await Promise.all(
        body.optionalInvestigations.map((record) => {
          order++;
          const optionalInvestigation = mapRequestToAncOptionalInvestigation(
            savedForm.id,
            record,
            order,
          );
          return manager.save(
            RecordANCOptionalInvestigation,
            optionalInvestigation,
          );
        }),
      );
      return mapToAntenatalCareResponse(
        savedForm,
        savedAntenatalVisits,
        savedOpitonalInvestigations,
      );
    });
  }

  async updateAntenatalCare(
    updaterId: number,
    formId: string,
    body: AntenatalCareUpdate,
  ): Promise<AntenatalCareResponse> {
    const form = await this.verifyAntenatalCare(formId);
    return this.dataSource.transaction(async (manager) => {
      const updatedForm = mapUpdateToAntenatalCare(updaterId, form, body);
      const savedForm = await manager.save(RecordAntenatalCare, updatedForm);
      const previousAntenatalForms =
        await this.recordCobBabyCareRepository.find({
          where: { isDelete: false, antenatalCareId: formId },
        });
      let order = previousAntenatalForms.length;
      const savedAntenatalVisits = await Promise.all(
        body.antenatalVisits.map(async (record) => {
          if (record.id) {
            const babyCare = await this.verifyANCAntenatalVisit(record.id);
            const updatedPostPartumCare = mapUpdateToANCAntenatalVisit(
              babyCare,
              record,
            );
            return await manager.save(
              RecordANCAntenatalVisit,
              updatedPostPartumCare,
            );
          } else {
            order++;
            const antenatalVisit = mapRequestToANCAntenatalVisit(
              savedForm.id,
              record,
              order,
            );
            return await manager.save(RecordANCAntenatalVisit, antenatalVisit);
          }
        }),
      );
      const savedOptionalInvestigations = await Promise.all(
        body.optionalInvestigations.map(async (record) => {
          if (record.id) {
            const optionalInvestigation =
              await this.verifyAncOptionalInvestigation(record.id);
            const updatedOptionalInvestigation =
              mapToUpdateAncOptionalInvestigation(
                optionalInvestigation,
                record,
              );
            return await manager.save(
              RecordANCOptionalInvestigation,
              updatedOptionalInvestigation,
            );
          } else {
            console.log(record);
            order++;
            const antenatalVisit = mapRequestToAncOptionalInvestigation(
              savedForm.id,
              record,
              order,
            );
            return await manager.save(
              RecordANCOptionalInvestigation,
              antenatalVisit,
            );
          }
        }),
      );
      return mapToAntenatalCareResponse(
        savedForm,
        savedAntenatalVisits,
        savedOptionalInvestigations,
      );
    });
  }

  async getAntenatalCareById(id: string): Promise<AntenatalCareResponse> {
    const form = await this.verifyAntenatalCare(id);
    const antenatalVisits = await this.recordCobBabyCareRepository.find({
      where: { isDelete: false, antenatalCareId: id },
      order: { order: 'ASC' },
    });
    const optionalInvestigations =
      await this.optionalInvestigationRepository.find({
        where: { isDelete: false, antenatalCareId: id },
        order: { order: 'ASC' },
      });
    return mapToAntenatalCareResponse(
      form,
      antenatalVisits,
      optionalInvestigations,
    );
  }

  async verifyAntenatalCare(id: string): Promise<RecordAntenatalCare> {
    const form = await this.recordAntenatalCareRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Unable to find the Care of baby form');
    }
    return form;
  }

  async verifyANCAntenatalVisit(id: string): Promise<RecordANCAntenatalVisit> {
    const form = await this.recordCobBabyCareRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Antenatal Visit not found');
    }
    return form;
  }

  async verifyAncOptionalInvestigation(
    id: string,
  ): Promise<RecordANCOptionalInvestigation> {
    const form = await this.optionalInvestigationRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Optional Investigation not found');
    }
    return form;
  }

  async getMetaAntenatalCare(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: AntenatalCareMetaResponse[]; total: number }> {
    const [forms, totalCount] =
      await this.recordAntenatalCareRepository.findAndCount({
        where: { patientId: patientId, isDelete: false },
        order: { createdAt: 'DESC' },
        skip: page * pageSize,
        take: pageSize,
      });
    return {
      data: forms.map((form) => mapToAntenatalMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }
}
