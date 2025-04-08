import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './create-doctor.dto';
import { Doctor } from 'src/entities/dynamic/doctor.entity';

@ApiTags('Doctor')
@Controller('/api/v1/mmu/doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOperation({ summary: 'Create Doctor' })
  async create(@Body() body: CreateDoctorDto): Promise<Doctor> {
    return await this.doctorService.createDoctor(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Doctors' })
  async getAll(): Promise<Doctor[]> {
    return await this.doctorService.getAllDoctors();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Doctor' })
  async delete(@Param('id') id: number): Promise<void> {
    return await this.doctorService.deleteDoctor(id);
  }
}
