import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DiagTable } from './diag_table.entity';
import { LifestyleTable } from './lifestyle_table.entity';

@Entity('diagnosis_lifestyle_recommendation')
export class DiagLifestyle {
  @ManyToOne(() => DiagTable, (diag) => diag.diagLifestyleTable)
  @JoinColumn({ name: 'diagnosis_name' })
  diagnosis_name: DiagTable;

  @ManyToOne(() => LifestyleTable, (lifestyle) => lifestyle.diagLifestyleTable)
  @JoinColumn({ name: 'lifestyle_name' })
  lifestyle_name: LifestyleTable;

  @PrimaryGeneratedColumn()
  id: number;
}
