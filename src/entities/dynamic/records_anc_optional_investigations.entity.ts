import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record_anc_optional_investigation')
export class RecordANCOptionalInvestigation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'date_of_visit', nullable: true, type: 'date' })
  date: Date; // Date of the visit

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: true, name: 'title' })
  title: string;

  @Column({ nullable: true, name: 'value' })
  value: string;
  
  @Column({ nullable: true, name: 'antenatal_care_id' })
  antenatalCareId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
