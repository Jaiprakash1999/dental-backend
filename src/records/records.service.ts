import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { VaccinationFormService } from './vaccination_from/vaccination_form.service';
import { PatientService } from 'src/patient/patient.service';
import { ScreeningFormService } from './screening_form/screening_form.service';
import { VitalFormService } from './vital_form/vital_form.service';
import { PrescriptionService } from './prescription/prescription.service';
import { PregnancyOverviewService } from './pregnancy_overview/pregnancy_overview.service';
import { AntenatalCareService } from './antenatal_care/antenatal_care.service';
import { PostNatalCareService } from './post_natal_care/post_natal_care.service';
import { CareOfBabyService } from './care_of_baby/care_of_baby.service';
import { FormName } from 'src/utils/enums/formName.enum';
import { DentalFormService } from './dental_form/dental_form.service';

@Injectable()
export class RecordsService {
  constructor(
    private readonly authService: AuthService,
    private readonly vaccinationFormService: VaccinationFormService,
    private readonly patientService: PatientService,
    private readonly screeningFormService: ScreeningFormService,
    private readonly vitalFormService: VitalFormService,
    private readonly prescriptionService: PrescriptionService,
    private readonly pregnancyOverviewService: PregnancyOverviewService,
    private readonly antenatalCareService: AntenatalCareService,
    private readonly postNatalCareService: PostNatalCareService,
    private readonly careOfBabyService: CareOfBabyService,
    private readonly dentalFormService: DentalFormService,
  ) {}

  async getPatientRecords(
    patientId: string,
    vaccinationPageNumber: number,
    vaccinationPageSize: number,
    screeningPageNumber: number,
    screeningPageSize: number,
    vitalPageNumber: number,
    vitalPageSize: number,
    prescriptionPageNumber: number,
    prescriptionPageSize: number,
    pregnancyOverviewPageNumber: number,
    pregnancyOverviewPageSize: number,
    antenatalCarePageNumber: number,
    antenatalCarePageSize: number,
    careOfBabyPageNumber: number,
    careOfBabyPageSize: number,
    postNatalCarePageNumber: number,
    postNatalCarePageSize: number,
    dentalPageNumber: number,
    dentalPageSize: number,
  ) {
    await this.patientService.verifyPatient(patientId);
    const userInfo = await this.authService.getUserInfo();
    const vaccinationsForms =
      await this.vaccinationFormService.getMetaVaccinationDetails(
        patientId,
        vaccinationPageNumber,
        vaccinationPageSize,
        userInfo,
      );

    const screeningForms =
      await this.screeningFormService.getMetaScreeningFormDetails(
        patientId,
        screeningPageNumber,
        screeningPageSize,
        userInfo,
      );
    const vitalForms = await this.vitalFormService.getMetaOfVitalForms(
      patientId,
      vitalPageNumber,
      vitalPageSize,
      userInfo,
    );
    const prescriptions =
      await this.prescriptionService.getMetaPrescriptionDetails(
        patientId,
        prescriptionPageNumber,
        prescriptionPageSize,
        userInfo,
      );
    const pregnancyOverviews =
      await this.pregnancyOverviewService.getMetaPregnancyOverview(
        patientId,
        pregnancyOverviewPageNumber,
        pregnancyOverviewPageSize,
        userInfo,
      );
    const antenatalCares = await this.antenatalCareService.getMetaAntenatalCare(
      patientId,
      antenatalCarePageNumber,
      antenatalCarePageSize,
      userInfo,
    );
    const careOfBabyForms = await this.careOfBabyService.getMetaCareOfBaby(
      patientId,
      careOfBabyPageNumber,
      careOfBabyPageSize,
      userInfo,
    );
    const postNatalCares = await this.postNatalCareService.getMetaPostNatalCare(
      patientId,
      postNatalCarePageNumber,
      postNatalCarePageSize,
      userInfo,
    );
    const dentalForms = await this.dentalFormService.getDentalFormMetaDetails(
      patientId,
      dentalPageNumber,
      dentalPageSize,
      userInfo,
    );

    return {
      records: {
        vaccinationForms: {
          total: vaccinationsForms.total,
          forms: vaccinationsForms.data,
        },
        screeningForms: {
          total: screeningForms.total,
          forms: screeningForms.data,
        },
        vitalForms: {
          total: vitalForms.total,
          forms: vitalForms.data,
        },
        prescriptions: {
          total: prescriptions.total,
          forms: prescriptions.data,
        },
        pregnancyOverviews: {
          total: pregnancyOverviews.total,
          forms: pregnancyOverviews.data,
        },
        antenatalCares: {
          total: antenatalCares.total,
          forms: antenatalCares.data,
        },
        careOfBabyForms: {
          total: careOfBabyForms.total,
          forms: careOfBabyForms.data,
        },
        postNatalCares: {
          total: postNatalCares.total,
          forms: postNatalCares.data,
        },
        dentalForms: {
          total: dentalForms.total,
          forms: dentalForms.data,
        },
      },
    };
  }

  async getRecord(formId: string, formName: FormName) {
    switch (formName) {
      case FormName.ANC:
        return await this.antenatalCareService.getAntenatalCareById(formId);

      case FormName.PNC:
        return await this.postNatalCareService.getPostNatalCareById(formId);

      case FormName.PO:
        return await this.pregnancyOverviewService.getPregnancyOverviewById(
          formId,
        );

      case FormName.VCF:
        return await this.vaccinationFormService.getVaccinationFormById(formId);

      case FormName.VF:
        return await this.vitalFormService.getVitalFormById(formId);

      case FormName.COB:
        return await this.careOfBabyService.getCareOfBabyById(formId);

      case FormName.PR:
        return await this.prescriptionService.getPrescriptionById(formId);

      case FormName.SF:
        return await this.screeningFormService.getScreeningFormById(formId);
      case FormName.DF:
        return await this.dentalFormService.getDentalFormById(formId);

      default:
        throw new BadRequestException('Invalid form name');
    }
  }
}
