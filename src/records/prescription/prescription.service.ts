import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrescriptionCreate } from './dtos/request/prescription_create.request';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';
import { DataSource, Repository } from 'typeorm';
import { PrescriptionResponse } from './dtos/response/prescription.response';
import { RecordPrescriptionRx } from 'src/entities/dynamic/records_prescription_rx.entity';
import {
  mapToPrescriptionEntity,
  mapToPrescriptionRxEntity,
} from './mappers/request.mapper';
import {
  mapToPrescriptionMetaResponse,
  mapToPrescriptionResponse,
} from './mappers/response.mapper';
import { AuthService } from 'src/auth/auth.service';
import { PatientService } from 'src/patient/patient.service';
import { PrescriptionMetaResponse } from './dtos/response/prescription_meta.response';
import { VisitService } from 'src/visit/visit.service';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(RecordPrescription, 'dynamicDB')
    private readonly prescriptionRepository: Repository<RecordPrescription>,
    @InjectRepository(RecordPrescriptionRx, 'dynamicDB')
    private readonly prescriptionRxRepository: Repository<RecordPrescriptionRx>,
    private readonly visitService: VisitService,
    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
    private readonly authService: AuthService,
    private readonly patientService: PatientService,
  ) {}

  async createPrescription(
    creatorId: number,
    body: PrescriptionCreate,
  ): Promise<PrescriptionResponse> {
    const visit = await this.visitService.verifyVisit(body.visitId);

    if (visit.prescriptionId != null) {
      throw new BadRequestException('Visit Already have the prescription');
    }

    const patient = await this.patientService.verifyPatient(visit.patientId);

    const userInfo = await this.authService.getUserInfo();

    return this.dataSource.transaction(async (manager) => {
      //Mapping the entity of the prescription
      const prescription = mapToPrescriptionEntity(
        creatorId,
        visit.patientId,
        body,
      );
      const savedPrescription = await manager.save(
        RecordPrescription,
        prescription,
      );
      const savedPrescriptionRx = await Promise.all(
        body.rxList.map(async (rx) => {
          const prescriptionRx = mapToPrescriptionRxEntity(
            savedPrescription.id,
            rx,
          );
          return manager.save(RecordPrescriptionRx, prescriptionRx);
        }),
      );
      visit.prescriptionId = savedPrescription.id;
      await manager.save(visit);
      return mapToPrescriptionResponse(
        userInfo,
        patient.name,
        savedPrescription,
        savedPrescriptionRx,
      );
    });
  }

  async getPrescriptionById(
    prescriptionId: string,
  ): Promise<PrescriptionResponse> {
    const prescription = await this.verifyPrescription(prescriptionId);
    const prescriptionRxs = await this.prescriptionRxRepository.find({
      where: { prescriptionId: prescription.id, isDelete: false },
      order: { createdAt: 'ASC' },
    });
    const userInfo = await this.authService.getUserInfo();
    const patient = await this.patientService.verifyPatient(
      prescription.patientId,
    );
    return mapToPrescriptionResponse(
      userInfo,
      patient.name,
      prescription,
      prescriptionRxs,
    );
  }

  async verifyPrescription(
    prescriptionId: string,
  ): Promise<RecordPrescription> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id: prescriptionId, isDelete: false },
    });
    if (!prescription) {
      throw new NotFoundException('Prescription Not found');
    }
    return prescription;
  }

  async verifyPrescriptionRx(
    prescriptionRxId: string,
  ): Promise<RecordPrescriptionRx> {
    const prescriptionRx = await this.prescriptionRxRepository.findOne({
      where: { id: prescriptionRxId, isDelete: false },
    });
    if (!prescriptionRx) {
      throw new NotFoundException('Prescription Rx Not found');
    }
    return prescriptionRx;
  }

  async getMetaPrescriptionDetails(
    patientId: string,
    page: number = 0,
    pageSize: number = 10,
    userInfo: object[],
  ): Promise<{ data: PrescriptionMetaResponse[]; total: number }> {
    const [forms, totalCount] = await this.prescriptionRepository.findAndCount({
      where: { patientId: patientId, isDelete: false },
      order: { createdAt: 'DESC' },
      skip: page * pageSize,
      take: pageSize,
    });
    return {
      data: forms.map((form) => mapToPrescriptionMetaResponse(userInfo, form)),
      total: totalCount,
    };
  }
}
