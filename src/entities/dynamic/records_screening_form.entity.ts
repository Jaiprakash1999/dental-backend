import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record_screening_form')
export class RecordScreeningForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'diagnosis', nullable: false })
  diagnosis: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;

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
