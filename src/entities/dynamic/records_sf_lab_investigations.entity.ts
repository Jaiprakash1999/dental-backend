import { LabResult } from 'src/utils/enums/lab_investigation_result.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record_sf_lab_investigations')
export class RecordSFLabInvestigations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'lab_investigation', nullable: false })
  labInvestigation: string;

  @Column({ name: 'result', type: 'enum', enum: LabResult, nullable: true })
  result: LabResult;

  @Column({ name: 'note', nullable: true })
  note: string;

  @Column({ name: 'screening_form_id', nullable: false })
  screeningFormId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
