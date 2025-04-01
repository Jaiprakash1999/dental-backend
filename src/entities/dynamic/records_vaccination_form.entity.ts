import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('record_vaccination_form')
export class RecordVaccinationForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({ name: 'date_of_birth', nullable: false, type: 'date' })
  dateOfBirth: Date;

  //Birth
  @Column({ name: 'bcg', nullable: false, default: false })
  bcg: boolean;

  @Column({ name: 'opv_zero', nullable: false, default: false })
  opv0: boolean;

  @Column({ name: 'hepatitis_b', nullable: false, default: false })
  hepatitisB: boolean;

  //After 6 weeks
  @Column({ name: 'opv_one', nullable: false, default: false })
  opv1: boolean;

  @Column({ name: 'pentavalent_one', nullable: false, default: false })
  pentavalent1: boolean;

  @Column({ name: 'rvv_one', nullable: false, default: false })
  rvv1: boolean;

  @Column({ name: 'fipv_one', nullable: false, default: false })
  fipv1: boolean;

  @Column({ name: 'pcv_one', nullable: false, default: false })
  pcv1: boolean;

  //After 10 weeks
  @Column({ name: 'opv_two', nullable: false, default: false })
  opv2: boolean;

  @Column({ name: 'pentavalent_two', nullable: false, default: false })
  pentavalent2: boolean;

  @Column({ name: 'rvv_two', nullable: false, default: false })
  rvv2: boolean;

  //After 14 weeks
  @Column({ name: 'opv_three', nullable: false, default: false })
  opv3: boolean;

  @Column({ name: 'pentavalent_three', nullable: false, default: false })
  pentavalent3: boolean;

  @Column({ name: 'fipv_two', nullable: false, default: false })
  fipv2: boolean;

  @Column({ name: 'rvv_three', nullable: false, default: false })
  rvv3: boolean;

  @Column({ name: 'pcv_two', nullable: false, default: false })
  pcv2: boolean;

  //After 9-12 months
  @Column({ name: 'mr_one', nullable: false, default: false })
  mr1: boolean;

  @Column({ name: 'je_one', nullable: false, default: false })
  je1: boolean;

  @Column({ name: 'pcv_booster', nullable: false, default: false })
  pcvBooster: boolean;

  //After 16-24 months
  @Column({ name: 'mr_two', nullable: false, default: false })
  mr2: boolean;

  @Column({ name: 'je_two', nullable: false, default: false })
  je2: boolean;

  @Column({ name: 'diphtheria', nullable: false, default: false })
  diphtheria: boolean;

  @Column({ name: 'dpt_booster_one', nullable: false, default: false })
  dptBooster1: boolean;

  @Column({ name: 'opv_booster', nullable: false, default: false })
  opvBooster: boolean;

  //After 5-6 years
  @Column({ name: 'dpt_booster_two', nullable: false, default: false })
  dptBooster2: boolean;

  @Column({ nullable: true, name: 'notes' })
  notes: string;

  @Column({ name: 'created_by', nullable: false })
  createdBy: number;

  @Column({ name: 'last_updated_by', nullable: true })
  lastUpdatedBy: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}



