import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { VisitStatus } from '../../utils/enums/visit_status.enum';
import { MMUUnit } from '../../utils/enums/mmu_unit.enum';
import { VisitTags } from '../../utils/enums/visit_tags.enum';
import { VisitType } from '../../utils/enums/visit_type.enum';

@Entity('visit')
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'patient_id' })
  patientId: string;

  @Column({ nullable: true, name: 'doctor_id' })
  doctorId: string;

  @Column('text', { array: true, nullable: true, name: 'chief_complaint' })
  chiefComplaint: string[];

  @Column({ type: 'enum', enum: VisitType, name: 'visit_type' })
  visitType: VisitType;

  @Column({ type: 'date', name: 'visit_date' })
  visitDate: Date;

  @Column('text', { array: true, nullable: true })
  visitTime: string[];

  @Column({
    type: 'enum',
    enum: VisitTags,
    array: true,
    nullable: true,
  })
  tags: VisitTags[];

  @Column({ type: 'int', nullable: true, name: 'token_number' })
  tokenNumber: number;

  @Column({ type: 'enum', enum: MMUUnit, name: 'mmu_unit' })
  mmuUnit: MMUUnit;

  @Column({
    type: 'enum',
    enum: VisitStatus,
    default: VisitStatus.UPCOMING,
    name: 'visit_status',
  })
  visitStatus: VisitStatus;

  @Column({ type: 'double precision', nullable: false })
  latitude: number;

  @Column({ type: 'double precision', nullable: false })
  longitude: number;

  @Column({ nullable: false, name: 'mmu_head' })
  mmuHead: number;

  @Column({ nullable: true })
  line: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  pincode: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  tehsil: string;

  @Column({ name: 'prescription_id', nullable: true })
  prescriptionId: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: false, name: 'created_by' })
  createdBy: number;

  @Column({ nullable: true, name: 'updated_by' })
  updatedBy: number;

  @Column({ name: 'is_delete', nullable: false, default: false })
  isDelete: boolean;
}
