import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorTimeSlot } from './doctor_time_slot.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctorId: string;

  @Column()
  doctorName: string;

  @OneToMany(() => DoctorTimeSlot, (slot) => slot.doctor)
  timeSlots: DoctorTimeSlot[];
}
