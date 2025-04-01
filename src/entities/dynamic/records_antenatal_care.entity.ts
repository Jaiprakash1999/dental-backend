import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record_antenatal_care')
export class RecordAntenatalCare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({ nullable: true, name: 'past_surgical_history' })
  pastSurgicalHistory: string;

  @Column({ nullable: true, name: 'past_medical_history' })
  pastMedicalHistory: string;

  @Column({ nullable: true, name: 'treatment_history' })
  treatmentHistory: string;

  //Obstetric Complications
  @Column({ nullable: false, default: false, name: 'aph' })
  apH?: boolean;

  @Column({ nullable: false, default: false, name: 'eclampsia' })
  eclampsia?: boolean;

  @Column({ nullable: false, default: false, name: 'pih' })
  piH?: boolean;

  @Column({ nullable: false, default: false, name: 'anaemia' })
  anaemia?: boolean;

  @Column({ nullable: false, default: false, name: 'obstructed_labor' })
  obstructedLabor?: boolean;

  @Column({ nullable: false, default: false, name: 'pph' })
  pPH?: boolean;

  @Column({ nullable: false, default: false, name: 'lscs' })
  lSCS?: boolean;

  @Column({ nullable: false, default: false, name: 'congenital_anomaly' })
  congenitalAnomaly?: boolean;

  @Column({ nullable: false, default: false, name: 'other_complications' })
  otherComplications?: boolean;

  // Past History
  @Column({ name: 'tuberculosis', nullable: false, default: false })
  tuberculosis?: boolean;

  @Column({ name: 'hypertension', nullable: false, default: false })
  hypertension?: boolean;

  @Column({ name: 'heart_disease', nullable: false, default: false })
  heartDisease?: boolean;

  @Column({ name: 'diabetes', nullable: false, default: false })
  diabetes?: boolean;

  @Column({ name: 'asthma', nullable: false, default: false })
  asthma?: boolean;

  @Column({ name: 'other_past_history', nullable: false, default: false })
  otherMedicalHistory?: boolean;

  @Column({ nullable: true, name: 'gplad' })
  gplad: string;

  @Column({ name: 'previous_delivery', nullable: true })
  previousDelivery: string;

  @Column('text', {
    array: true,
    nullable: true,
    name: 'previous_children',
  })
  previousChildren: string[];

  // Examination
  @Column({ name: 'heart', nullable: true })
  heart?: string;

  @Column({ name: 'lungs', nullable: true })
  lungs?: string;

  @Column({ name: 'breasts', nullable: true })
  breasts?: string;

  @Column({ nullable: true, name: 'thyroid' })
  thyroid: string;

  @Column({ nullable: true, name: 'spine' })
  spine: string;

  @Column({ nullable: true, name: 'gait' })
  gait: string;

  //Tests
  @Column({ name: 'urine_pregnancy_test', nullable: true })
  urinePregnancyTest?: string;

  @Column({ name: 'urine_pregnancy_test_date', nullable: true, type: 'date' })
  urinePregnancyTestDate: Date;

  @Column({ name: 'blood_group_rh_typing', nullable: true })
  bloodGroupRhTyping?: string;

  @Column({ name: 'blood_group_rh_typing_date', nullable: true, type: 'date' })
  bloodGroupRhTypingDate: Date;

  @Column({ nullable: true, name: 'notes' })
  notes: string;

  //Meta Details
  @Column({ name: 'created_by', nullable: false })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false })
  isDelete: boolean;
}
