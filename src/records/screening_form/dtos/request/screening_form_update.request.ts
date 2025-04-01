import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SfLabInvestigationUpdate } from './sf_lab_investigation_update.request';
import { SFLabInvestigationCreate } from './sf_lab_investigation_create.request';

export class ScreeningFormUpdate {
  @ApiProperty({ description: 'Suspected diagnosis' })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiProperty({ description: 'notes' })
  @IsString()
  @IsOptional()
  notes: string;

  @ApiProperty({
    description: 'Lab investigation of the related diagnosis',
    type: [SfLabInvestigationUpdate],
  })
  @ValidateNested({ each: true })
  @Type(() => SfLabInvestigationUpdate)
  labInvestigations: SfLabInvestigationUpdate[];
}
