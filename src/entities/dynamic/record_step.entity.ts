// record-step.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TeethData } from './teeth_data.entity';

@Entity('record_steps')
export class RecordStep {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  stepName: string;

  @Column({ nullable: true })
  preStepInstructions: string;

  @Column({ nullable: true })
  postStepCarePlan: string;

  @ManyToOne(() => TeethData, (teethData) => teethData.recordSteps)
  teethData: TeethData;
}
