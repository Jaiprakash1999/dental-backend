import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { HOW_FEED } from 'src/utils/enums/howFeed.enum';

@Entity('record_care_of_baby')
export class RecordCareOfBaby {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({
    name: 'first_examination_date_time',
    nullable: true,
    type: 'timestamp',
  })
  firstExaminationDateTime: Date;

  @Column({ name: 'first_feed_after_birth', nullable: true })
  firstFeedAfterBirth: string;

  @Column({ name: 'first_breastfeed_time', nullable: true, type: 'timestamp' })
  firstBreastfeedTime: Date;

  @Column({ name: 'how_feed', type: 'enum', enum: HOW_FEED, nullable: true })
  howFeed: HOW_FEED;

  @Column({ name: 'weak_suck_reason', nullable: true })
  weakSuckReason: string;

  @Column({ name: 'dry_baby', nullable: true })
  dryBaby: boolean;

  @Column({ name: 'kept_warm', nullable: true })
  keptWarm: boolean;

  @Column({ name: 'dont_bath', nullable: true })
  dontBath: boolean;

  @Column({ name: 'wrapped_close_to_mother', nullable: true })
  wrappedCloseToMother: boolean;

  @Column({ name: 'exclusively_breastfed', nullable: true })
  exclusivelyBreastfed: boolean;

  @Column({ name: 'cord_care', nullable: true })
  cordCare: boolean;

  @Column({ name: 'unusual_findings', nullable: true })
  unusualFindings: string;

  @Column({ nullable: true, name: 'referred_to_higher_centre' })
  referredToHigherCentre: boolean;

  @Column({ nullable: true, name: 'referral_reason' })
  referralReason: string;

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
