import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScreeningFormService } from './screening_form.service';
import { ScreeningFormCreate } from './dtos/request/screening_from_create.request';
import { SFLabInvestigationCreate } from './dtos/request/sf_lab_investigation_create.request';
import { ScreeningFormResponse } from './dtos/response/screening_form.response';
import { ScreeningFormUpdate } from './dtos/request/screening_form_update.request';

@Controller('/api/v1/mmu/records/screening-form')
@ApiTags('Screening Forms') // Tag for Swagger
export class ScreeningFormController {
  constructor(private readonly service: ScreeningFormService) {}

  @Post()
  @ApiOperation({
    summary: 'Initiate a new screening form',
  })
  async createScreeningForm(
    @Headers('id') id: number,
    @Body() body: ScreeningFormCreate,
  ): Promise<ScreeningFormResponse> {
    return this.service.createScreeningForm(id, body);
  }

  @Post('/add-lab-investigation/:screeningFormId')
  @ApiOperation({
    summary: 'Add lab investigation to the screening form',
  })
  async addLabInvestigation(
    @Headers('id') id: number,
    @Param('screeningFormId') screeningFormId: string,
    @Body() body: SFLabInvestigationCreate,
  ): Promise<ScreeningFormResponse> {
    return await this.service.addSfLabInvestigations(id, screeningFormId, body);
  }

  @Delete('/delete-lab-investigation/:labInvestigationId')
  @ApiOperation({ summary: 'Delete lab Investigation' })
  async deleteLabInvestigation(
    @Headers('id') id: number,
    @Param('labInvestigationId') labInvestigationId: string,
  ) {
    return await this.service.deleteSfLabInvestigation(id, labInvestigationId);
  }

  @Get(':screeningFormId')
  @ApiOperation({
    summary: 'Get the screening form by id',
  })
  async getScreeningFormById(
    @Param('screeningFormId') screeningFormId: string,
  ): Promise<ScreeningFormResponse> {
    return await this.service.getScreeningFormById(screeningFormId);
  }

  @Put('/update/:screeningFormId')
  @ApiOperation({
    summary: 'update a screening form',
  })
  async updateScreeningForm(
    @Headers('id') id: number,
    @Param('screeningFormId') screeningFormId: string,
    @Body() body: ScreeningFormUpdate,
  ): Promise<ScreeningFormResponse> {
    return await this.service.updateScreeningForm(id, screeningFormId, body);
  }
}
