import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('upload_records')
export class UploadRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'patient_id', nullable: false })
  patientId: string;

  @Column()
  documentName: string;

  @Column({ type: 'bytea' })
  document: Buffer;

  @Column()
  documentType: string;

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
