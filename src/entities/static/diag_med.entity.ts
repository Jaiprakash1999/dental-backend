import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiagTable } from './diag_table.entity';
import { MedTable } from './med_table.entity';

@Entity('diagnosis_medication')
export class DiagMed {
  @ManyToOne(() => DiagTable, (diag) => diag.diagMedTable)
  @JoinColumn({ name: 'diagnosis_name' })
  diagnosis_name: DiagTable;

  @ManyToOne(() => MedTable, (med) => med.diagMedTable)
  @JoinColumn({ name: 'medication_name' })
  medication_name: MedTable;

  @PrimaryGeneratedColumn()
  id: number;
}
