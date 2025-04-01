import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Template } from '../entities/dynamic/template.entity';
import { TemplateCreate } from './dto/template_create.request';
import { User } from '../entities/dynamic/user.entity';
import { TemplateResponse } from './dto/template.response';
import { rxEntityMapper, templateEntityMapper } from './mappers/request.mapper';
import { mapToTemplateResponse } from './mappers/response.mapper';
import { mapToPrescriptionRxEntity } from 'src/records/prescription/mappers/request.mapper';
import { TemplateRx } from 'src/entities/dynamic/template_rx.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template, 'dynamicDB')
    private readonly templateRepository: Repository<Template>,
    @InjectRepository(TemplateRx, 'dynamicDB')
    private readonly templateRxRepository: Repository<TemplateRx>,
    @Inject('DYNAMIC_DB_DATASOURCE')
    private readonly dataSource: DataSource,
  ) {}

  async create(id: number, body: TemplateCreate): Promise<TemplateResponse> {
    // Create and save the custom template
    return this.dataSource.transaction(async (manager) => {
      const template = templateEntityMapper(id, body);
      const savedTemplate = await manager.save(Template, template);
      const savedRxs = await Promise.all(
        body.rxList.map(async (rx) => {
          const tempRx = rxEntityMapper(savedTemplate.id, rx);
          return manager.save(TemplateRx, tempRx);
        }),
      );
      return mapToTemplateResponse(savedTemplate, savedRxs);
    });
  }

  async findAll(): Promise<TemplateResponse[]> {
    const templates = await this.templateRepository.find({
      where: { isDelete: false },
    });

    return await Promise.all(
      templates.map(async (template) => {
        const rxs = await this.templateRxRepository.find({
          where: { isDelete: false, templateId: template.id },
        });
        return mapToTemplateResponse(template, rxs);
      }),
    );
  }

  async findOne(id: string): Promise<TemplateResponse> {
    const template = await this.verifyTemplate(id);
    const rxs = await this.templateRxRepository.find({
      where: { isDelete: false, templateId: id },
    });
    return mapToTemplateResponse(template, rxs);
  }

  async verifyTemplate(id: string): Promise<Template> {
    const template = await this.templateRepository.findOne({
      where: { id, isDelete: false },
    });
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    return template;
  }
}
