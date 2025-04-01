import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LabResult } from 'src/utils/enums/lab_investigation_result.enum';

export class SFLabInvestigationCreate {
  @ApiProperty({ description: 'lab Investigation' })
  @IsString()
  @IsNotEmpty()
  labInvestigation: string;

  @ApiProperty({ enum: LabResult, description: 'result of the investigation' })
  @IsEnum(LabResult)
  @IsOptional()
  result?: LabResult;

  @ApiProperty({ description: 'note for the labInvestigation' })
  @IsString()
  @IsOptional()
  note?: string;
}
