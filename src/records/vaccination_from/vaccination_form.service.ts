import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { Repository } from 'typeorm';
import { VaccinationFormResponse } from './dtos/response/vaccination_form.response';
import { VaccinationFormCreate } from './dtos/request/vaccination_form_create.request';
import { PatientService } from 'src/patient/patient.service';
import { VaccinationFormUpdate } from './dtos/request/vaccination_form_update.request';
import {
  mapRequestToUpdateVaccinationForm,
  mapRequestToVaccinationForm,
} from './mappers/request.mapper';
import {
  mapToVaccinationResponse,
  mapToVaccinationResponseMeta,
} from './mappers/response.mapper';
import { VaccinationFormMetaResponse } from './dtos/response/vaccination_form_meta.response';

@Injectable()
export class VaccinationFormService {
  constructor(
    @InjectRepository(RecordVaccinationForm, 'dynamicDB')
    private readonly recordVaccinationFormRepository: Repository<RecordVaccinationForm>,
    private readonly patientService: PatientService,
  ) {}

  async createVaccinationForm(
    creatorId: number,
    body: VaccinationFormCreate,
  ): Promise<VaccinationFormResponse> {
    await this.patientService.verifyPatient(body.patientId);
    const form = mapRequestToVaccinationForm(creatorId, body);
    const savedForm = await this.recordVaccinationFormRepository.save(form);
    return mapToVaccinationResponse(savedForm);
  }

  async updateVaccinationForm(
    updaterId: number,
    formId: string,
    body: VaccinationFormUpdate,
  ): Promise<VaccinationFormResponse> {
    const vaccinationForm = await this.verifyVaccinationForm(formId);
    const form = mapRequestToUpdateVaccinationForm(
      updaterId,
      vaccinationForm,
      body,
    );
    const updatedForm = await this.recordVaccinationFormRepository.save(form);
    return mapToVaccinationResponse(updatedForm);
  }

  async getVaccinationFormById(id: string): Promise<VaccinationFormResponse> {
    const form = await this.verifyVaccinationForm(id);
    return mapToVaccinationResponse(form);
  }

  async verifyVaccinationForm(id: string): Promise<RecordVaccinationForm> {
    const form = await this.recordVaccinationFormRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Unable to find the vaccination form');
    }
    return form;
  }

  async getMetaVaccinationDetails(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: VaccinationFormMetaResponse[]; total: number }> {
    const [forms, totalCount] =
      await this.recordVaccinationFormRepository.findAndCount({
        where: { patientId: patientId, isDelete: false },
        order: { createdAt: 'DESC' },
        skip: page * pageSize,
        take: pageSize,
      });
    return {
      data: forms.map((form) => mapToVaccinationResponseMeta(userInfo, form)),
      total: totalCount,
    };
  }
}
