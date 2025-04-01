import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record_prescription_rx')
export class RecordPrescriptionRx {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'drug_name', nullable: false })
  drugName: string;

  @Column({ name: 'dose', nullable: true })
  dose: string;

  @Column({ name: 'measurement', nullable: true })
  measurement: string;

  @Column({ name: 'timing', nullable: true })
  timing: string;

  @Column({ name: 'duration', nullable: true })
  duration: string;

  @Column({ name: 'frequency', nullable: true })
  frequency: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  @Column({ name: 'prescription_id', nullable: false })
  prescriptionId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false })
  isDelete: boolean;
}
