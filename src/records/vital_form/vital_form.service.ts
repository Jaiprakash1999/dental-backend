import { Injectable, NotFoundException } from '@nestjs/common';
import { VitalFormCreate } from './dtos/request/vital_form_create.request';
import { VitalFormResponse } from './dtos/response/vital_form.response';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordVitalForm } from 'src/entities/dynamic/records_vital_form.entity';
import { Repository } from 'typeorm';
import {
  mapUpdateVitalForm,
  mapVitalFormEntity,
} from './mappers/request.mapper';
import {
  mapToVitalFormMetaResponse,
  mapVitalFormResponse,
} from './mappers/response.mapper';
import { VitalFormUpdate } from './dtos/request/vital_form_update.request';
import { VitalFormMetaResponse } from './dtos/response/vital_form_meta.response';
import { VisitService } from 'src/visit/visit.service';

@Injectable()
export class VitalFormService {
  constructor(
    @InjectRepository(RecordVitalForm, 'dynamicDB')
    private readonly vitalFormRepository: Repository<RecordVitalForm>,
    private readonly visitService: VisitService,
  ) {}

  async createVitalForm(
    creatorId: number,
    body: VitalFormCreate,
  ): Promise<VitalFormResponse> {
    const visit = await this.visitService.verifyVisit(body.visitId);
    const form = mapVitalFormEntity(creatorId, body, visit.patientId);
    const savedForm = await this.vitalFormRepository.save(form);
    return mapVitalFormResponse(savedForm);
  }

  async getVitalFormById(formId: string): Promise<VitalFormResponse> {
    const vitalForm = await this.verifyVitalForm(formId);
    return mapVitalFormResponse(vitalForm);
  }

  async updateVitalForm(
    updaterId: number,
    vitalFormId: string,
    body: VitalFormUpdate,
  ): Promise<VitalFormResponse> {
    const vitalForm = await this.verifyVitalForm(vitalFormId);
    const form = mapUpdateVitalForm(updaterId, vitalForm, body);
    const savedForm = await this.vitalFormRepository.save(form);
    return mapVitalFormResponse(savedForm);
  }

  async verifyVitalForm(id: string): Promise<RecordVitalForm> {
    const vitalForm = await this.vitalFormRepository.findOne({
      where: {
        id,
        isDelete: false,
      },
    });
    if (!vitalForm) {
      throw new NotFoundException('Vital Form not found');
    }
    return vitalForm;
  }

  async getMetaOfVitalForms(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: VitalFormMetaResponse[]; total: number }> {
    const [forms, totalCount] = await this.vitalFormRepository.findAndCount({
      where: { patientId: patientId, isDelete: false },
      order: { createdAt: 'DESC' },
      skip: page * pageSize,
      take: pageSize,
    });
    return {
      data: forms.map((form) => mapToVitalFormMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }
}
