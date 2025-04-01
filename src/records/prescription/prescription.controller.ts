import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PrescriptionCreate } from './dtos/request/prescription_create.request';
import { PrescriptionResponse } from './dtos/response/prescription.response';

@Controller('/api/v1/mmu/records/prescription')
@ApiTags('Prescription')
export class PrescriptionController {
  constructor(private readonly service: PrescriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prescription' })
  async createPrescription(
    @Headers('id') id: number,
    @Body() body: PrescriptionCreate,
  ): Promise<PrescriptionResponse> {
    return await this.service.createPrescription(id, body);
  }

  @Get(':prescriptionId')
  @ApiOperation({ summary: 'Retrieve all prescriptions' })
  async getPrescriptionById(
    @Param('prescriptionId') prescriptionId: string,
  ): Promise<PrescriptionResponse> {
    return await this.service.getPrescriptionById(prescriptionId);
  }
}
