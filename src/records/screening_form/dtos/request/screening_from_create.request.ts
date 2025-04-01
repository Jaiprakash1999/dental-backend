import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LabResult } from 'src/utils/enums/lab_investigation_result.enum';
import { SFLabInvestigationCreate } from './sf_lab_investigation_create.request';

export class ScreeningFormCreate {
  @ApiProperty({ description: 'id of the patient' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ description: 'Suspected diagnosis' })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({ description: 'notes' })
  @IsString()
  @IsOptional()
  notes: string;

  @ApiProperty({
    description: 'Lab investigation of the related diagnosis',
    type: [SFLabInvestigationCreate],
  })
  @ValidateNested({ each: true })
  @Type(() => SFLabInvestigationCreate)
  labInvestigations: SFLabInvestigationCreate[];
}
