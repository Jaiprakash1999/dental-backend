import { FETAL_MOVEMENTS } from 'src/utils/enums/fetal_movements.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record_anc_antenatal_visit')
export class RecordANCAntenatalVisit {
  //Primary key details
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  order: number;

  //Antenatal Visit
  @Column({ nullable: true })
  day: string;

  @Column({ name: 'date_of_visit', nullable: true, type: 'date' })
  date: Date; // Date of the visit

  @Column({ name: 'visit_complaints', nullable: true })
  complaints: string;

  @Column({ name: 'period_of_gestation_weeks', nullable: true })
  pogWeeks: number;

  @Column({ name: 'weight_in_kg', nullable: true, type: 'decimal' })
  weightInKg: number;

  @Column({ name: 'pulse_rate_in_bpm', nullable: true })
  pulseRateInBpm: number;

  @Column({ name: 'blood_pressure', nullable: true })
  bloodPressure: string;

  @Column({ name: 'pallor', nullable: true })
  pallor: string; // Pallor observation

  @Column({ name: 'oedema', nullable: true })
  oedema?: string; // Oedema observation

  @Column({ name: 'jaundice_observation', nullable: true })
  jaundice?: string; // Jaundice observation

  // Abdominal Examination
  @Column({ name: 'fundal_height', nullable: true })
  fundalHeight: string;

  @Column({ name: 'lie_presentation', nullable: true })
  liePresentation?: string;

  @Column({
    name: 'fetal_movements',
    type: 'enum',
    enum: FETAL_MOVEMENTS,
    nullable: true,
  })
  fetalMovements?: FETAL_MOVEMENTS;

  @Column({ name: 'fetal_heart_rate_per_min', nullable: true })
  fetalHeartRatePerMin?: number;

  @Column({ name: 'pv_if_done', nullable: true })
  pvIfDone?: string;

  // Essential Investigations
  @Column({ name: 'haemoglobin', nullable: true })
  haemoglobin?: string;

  @Column({ name: 'hiv_screening', nullable: true })
  hivScreening?: string;

  @Column({ name: 'vdrl', nullable: true })
  vdrl?: string;

  @Column({ name: 'hbs_ag', nullable: true })
  hbsAg?: string;

  @Column({ name: 'blood_sugar', nullable: true })
  bloodSugar?: string;

  @Column({ name: 'urine_albumin', nullable: true })
  urineAlbumin?: string;

  @Column({ name: 'urine_sugar', nullable: true })
  urineSugar?: string;

  @Column({ name: 'ultra_sonography', nullable: true })
  ultraSonography?: string;

  //Meta Details
  @Column({ name: 'antenatal_care_id', nullable: false })
  antenatalCareId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
