// teeth-data.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { DentalRecord } from './dental_record.entity';
import { RecordStep } from './record_step.entity';

@Entity('teeth_data')
export class TeethData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  treatmentProcedure: string;

  @Column('simple-array', { nullable: true })
  teethsInvolved: string[];

  @Column('simple-array', { nullable: true })
  document: string[];

  @OneToMany(() => RecordStep, (step) => step.teethData, {
    cascade: true,
    eager: true,
  })
  recordSteps: RecordStep[];

  @ManyToOne(() => DentalRecord, (record) => record.teethData)
  dentalRecord: DentalRecord;
}
