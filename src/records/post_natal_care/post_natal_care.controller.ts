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
import { PostNatalCareService } from './post_natal_care.service';
import { PostNatalCareCreate } from './dtos/request/post_natal_care_create.request';
import { PostNatalCareResponse } from './dtos/response/post_natal_care.response';
import { PostNatalCareUpdate } from './dtos/request/post_natal_care_update.request';

@Controller('/api/v1/mmu/records/post-natal-care')
export class PostNatalCareController {
  constructor(private readonly service: PostNatalCareService) {}

  @Post()
  @ApiOperation({ summary: 'Create Post Natal Care' })
  async createPostnatalCare(
    @Headers('id') id: number,
    @Body() body: PostNatalCareCreate,
  ): Promise<PostNatalCareResponse> {
    return await this.service.createPostNatalCare(id, body);
  }

  @Put(':formId')
  @ApiOperation({ summary: 'Update Post Natal Care' })
  async updatePostNatalCare(
    @Headers('id') id: number,
    @Param('formId') formId: string,
    @Body() body: PostNatalCareUpdate,
  ): Promise<PostNatalCareResponse> {
    return await this.service.updatePostNatalCare(id, formId, body);
  }

  @Get(':formId')
  @ApiOperation({ summary: 'Get Post Natal Care' })
  async getPregnancyOverview(
    @Param('formId') formId: string,
  ): Promise<PostNatalCareResponse> {
    return await this.service.getPostNatalCareById(formId);
  }
}
