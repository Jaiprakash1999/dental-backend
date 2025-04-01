import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { mappings } from './data/mappings';
import { MandalService } from './mandal.service';

@ApiTags('Mandal')
@Controller('/api/v1/mmu/mandal')
export class MandalController {
  constructor(private readonly mandalService: MandalService) {}

  @Get('mandals')
  @ApiOperation({ summary: 'Get list of unique mandals' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search for similar mandals',
  })
  getMandals(@Query('search') query?: string) {
    return this.mandalService.getMandals(query);
  }

  @Get('gram-panchayats')
  @ApiOperation({
    summary: 'Get list of gram panchayats',
    description: 'Returns gram panchayats filtered by mandal if provided.',
  })
  @ApiQuery({
    name: 'mandal',
    required: false,
    description: 'Mandal name to filter gram panchayats',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search for similar gram panchayats',
  })
  getGramPanchayats(
    @Query('mandal') mandal?: string,
    @Query('search') query?: string,
  ) {
    return this.mandalService.getGramPanchayats(mandal, query);
  }

  @Get('habitations')
  @ApiOperation({
    summary: 'Get list of habitations',
    description:
      'Returns habitations filtered by mandal and/or gram panchayat if provided.',
  })
  @ApiQuery({
    name: 'mandal',
    required: false,
    description: 'Mandal name to filter habitations',
  })
  @ApiQuery({
    name: 'gramPanchayat',
    required: false,
    description: 'Gram Panchayat name to filter habitations',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search for similar habitations',
  })
  getHabitations(
    @Query('mandal') mandal?: string,
    @Query('gramPanchayat') gramPanchayat?: string,
    @Query('search') search?: string,
  ) {
    return this.mandalService.getHabitations(mandal,gramPanchayat,search);
  }
}
