import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from 'src/utils/enums/gender.enum';
import { NotEquals } from 'class-validator';

@Entity('record_post_natal_care')
export class RecordPostNatalCare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({ name: 'delivery_date', nullable: true, type: 'date' })
  deliveryDate: Date;

  @Column({ name: 'delivery_details', nullable: true })
  deliveryDetails: string;

  @Column({ name: 'delivery_place', nullable: true })
  deliveryPlace: string;

  @Column({ name: 'pregnancy_outcome', nullable: true })
  pregnancyOutcome: string;

  @Column({ name: 'delivery_type', nullable: true })
  deliveryType: string;

  @Column({ name: 'baby_sex', nullable: true, type: 'enum', enum: Gender })
  @NotEquals(Gender.OTHER)
  babySex: Gender;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
    name: 'baby_weight_in_kg',
  })
  babyWeightInKg?: number;

  @Column({
    name: 'hemoglobin_in_percent',
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  hemoglobinInPercent: number;

  @Column({ name: 'cried_immediately_after_birth', nullable: true })
  criedImmediatelyAfterBirth: boolean;

  @Column({ name: 'initiated_breastfeeding', nullable: true })
  initiatedBreastfeeding: boolean;

  @Column({ name: 'vitamin_k_injection', nullable: true })
  vitaminKInjection: boolean;

  @Column('text', { array: true, nullable: true, name: 'family_planning_counselling' })
  familyPlanningCounselling: string[];

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
