import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
  Put,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DentalFormService } from './dental_form.service';

@ApiTags('Dental Form')
@Controller('/api/v1/mmu/records/dental-form')
export class DentalFormController {
  constructor(private readonly service: DentalFormService) {}

  @Post()
  @ApiOperation({ summary: 'Create Dental Form' })
  async createDentalRecord(
    @Headers('id') id: number,
    @Body() body: any,
  ): Promise<any> {
    return await this.service.saveDentalForm(id, body);
  }

  @Get(':dentalFormId')
  @ApiOperation({ summary: 'Get Dental Form by ID' })
  async getDentalFormById(@Param('id') dentalFormId: string) {
    const data = await this.service.getDentalFormById(dentalFormId);
    return {
      message: 'Dental form fetched successfully',
      data,
    };
  }

  @Put(':formId')
  @ApiOperation({ summary: 'Update Dental Form' })
  async updateDentalForm(
    @Headers('id') id: number,
    @Param('formId') formId: string,
    @Body() body: any, // Replace `any` with a proper DTO like `UpdateDentalFormDto` if available
  ): Promise<any> {
    return await this.service.updateDentalFormById(formId, id, body);
  }
}
