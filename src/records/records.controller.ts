import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecordsService } from './records.service';
import { FormName } from 'src/utils/enums/formName.enum';

@Controller('/api/v1/mmu/records')
@ApiTags('records') // Tag for Swagger
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Get('/:patientId')
  async getRecords(
    @Param('patientId') patientId: string,
    @Query('vaccinationPage') vaccinationPageNumber: number,
    @Query('vaccinationPageSize') vaccinationPageSize: number,
    @Query('screeningPage') screeningPageNumber: number,
    @Query('screeningPageSize') screeningPageSize: number,
    @Query('vitalPage') vitalPageNumber: number,
    @Query('vitalPageSize') vitalPageSize: number,
    @Query('prescriptionPage') prescriptionPageNumber: number,
    @Query('prescriptionPageSize') prescriptionPageSize: number,
    @Query('pregnancyOverviewPage') pregnancyOverviewPageNumber: number,
    @Query('pregnancyOverviewPageSize') pregnancyOverviewPageSize: number,
    @Query('antenatalCarePage') antenatalCarePageNumber: number,
    @Query('antenatalCarePageSize') antenatalCarePageSize: number,
    @Query('careOfBabyPage') careOfBabyPageNumber: number,
    @Query('careOfBabyPageNumber') careOfBabyPageSize: number,
    @Query('postNatalCarePage') postNatalCarePageNumber: number,
    @Query('postNatalCarePageSize') postNatalCarePageSize: number,
    @Query('dentalPage') dentalPageNumber: number,
    @Query('dentalPageSize') dentalPageSize: number,
  ) {
    return await this.recordsService.getPatientRecords(
      patientId,
      vaccinationPageNumber,
      vaccinationPageSize,
      screeningPageNumber,
      screeningPageSize,
      vitalPageNumber,
      vitalPageSize,
      prescriptionPageNumber,
      prescriptionPageSize,
      pregnancyOverviewPageNumber,
      pregnancyOverviewPageSize,
      antenatalCarePageNumber,
      antenatalCarePageSize,
      careOfBabyPageNumber,
      careOfBabyPageSize,
      postNatalCarePageNumber,
      postNatalCarePageSize,
      dentalPageNumber,
      dentalPageSize,
    );
  }

  @Get('/:formName/:formId')
  async getRecord(
    @Param('formName') formName: FormName,
    @Param('formId') formId: string,
  ) {
    return await this.recordsService.getRecord(formId, formName);
  }
}
