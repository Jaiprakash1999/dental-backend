import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('template_rx')
export class TemplateRx {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, name: 'drug_name' })
  drugName: string;

  @Column({ nullable: true, name: 'dose' })
  dose: string;

  @Column({ nullable: true, name: 'measurement' })
  measurement: string;

  @Column({ nullable: true, name: 'timing' })
  timing: string;

  @Column({ nullable: true, name: 'duration' })
  duration: string;

  @Column({ nullable: true, name: 'frequency' })
  frequency: string;

  @Column({ nullable: true, name: 'notes' })
  notes: string;

  @Column({ nullable: false, name: 'template_id' })
  templateId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: false, default: false, name: 'is_delete' })
  isDelete: boolean;
}
