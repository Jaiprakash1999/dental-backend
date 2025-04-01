import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CcDiagnosis } from './cc_diag.entity';
import { DiagInv } from './diag_inv.entity';
import { DiagMed } from './diag_med.entity';
import { DiagVital } from './diag_vital.entity';
import { DiagLifestyle } from './diag_lifestyle.entity';

@Entity({ name: 'diagnosis' }) // Use the exact table name
export class DiagTable {
  @Column({ name: 'snomed_ct', type: 'text' })
  snomed_ct: string;

  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => CcDiagnosis, (ccDiag) => ccDiag.diagnosis_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  ccDiagTable: CcDiagnosis[];

  @OneToMany(() => DiagInv, (diagInv) => diagInv.diagnosis_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  diagInvTable: DiagInv[];

  @OneToMany(() => DiagMed, (diagMed) => diagMed.diagnosis_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  diagMedTable: DiagMed[];

  @OneToMany(() => DiagVital, (diagVital) => diagVital.diagnosis_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  diagVitalTable: DiagVital[];

  @OneToMany(
    () => DiagLifestyle,
    (diagLifestyle) => diagLifestyle.diagnosis_name,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  diagLifestyleTable: DiagLifestyle[];
}
