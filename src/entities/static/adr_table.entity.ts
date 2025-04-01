import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { MedAdr } from './med_adr.entity';

@Entity({ name: 'adr' }) // Use the exact table name
export class AdrTable {
  @Column({ name: 'snomed_ct', type: 'text' })
  snomed_ct: string;

  @PrimaryColumn({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => MedAdr, (medAdr) => medAdr.adr_name, {
    cascade: true,
    onUpdate: 'CASCADE',
  })
  medAdrTable: MedAdr[];
}
