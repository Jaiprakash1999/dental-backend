import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedTable } from './med_table.entity';
import { AdrTable } from './adr_table.entity';

@Entity('medication_adr')
export class MedAdr {
  @ManyToOne(() => AdrTable, (adr) => adr.medAdrTable)
  @JoinColumn({ name: 'adr_name' })
  adr_name: AdrTable;

  @ManyToOne(() => MedTable, (med) => med.medAdrTable)
  @JoinColumn({ name: 'medication_name' })
  medication_name: MedTable;

  @Column()
  score: number;

  @PrimaryGeneratedColumn()
  id: number;
}
