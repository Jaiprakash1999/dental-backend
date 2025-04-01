import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('medical-handouts')
export class MedicalHandouts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'citext',
  })
  tag: string;

  @Column({ type: 'citext' })
  title: string;

  @Column()
  language: string;

  @Column()
  short_description: string;

  @Column()
  document_key: string;

  @Column({ default: 'diagnosis' })
  type: string;
}
