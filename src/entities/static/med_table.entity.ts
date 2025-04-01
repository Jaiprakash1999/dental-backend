import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { DiagMed } from './diag_med.entity';
import { MedAdr } from './med_adr.entity';
import { MedContra } from './med_contra.entity';

@Entity({ name: 'medication' }) // Use the exact table name
export class MedTable {
  @Column({ name: 'snomed_ct', type: 'text' })
  snomed_ct: string;

  @Column({ name: 'category', type: 'text', nullable: true })
  category: string;

  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => DiagMed, (diagMed) => diagMed.medication_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  diagMedTable: DiagMed[];

  @OneToMany(() => MedAdr, (medAdr) => medAdr.medication_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  medAdrTable: MedAdr[];

  @OneToMany(() => MedContra, (medContra) => medContra.medication_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  medContraTable: MedContra[];
}
