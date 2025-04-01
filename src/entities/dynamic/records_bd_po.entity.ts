import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { PregnancyOutcome } from 'src/utils/enums/pregnancy_outcome.enum';
import { Gender } from 'src/utils/enums/gender.enum';

@Entity('record_pregnancy_overview')
export class RecordPregnancyOverview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({ name: 'tubectomy_date', type: 'date', nullable: true })
  tubectomyDate: Date;

  @Column({ name: 'is_tubectomy_completed', type: 'boolean', nullable: true })
  isTubectomyCompleted: boolean;

  @Column('text', {
    array: true,
    nullable: true,
    name: 'is_pregnancy_risk_high',
  })
  isPregnancyRiskHigh: string[];

  @Column({ name: 'pregnancy_outcome_note', type: 'varchar', nullable: true })
  pregnancyOutcomeNote: string;

  //Family Identification
  @Column({ name: 'mother_name', type: 'varchar', nullable: true })
  motherName: string;

  @Column({ name: 'mother_age', type: 'int', nullable: true })
  motherAge: number;

  @Column({ name: 'mother_mobile_number', type: 'varchar', nullable: true })
  motherMobileNumber: string;

  @Column({ name: 'father_name', type: 'varchar', nullable: true })
  fatherName: string;

  @Column({ name: 'father_age', type: 'int', nullable: true })
  fatherAge: number;

  @Column({ name: 'father_mobile_number', type: 'varchar', nullable: true })
  fatherMobileNumber: string;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  address: string;

  @Column({ name: 'mother_id', type: 'varchar', nullable: true })
  motherId: string;

  @Column({ name: 'bank_name', type: 'varchar', nullable: true })
  bankName: string; // Bank name for account details

  @Column({ name: 'account_number', type: 'varchar', nullable: true })
  accountNumber: string; // Bank account number

  @Column({ name: 'ifsc_code', type: 'varchar', nullable: true })
  ifscCode: string; // IFSC code of the bank

  //Pregnancy Period
  @Column({ name: 'date_last_menstrual_period', type: 'date', nullable: true })
  dolmp?: Date;

  @Column({ name: 'expected_date_of_delivery', type: 'date', nullable: true })
  edd?: Date;

  @Column({ name: 'current_delivery_at', nullable: true })
  currentDeliveryAt?: string; // Current delivery details

  @Column({ name: 'last_delivery_at', nullable: true })
  lastDeliveryAt?: string; // Last delivery location

  // Birth Record
  @Column({ nullable: true, name: 'child_name' })
  childName?: string; // Child's name

  @Column({ type: 'date', nullable: true, name: 'date_of_birth' })
  dateOfBirth?: Date; // Date of birth

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    name: 'birth_weight_in_kg',
  })
  birthWeightInKg?: number; // Birth weight in kilograms

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender?: Gender; // Gender of the child

  @Column({ nullable: true, name: 'birth_registration_number' })
  birthRegistrationNumber?: string; // Birth registration number

  @Column({ nullable: true, name: 'child_id_number' })
  childIdNumber?: string; // Child ID number

  //Institutional Identification
  @Column({ name: 'anm_name', nullable: true })
  anmName: string; // ANM name

  @Column({ name: 'anm_contact', nullable: true })
  anmContact: string; // ANM contact number

  @Column({ name: 'chw_name', nullable: true })
  chwName: string; // CHW name

  @Column({ name: 'chw_contact', nullable: true })
  chwContact: string; // CHW contact number

  @Column({ name: 'phc_name', nullable: true })
  phcName: string; // PHC name

  @Column({ name: 'hospital_name', nullable: true })
  phcHospitalName: string; // Hospital name

  @Column({ name: 'referral_to', nullable: true })
  referralTo: string; // Referral to which institution

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

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
