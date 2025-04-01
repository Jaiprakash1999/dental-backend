import { Module } from '@nestjs/common';
import { DataBackupService } from './data-backup.service';
import { DataBackupController } from './data-backup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBackup } from 'src/entities/static/data_backup.entity';
import { Sync } from 'src/entities/dynamic/sync.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataBackup, Sync], 'staticDB')],
  controllers: [DataBackupController],
  providers: [DataBackupService],
})
export class DataBackupModule {}
