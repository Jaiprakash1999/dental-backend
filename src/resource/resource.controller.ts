import { Controller, Get, Query, Res } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { Response } from 'express';

@Controller('/api/v1/mmu/cortex')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('/allDiagnosis')
  async getAllDiagnosis() {
    return await this.resourceService.getAllDiagnosis();
  }

  @Get('/allMedications')
  async getAllMedications() {
    return await this.resourceService.getAllMedications();
  }

  @Get('/allSymptoms')
  async getAllSymptoms() {
    return await this.resourceService.getAllSymptoms();
  }

  @Get('/allHandouts')
  async getAllHandouts() {
    return await this.resourceService.getAllHandouts();
  }

  @Get('/allLifestyle')
  async getAllLifestyles() {
    return await this.resourceService.getAllLifestyles();
  }

  @Get('/allInvestigations')
  async getAllInvestigations() {
    return await this.resourceService.getAllInvestigations();
  }

  @Get('/diagnosis/search')
  searchDiagnosis(
    @Query('query') query: string,
    @Query('symptom') symptom: string,
  ) {
    return this.resourceService.searchDiagnosis(query, symptom);
  }

  @Get('/investigations/search')
  searchInvestigations(
    @Query('query') query: string,
    @Query('diagnosis') diagnosis: string,
  ) {
    return this.resourceService.searchInvestigations(query, diagnosis);
  }

  @Get('/medications/search')
  searchMedications(
    @Query('query') query: string,
    @Query('diagnosis') diagnosis: string,
  ) {
    return this.resourceService.searchMedications(query, diagnosis);
  }

  @Get('/symptoms/search')
  searchSymptoms(
    @Query('query') query: string,
    @Query('diagnosis') diagnosis: string,
  ) {
    return this.resourceService.searchSymptoms(query, diagnosis);
  }

  @Get('/lifestyle/search')
  searchLifestyle(
    @Query('query') query: string,
    @Query('diagnosis') diagnosis: string,
  ) {
    return this.resourceService.searchLifestyle(query, diagnosis);
  }

  @Get('/contraindication')
  getContraindications(@Query('medication') medication: string) {
    return this.resourceService.getContraindications(medication);
  }

  @Get('/adr')
  getAdrs(@Query('medication') medication: string) {
    return this.resourceService.getAdrs(medication);
  }

  @Get('getHandoutsByTag')
  async getHandoutsByTag(@Query('tag') tag: string) {
    return await this.resourceService.getHandoutsByTag(tag);
  }

  @Get('handout')
  async getHandout(@Query('id') id: string, @Res() res: Response) {
    const fileStream = await this.resourceService.getHandout(id);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="document"`, // Change "inline" to "attachment" for download
    });

    // Pipe the file stream to the response
    fileStream.pipe(res);
  }

  @Get('searchTags')
  async searchTags(@Query('query') query: string) {
    return await this.resourceService.searchTags(query);
  }
}
