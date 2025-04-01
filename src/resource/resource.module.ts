import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CcTable } from '../entities/static/cc_table.entity';
import { DiagTable } from '../entities/static/diag_table.entity';
import { CcDiagnosis } from '../entities/static/cc_diag.entity';
import { InvTable } from '../entities/static/inv_table.entity';
import { DiagInv } from '../entities/static/diag_inv.entity';
import { MedTable } from '../entities/static/med_table.entity';
import { DiagMed } from '../entities/static/diag_med.entity';
import { VitalTable } from '../entities/static/vital_table.entity';
import { DiagVital } from '../entities/static/diag_vital.entity';
import { LifestyleTable } from '../entities/static/lifestyle_table.entity';
import { DiagLifestyle } from '../entities/static/diag_lifestyle.entity';
import { AdrTable } from '../entities/static/adr_table.entity';
import { ContraTable } from '../entities/static/contra_table.entity';
import { MedAdr } from '../entities/static/med_adr.entity';
import { MedContra } from '../entities/static/med_contra.entity';
import { MedicalHandouts } from 'src/entities/static/handouts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CcTable,
      DiagTable,
      CcDiagnosis,
      InvTable,
      DiagInv,
      MedTable,
      DiagMed,
      VitalTable,
      DiagVital,
      LifestyleTable,
      DiagLifestyle,
      AdrTable,
      ContraTable,
      MedAdr,
      MedContra,
      MedicalHandouts,
    ],'staticDB'),
  ],
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
