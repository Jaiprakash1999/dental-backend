import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity()
export class DoctorTimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: Date; // Example: '09:00 AM'

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: false })
  date: Date; // Format: 'YYYY-MM-DD'

  @ManyToOne(() => Doctor, (doctor) => doctor.timeSlots, {
    onDelete: 'CASCADE',
  })
  doctor: Doctor;
}
