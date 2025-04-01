import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { DiagVital } from './diag_vital.entity';

@Entity({ name: 'vital_sign' }) // Use the exact table name
export class VitalTable {
  @Column({ name: 'snomed_ct', type: 'text' })
  snomed_ct: string;

  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => DiagVital, (diagVital) => diagVital.vital_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  diagVitalTable: DiagVital[];
}
