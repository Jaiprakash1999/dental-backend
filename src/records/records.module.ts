import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsController } from './records.controller';
import { ScreeningFormController } from './screening_form/screening_form.controller';
import { ScreeningFormService } from './screening_form/screening_form.service';
import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { VaccinationFormController } from './vaccination_from/vaccination_from.controller';
import { VaccinationFormService } from './vaccination_from/vaccination_form.service';
import { AuthService } from 'src/auth/auth.service';
import { PatientService } from 'src/patient/patient.service';
import { RecordScreeningForm } from 'src/entities/dynamic/records_screening_form.entity';
import { RecordSFLabInvestigations } from 'src/entities/dynamic/records_sf_lab_investigations.entity';
import { VitalFormService } from './vital_form/vital_form.service';
import { VitalFormController } from './vital_form/vital_form.controller';
import { RecordVitalForm } from 'src/entities/dynamic/records_vital_form.entity';
import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';
import { RecordPrescriptionRx } from 'src/entities/dynamic/records_prescription_rx.entity';
import { PrescriptionService } from './prescription/prescription.service';
import { PrescriptionController } from './prescription/prescription.controller';
import { PregnancyOverviewService } from './pregnancy_overview/pregnancy_overview.service';
import { PregnancyOverviewController } from './pregnancy_overview/pregnancy_overview.controller';
import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';
import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { PostNatalCareController } from './post_natal_care/post_natal_care.controller';
import { PostNatalCareService } from './post_natal_care/post_natal_care.service';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { CareOfBabyController } from './care_of_baby/care_of_baby.controller';
import { CareOfBabyService } from './care_of_baby/care_of_baby.service';
import { User } from 'src/entities/dynamic/user.entity';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { AntenatalCareController } from './antenatal_care/antenatal_care.controller';
import { AntenatalCareService } from './antenatal_care/antenatal_care.service';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { VisitService } from 'src/visit/visit.service';
import { PatientModule } from 'src/patient/patient.module';
import { Template } from 'src/entities/dynamic/template.entity';
import { TemplateRx } from 'src/entities/dynamic/template_rx.entity';
import { MandalService } from 'src/mandal/mandal.service';
import { RecordANCOptionalInvestigation } from 'src/entities/dynamic/records_anc_optional_investigations.entity';
import { DentalRecord } from 'src/entities/dynamic/dental_record.entity';
import { TeethData } from 'src/entities/dynamic/teeth_data.entity';
import { RecordStep } from 'src/entities/dynamic/record_step.entity';
import { DentalFormService } from './dental_form/dental_form.service';
import { DentalFormController } from './dental_form/dental_form.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        RecordScreeningForm,
        RecordSFLabInvestigations,
        RecordVaccinationForm,
        RecordVitalForm,
        RecordPrescription,
        RecordPrescriptionRx,
        RecordANCAntenatalVisit,
        RecordCOBBabyCare,
        RecordCareOfBaby,
        RecordAntenatalCare,
        RecordPNCPostpartumCare,
        RecordPostNatalCare,
        RecordPregnancyOverview,
        RecordANCOptionalInvestigation,
        DentalRecord,
        TeethData,
        RecordStep,
        Template,
        TemplateRx,
        User,
        Patient,
        Visit,
      ],
      'dynamicDB',
    ),
    PatientModule,
  ],
  controllers: [
    RecordsController,
    ScreeningFormController,
    VaccinationFormController,
    VitalFormController,
    PrescriptionController,
    PregnancyOverviewController,
    PostNatalCareController,
    CareOfBabyController,
    AntenatalCareController,
    DentalFormController,
  ],
  providers: [
    RecordsService,
    ScreeningFormService,
    VaccinationFormService,
    PatientService,
    VitalFormService,
    PrescriptionService,
    PregnancyOverviewService,
    CareOfBabyService,
    PostNatalCareService,
    AntenatalCareService,
    VisitService,
    MandalService,
    DentalFormService,
  ],
})
export class RecordsModule {}
