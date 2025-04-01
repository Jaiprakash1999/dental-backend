import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { VaccinationFormService } from './vaccination_form.service';
import { ApiOperation } from '@nestjs/swagger';
import { VaccinationFormCreate } from './dtos/request/vaccination_form_create.request';
import { VaccinationFormResponse } from './dtos/response/vaccination_form.response';
import { VaccinationFormUpdate } from './dtos/request/vaccination_form_update.request';

@Controller('/api/v1/mmu/records/vaccination-form')
export class VaccinationFormController {
  constructor(private readonly service: VaccinationFormService) {}

  @Post()
  @ApiOperation({ summary: 'Create Vaccination form' })
  async createVaccinationForm(
    @Headers('id') id: number,
    @Body() body: VaccinationFormCreate,
  ): Promise<VaccinationFormResponse> {
    return await this.service.createVaccinationForm(id, body);
  }

  @Put(':formId')
  @ApiOperation({ summary: 'Update Vaccination form' })
  async updateVaccinationForm(
    @Headers('id') id: number,
    @Param('formId') formId: string,
    @Body() body: VaccinationFormUpdate,
  ): Promise<VaccinationFormResponse> {
    return await this.service.updateVaccinationForm(id, formId, body);
  }

  @Get(':formId')
  @ApiOperation({ summary: 'Get Vaccination Form' })
  async getVaccinationFormById(
    @Param('formId') formId: string,
  ): Promise<VaccinationFormResponse> {
    return await this.service.getVaccinationFormById(formId);
  }
}
