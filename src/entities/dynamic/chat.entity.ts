import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string; // Unique identifier for the chat message

  @Column({ name: 'sender_id' })
  senderId: number; // ID of the user sending the message

  @Column({ name: 'receiver_id' })
  receiverId: number; // ID of the user receiving the message

  @Column('text')
  message: string; // The chat message content

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
