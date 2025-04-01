import { Module } from '@nestjs/common';
import { MandalController } from './mandal.controller';
import { MandalService } from './mandal.service';
@Module({
  controllers: [MandalController],
  providers: [MandalService],
  exports: [MandalService],
})
export class MandalModule {}
