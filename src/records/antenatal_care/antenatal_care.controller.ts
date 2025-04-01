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
import { AntenatalCareService } from './antenatal_care.service';
import { AntenatalCareCreate } from './dtos/request/antenatal_care_create.request';
import { AntenatalCareResponse } from './dtos/response/antenatal_care.response';
import { AntenatalCareUpdate } from './dtos/request/antenatal_care_update.request';

@Controller('/api/v1/mmu/records/antenatal-care')
export class AntenatalCareController {
  constructor(private readonly service: AntenatalCareService) {}

  @Post()
  @ApiOperation({ summary: 'Create Care Of baby' })
  async createAntenatalCare(
    @Headers('id') id: number,
    @Body() body: AntenatalCareCreate,
  ): Promise<AntenatalCareResponse> {
    return await this.service.createAntenatalCare(id, body);
  }

  @Put(':formId')
  @ApiOperation({ summary: 'Update Care of baby' })
  async updateAntenatalCare(
    @Headers('id') id: number,
    @Param('formId') formId: string,
    @Body() body: AntenatalCareUpdate,
  ): Promise<AntenatalCareResponse> {
    return await this.service.updateAntenatalCare(id, formId, body);
  }
}
