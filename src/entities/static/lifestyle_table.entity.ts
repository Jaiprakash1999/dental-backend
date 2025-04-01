import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { DiagLifestyle } from './diag_lifestyle.entity';

@Entity({ name: 'lifestyle_recommendation' }) // Use the exact table name
export class LifestyleTable {
  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(
    () => DiagLifestyle,
    (diagLifestyle) => diagLifestyle.lifestyle_name,
    { cascade: true, onUpdate: 'CASCADE' },
  )
  diagLifestyleTable: DiagLifestyle[];
}
