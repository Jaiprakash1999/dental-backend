// dental-record.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeethData } from './teeth_data.entity';

@Entity('dental_records')
export class DentalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({ nullable: true })
  diagnosis: string;

  @Column({ nullable: true })
  typeOfTeeth: string;

  @OneToMany(() => TeethData, (teethData) => teethData.dentalRecord, {
    cascade: true,
    eager: true,
  })
  teethData: TeethData[];

  @Column({ name: 'created_by', nullable: false })
  createdBy: number;

  @Column({ name: 'last_updated_by', nullable: true })
  lastUpdatedBy: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_delete', nullable: false, default: false })
  isDelete: boolean;
}
