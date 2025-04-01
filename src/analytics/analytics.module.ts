import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { MandalService } from 'src/mandal/mandal.service';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { User } from 'src/entities/dynamic/user.entity';
import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Visit,
        Patient,
        User,
        RecordANCAntenatalVisit,
        RecordAntenatalCare,
        RecordCOBBabyCare,
        RecordCareOfBaby,
        RecordVaccinationForm,
        RecordPregnancyOverview,
        RecordPostNatalCare,
        RecordPNCPostpartumCare,
        RecordPrescription,
      ],
      'dynamicDB',
    ),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, MandalService],
})
export class AnalyticsModule {}
