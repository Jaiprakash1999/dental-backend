import {
  Controller,
  Post,
  Param,
  Res,
  Headers,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { DataBackupService } from './data-backup.service';
import { Response } from 'express';
import { TableNames } from 'src/utils/enums/table_names.enum';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';

@Controller('api/v1/mmu/data-backup')
export class DataBackupController {
  constructor(private readonly dataBackupService: DataBackupService) {}

  // 🔹 Backup a single table (by passing table name in URL)
  @Post(':mmuUnit/:tableName')
  async backupSingleTable(
    @Param('tableName') tableName: TableNames,
    @Param('mmuUnit') mmuUnit: MMUUnit,
    @Res() res: Response,
  ) {
    try {
      const fileBuffer =
        await this.dataBackupService.exportAndUploadSingleTable(
          mmuUnit,
          tableName,
        );

      res.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="sample.csv"',
        'Content-Length': fileBuffer.length,
      });

      // Send buffer as response
      res.send(fileBuffer);
    } catch (error) {
      return {
        success: false,
        message: `Failed to back up ${tableName}`,
        error: error.message,
      };
    }
  }

  @Post(':mmuUnit')
  async backupAllTables(
    @Headers('id') id: number,
    @Param('mmuUnit') mmuUnit: MMUUnit,
  ) {
    if (!id || typeof id !== 'number') {
      throw new BadRequestException('Invalid or missing "id" in headers');
    }

    if (!mmuUnit || !Object.values(MMUUnit).includes(mmuUnit)) {
      throw new BadRequestException(
        `Invalid or missing "mmuUnit" parameter. Allowed values are: ${Object.values(MMUUnit).join(', ')}`,
      );
    }

    return await this.dataBackupService.backupAllTables(id, mmuUnit);
  }

  @Get()
  async getDataBackupDetails() {
    return await this.dataBackupService.getBackupDetails();
  }

  @Get('mmu')
  async getMmuBackupStatus() {
    return await this.dataBackupService.checkIfDataUploadedForMMUUnits();
  }

  @Post('sync/all/mmu')
  async syncMMUData(@Res() res: Response) {
    try {
      const htmlContent = await this.dataBackupService.syncAllMMUTables();
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Failed to synchronize MMU data',
        error: error.message,
      });
    }
  }
}
