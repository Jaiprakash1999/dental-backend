import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { VisitStatus } from 'src/utils/enums/visit_status.enum';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
import { VisitTags } from 'src/utils/enums/visit_tags.enum';
import { VisitResponse } from './dtos/response/visit.response';
import { mapToVisit } from './mappers/request.mapper';
import { visitResponseMapper } from './mappers/response.mapper';
import { Gender } from 'src/utils/enums/gender.enum';
import { PatientService } from 'src/patient/patient.service';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { VisitCreate } from './dtos/request/visit_create.request';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit, 'dynamicDB')
    private readonly visitRepository: Repository<Visit>,
    private readonly authService: AuthService,
    private readonly patientService: PatientService,
  ) {}

  async createVisit(
    id: number,
    headId: number,
    body: VisitCreate,
  ): Promise<VisitResponse> {
    //Get the patient of which we need to create the visit
    const patient = await this.patientService.verifyPatient(body.patientId);
    const userInfo = await this.authService.getUserInfo();
    // Determine the new token number
    const highestToken = await this.visitRepository
      .createQueryBuilder('visit')
      .select('MAX(visit.tokenNumber)', 'maxToken')
      .where('visit.visitDate = :visitDate', { visitDate: body.visitDate })
      .getRawOne();
    const newTokenNumber: number = highestToken.maxToken
      ? highestToken.maxToken + 1
      : 1;

    // Create the new Visit
    const newVisit = mapToVisit(id, headId, newTokenNumber, body);
    const savedVisit = await this.visitRepository.save(newVisit);
    return visitResponseMapper(savedVisit, patient, userInfo);
  }

  async getVisitById(id: string): Promise<VisitResponse> {
    const visit = await this.verifyVisit(id);
    const patient = await this.patientService.verifyPatient(visit.patientId);
    const userInfo = await this.authService.getUserInfo();
    return visitResponseMapper(visit, patient, userInfo);
  }

  async searchTokens(
    page: number,
    pageSize: number,
    visitDate?: string,
    mmuUnit?: MMUUnit,
    visitStatus: VisitStatus[] = [],
    tags: VisitTags[] = [],
    mmuHead?: number,
    creatorId?: number,
    patientId?: string,
    gender: Gender[] = [],
    nameQuery?: string,
  ): Promise<{ total: number; visits: VisitResponse[] }> {
    const query = this.visitRepository
      .createQueryBuilder('visit')
      .orderBy('visit.tokenNumber', 'DESC')
      .skip(page * pageSize)
      .take(pageSize);

    // Add filters
    if (visitDate) {
      query.andWhere('visit.visitDate = :visitDate', { visitDate });
    }
    if (mmuUnit) {
      query.andWhere('visit.mmuUnit = :mmuUnit', { mmuUnit });
    }
    if (visitStatus) {
      if (visitStatus?.length) {
        query.andWhere('visit.visitStatus IN (:...visitStatus)', {
          visitStatus,
        });
      }
    }
    if (mmuHead) {
      query.andWhere('visit.mmuHead = :mmuHead', { mmuHead });
    }
    if (patientId) {
      query.andWhere('visit.patientId = :patientId', { patientId });
    }
    if (tags?.length) {
      query.andWhere('visit.tags @> :tags', {
        tags,
      });
    }
    if (creatorId) {
      query.andWhere('visit.createdBy = :creatorId', { creatorId });
    }

    // Get results along with total count
    const [visits, total] = await query.getManyAndCount();
    const userInfo = await this.authService.getUserInfo();
    const visitResponses = await Promise.all(
      visits.map(async (visit) => {
        const patient = await this.patientService.verifyPatient(
          visit.patientId,
        );
        return visitResponseMapper(visit, patient, userInfo);
      }),
    );

    return {
      total,
      visits: visitResponses.filter(
        (visit) =>
          (!gender.length || gender.includes(visit.gender)) &&
          (!nameQuery ||
            visit.name.toLowerCase().includes(nameQuery.toLowerCase())),
      ),
    };
  }

  async updateVisitStatus(id: string, visitStatus: VisitStatus) {
    const visit = await this.verifyVisit(id);
    visit.visitStatus = visitStatus;
    await this.visitRepository.save(visit);
  }

  async getStates(): Promise<string[]> {
    const states = await this.visitRepository.find({
      select: ['state'], // Select only the 'state' column
      where: { state: Not(IsNull()) }, // Ensure state is not null
    });
    return Array.from(
      new Set(states.map((state) => state.state.toLowerCase())),
    ); // Remove duplicates and convert to lowercase
  }

  async getDistrict(): Promise<string[]> {
    const districts = await this.visitRepository.find({
      select: ['district'], // Select only the 'district' column
      where: { district: Not(IsNull()) }, // Ensure district is not null
    });
    return Array.from(
      new Set(districts.map((district) => district.district.toLowerCase())),
    ); // Remove duplicates and convert to lowercase
  }

  async getTehsil(): Promise<string[]> {
    const tehsils = await this.visitRepository.find({
      select: ['tehsil'], // Select only the 'tehsil' column
      where: { tehsil: Not(IsNull()) }, // Ensure tehsil is not null
    });
    return Array.from(
      new Set(tehsils.map((tehsil) => tehsil.tehsil.toLowerCase())),
    ); // Remove duplicates and convert to lowercase
  }

  async verifyVisit(id: string): Promise<Visit> {
    const visit = await this.visitRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!visit) {
      throw new NotFoundException('Visit not found');
    }
    return visit;
  }
}
