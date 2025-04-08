import {
  Global,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  dynamicDatasourceConfig,
  dynamicDbConfig,
  staticDbConfig,
} from 'typeorm.config';
import { CcTable } from './entities/static/cc_table.entity';
import { DiagTable } from './entities/static/diag_table.entity';
import { CcDiagnosis } from './entities/static/cc_diag.entity';
import { InvTable } from './entities/static/inv_table.entity';
import { DiagInv } from './entities/static/diag_inv.entity';
import { MedTable } from './entities/static/med_table.entity';
import { DiagMed } from './entities/static/diag_med.entity';
import { VitalTable } from './entities/static/vital_table.entity';
import { DiagVital } from './entities/static/diag_vital.entity';
import { LifestyleTable } from './entities/static/lifestyle_table.entity';
import { DiagLifestyle } from './entities/static/diag_lifestyle.entity';
import { AdrTable } from './entities/static/adr_table.entity';
import { ContraTable } from './entities/static/contra_table.entity';
import { MedAdr } from './entities/static/med_adr.entity';
import { MedContra } from './entities/static/med_contra.entity';
import { ResourceModule } from './resource/resource.module';
import { MedicalHandouts } from './entities/static/handouts.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/dynamic/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { RoleGuard } from './utils/role_guard.util';
import { PatientModule } from './patient/patient.module';
import { Patient } from './entities/dynamic/patient.entity';
import { RecordsModule } from './records/records.module';
import { TemplateModule } from './template/template.module';
import { WebsocketGateway } from './web-socket/web-socket.gateway';
import { ChatModule } from './chat/chat.module';
import { BroadCast } from './entities/dynamic/broadcast.entity';
import { Chat } from './entities/dynamic/chat.entity';
import { MandalModule } from './mandal/mandal.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DataBackupModule } from './data-backup/data-backup.module';
import { RecordPrescription } from './entities/dynamic/records_prescription.entity';
import { RecordPrescriptionRx } from './entities/dynamic/records_prescription_rx.entity';
import { RecordScreeningForm } from './entities/dynamic/records_screening_form.entity';
import { RecordSFLabInvestigations } from './entities/dynamic/records_sf_lab_investigations.entity';
import { RecordVaccinationForm } from './entities/dynamic/records_vaccination_form.entity';
import { RecordVitalForm } from './entities/dynamic/records_vital_form.entity';
import { DataSource } from 'typeorm';
import { AuthMiddleware } from './utils/middleware/auth.middleware';
import { TemplateRx } from './entities/dynamic/template_rx.entity';
import { Template } from './entities/dynamic/template.entity';
import { Visit } from './entities/dynamic/visit.entity';
import { VisitModule } from './visit/visit.module';
import { DataBackup } from './entities/static/data_backup.entity';
import { RecordANCOptionalInvestigation } from './entities/dynamic/records_anc_optional_investigations.entity';
import { Sync } from './entities/dynamic/sync.entity';
import { AppController } from './utils/app.controller';
import { DentalRecord } from './entities/dynamic/dental_record.entity';
import { TeethData } from './entities/dynamic/teeth_data.entity';
import { RecordStep } from './entities/dynamic/record_step.entity';
import { Doctor } from './entities/dynamic/doctor.entity';
import { DoctorModule } from './doctor/doctor.module';

@Global()
@Module({
  imports: [
    ResourceModule,
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot(dynamicDbConfig),
    TypeOrmModule.forRoot(staticDbConfig),
    JwtModule.register({
      secret: 'mmuJwtSecret', // Ensure this matches your token generation secret
      signOptions: { expiresIn: '10h' }, // Adjust expiration as required
    }),
    TypeOrmModule.forFeature(
      [
        BroadCast,
        Chat,
        Patient,
        RecordPrescription,
        RecordPrescriptionRx,
        RecordScreeningForm,
        RecordSFLabInvestigations,
        RecordVaccinationForm,
        RecordVitalForm,
        TemplateRx,
        Template,
        User,
        Visit,
        Sync,
        RecordANCOptionalInvestigation,
        DentalRecord,
        TeethData,
        RecordStep,
        Doctor,
      ],
      'dynamicDB',
    ),
    TypeOrmModule.forFeature(
      [
        AdrTable,
        CcDiagnosis,
        CcTable,
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
        ContraTable,
        DataBackup,
      ],
      'staticDB',
    ),
    AuthModule,
    DataBackupModule,
    ChatModule,
    AnalyticsModule,
    TemplateModule,
    MandalModule,
    ResourceModule,
    RecordsModule,
    AuthModule,
    PatientModule,
    VisitModule,
    DoctorModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard, // Apply globally
    },
    {
      provide: 'DYNAMIC_DB_DATASOURCE',
      useFactory: async () => {
        const dataSource = new DataSource(dynamicDatasourceConfig);
        return dataSource.initialize();
      },
    },
    {
      provide: 'STATIC_DB_DATASOURCE',
      useFactory: async () => {
        const dataSource = new DataSource(dynamicDatasourceConfig);
        return dataSource.initialize();
      },
    },
    WebsocketGateway,
  ],
  controllers: [AppController],
  exports: [JwtModule, 'DYNAMIC_DB_DATASOURCE'],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'api/v1/mmu/auth/login', method: RequestMethod.POST })
      .exclude({
        path: 'api/health',
        method: RequestMethod.GET,
      })
      .exclude({
        path: '/',
        method: RequestMethod.GET,
      })
      .exclude({
        path: '/api/v1/mmu/mandal/*path',
        method: RequestMethod.GET,
      })
      .forRoutes('');
  }
}
