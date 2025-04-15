import { Module } from '@nestjs/common';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { PatientService } from 'src/patient/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/dynamic/user.entity';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { MandalService } from 'src/mandal/mandal.service';
import { DoctorTimeSlot } from 'src/entities/dynamic/doctor_time_slot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [User, Patient, Visit, DoctorTimeSlot],
      'dynamicDB',
    ),
  ],
  controllers: [VisitController],
  providers: [VisitService, PatientService, MandalService],
  exports: [VisitService],
})
export class VisitModule {}
