import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { DiagInv } from './diag_inv.entity';

@Entity({ name: 'investigation' }) // Use the exact table name
export class InvTable {
  @Column({ name: 'snomed_ct', type: 'text' })
  snomed_ct: string;

  @Column({ name: 'type', type: 'text', nullable: true })
  type: string;

  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => DiagInv, (diagInv) => diagInv.investigation_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  diagInvTable: DiagInv[];
}
