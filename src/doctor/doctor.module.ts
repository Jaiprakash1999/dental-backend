import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from 'src/entities/dynamic/doctor.entity';
import { DoctorTimeSlot } from 'src/entities/dynamic/doctor_time_slot.entity';
import { DoctorTimeSlotService } from 'src/doctor-time-slots/doctor_time_slot.service';
import { DoctorTimeSlotController } from 'src/doctor-time-slots/doctor_time_slot.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, DoctorTimeSlot], 'dynamicDB')],
  providers: [DoctorService, DoctorTimeSlotService],
  controllers: [DoctorController, DoctorTimeSlotController],
})
export class DoctorModule {}
