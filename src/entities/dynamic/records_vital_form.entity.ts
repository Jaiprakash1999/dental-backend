import { LungsOptions } from 'src/utils/enums/lungs_condition.enum';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('record_vital_form')
export class RecordVitalForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'weight_in_kg',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  }) // Store weight with 2 decimal places
  weightInKg: number;

  @Column({
    name: 'height_in_cm',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  heightInCm: number;

  @Column({
    name: 'hemoglobin_in_percent',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  hemoglobinInPercent: number;

  @Column({ name: 'heart_rate_in_bpm', nullable: true })
  heart: string;

  @Column({
    name: 'lungs_condition',
    nullable: true,
  })
  lungs: string;

  @Column({ name: 'blood_pressure', nullable: true })
  bloodPressure: string;

  @Column({
    name: 'spo2_in_percent',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  spo2InPercent: number;

  @Column({
    name: 'respiratory_rate_in_bpm',
    nullable: true,
  })
  respiratoryRateInBpm: number;

  @Column({ name: 'pulse_rate_in_bpm', nullable: true })
  pulseRateInBpm: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'temperature_in_celsius',
    nullable: true,
  })
  tempInCelsius: number;

  @Column({
    name: 'visit_id',
    nullable: false,
  })
  visitId: string;

  @Column({
    name: 'notes',
    nullable: true,
  })
  notes: string;

  @Column({
    name: 'patient_id',
    nullable: false,
  })
  patientId: string;

  @Column({
    name: 'created_by',
    nullable: false,
  })
  createdBy: number;

  @Column({
    name: 'updated_by',
    nullable: true,
  })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  lastUpdatedAt: Date;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
