import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PatientService } from 'src/patient/patient.service';
import {
  mapRequestToPregnancyOverview,
  mapToUpdatePregnancyOverview,
} from './mappers/request.mapper';
import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { PregnancyOverviewCreate } from './dtos/request/pregnancy_overview_create.request';
import { PregnancyOverviewResponse } from './dtos/response/pregnancy_overview.response';
import {
  mapToPregnancyOverviewMetaResponse,
  mapToPregnancyOverviewResponse,
} from './mappers/response.mapper';
import { PregnancyOverviewUpdate } from './dtos/request/pregnancy_overview_update.request';
import { PregnancyOverviewMetaResponse } from './dtos/response/pregnancy_overview_meta.response';

@Injectable()
export class PregnancyOverviewService {
  constructor(
    @InjectRepository(RecordPregnancyOverview, 'dynamicDB')
    private readonly recordPregnancyOverviewRepository: Repository<RecordPregnancyOverview>,
    private readonly patientService: PatientService,
  ) {}

  async createPregnancyOverview(
    creatorId: number,
    body: PregnancyOverviewCreate,
  ): Promise<PregnancyOverviewResponse> {
    await this.patientService.verifyPatient(body.patientId);
    const form = mapRequestToPregnancyOverview(creatorId, body);
    const savedForm = await this.recordPregnancyOverviewRepository.save(form);
    return mapToPregnancyOverviewResponse(savedForm);
  }

  async updatePregnancyOverview(
    updaterId: number,
    formId: string,
    body: PregnancyOverviewUpdate,
  ): Promise<PregnancyOverviewResponse> {
    const vaccinationForm = await this.verifyPregnancyOverviewForm(formId);
    const form = mapToUpdatePregnancyOverview(updaterId, vaccinationForm, body);
    const updatedForm = await this.recordPregnancyOverviewRepository.save(form);
    return mapToPregnancyOverviewResponse(updatedForm);
  }

  async getPregnancyOverviewById(
    id: string,
  ): Promise<PregnancyOverviewResponse> {
    const form = await this.verifyPregnancyOverviewForm(id);
    return mapToPregnancyOverviewResponse(form);
  }

  async verifyPregnancyOverviewForm(
    id: string,
  ): Promise<RecordPregnancyOverview> {
    const form = await this.recordPregnancyOverviewRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Unable to find the vaccination form');
    }
    return form;
  }

  async getMetaPregnancyOverview(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: PregnancyOverviewMetaResponse[]; total: number }> {
    const [forms, totalCount] =
      await this.recordPregnancyOverviewRepository.findAndCount({
        where: { patientId: patientId, isDelete: false },
        order: { createdAt: 'DESC' },
        skip: page * pageSize,
        take: pageSize,
      });
    return {
      data: forms.map((form) =>
        mapToPregnancyOverviewMetaResponse(userInfo, form),
      ),
      total: totalCount,
    };
  }
}
