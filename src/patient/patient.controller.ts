import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { Roles } from 'src/utils/decorator/role_decorator.util';
import { Response } from 'express';
import { PatientCreate } from './dtos/request/patient_create.request';
import { PatientUpdate } from './dtos/request/patient_update.request';
import { Gender } from 'src/utils/enums/gender.enum';
import { BloodGroup } from 'src/utils/enums/blood_group.enum';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';
import { ParseEnumArrayPipe } from 'src/utils/parse-enum-array.pipe';

@ApiTags('Patient')
@Controller('/api/v1/mmu/patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @ApiOperation({ summary: 'Register a new patient' })
  async registerPatient(
    @Headers('id') id: number,
    @Body() body: PatientCreate,
    @Res() res: Response,
  ) {
    const response = await this.patientService.registerPatient(id, body);
    if (!response.registered) {
      delete response.registered;
      return res.status(200).json(response); // Use .json() to send an array response
    }
    delete response.registered;
    return res.status(201).json(response); // Use .json() for other responses
  }

  @Get()
  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @ApiOperation({ summary: 'Retrieve all patients' })
  findAll() {
    return this.patientService.findAll();
  }

  @Get('search')
  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @ApiOperation({ summary: 'Search for patients' })
  search(
    @Query('query') query?: string,
    @Query('gender', new ParseEnumArrayPipe(Gender)) gender?: Gender[],
    @Query('minAge') minAge?: number,
    @Query('maxAge') maxAge?: number,
    @Query('bloodGroup', new ParseEnumArrayPipe(BloodGroup))
    bloodGroup?: BloodGroup[],
    @Query('registeredBy') registeredBy?: number[],
    @Query('habitation') habitation?: number[],
    @Query('patientTag', new ParseEnumArrayPipe(PatientTag))
    patientTag?: PatientTag[],
    @Query('registrationStartDate') registrationStartDate?: Date,
    @Query('registrationEndDate') registrationEndDate?: Date,
    @Query('lastVisitStartDate') lastVisitStartDate?: Date,
    @Query('lastVisitEndDate') lastVisitEndDate?: Date,
    @Query('lastChiefComplaint') lastChiefComplaint?: string,
    @Query('pageSize') pageSize: number = 10,
    @Query('page') page: number = 0,
  ) {
    return this.patientService.search(
      query,
      gender,
      minAge,
      maxAge,
      bloodGroup,
      registeredBy,
      habitation,
      patientTag,
      registrationStartDate
        ? new Date(registrationStartDate)
        : registrationStartDate,
      registrationEndDate ? new Date(registrationEndDate) : registrationEndDate,
      lastVisitStartDate,
      lastVisitEndDate,
      lastChiefComplaint,
      pageSize,
      page,
    );
  }

  @Get(':id')
  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @ApiOperation({ summary: 'Retrieve details of a specific patient' })
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Patch()
  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @ApiOperation({ summary: 'Update details of a specific patient' })
  update(@Headers('id') id: number, @Body() body: PatientUpdate) {
    return this.patientService.update(id, body);
  }

  @Delete(':id')
  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @ApiOperation({ summary: 'Delete a specific patient' })
  remove(@Headers('id') id: number, @Param('patientId') patientId: string) {
    return this.patientService.remove(id, patientId);
  }

  @Get('/details/:id')
  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @ApiOperation({ summary: 'Retrieve details of a specific patient' })
  findDetails(@Param('id') id: string) {
    return this.patientService.getDetails(id);
  }
}
