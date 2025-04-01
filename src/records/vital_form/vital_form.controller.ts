import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { VitalFormService } from './vital_form.service';
import { ApiOperation } from '@nestjs/swagger';
import { VitalFormCreate } from './dtos/request/vital_form_create.request';

@Controller('/api/v1/mmu/records/vital-form')
export class VitalFormController {
  constructor(private readonly service: VitalFormService) {}

  @Post('/vital')
  @ApiOperation({ summary: 'Create a new vital record' })
  createVitalForm(@Headers('id') id: number, @Body() body: VitalFormCreate) {
    return this.service.createVitalForm(id, body);
  }

  @Get('/vital/:vitalFormId')
  @ApiOperation({ summary: 'Retrieve a specific vital record by ID' })
  findVital(@Param('vitalFormId') vitalFormId: string) {
    return this.service.getVitalFormById(vitalFormId);
  }

  @Put('/vital/:vitalFormId')
  @ApiOperation({summary:'update the vital form'})
  updateVitalForm(@Param('vitalFormId')vitalFormId:string,@Body() body: object){
    
  }
}
