import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CcDiagnosis } from './cc_diag.entity';

@Entity({ name: 'chief_complaint' }) // Use the exact table name
export class CcTable {
  @Column({ name: 'snomed_ct', type: 'text' })
  snomed_ct: string;

  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => CcDiagnosis, (ccDiag) => ccDiag.cc_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  ccDiagTable: CcDiagnosis[];
}
