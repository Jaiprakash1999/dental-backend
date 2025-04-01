import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedTable } from './med_table.entity';
import { ContraTable } from './contra_table.entity';

@Entity('medication_contraindication')
export class MedContra {
  @ManyToOne(() => ContraTable, (adr) => adr.medContraTable)
  @JoinColumn({ name: 'contraindication_name' })
  contraindication_name: ContraTable;

  @ManyToOne(() => MedTable, (med) => med.medContraTable)
  @JoinColumn({ name: 'medication_name' })
  medication_name: MedTable;

  @Column()
  score: number;

  @PrimaryGeneratedColumn()
  id: number;
}
