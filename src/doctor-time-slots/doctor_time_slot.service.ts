// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Doctor } from 'src/entities/dynamic/doctor.entity';
// import { DoctorTimeSlot } from 'src/entities/dynamic/doctor_time_slot.entity';
// import { Repository } from 'typeorm';

// @Injectable()
// export class DoctorTimeSlotService {
//   constructor(
//     @InjectRepository(DoctorTimeSlot, 'dynamicDB')
//     private timeSlotRepo: Repository<DoctorTimeSlot>,

//     @InjectRepository(Doctor, 'dynamicDB')
//     private doctorRepo: Repository<Doctor>,
//   ) {}

//   async createSlots(
//     doctorId: string,
//     date: string,
//     slots: { time: string; isAvailable: boolean }[],
//   ) {
//     const doctor = await this.doctorRepo.findOneBy({ doctorId });
//     if (!doctor) throw new Error('Doctor not found');

//     // // Optional: remove old slots for the date
//     // await this.timeSlotRepo.delete({ doctor: { id: doctor.id }, date });

//     const slotEntities = slots.map((slot) =>
//       this.timeSlotRepo.create({ ...slot, date, doctor }),
//     );
//     return this.timeSlotRepo.save(slotEntities);
//   }

//   async getSlots(doctorId: string, date: string) {
//     const doctor = await this.doctorRepo.findOne({
//       where: {
//         doctorId: doctorId,
//       },
//       relations: ['timeSlots'],
//     });

//     if (!doctor) throw new Error('Doctor not found');

//     return doctor.timeSlots
//       // .filter((slot) => slot.date.toISOString().split('T')[0] === date)
//       // .sort((a, b) => a.time.localeCompare(b.time));
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from 'src/entities/dynamic/doctor.entity';
import { DoctorTimeSlot } from 'src/entities/dynamic/doctor_time_slot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorTimeSlotService {
  constructor(
    @InjectRepository(DoctorTimeSlot, 'dynamicDB')
    private timeSlotRepo: Repository<DoctorTimeSlot>,

    @InjectRepository(Doctor, 'dynamicDB')
    private doctorRepo: Repository<Doctor>,
  ) {}

  generateTimeSlots(): { time: string; isAvailable: boolean }[] {
    const startHour = 9;
    const endHour = 17;
    const interval = 15;
    const slots: { time: string; isAvailable: boolean }[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        const time = `${formattedHour}:${formattedMinute}`;
        slots.push({ time, isAvailable: true });
      }
    }

    return slots;
  }
  generateTimeSlots1(date: Date): { time: Date; isAvailable: boolean }[] {
    const slots: { time: Date; isAvailable: boolean }[] = [];
    const start = new Date(date);
    start.setHours(9, 0, 0, 0);

    const end = new Date(date);
    end.setHours(17, 0, 0, 0);

    while (start < end) {
      slots.push({
        time: new Date(start), // clone
        isAvailable: true,
      });
      start.setMinutes(start.getMinutes() + 15);
    }

    return slots;
  }

  async createSlots(
    doctorId: string,
    date: Date,
    slots?: { time: string; isAvailable: boolean }[],
  ) {
    const doctor = await this.doctorRepo.findOneBy({ doctorId });
    if (!doctor) throw new Error('Doctor not found');

    // Strip time from Date object to compare only the date part
    const dateOnly = new Date(date.toISOString().split('T')[0]);

    await this.timeSlotRepo.delete({
      doctor: { id: doctor.id },
      date: dateOnly,
    });

    const finalSlots =
      slots && slots.length ? slots : this.generateTimeSlots1(date);

    const slotEntities = finalSlots.map((slot) =>
      this.timeSlotRepo.create({ ...slot, date: dateOnly, doctor }),
    );
    const flattenEntities = slotEntities.flat();
    return this.timeSlotRepo.save(flattenEntities);
  }

  async getSlots(doctorId: string, date: Date) {
    const doctor = await this.doctorRepo.findOne({
      where: { doctorId },
      relations: ['timeSlots'],
    });

    if (!doctor) throw new Error('Doctor not found');

    const targetDate = date.toISOString().split('T')[0];

    return doctor.timeSlots.filter(
      (slot) => slot.date.toISOString().split('T')[0] === targetDate,
    );
  }
}
