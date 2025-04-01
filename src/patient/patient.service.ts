import { Injectable, NotFoundException } from '@nestjs/common';
import { PatientMetaResponse } from './dtos/response/patient_meta.response';
import * as sharp from 'sharp';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { mapToPatient, mapToUpdatePatient } from './mappers/request.mapper';
import {
  mapToPatientResponse,
  patientMetaResponseMapper,
} from './mappers/response.mapper';
import { PatientResponse } from './dtos/response/patient.response';
import { PatientCreate } from './dtos/request/patient_create.request';
import { AuthService } from 'src/auth/auth.service';
import { PatientUpdate } from './dtos/request/patient_update.request';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { MandalService } from 'src/mandal/mandal.service';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';
import { BloodGroup } from 'src/utils/enums/blood_group.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
const soundex = require('@jollie/soundex');

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);

  constructor(
    @InjectRepository(Patient, 'dynamicDB')
    private readonly patientRepository: Repository<Patient>,
    private readonly authService: AuthService,
    private readonly mandalService: MandalService,
    @InjectRepository(Visit, 'dynamicDB')
    private readonly visitRepository: Repository<Visit>,
  ) {}

  async registerPatient(id: number, body: PatientCreate): Promise<any> {
    // Get the soundexCode
    const soundexCode = soundex(body.name);
    const fatherSoundexCode = soundex(body.fatherName);

    const { habitat, yearOfBirth, gender } = body;
    const userInfo = await this.authService.getUserInfo();

    // If the warning is off means the user is trying to register without ignoring the warning so if
    // we get the same users we will return the list of same users rather then registering the patient
    if (!body.warning) {
      const existingPatients = await this.patientRepository
        .createQueryBuilder('patient')
        .andWhere('patient.soundex_value = :soundexCode', { soundexCode }) // Change .where() to .andWhere()
        .andWhere('patient.father_soundex_value = :soundexCode', {
          fatherSoundexCode,
        }) // Change .where() to .andWhere()
        .andWhere('patient.gender = :gender', { gender })
        .andWhere(
          ':yearOfBirth - 2 < patient.yearOfBirth AND patient.yearOfBirth < :yearOfBirth + 2',
          { yearOfBirth },
        )
        .andWhere('patient.habitat = :habitat', { habitat })
        .andWhere('patient.isDelete = false') // Filter for 'isDelete' being false
        .getMany();

      if (existingPatients.length > 0) {
        return {
          registered: false,
          existingPatients: existingPatients.map((patient) =>
            mapToPatientResponse(patient, userInfo),
          ),
        };
      }
    }

    // if the warning is true or the warning ended with no conflict we will register the user
    //Creating new patient entity
    const newPatient = mapToPatient(
      id,
      body,
      soundexCode,
      fatherSoundexCode,
      await this.createThumbnail(body.photo),
    );

    // Saving the patient in the database
    const savedPatient = await this.patientRepository.save(newPatient);
    return {
      registered: true,
      savedPatient: mapToPatientResponse(savedPatient, userInfo),
    };
  }

  async createThumbnail(
    base64Image: string,
    width = 150,
    height = 150,
  ): Promise<string> {
    try {
      if (!base64Image) {
        return null;
      }
      const imageBuffer = Buffer.from(base64Image, 'base64');

      const thumbnailBuffer = await sharp(imageBuffer)
        .resize(width, height, { fit: 'cover' })
        .toBuffer();

      return thumbnailBuffer.toString('base64');
    } catch (error) {
      this.logger.error(
        `Failed to create thumbnail: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to create thumbnail: ${error.message}`);
    }
  }

  async findAll(): Promise<PatientMetaResponse[]> {
    const patients = await this.patientRepository.find({
      where: { isDelete: false },
    });
    return patients.map(patientMetaResponseMapper);
  }

  async findOne(id: string): Promise<PatientResponse> {
    const patient = await this.patientRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    const userInfo = await this.authService.getUserInfo();
    return mapToPatientResponse(patient, userInfo);
  }

  async update(id: number, body: PatientUpdate): Promise<any> {
    //Get the patient user wanted to edit if the patient not found throw error
    const patient = await this.patientRepository.findOne({
      where: { id: body.id, isDelete: false },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    const userInfo = await this.authService.getUserInfo();
    const patientId = patient.id;
    const fatherSoundexCode = soundex(
      body.fatherName ? body.fatherName : patient.fatherName,
    );
    // Get the soundexCode
    const soundexCode = patient.soundexValue;
    const gender = body.gender ? body.gender : patient.gender;
    const yearOfBirth = body.yearOfBirth
      ? body.yearOfBirth
      : patient.yearOfBirth;
    const habitat = body.habitat ? body.habitat : patient.habitat;
    if (!body.warning) {
      const existingPatients = await this.patientRepository
        .createQueryBuilder('patient')
        .andWhere('patient.soundex_value = :soundexCode', { soundexCode }) // Change .where() to .andWhere()
        .andWhere('patient.gender = :gender', { gender })
        .andWhere('patient.father_soundex_value = :soundexCode', {
          fatherSoundexCode,
        })
        .andWhere(
          ':yearOfBirth - 2 < patient.yearOfBirth AND patient.yearOfBirth < :yearOfBirth + 2',
          { yearOfBirth },
        )
        .andWhere('patient.habitat = :habitat', { habitat })
        .andWhere('patient.isDelete = false') // Filter for 'isDelete' being false
        .andWhere('patient.id != :patientId', { patientId }) // Exclude the patient with the given ID
        .getMany();

      if (existingPatients.length > 0) {
        return {
          existingPatients: existingPatients.map((patient) =>
            mapToPatientResponse(patient, userInfo),
          ),
        };
      }
    }

    // if the warning is true or the warning ended with no conflict we will update the patient
    //updating the patient entity
    const newPatient = mapToUpdatePatient(id, patient, fatherSoundexCode, body);

    // update the patient in the database
    const savedPatient = await this.patientRepository.save(newPatient);
    return mapToPatientResponse(savedPatient, userInfo);
  }

  async remove(id: number, patientId: string): Promise<void> {
    //Getting the patient
    const patient = await this.patientRepository.findOne({
      where: { id: patientId, isDelete: false },
    });
    if (!patient) {
      throw new NotFoundException('Patient Not found');
    }
    patient.isDelete = true;
    patient.updatedBy = id;
    await this.patientRepository.save(patient);
  }

  async search(
    query?: string,
    gender?: Gender[],
    minAge?: number,
    maxAge?: number,
    bloodGroup?: BloodGroup[],
    registeredBy?: number[],
    habitation?: number[],
    patientTag?: PatientTag[],
    registrationStartDate?: Date,
    registrationEndDate?: Date,
    lastVisitStartDate?: Date,
    lastVisitEndDate?: Date,
    lastChiefComplaint?: string,
    pageSize: number = 10,
    page: number = 0,
  ): Promise<{ total: number; patients: PatientMetaResponse[] }> {
    console.log(registrationStartDate);
    const qb = this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.isDelete = false');

    if (query) {
      // Fetch habitations from HabitationService
      const habitationIds = await this.mandalService.getIdsByQuery(query);
      // Add condition to filter patients by habitation IDs
      qb.andWhere(
        new Brackets((qb) => {
          qb.where('patient.name ILIKE :query', {
            query: `%${query}%`,
          });
          if (habitationIds.length > 0) {
            qb.orWhere('patient.habitat IN (:...habitationIds)', {
              habitationIds,
            });
          }
        }),
      );
    }
    if (gender && gender.length > 0) {
      qb.andWhere('patient.gender IN (:...gender)', { gender });
    }
    if (minAge !== undefined || maxAge !== undefined) {
      const currentYear = new Date().getFullYear();
      if (minAge !== undefined) {
        const minYearOfBirth = currentYear - minAge;
        qb.andWhere('patient.yearOfBirth <= :minYearOfBirth', {
          minYearOfBirth,
        });
      }
      if (maxAge !== undefined) {
        const maxYearOfBirth = currentYear - maxAge;
        qb.andWhere('patient.yearOfBirth >= :maxYearOfBirth', {
          maxYearOfBirth,
        });
      }
    }
    if (bloodGroup && bloodGroup.length > 0) {
      qb.andWhere('patient.bloodGroup IN (:...bloodGroup)', { bloodGroup });
    }
    if (patientTag && patientTag.length > 0) {
      qb.andWhere('patient.patientTag IN (:...patientTag)', { patientTag });
    }
    if (registeredBy && registeredBy.length > 0) {
      qb.andWhere('patient.createdBy IN (:...registeredBy)', { registeredBy });
    }
    if (habitation && habitation.length > 0) {
      qb.andWhere('patient.habitat IN (:...habitation)', { habitation });
    }
    if (registrationStartDate || registrationEndDate) {
      qb.andWhere(
        new Brackets((qb) => {
          if (registrationStartDate) {
            qb.andWhere('patient.createdAt >= :registrationStartDate', {
              registrationStartDate,
            });
          }
          if (registrationEndDate) {
            qb.andWhere('patient.createdAt <= :registrationEndDate', {
              registrationEndDate,
            });
          }
        }),
      );
    }
    if (lastVisitStartDate || lastVisitEndDate) {
      qb.andWhere(
        new Brackets((qb) => {
          if (lastVisitStartDate) {
            qb.andWhere(
              `patient.id IN (SELECT "patient_id" FROM "visit" WHERE "visit_date" >= :lastVisitStartDate AND "is_delete" = false)`,
              { lastVisitStartDate },
            );
          }
          if (lastVisitEndDate) {
            qb.andWhere(
              `patient.id IN (SELECT "patient_id" FROM "visit" WHERE "visit_date" <= :lastVisitEndDate AND "is_delete" = false)`,
              { lastVisitEndDate },
            );
          }
        }),
      );
    }
    if (lastChiefComplaint) {
      qb.andWhere(
        `patient.id IN (SELECT "patient_id" FROM "visit", jsonb_array_elements_text(to_jsonb("chief_complaint")) AS complaint WHERE LOWER(complaint) LIKE :lastChiefComplaint AND "is_delete" = false)`,
        { lastChiefComplaint: `%${lastChiefComplaint.toLowerCase()}%` },
      );
    }

    const [patients, total] = await qb
      .offset(pageSize * page)
      .limit(pageSize)
      .getManyAndCount();

    return {
      total, // Total number of matching patients
      patients: patients.map(patientMetaResponseMapper),
    };
  }

  async getDetails(id: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to midnight for comparison
    const userInfo = await this.authService.getUserInfo();
    const patient = await this.verifyPatient(id);

    // Sort visits in descending order (latest first)
    const visits = await this.visitRepository.find({
      where: { isDelete: false, patientId: id },
    });
    const sortedVisits = visits.sort(
      (a, b) =>
        new Date(b.visitDate).getTime() - new Date(a.visitDate).getTime(),
    );

    // Find the last visit (latest past visit before today)
    const lastVisit = sortedVisits.find(
      (visit) => new Date(visit.visitDate) < today,
    );

    // Find all upcoming visits (visits on or after today)
    const upcomingVisits = sortedVisits.filter(
      (visit) => new Date(visit.visitDate) >= today,
    );

    // Get the earliest upcoming visit (soonest future visit)
    const upcomingVisit =
      upcomingVisits.length > 0
        ? upcomingVisits.reduce((prev, curr) =>
            new Date(prev.visitDate) < new Date(curr.visitDate) ? prev : curr,
          )
        : null;

    return {
      lastVisitDate: lastVisit ? lastVisit.visitDate : null,
      lastVisitCheifComplaint: lastVisit ? lastVisit.chiefComplaint : null,
      upcomingVisitDate: upcomingVisit ? upcomingVisit.visitDate : null,
      registeredBy: userInfo.find((user) => user['id'] == patient.createdBy)[
        'name'
      ],
      registeredAt: patient.createdAt || null,
    };
  }

  async verifyPatient(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!patient) {
      throw new NotFoundException('Patient with id not found');
    }
    return patient;
  }
}
