import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CcTable } from './cc_table.entity';
import { DiagTable } from './diag_table.entity';
@Entity('chief_complaint_diagnosis')
export class CcDiagnosis {
  @ManyToOne(() => CcTable, (cc) => cc.ccDiagTable)
  @JoinColumn({ name: 'cc_name' })
  cc_name: CcTable;

  @ManyToOne(() => DiagTable, (diagnosis) => diagnosis.ccDiagTable)
  @JoinColumn([{ name: 'diagnosis_name' }])
  diagnosis_name: DiagTable;

  @PrimaryGeneratedColumn()
  id: number;
}
