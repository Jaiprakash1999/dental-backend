import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { BroadCast } from 'src/entities/dynamic/broadcast.entity';
import { Chat } from 'src/entities/dynamic/chat.entity';
import { DentalRecord } from 'src/entities/dynamic/dental_record.entity';
import { Doctor } from 'src/entities/dynamic/doctor.entity';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { RecordStep } from 'src/entities/dynamic/record_step.entity';
import { RecordANCAntenatalVisit } from 'src/entities/dynamic/records_anc_antenatal_visit.entity';
import { RecordANCOptionalInvestigation } from 'src/entities/dynamic/records_anc_optional_investigations.entity';
import { RecordAntenatalCare } from 'src/entities/dynamic/records_antenatal_care.entity';
import { RecordPregnancyOverview } from 'src/entities/dynamic/records_bd_po.entity';
import { RecordCareOfBaby } from 'src/entities/dynamic/records_care_of_baby.entity';
import { RecordCOBBabyCare } from 'src/entities/dynamic/records_cob_baby_care.entity';
import { RecordPNCPostpartumCare } from 'src/entities/dynamic/records_pnc_post_partum_care.entity';
import { RecordPostNatalCare } from 'src/entities/dynamic/records_post_natal_care.entity';
import { RecordPrescription } from 'src/entities/dynamic/records_prescription.entity';
import { RecordPrescriptionRx } from 'src/entities/dynamic/records_prescription_rx.entity';
import { RecordScreeningForm } from 'src/entities/dynamic/records_screening_form.entity';
import { RecordSFLabInvestigations } from 'src/entities/dynamic/records_sf_lab_investigations.entity';
import { RecordVaccinationForm } from 'src/entities/dynamic/records_vaccination_form.entity';
import { RecordVitalForm } from 'src/entities/dynamic/records_vital_form.entity';
import { Sync } from 'src/entities/dynamic/sync.entity';
import { TeethData } from 'src/entities/dynamic/teeth_data.entity';
import { Template } from 'src/entities/dynamic/template.entity';
import { TemplateRx } from 'src/entities/dynamic/template_rx.entity';
import { User } from 'src/entities/dynamic/user.entity';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { AdrTable } from 'src/entities/static/adr_table.entity';
import { CcDiagnosis } from 'src/entities/static/cc_diag.entity';
import { CcTable } from 'src/entities/static/cc_table.entity';
import { ContraTable } from 'src/entities/static/contra_table.entity';
import { DataBackup } from 'src/entities/static/data_backup.entity';
import { DiagInv } from 'src/entities/static/diag_inv.entity';
import { DiagLifestyle } from 'src/entities/static/diag_lifestyle.entity';
import { DiagMed } from 'src/entities/static/diag_med.entity';
import { DiagTable } from 'src/entities/static/diag_table.entity';
import { DiagVital } from 'src/entities/static/diag_vital.entity';
import { MedicalHandouts } from 'src/entities/static/handouts.entity';
import { InvTable } from 'src/entities/static/inv_table.entity';
import { LifestyleTable } from 'src/entities/static/lifestyle_table.entity';
import { MedAdr } from 'src/entities/static/med_adr.entity';
import { MedContra } from 'src/entities/static/med_contra.entity';
import { MedTable } from 'src/entities/static/med_table.entity';
import { VitalTable } from 'src/entities/static/vital_table.entity';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export const dynamicDbConfig: TypeOrmModuleOptions = {
  name: 'dynamicDB', // Unique connection name
  type: 'postgres',
  host: process.env.DYNAMIC_DB_HOST || 'localhost',
  port: parseInt(process.env.DYNAMIC_DB_PORT, 10) || 5432,
  username: process.env.DYNAMIC_DB_USERNAME || 'parchaa',
  password: process.env.DYNAMIC_DB_PASSWORD || 'parchaa123',
  database: process.env.DYNAMIC_DB_NAME || 'mmu_dynamic',
  entities: [
    BroadCast,
    Chat,
    Patient,
    RecordANCAntenatalVisit,
    RecordAntenatalCare,
    RecordPregnancyOverview,
    RecordCareOfBaby,
    RecordCOBBabyCare,
    RecordPNCPostpartumCare,
    RecordPostNatalCare,
    RecordPrescription,
    RecordPrescriptionRx,
    RecordScreeningForm,
    RecordSFLabInvestigations,
    RecordVaccinationForm,
    RecordVitalForm,
    Template,
    TemplateRx,
    Visit,
    User,
    RecordANCOptionalInvestigation,
    Sync,
    DentalRecord,
    TeethData,
    RecordStep,
    Doctor,
  ], // dynamic DB entities
  synchronize: true, // False in production
};

export const staticDbConfig: TypeOrmModuleOptions = {
  name: 'staticDB', // Unique connection name
  type: 'postgres',
  host: process.env.STATIC_DB_HOST || 'localhost',
  port: parseInt(process.env.STATIC_DB_PORT, 10) || 5432,
  username: process.env.STATIC_DB_USERNAME || 'parchaa',
  password: process.env.STATIC_DB_PASSWORD || 'parchaa123',
  database: process.env.STATIC_DB_NAME || 'cdss_new',
  entities: [
    AdrTable,
    CcDiagnosis,
    CcTable,
    ContraTable,
    DiagInv,
    DiagLifestyle,
    DiagMed,
    DiagTable,
    DiagVital,
    MedicalHandouts,
    InvTable,
    LifestyleTable,
    MedAdr,
    MedContra,
    MedTable,
    VitalTable,
    DataBackup,
  ], // static DB entities
  synchronize: true, // False in production
  autoLoadEntities: true,
};

export const dynamicDatasourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DYNAMIC_DB_HOST || 'localhost',
  port: parseInt(process.env.DYNAMIC_DB_PORT, 10) || 5432,
  username: process.env.DYNAMIC_DB_USERNAME || 'parchaa',
  password: process.env.DYNAMIC_DB_PASSWORD || 'parchaa123',
  database: process.env.DYNAMIC_DB_NAME || 'mmu_dynamic',
  entities: [
    BroadCast,
    Chat,
    Patient,
    RecordANCAntenatalVisit,
    RecordAntenatalCare,
    RecordPregnancyOverview,
    RecordCareOfBaby,
    RecordCOBBabyCare,
    RecordPNCPostpartumCare,
    RecordPostNatalCare,
    RecordPrescription,
    RecordPrescriptionRx,
    RecordScreeningForm,
    RecordSFLabInvestigations,
    RecordVaccinationForm,
    RecordVitalForm,
    Template,
    TemplateRx,
    User,
    Visit,
    RecordANCOptionalInvestigation,
    Sync,
    DentalRecord,
    TeethData,
    RecordStep,
    Doctor,
  ], // dynamic DB entities
  synchronize: true,
};

export const staticDatasourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.STATIC_DB_HOST || 'localhost',
  port: parseInt(process.env.STATIC_DB_PORT, 10) || 5432,
  username: process.env.STATIC_DB_USERNAME || 'parchaa',
  password: process.env.STATIC_DB_PASSWORD || 'parchaa123',
  database: process.env.STATIC_DB_NAME || 'cdss_new',
  entities: [
    AdrTable,
    CcDiagnosis,
    CcTable,
    ContraTable,
    DiagInv,
    DiagLifestyle,
    DiagMed,
    DiagTable,
    DiagVital,
    MedicalHandouts,
    InvTable,
    LifestyleTable,
    MedAdr,
    MedContra,
    MedTable,
    VitalTable,
    DataBackup,
  ], // static DB entities
  synchronize: true,
};
