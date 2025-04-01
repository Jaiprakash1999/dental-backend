import {
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TemplateRxCreate } from './template_rx_create.request';

export class TemplateCreate {
  @ApiProperty({
    description: 'Chief complaint of the patient',
    required: true,
    type: [String],
  })
  @IsOptional()
  chiefComplaint?: string[];

  @ApiProperty({ description: 'Follow-up instructions', required: false })
  @IsOptional()
  @IsString()
  followUp?: string;

  @ApiProperty({
    description: 'Lifestyle recommendations',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  lifeStyleRecommendations?: string[];

  @ApiProperty({
    description: 'Instructions for the patient',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  instructions?: string[];

  @ApiProperty({
    description: 'Diagnosis of the patient',
    required: true,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  diagnosis?: string[];

  @ApiProperty({
    description: 'Lab investigations',
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray()
  labInvestigations?: string[];

  @ApiProperty({ description: 'name of the template' })
  @IsNotEmpty()
  @IsString()
  templateName: string;

  @ApiProperty({
    description: 'List of prescriptions for the patient',
    type: [TemplateRxCreate],
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => TemplateRxCreate)
  rxList?: TemplateRxCreate[]; // Array of CreateRxDto objects
}
