import { UserType } from '../../utils/enums/UserType.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string; // Store hashed password here

  @Column({ type: 'enum', enum: UserType, nullable: false, name: 'user_type' })
  userType: UserType;

  @Column({ nullable: true, name: 'head_id' })
  headId: number | null;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true, name: 'mobile_number' })
  mobileNumber: string | null;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  age: number;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @Column({ type: 'text', nullable: true })
  signature: string;

  @Column({ type: 'text', nullable: true })
  stamp: string;

  @Column({ nullable: true,name:'registration_no' })
  registrationNo: string;

  // Timestamps for user creation and updates
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'isDelete', nullable: false, default: false })
  isDelete: boolean;
}
