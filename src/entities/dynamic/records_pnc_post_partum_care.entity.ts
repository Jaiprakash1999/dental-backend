import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Breasts } from 'src/utils/enums/breasts.enum';
import { NIPPLES } from 'src/utils/enums/nipples.enum';
import { UTERUS_TENDERNESS } from 'src/utils/enums/uterusTenderness.enum';
import { BLEEDING_PV } from 'src/utils/enums/bleedingPv.enum';
import { LOCHIA } from 'src/utils/enums/lochia.enum';
import { EPISIOTOMY_TEAR } from 'src/utils/enums/episiotomyTear.enum';

@Entity('record_pnc_postpartum_care')
export class RecordPNCPostpartumCare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  order: number;

  @Column({ name: 'day', nullable: true })
  day: string;

  @Column({ nullable: true, name: 'date_of_postpartum_care', type: 'date' })
  date: Date;

  @Column({ nullable: true, name: 'any_complaints' })
  anyComplaints: string;

  @Column({ nullable: true, name: 'pallor' })
  pallor: string;

  @Column({ nullable: true, name: 'pulse_rate' })
  pulseRate: string;

  @Column({ nullable: true, name: 'blood_pressure' })
  bloodPressure: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'temperature',
  })
  temperature: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Breasts,
    name: 'breasts_condition',
  })
  breasts: Breasts;

  @Column({
    nullable: true,
    type: 'enum',
    enum: NIPPLES,
    name: 'nipples_condition',
  })
  nipples: NIPPLES;

  @Column({
    nullable: true,
    type: 'enum',
    enum: UTERUS_TENDERNESS,
    name: 'uterus_tenderness',
  })
  uterusTenderness: UTERUS_TENDERNESS;

  @Column({
    nullable: true,
    type: 'enum',
    enum: BLEEDING_PV,
    name: 'bleeding_pv',
  })
  bleedingPV: BLEEDING_PV;

  @Column({
    nullable: true,
    type: 'enum',
    enum: LOCHIA,
    name: 'lochia_condition',
  })
  lochia: LOCHIA;

  @Column({
    nullable: true,
    type: 'enum',
    enum: EPISIOTOMY_TEAR,
    name: 'episiotomy_tear_condition',
  })
  episiotomyTear: EPISIOTOMY_TEAR;

  @Column({ nullable: true, name: 'pedal_edema' })
  pedalEdema: boolean;

  @Column({ nullable: true, name: 'family_planning_counseling' })
  familyPlanningCounseling: string;

  @Column({ nullable: true, name: 'other_complications' })
  otherComplications: string;


  //Meta data
  @Column({ name: 'post_natal_care_id', nullable: false })
  postNatalCareId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'is_delete', nullable: false, default: false })
  isDelete: false;
}
