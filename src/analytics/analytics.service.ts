import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';
import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';
import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { MandalService } from 'src/mandal/mandal.service';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';
import { VisitStatus } from 'src/utils/enums/visit_status.enum';
import { VisitTags } from 'src/utils/enums/visit_tags.enum';
import {
  ArrayContains,
  Between,
  In,
  LessThanOrEqual,
  MoreThan,
  Not,
  Repository,
} from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Patient, 'dynamicDB')
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Visit, 'dynamicDB')
    private readonly visitRepository: Repository<Visit>,
    @InjectRepository(RecordPregnancyOverview, 'dynamicDB')
    private readonly pregnancyOverviewRepository: Repository<RecordPregnancyOverview>,
    @InjectRepository(RecordAntenatalCare, 'dynamicDB')
    private readonly antenatalCareRepository: Repository<RecordAntenatalCare>,
    @InjectRepository(RecordANCAntenatalVisit, 'dynamicDB')
    private readonly antenatalVisit: Repository<RecordANCAntenatalVisit>,
    @InjectRepository(RecordVaccinationForm, 'dynamicDB')
    private readonly vaccinationRepository: Repository<RecordVaccinationForm>,
    @InjectRepository(RecordPostNatalCare, 'dynamicDB')
    private readonly postNatalCareRepository: Repository<RecordPostNatalCare>,
    @InjectRepository(RecordPNCPostpartumCare, 'dynamicDB')
    private readonly pncPostPartumCareRepository: Repository<RecordPNCPostpartumCare>,
    @InjectRepository(RecordCareOfBaby, 'dynamicDB')
    private readonly recordCareOfBabyRepository: Repository<RecordCareOfBaby>,
    @InjectRepository(RecordCOBBabyCare, 'dynamicDB')
    private readonly recordCobBabyCareRepository: Repository<RecordCOBBabyCare>,
    @InjectRepository(RecordPrescription, 'dynamicDB')
    private readonly prescriptionRepository: Repository<RecordPrescription>,
    private readonly mandalService: MandalService,
  ) {}
  async getGeoAnalytics(
    startDate?: Date,
    endDate?: Date,
    mandal?: string,
    gramPanchayat?: string,
    habitat?: string,
    state?: string,
    tehsil?: string,
    district?: string,
    page: number = 0,
    pageSize: number = 10,
  ) {
    endDate = new Date(endDate);

    const mandalIds: number[] = this.mandalService.getIdsByValues(
      mandal,
      gramPanchayat,
      habitat,
    );
    const mandalFilterPregnantPatient = await this.patientRepository.find({
      where: {
        isDelete: false,
        habitat: In(mandalIds),
        patientTag: PatientTag.PREGNANTLADY,
      },
      select: { id: true },
    });

    // Getting pregnant ladies which have follow up
    const pregnantLadiesForFollowUp = await this.prescriptionRepository.find({
      where: {
        isDelete: false,
        followUp: Between(
          new Date().toISOString().split('T')[0],
          endDate.toISOString().split('T')[0],
        ),
        patientId: In(mandalFilterPregnantPatient.map((p) => p.id)),
      },
      select: { patientId: true },
    });

    // Getting the anc visits Scheduled
    let ancThirdMonth = 0;
    let ancSixMonth = 0;
    let ancEightMonth = 0;
    let ancNinthMonth = 0;
    await Promise.all(
      mandalFilterPregnantPatient.map(async (pregnantLady) => {
        const antenatalCare = await this.antenatalCareRepository.findOne({
          where: { isDelete: false, patientId: pregnantLady.id },
          order: { createdAt: 'DESC' }, // Fetch the latest record
        });
        if (antenatalCare) {
          const antenatalVisit = await this.antenatalVisit.find({
            where: {
              isDelete: false,
              antenatalCareId: antenatalCare.id,
              date: Between(new Date(), endDate),
            },
          });
          if (antenatalVisit && antenatalVisit[0].day) {
            switch (antenatalVisit[0].day) {
              case 'Third Month':
                ancThirdMonth++;
                break;
              case 'Six Month':
                ancSixMonth++;
                break;
              case 'Eight Month':
                ancEightMonth++;
                break;
              case 'Ninth Month':
                ancNinthMonth++;
                break;
            }
          }
        }
      }),
    );

    // Calculate the postnatal care forms
    let pncThreeDays = 0;
    let pncSevenDays = 0;
    let pncFourteenDays = 0;
    let pncTwentyOneDays = 0;
    let pncTwentyEightDays = 0;
    let pncFortyTwoDays = 0;

    await Promise.all(
      mandalFilterPregnantPatient.map(async (pregnantLady) => {
        const postnatalCare = await this.postNatalCareRepository.findOne({
          where: { isDelete: false, patientId: pregnantLady.id },
          order: { createdAt: 'DESC' }, // Fetch the latest record
        });
        if (postnatalCare) {
          const postnatalVisit = await this.pncPostPartumCareRepository.find({
            where: {
              isDelete: false,
              postNatalCareId: postnatalCare.id,
              date: Between(new Date(), endDate),
            },
          });
          if (postnatalVisit && postnatalVisit[0].day) {
            switch (postnatalVisit[0].day) {
              case '3 Day':
                pncThreeDays++;
                break;
              case '7 Day':
                pncSevenDays++;
                break;
              case '14 Day':
                pncFourteenDays++;
                break;
              case '21 Day':
                pncTwentyOneDays++;
                break;
              case '28 Day':
                pncTwentyEightDays++;
                break;
              case '42 Day':
                pncFortyTwoDays++;
                break;
            }
          }
        }
      }),
    );

    //Calculating the child flagged for vaccination

    const vaccinationMilestones = [
      { age: 'Birth', vaccines: ['bcg', 'opv0', 'hepatitisB'] },
      {
        age: '6 weeks',
        vaccines: ['opv1', 'pentavalent1', 'rvv1', 'fipv1', 'pcv1'],
      },
      { age: '10 weeks', vaccines: ['opv2', 'pentavalent2', 'rvv2'] },
      {
        age: '14 weeks',
        vaccines: ['opv3', 'pentavalent3', 'fipv2', 'rvv3', 'pcv2'],
      },
      { age: '9-12 months', vaccines: ['mr1', 'je1', 'pcvBooster'] },
      {
        age: '16-24 months',
        vaccines: ['mr2', 'je2', 'diphtheria', 'dptBooster1', 'opvBooster'],
      },
      { age: '5-6 years', vaccines: ['dptBooster2'] },
    ];

    let totalVaccinationFlagged = 0;

    await Promise.all(
      mandalFilterPregnantPatient.map(async (pregnantLady) => {
        const vaccinationForms = await this.vaccinationRepository.find({
          where: { isDelete: false, patientId: pregnantLady.id },
        });

        vaccinationForms.forEach((form) => {
          vaccinationMilestones.every((milestone) => {
            let beak = false;
            milestone.vaccines.every((vaccine) => {
              if (!form[vaccine]) {
                totalVaccinationFlagged++;
                beak = true;
                return false;
              }
              return true;
            });
            if (beak) {
              return false;
            }
            return true;
          });
        });
      }),
    );

    // want to get all the visits with filter of state district and tehsil if comming and want their lattitude and logitude feilds only

    const coOrdinates = await this.visitRepository.find({
      where: {
        isDelete: false,
        state: state ? In([state, null]) : null,
        district: district ? In([district, null]) : null,
        tehsil: tehsil ? In([tehsil, null]) : null,
        visitStatus: Not(VisitStatus.UPCOMING),
      },
      select: {
        latitude: true,
        longitude: true,
      },
    });

    const pregnantLadiesDataToSent = await Promise.all(
      mandalFilterPregnantPatient.map(async (pregnantLady) => {
        const patientId = pregnantLady.id;
        const patient = await this.patientRepository.findOne({
          where: { id: patientId },
        });
        const latestPregnancyOverview =
          await this.pregnancyOverviewRepository.findOne({
            where: { patientId, isDelete: false },
            order: { createdAt: 'DESC' },
          });
        const latestVisit = await this.visitRepository.findOne({
          where: {
            patientId,
            visitStatus: Not(VisitStatus.UPCOMING),
            visitDate: LessThanOrEqual(new Date()),
          },
          order: { createdAt: 'DESC' },
        });
        const futureVisit = await this.visitRepository.findOne({
          where: {
            patientId,
            visitStatus: VisitStatus.UPCOMING,
            visitDate: MoreThan(endDate),
          },
          order: { visitDate: 'ASC' },
        });
        return {
          id: pregnantLady.id,
          name: patient.name,
          lmp: latestPregnancyOverview?.dolmp,
          edd: latestPregnancyOverview?.edd,
          latestTags: latestVisit?.tags,
          latestVisitDate: latestVisit?.visitDate,
          upcomingVisitDate: latestVisit?.visitDate,
        };
      }),
    );
    let noOfHighRiskInfant = 0;
    let noOfEdd = 0;
    let noOfHighRiskPregnancy = 0;
    const highRiskInfant = await Promise.all(
      mandalFilterPregnantPatient.map(async (pregnantLady) => {
        const patientId = pregnantLady.id;
        const latestPregnancyOverview =
          await this.pregnancyOverviewRepository.findOne({
            where: { patientId, isDelete: false },
            order: { createdAt: 'DESC' },
          });

        if (latestPregnancyOverview) {
          const { edd, dolmp, isPregnancyRiskHigh } = latestPregnancyOverview;
          if (isPregnancyRiskHigh) {
            noOfHighRiskPregnancy++;
          }
          if (edd && dolmp) {
            if (
              new Date() < new Date(edd) &&
              new Date(edd) < new Date(endDate)
            ) {
              noOfEdd++;
            }
            const weeksDifference =
              Math.abs(new Date(edd).getTime() - new Date(dolmp).getTime()) /
              (1000 * 60 * 60 * 24 * 7);
            if (weeksDifference < 37) {
              noOfHighRiskInfant++;
            }
          }
        }
      }),
    );

    return {
      noOfPregnantWomans: pregnantLadiesForFollowUp.length,
      noOfHighRiskPregnancy: noOfHighRiskPregnancy,
      noOfEdd: noOfEdd,
      anc: {
        noOfThirdMonthVisits: ancThirdMonth,
        noOfSixthMonthVisits: ancSixMonth,
        noOfEightMonthVisits: ancEightMonth,
        noOfNinthMonthVisits: ancNinthMonth,
      },
      pnc: {
        noOfThirdVisit: pncThreeDays,
        noOfSeventhVisit: pncSevenDays,
        noOfFourteenVisit: pncFourteenDays,
        noOfTwentyOneVisit: pncTwentyOneDays,
        noOfTwentyEightVisit: pncTwentyEightDays,
        noOfFortyTwoVisit: pncFortyTwoDays,
      },
      highRiskInfant: noOfHighRiskInfant,
      childFlaggedForVaccination: totalVaccinationFlagged,
      coOrdinates,
      pregnantLadies: {
        total: pregnantLadiesDataToSent.length,
        data: pregnantLadiesDataToSent.slice(pageSize * page, pageSize),
      },
    };
  }

  async mainDashboard(
    mmuUnit: MMUUnit,
    startDate?: Date,
    endDate?: Date,
    mandal?: string,
    gramPanchayat?: string,
    habitat?: string,
    state?: string,
    tehsil?: string,
    district?: string,
    tags: VisitTags[] = [],
  ) {
    const mandalIds: number[] = this.mandalService.getIdsByValues(
      mandal,
      gramPanchayat,
      habitat,
    );
    const mandalFilterPatient = await this.patientRepository.find({
      where: { isDelete: false, habitat: In(mandalIds) },
      select: { id: true },
    });
    const visits = await this.visitRepository.find({
      where: {
        isDelete: false,
        state: state ? In([state, null]) : null,
        district: district ? In([district, null]) : null,
        tehsil: tehsil ? In([tehsil, null]) : null,
        visitStatus: Not(VisitStatus.UPCOMING),
        visitDate: startDate && endDate ? Between(startDate, endDate) : null,
        mmuUnit: mmuUnit,
        patientId: In(mandalFilterPatient),
        tags: ArrayContains(tags),
      },
    });

    // Calculating no of Infant births
    const careOfBabyForms = await this.recordCareOfBabyRepository.find({
      where: { isDelete: false },
    });
    let repeated: number = 0;
    careOfBabyForms.forEach((careOfBaby) => {
      const cobBabyCareForms = this.recordCobBabyCareRepository.find({
        where: { isDelete: false, careOfBabyId: careOfBaby.id },
        order: { order: 'ASC' },
      });
      if (cobBabyCareForms[1]) {
        if (cobBabyCareForms[1].date) {
          repeated++;
        }
      }
    });

    // Calculating no of live births
    const liveBirths = (
      await this.postNatalCareRepository.find({
        where: {
          isDelete: false,
          pregnancyOutcome: 'Live Birth',
          patientId: In(mandalFilterPatient),
        },
      })
    ).length;

    //Calculating appointment for tubectomy
    const appointmentForTubectomy = (
      await this.pregnancyOverviewRepository.find({
        where: {
          isDelete: false,
          tubectomyDate: Not(null),
          isTubectomyCompleted: false,
        },
      })
    ).length;

    // Calculation diagnosis related analytics
    let noOfMalariaCases: number = 0;
    let noOfSamCases: number = 0;
    let noOfHtnCases: number = 0;
    let noOfDiabetesCases: number = 0;

    await Promise.all(
      visits.map(async (visit) => {
        if (visit.prescriptionId) {
          const prescription = await this.prescriptionRepository.findOne({
            where: { id: visit.prescriptionId },
          });
          if (prescription) {
            prescription.diagnosis.forEach((diagnosis) => {
              const lowerCaseDiagnosis = diagnosis.toLowerCase();
              if (lowerCaseDiagnosis.includes('malaria')) {
                noOfMalariaCases++;
              }
              if (lowerCaseDiagnosis.includes('severe acute malnutrition')) {
                noOfSamCases++;
              }
              if (lowerCaseDiagnosis.includes('hypertension')) {
                noOfHtnCases++;
              }
              if (lowerCaseDiagnosis.includes('diabetes')) {
                noOfDiabetesCases++;
              }
            });
          }
        }
      }),
    );

    const visitDates = visits.map((visit) => visit.visitDate);
    const uniqueVisitDates = Array.from(new Set(visitDates));
    const avgVisitsPerDay = uniqueVisitDates.length
      ? visits.length / uniqueVisitDates.length
      : 0;

    // Calculate the number of trips created by an MMU unit.
    const mmuUnitTrips = Array.from(
      visits.reduce((map, visit) => {
        const dateKey = `${visit.mmuUnit}-${new Date(visit.visitDate).toISOString().split('T')[0]}`;
        map.set(dateKey, (map.get(dateKey) || 0) + 1);
        return map;
      }, new Map()),
    ).length;

    // Calculate the monthly average visits for MMUs.
    const mmuUnitMonthAverage = Array.from(
      visits.reduce((map, visit) => {
        const monthKey = `${visit.mmuUnit}-${new Date(visit.visitDate).getMonth() + 1}-${new Date(visit.visitDate).getFullYear()}`;
        map.set(monthKey, (map.get(monthKey) || 0) + 1);
        return map;
      }, new Map()),
    ).reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate the overall monthly average visits for MMUs.
    const monthlySums = Object.values(
      Array.from(
        visits.reduce((map, visit) => {
          const monthKey = `${visit.mmuUnit}-${new Date(visit.visitDate).getMonth() + 1}-${new Date(visit.visitDate).getFullYear()}`;
          map.set(monthKey, (map.get(monthKey) || 0) + 1);
          return map;
        }, new Map()),
      ).reduce(
        (acc, [key, value]) => {
          const month = key.split('-').slice(1).join('-');
          acc[month] = (acc[month] || 0) + value;
          return acc;
        },
        {} as Record<string, number>,
      ),
    );

    const allUnitMonthAverage = monthlySums.length
      ? monthlySums.reduce((sum, value) => sum + value, 0) / monthlySums.length
      : 0;

    return {
      malariaCases: noOfMalariaCases,
      samCases: noOfSamCases,
      htnCases: noOfHtnCases,
      diabetes: noOfDiabetesCases,
      liveBirths,
      allUnitDayAverage: avgVisitsPerDay,
      allUnitMonthAverage: allUnitMonthAverage,
      appointmentForTubectomy,
      infantVisits: {
        unique: careOfBabyForms.length,
        repeated: repeated,
      },
    };
  }
}
