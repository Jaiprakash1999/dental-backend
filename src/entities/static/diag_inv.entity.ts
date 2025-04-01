import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DiagTable } from './diag_table.entity';
import { InvTable } from './inv_table.entity';

@Entity('diagnosis_investigation')
export class DiagInv {
  @ManyToOne(() => DiagTable, (diag) => diag.diagInvTable)
  @JoinColumn({ name: 'diagnosis_name' })
  diagnosis_name: DiagTable;

  @ManyToOne(() => InvTable, (inv) => inv.diagInvTable)
  @JoinColumn({ name: 'investigation_name' })
  investigation_name: InvTable;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  score: number;
}
