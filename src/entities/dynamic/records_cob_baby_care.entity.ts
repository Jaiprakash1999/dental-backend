import { ABDOMEN_CONDITION } from 'src/utils/enums/abdomenCondition.enum';
import { CRY_CONDITION } from 'src/utils/enums/cryCondition.enum';
import { FEEDING_CONDITION } from 'src/utils/enums/feedingCondition.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// Baby Care Entity representing baby care records
@Entity('record_cob_baby_care')
export class RecordCOBBabyCare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'care_of_baby_id', nullable: false })
  careOfBabyId: string;

  @Column({ nullable: false })
  order: number;

  @Column({ name: 'day', nullable: true })
  day: string;

  @Column({ nullable: true, name: 'examination_date', type: 'date' })
  date: Date;

  //General Examination
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'baby_weight_in_kg',
  })
  weightInKg: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
    name: 'temperature_in_celsius',
  })
  temperatureInCelsius: number;

  @Column({ nullable: true, name: 'urine_output' })
  urineOutput: string;

  @Column({ nullable: true, name: 'stool_pattern' })
  stoolPattern: string;

  @Column({ nullable: true, name: 'eyes_condition', array: true, type: 'text' })
  eyesCondition: string[];

  @Column({ nullable: true, name: 'skin_condition' })
  skinCondition: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
    name: 'skin_fold_condition',
  })
  skinFoldCondition: string[];

  @Column({ nullable: true, name: 'yellow_eyes' })
  yellowEyes: boolean;

  @Column({ nullable: true, name: 'yellow_skin' })
  yellowSkin: boolean;

  @Column({ nullable: true, name: 'umbilical_cord_bleed' })
  umbilicalCordBleed: boolean;

  @Column({ nullable: true, name: 'clean_thread_used' })
  cleanThreadUsed: boolean;

  //Sepsis Markers
  @Column({
    nullable: true,
    name: 'feeding_condition',
    type: 'enum',
    enum: FEEDING_CONDITION,
  })
  feedingCondition: FEEDING_CONDITION;

  @Column({
    nullable: true,
    name: 'cry_condition',
    type: 'enum',
    enum: CRY_CONDITION,
  })
  cryCondition: CRY_CONDITION;

  @Column({
    nullable: true,
    name: 'abdomen_condition',
    type: 'enum',
    enum: ABDOMEN_CONDITION,
  })
  abdomenCondition: ABDOMEN_CONDITION;

  @Column({ nullable: true, name: 'cold_to_touch' })
  coldToTouch: boolean;

  @Column({ nullable: true, name: 'chest_indrawn' })
  chestIndrawn: boolean;

  @Column({ nullable: true, name: 'pus_on_umbilicus' })
  pusOnUmbilicus: boolean;

  @Column({ nullable: true, name: 'respiratory_rate' })
  respiratoryRate: boolean;

  //Meta details
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
