import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TemplateService } from './template.service';
import { TemplateCreate } from './dto/template_create.request';
import { TemplateResponse } from './dto/template.response';

@ApiTags('CustomTemplate')
@Controller('/api/v1/mmu/template')
export class TemplateController {
  constructor(private readonly service: TemplateService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new custom template' })
  @ApiResponse({
    status: 201,
    description: 'Custom template created successfully.',
    type: TemplateResponse,
  })
  create(
    @Headers('id') id: number,
    @Body() body: TemplateCreate,
  ): Promise<TemplateResponse> {
    return this.service.create(id, body);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all custom templates' })
  @ApiResponse({
    status: 200,
    description: 'List of custom templates retrieved successfully.',
    type: [TemplateResponse],
  })
  findAll(): Promise<TemplateResponse[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific custom template' })
  @ApiParam({ name: 'id', description: 'ID of the custom template' })
  @ApiResponse({
    status: 200,
    description: 'Custom template retrieved successfully.',
    type: TemplateResponse,
  })
  @ApiResponse({ status: 404, description: 'Custom template not found' })
  findOne(@Param('id') id: string): Promise<TemplateResponse> {
    return this.service.findOne(id);
  }
}
