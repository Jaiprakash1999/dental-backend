import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PregnancyOverviewService } from './pregnancy_overview.service';
import { ApiOperation } from '@nestjs/swagger';
import { PregnancyOverviewCreate } from './dtos/request/pregnancy_overview_create.request';
import { PregnancyOverviewUpdate } from './dtos/request/pregnancy_overview_update.request';
import { PregnancyOverviewResponse } from './dtos/response/pregnancy_overview.response';

@Controller('/api/v1/mmu/records/pregnancy-overview')
export class PregnancyOverviewController {
  constructor(private readonly service: PregnancyOverviewService) {}

  @Post()
  @ApiOperation({ summary: 'Create Pregnancy Overview' })
  async createPregnancyOverview(
    @Headers('id') id: number,
    @Body() body: PregnancyOverviewCreate,
  ): Promise<PregnancyOverviewResponse> {
    return await this.service.createPregnancyOverview(id, body);
  }

  @Put(':formId')
  @ApiOperation({ summary: 'Update Pregnancy overview form' })
  async updatePregnancyOverview(
    @Headers('id') id: number,
    @Param('formId') formId: string,
    @Body() body: PregnancyOverviewUpdate,
  ): Promise<PregnancyOverviewResponse> {
    return await this.service.updatePregnancyOverview(id, formId, body);
  }

  @Get(':formId')
  @ApiOperation({ summary: 'Get Pregnancy overview form' })
  async getPregnancyOverview(
    @Param('formId') formId: string,
  ): Promise<PregnancyOverviewResponse> {
    return await this.service.getPregnancyOverviewById(formId);
  }
}
