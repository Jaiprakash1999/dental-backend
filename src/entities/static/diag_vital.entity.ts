import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiagTable } from './diag_table.entity';
import { VitalTable } from './vital_table.entity';

@Entity('diagnosis_vital_sign')
export class DiagVital {
  @ManyToOne(() => DiagTable, (diag) => diag.diagMedTable)
  @JoinColumn({ name: 'diagnosis_name' })
  diagnosis_name: DiagTable;

  @ManyToOne(() => VitalTable, (vital) => vital.diagVitalTable)
  @JoinColumn({ name: 'vital_sign_name' })
  vital_name: VitalTable;

  @PrimaryGeneratedColumn()
  id: number;
}
