import { UserType } from 'src/utils/enums/UserType.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('broadCast')
export class BroadCast {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique identifier for the chat message

  @Column({ name: 'sender_id' })
  senderId: number; // ID of the user sending the message

  @Column({
    type: 'enum',
    enum: UserType,
    nullable: true,
    name: 'receiver_type',
  })
  receiverType: UserType; // ID of the user receiving the message

  @Column('text')
  subject: string;

  @Column('text')
  message: string; // The chat message content

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
