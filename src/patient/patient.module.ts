import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/entities/dynamic/patient.entity';
import { User } from 'src/entities/dynamic/user.entity';
import { Visit } from 'src/entities/dynamic/visit.entity';
import { MandalService } from 'src/mandal/mandal.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, User, Visit], 'dynamicDB')],
  controllers: [PatientController],
  providers: [PatientService, MandalService],
  exports: [PatientService],
})
export class PatientModule {}
