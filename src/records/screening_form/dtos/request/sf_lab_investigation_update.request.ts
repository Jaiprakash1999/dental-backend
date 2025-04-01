import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { LabResult } from 'src/utils/enums/lab_investigation_result.enum';

export class SfLabInvestigationUpdate {
  @ApiProperty({ description: 'id of the lab investigation' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'lab Investigation' })
  @IsString()
  @IsOptional()
  labInvestigation?: string;

  @ApiProperty({ enum: LabResult, description: 'result of the investigation' })
  @IsEnum(LabResult)
  @IsOptional()
  result?: LabResult;

  @ApiProperty({ description: 'note for the labInvestigation' })
  @IsString()
  @IsOptional()
  note?: string;
}
