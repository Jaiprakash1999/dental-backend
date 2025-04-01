import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { VisitTags } from 'src/utils/enums/visit_tags.enum';
import { ParseEnumArrayPipe } from 'src/utils/parse-enum-array.pipe';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';

@Controller('api/v1/mmu/analytics/')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('geo-analytics/kpis')
  getGeoAnalytics(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('mandal') mandal: string,
    @Query('gramPanchyat') gramPanchayat: string,
    @Query('habitat') habitat: string,
    @Query('state') state: string,
    @Query('tehsil') tehsil: string,
    @Query('district') district: string,
    @Query('pageNumber') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.analyticsService.getGeoAnalytics(
      startDate,
      endDate,
      mandal,
      gramPanchayat,
      habitat,
      state,
      tehsil,
      district,
      page,
      pageSize,
    );
  }

  @Get('main-dashboard')
  mainDashboard(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('mandal') mandal: string,
    @Query('gramPanchyat') gramPanchayat: string,
    @Query('habitat') habitat: string,
    @Query('state') state: string,
    @Query('tehsil') tehsil: string,
    @Query('district') district: string,
    @Query('tags', new ParseEnumArrayPipe(VisitTags)) tags: VisitTags[],
    @Query('mmuUnit') mmuUnit: MMUUnit,
  ) {
    return this.analyticsService.mainDashboard(
      mmuUnit,
      startDate,
      endDate,
      mandal,
      gramPanchayat,
      habitat,
      state,
      tehsil,
      district,
      tags,
    );
  }
}
