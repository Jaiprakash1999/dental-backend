import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { MedContra } from './med_contra.entity';

@Entity({ name: 'contraindication' }) // Use the exact table name
export class ContraTable {
  @Column({ name: 'snomed_ct', type: 'text' })
  snomed_ct: string;

  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => MedContra, (medContra) => medContra.contraindication_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  medContraTable: MedContra[];
}
