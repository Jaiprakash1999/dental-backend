import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CareOfBabyService } from './care_of_baby.service';
import { CareOfBabyCreate } from './dtos/request/care_of_baby_create.request';
import { CareOfBabyResponse } from './dtos/response/care_of_baby.response';
import { CareOfBabyUpdate } from './dtos/request/care_of_baby_update.request';

@Controller('/api/v1/mmu/records/care-of-baby')
export class CareOfBabyController {
  constructor(private readonly service: CareOfBabyService) {}

  @Post()
  @ApiOperation({ summary: 'Create Care Of baby' })
  async createCareOfBaby(
    @Headers('id') id: number,
    @Body() body: CareOfBabyCreate,
  ): Promise<CareOfBabyResponse> {
    return await this.service.createCareOfBaby(id, body);
  }

  @Put(':formId')
  @ApiOperation({ summary: 'Update Care of baby' })
  async updateCareOfBaby(
    @Headers('id') id: number,
    @Param('formId') formId: string,
    @Body() body: CareOfBabyUpdate,
  ): Promise<CareOfBabyResponse> {
    return await this.service.updateCareOfBaby(id, formId, body);
  }

  @Get(':formId')
  @ApiOperation({ summary: 'Get Care of Baby' })
  async getCareOfBaby(
    @Param('formId') formId: string,
  ): Promise<CareOfBabyResponse> {
    return await this.service.getCareOfBabyById(formId);
  }
}
