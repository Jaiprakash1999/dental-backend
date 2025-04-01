import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ScreeningFormUpdate } from './dtos/request/screening_form_update.request';
import { PatientService } from 'src/patient/patient.service';
import { RecordScreeningForm } from 'src/entities/dynamic/records_screening_form.entity';
import { RecordSFLabInvestigations } from 'src/entities/dynamic/records_sf_lab_investigations.entity';
import { ScreeningFormCreate } from './dtos/request/screening_from_create.request';
import {
  mapScreeningFormEntity,
  mapSFLabInvestigationsEntity,
  mapUpdateSfLabInvestigationEntity,
} from './mappers/request.mapper';
import {
  mapScreeningFormMetaResponse,
  mapScreeningFormResponse,
} from './mappers/response.mapper';
import { ScreeningFormResponse } from './dtos/response/screening_form.response';
import { SFLabInvestigationCreate } from './dtos/request/sf_lab_investigation_create.request';
import { ScreeningFormMetaResponse } from './dtos/response/screening_form_meta.response';

@Injectable()
export class ScreeningFormService {
  constructor(
    @InjectRepository(RecordScreeningForm, 'dynamicDB')
    private readonly screeningFormRepository: Repository<RecordScreeningForm>,
    @InjectRepository(RecordSFLabInvestigations, 'dynamicDB')
    private readonly sfLabInvestigationsRepository: Repository<RecordSFLabInvestigations>,
    private readonly patientService: PatientService,
    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async createScreeningForm(
    creatorId: number,
    body: ScreeningFormCreate,
  ): Promise<ScreeningFormResponse> {
    await this.patientService.verifyPatient(body.patientId);
    return this.dataSource.transaction(async (manager) => {
      const screeningForm = mapScreeningFormEntity(creatorId, body);
      const savedScreeningForm = await manager.save(
        RecordScreeningForm,
        screeningForm,
      );
      const savedScreeningFormLabInvestigations = await Promise.all(
        body.labInvestigations.map((li) => {
          const labInv = mapSFLabInvestigationsEntity(
            savedScreeningForm.id,
            li,
          );
          return manager.save(RecordSFLabInvestigations, labInv);
        }),
      );
      return mapScreeningFormResponse(
        savedScreeningForm,
        savedScreeningFormLabInvestigations,
      );
    });
  }

  async verifyScreeningForm(
    screeningFormId: string,
  ): Promise<RecordScreeningForm> {
    const screeningForm = await this.screeningFormRepository.findOne({
      where: { id: screeningFormId, isDelete: false },
    });
    if (!screeningForm) {
      throw new NotFoundException('Screening form not found');
    }
    return screeningForm;
  }

  async deleteSfLabInvestigation(updaterId: number, id: string) {
    const sfLabInvestigation = await this.verifySfLabInvestigation(id);
    const screeningForm = await this.verifyScreeningForm(
      sfLabInvestigation.screeningFormId,
    );
    return this.dataSource.transaction(async (manager) => {
      sfLabInvestigation.isDelete = true;
      await manager.save(RecordSFLabInvestigations, sfLabInvestigation);
      screeningForm.lastUpdatedBy = updaterId;
      return;
    });
  }

  async verifySfLabInvestigation(
    labInvId: string,
  ): Promise<RecordSFLabInvestigations> {
    const sfLabInvestigation = await this.sfLabInvestigationsRepository.findOne(
      {
        where: { id: labInvId, isDelete: false },
      },
    );
    if (!sfLabInvestigation) {
      throw new NotFoundException('The associated lab investigation not found');
    }
    return sfLabInvestigation;
  }

  async addSfLabInvestigations(
    updaterId: number,
    screeningFormId: string,
    body: SFLabInvestigationCreate,
  ): Promise<ScreeningFormResponse> {
    const screeningForm = await this.verifyScreeningForm(screeningFormId);
    return this.dataSource.transaction(async (manager) => {
      screeningForm.lastUpdatedBy = updaterId;
      const updatedScreeningForm = await manager.save(
        RecordScreeningForm,
        screeningForm,
      );
      const sfLabInvestigation = mapSFLabInvestigationsEntity(
        screeningFormId,
        body,
      );

      const savedSfLabInvestigation = await manager.save(
        RecordSFLabInvestigations,
        sfLabInvestigation,
      );
      return await this.getScreeningFormById(screeningFormId);
    });
  }

  async getScreeningFormById(
    screeningFormId: string,
  ): Promise<ScreeningFormResponse> {
    const screeningForm = await this.verifyScreeningForm(screeningFormId);
    const labInvestigations = await this.sfLabInvestigationsRepository.find({
      where: { screeningFormId: screeningFormId, isDelete: false },
    });
    return mapScreeningFormResponse(screeningForm, labInvestigations);
  }

  async updateScreeningForm(
    updaterId: number,
    screeningFormId: string,
    body: ScreeningFormUpdate,
  ): Promise<ScreeningFormResponse> {
    const screeningForm = await this.verifyScreeningForm(screeningFormId);
    return this.dataSource.transaction(async (manager) => {
      screeningForm.lastUpdatedBy = updaterId;
      screeningForm.notes = body.notes;
      screeningForm.diagnosis = body.diagnosis
        ? body.diagnosis
        : screeningForm.diagnosis;
      const updatedScreeningForm = await manager.save(
        RecordScreeningForm,
        screeningForm,
      );
      const updatedSfLabInvestigations = await Promise.all(
        body.labInvestigations.map(async (li) => {
          const labInvestigation = await this.verifySfLabInvestigation(li.id);
          const updatedLabInvestigation = mapUpdateSfLabInvestigationEntity(
            labInvestigation,
            li,
          );
          return await manager.save(
            RecordSFLabInvestigations,
            updatedLabInvestigation,
          );
        }),
      );
      return mapScreeningFormResponse(
        updatedScreeningForm,
        updatedSfLabInvestigations,
      );
    });
  }

  async getMetaScreeningFormDetails(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: ScreeningFormMetaResponse[]; total: number }> {
    const [forms, totalCount] = await this.screeningFormRepository.findAndCount(
      {
        where: { patientId: patientId, isDelete: false },
        order: { createdAt: 'DESC' },
        skip: page * pageSize,
        take: pageSize,
      },
    );
    return {
      data: forms.map((form) => mapScreeningFormMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }
}
