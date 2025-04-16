import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadRecord } from 'src/entities/dynamic/upload_record.entity';
import { PatientService } from 'src/patient/patient.service';
import { DataSource, Repository } from 'typeorm';
import { mapUploadDocumentMetaResponse } from './mappers/response.mappers';

@Injectable()
export class UploadDocumentService {
  constructor(
    @InjectRepository(UploadRecord, 'dynamicDB')
    private readonly uploadDocumentRepository: Repository<UploadRecord>,
    private readonly patientService: PatientService,

    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
  ) {}
  async uploadDocument(
    creatorId: any,
    documentName: string,
    patientId: string,
    file: Express.Multer.File,
  ) {
    const patient = await this.patientService.verifyPatient(patientId);
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const newRecord = this.uploadDocumentRepository.create({
      documentName,
      document: file.buffer,
      documentType: file.mimetype,
      patientId,
      createdBy: creatorId,
      lastUpdatedBy: creatorId,
    });

    return this.uploadDocumentRepository.save(newRecord);
  }

  async getUploadRecordMetaDetails(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: any[]; total: number }> {
    const [forms, totalCount] =
      await this.uploadDocumentRepository.findAndCount({
        where: { patientId, isDelete: false },
        order: { createdAt: 'DESC' },
        skip: page * pageSize,
        take: pageSize,
      });

    return {
      data: forms.map((form) => mapUploadDocumentMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }

  async getDocumentById(id: string) {
    const record = await this.uploadDocumentRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException('Document not found');
    }

    return {
      id: record.id,
      documentName: record.documentName,
      documentType: record.documentType,
      document: record.document.toString('base64'),
    };
  }

  async getAllDocumentsByPatientId(patientId: string) {
    const documents = await this.uploadDocumentRepository.find({
      where: { patientId },
      order: { createdAt: 'DESC' },
    });

    return documents.map((doc) => ({
      id: doc.id,
      documentName: doc.documentName,
      documentType: doc.documentType,
      base64: doc.document.toString('base64'),
    }));
  }
}
