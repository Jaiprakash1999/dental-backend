import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('data_sync')
export class DataBackup {
  @Column({ name: 'broad_cast', nullable: false, default: false })
  broadCast: boolean;

  @Column({ name: 'chat', nullable: false, default: false })
  chat: boolean;

  @Column({ name: 'patient', nullable: false, default: false })
  patient: boolean;

  @Column({ name: 'antenatal_visit', nullable: false, default: false })
  antenatalVisit: boolean;

  @Column({ name: 'optional_investigation', nullable: false, default: false })
  optionalInvestigation: boolean;

  @Column({ name: 'antenatal_care', nullable: false, default: false })
  antenatalCare: boolean;

  @Column({ name: 'pregnancy_overview', nullable: false, default: false })
  pregnancyOverview: boolean;

  @Column({ name: 'care_of_baby', nullable: false, default: false })
  careOfBaby: boolean;

  @Column({ name: 'baby_care', nullable: false, default: false })
  babyCare: boolean;

  @Column({ name: 'postpartum_care', nullable: false, default: false })
  postpartumCare: boolean;

  @Column({ name: 'postnatal_care', nullable: false, default: false })
  postnatalCare: boolean;

  @Column({ name: 'prescription_rx', nullable: false, default: false })
  prescriptionRx: boolean;

  @Column({ name: 'prescription', nullable: false, default: false })
  prescription: boolean;

  @Column({ name: 'screening_form', nullable: false, default: false })
  screeningForm: boolean;

  @Column({ name: 'lab_investigations', nullable: false, default: false })
  labInvestigations: boolean;

  @Column({ name: 'vaccination_form', nullable: false, default: false })
  vaccinationForm: boolean;

  @Column({ name: 'vital_form', nullable: false, default: false })
  vitalForm: boolean;

  @Column({ name: 'template_rx', nullable: false, default: false })
  templateRx: boolean;

  @Column({ name: 'template', nullable: false, default: false })
  template: boolean;

  @Column({ name: 'user', nullable: false, default: false })
  user: boolean;

  @Column({ name: 'visit', nullable: false, default: false })
  visit: boolean;

  @Column({ name: 'created_by', nullable: false })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @PrimaryColumn({ name: 'date', unique: true })
  date: string;

  @Column({ nullable: false, default: false })
  isDelete: boolean;
}
