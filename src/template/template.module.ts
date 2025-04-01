import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/entities/dynamic/template.entity';
import { TemplateRx } from 'src/entities/dynamic/template_rx.entity';
import { User } from 'src/entities/dynamic/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Template, TemplateRx, User], 'dynamicDB'),
  ],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
