import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  PrimaryColumn,
} from 'typeorm';
import { Gender } from '../../utils/enums/gender.enum';
import { BloodGroup } from '../../utils/enums/blood_group.enum';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';
import { customAlphabet } from 'nanoid';

@Entity('patient')
export class Patient {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'soundex_value', nullable: true })
  soundexValue: string;

  @Column({ name: 'father_soundex_value', nullable: true })
  fatherSoundexValue: string;

  @Column({ name: 'father_name', nullable: false })
  fatherName: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @Column({ name: 'date_of_birth', nullable: true })
  dateOfBirth: number;

  @Column({ name: 'month_of_birth', nullable: true })
  monthOfBirth: number;

  @Column({ name: 'year_of_birth', nullable: false })
  yearOfBirth: number;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({
    name: 'patient_tag',
    type: 'enum',
    enum: PatientTag,
    nullable: false,
  })
  patientTag: PatientTag;

  @Column({
    name: 'blood_group',
    type: 'enum',
    enum: BloodGroup,
    nullable: true,
  })
  bloodGroup: BloodGroup;

  @Column({ name: 'thumbnail', type: 'text', nullable: true })
  thumbnail: string;

  @Column({ name: 'photo', type: 'text', nullable: true })
  photo: string;

  @Column({ name: 'habitat', nullable: false })
  habitat: number;

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, name: 'created_by' })
  createdBy: number;

  @Column({ nullable: true, name: 'updated_by' })
  updatedBy: number;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
