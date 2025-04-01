import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record_prescription')
export class RecordPrescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    array: true,
    nullable: true,
    name: 'chief_complaints',
  })
  chiefComplaint: string[];

  @Column({ name: 'follow_up', nullable: true })
  followUp: string;

  @Column('text', {
    array: true,
    nullable: true,
    name: 'lifestyle_recommendations',
  })
  lifeStyleRecommendations: string[];

  @Column('text', { array: true, nullable: true, name: 'instructions' })
  instructions: string[];

  @Column('text', { array: true, nullable: true, name: 'diagnosis' })
  diagnosis: string[];

  @Column('text', { array: true, nullable: true, name: 'lab_investigations' })
  labInvestigations: string[];

  @Column({ name: 'visit_id', nullable: false })
  visitId: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({ name: 'created_by', nullable: false })
  createdBy: number;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: true, name: 'signature', type: 'text' })
  signature: string;

  @Column({ nullable: true, name: 'stamp', type: 'text' })
  stamp: string;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
