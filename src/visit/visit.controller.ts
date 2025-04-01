import {
  Controller,
  Get,
  Post,
  Put,
  Query,
  Param,
  Body,
  Headers,
  ParseArrayPipe,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { VisitCreate } from './dtos/request/visit_create.request';
import { VisitStatus } from 'src/utils/enums/visit_status.enum';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
import { VisitTags } from 'src/utils/enums/visit_tags.enum';
import { VisitStatusUpdate } from './dtos/request/visit_status_update';
import { Roles } from 'src/utils/decorator/role_decorator.util';
import { UserType } from 'src/utils/enums/UserType.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { ParseEnumArrayPipe } from 'src/utils/parse-enum-array.pipe';
import { VisitService } from './visit.service';
import { Request } from 'express';

@ApiTags('Visit')
@Controller('api/v1/mmu/visit')
export class VisitController {
  constructor(private readonly service: VisitService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new visit token' })
  @Roles('MMUHEAD', 'MMUSTAFF', 'ADMIN')
  async createVisit(
    @Headers('id') id: number,
    @Body() body: VisitCreate,
    @Req() req: Request,
  ) {
    let headId: number = +req.headers.headId;
    if (
      req.headers.role == UserType.MMUHEAD ||
      req.headers.role == UserType.ADMIN
    ) {
      headId = id;
    }
    return this.service.createVisit(id, headId, body);
  }

  @Get('/states')
  @ApiOperation({ summary: 'Get all states' })
  async getStates() {
    return this.service.getStates();
  }

  @Get('/tehsils')
  @ApiOperation({ summary: 'Get all tehsils' })
  async getTehsils() {
    return this.service.getTehsil();
  }

  @Get('/districts')
  @ApiOperation({ summary: 'Get all districts' })
  async getDistricts() {
    return this.service.getDistrict();
  }

  @Get()
  @ApiOperation({ summary: 'Get a specific visit token by ID' })
  async getVisitById(@Query('id') id: string) {
    return this.service.getVisitById(id);
  }

  @Get('/search')
  @ApiOperation({ summary: 'Search visit tokens based on filters' })
  async searchTokens(
    @Query('visitDate') visitDate: string,
    @Query('mmuUnit') mmuUnit: MMUUnit,
    @Query('visitStatus', new ParseEnumArrayPipe(VisitStatus))
    visitStatus: VisitStatus[],
    @Query('tags', new ParseEnumArrayPipe(VisitTags)) tags: VisitTags[],
    @Query('mmuHead') mmuHead: number,
    @Query('creatorId') creatorId: number,
    @Query('patientId') patientId: string,
    @Query('gender', new ParseEnumArrayPipe(Gender)) gender: Gender[],
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('query') query: string,
  ) {
    return this.service.searchTokens(
      page ? (page < 0 ? 0 : page) : 0,
      pageSize ? (pageSize < 0 ? null : pageSize) : 10,
      visitDate,
      mmuUnit,
      visitStatus,
      tags,
      mmuHead,
      creatorId,
      patientId,
      gender,
      query,
    );
  }

  @Put('/editStatus/:id')
  @ApiOperation({ summary: 'Update the status of a visit token' })
  async editVisitStatus(
    @Param('id') id: string,
    @Body() body: VisitStatusUpdate,
  ) {
    return this.service.updateVisitStatus(id, body.visitStatus);
  }
}
