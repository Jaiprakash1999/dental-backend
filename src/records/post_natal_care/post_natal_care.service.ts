import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PatientService } from 'src/patient/patient.service';
import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { PostNatalCareCreate } from './dtos/request/post_natal_care_create.request';
import { PostNatalCareResponse } from './dtos/response/post_natal_care.response';
import {
  mapRequestToPncPostPartumCare,
  mapRequestToPostNatalCare,
  mapUpdatePncToPostpartumCare,
  mapUpdateToPostNatalCare,
} from './mappers/request.mapper';
import {
  mapToPostNatalCareMetaResponse,
  mapToPostNatalCareResponse,
} from './mappers/response.mapper';
import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { PostNatalCareUpdate } from './dtos/request/post_natal_care_update.request';
import { PostNatalCareMetaResponse } from './dtos/response/post_natal_care_meta.response';

@Injectable()
export class PostNatalCareService {
  constructor(
    @InjectRepository(RecordPostNatalCare, 'dynamicDB')
    private readonly recordPostnatalCareRepository: Repository<RecordPostNatalCare>,
    @InjectRepository(RecordPNCPostpartumCare, 'dynamicDB')
    private readonly recordPncPostpartumCareRepository: Repository<RecordPNCPostpartumCare>,
    private readonly patientService: PatientService,
    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async createPostNatalCare(
    creatorId: number,
    body: PostNatalCareCreate,
  ): Promise<PostNatalCareResponse> {
    await this.patientService.verifyPatient(body.patientId);
    return this.dataSource.transaction(async (manager) => {
      const form = mapRequestToPostNatalCare(creatorId, body);
      const savedForm = await manager.save(RecordPostNatalCare, form);
      let order = 0;
      const savedPostpartumCares = await Promise.all(
        body.postpartumCareRecords.map((record) => {
          order++;
          const postpartumCare = mapRequestToPncPostPartumCare(
            savedForm.id,
            record,
            order,
          );
          return manager.save(RecordPNCPostpartumCare, postpartumCare);
        }),
      );
      return mapToPostNatalCareResponse(savedForm, savedPostpartumCares);
    });
  }

  async updatePostNatalCare(
    updaterId: number,
    formId: string,
    body: PostNatalCareUpdate,
  ): Promise<PostNatalCareResponse> {
    const form = await this.verifyPostNatalForm(formId);
    return this.dataSource.transaction(async (manager) => {
      const updatedForm = mapUpdateToPostNatalCare(updaterId, form, body);
      const savedForm = await manager.save(RecordPostNatalCare, updatedForm);
      const previousPostPartumCares =
        await this.recordPncPostpartumCareRepository.find({
          where: { isDelete: false, postNatalCareId: formId },
        });
      let order = previousPostPartumCares.length;
      const savedPostpartumCares = await Promise.all(
        body.postpartumCareRecords.map(async (record) => {
          if (record.id) {
            const postPartumCare = await this.verifyPncPostNatalForm(record.id);
            const updatedPostPartumCare = mapUpdatePncToPostpartumCare(
              postPartumCare,
              record,
            );
            return await manager.save(
              RecordPNCPostpartumCare,
              updatedPostPartumCare,
            );
          } else {
            order++;
            const postpartumCare = mapRequestToPncPostPartumCare(
              savedForm.id,
              record,
              order,
            );
            return await manager.save(RecordPNCPostpartumCare, postpartumCare);
          }
        }),
      );
      return mapToPostNatalCareResponse(savedForm, savedPostpartumCares);
    });
  }

  async getPostNatalCareById(id: string): Promise<PostNatalCareResponse> {
    const form = await this.verifyPostNatalForm(id);
    const postPartumCares = await this.recordPncPostpartumCareRepository.find({
      where: { isDelete: false, postNatalCareId: id },
      order: { order: 'ASC' },
    });

    return mapToPostNatalCareResponse(form, postPartumCares);
  }

  async verifyPostNatalForm(id: string): Promise<RecordPostNatalCare> {
    const form = await this.recordPostnatalCareRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Unable to find the vaccination form');
    }
    return form;
  }

  async verifyPncPostNatalForm(id: string): Promise<RecordPNCPostpartumCare> {
    const form = await this.recordPncPostpartumCareRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!form) {
      throw new NotFoundException('Postpartum care form not found');
    }
    return form;
  }

  async getMetaPostNatalCare(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: PostNatalCareMetaResponse[]; total: number }> {
    const [forms, totalCount] =
      await this.recordPostnatalCareRepository.findAndCount({
        where: { patientId: patientId, isDelete: false },
        order: { createdAt: 'DESC' },
        skip: page * pageSize,
        take: pageSize,
      });
    return {
      data: forms.map((form) => mapToPostNatalCareMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }
}
