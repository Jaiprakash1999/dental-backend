import {
  IsString,
  IsOptional,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PrescriptionRxCreate } from './prescription_rx_create.request';
import { APP_FILTER } from '@nestjs/core';

export class PrescriptionCreate {
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

  @ApiProperty({ description: 'ID of the visit' })
  @IsNotEmpty()
  @IsString()
  visitId: string;

  @ApiProperty({
    description: 'List of prescription details',
    type: [PrescriptionRxCreate],
  })
  @ValidateNested({ each: true })
  @Type(() => PrescriptionRxCreate)
  @IsArray()
  rxList: PrescriptionRxCreate[];

  @ApiProperty({ description: 'Signature of the prescription creator' })
  @IsString()
  @IsOptional()
  signature: string;

  @ApiProperty({ description: 'Stamp of the prescription creator' })
  @IsString()
  @IsOptional()
  stamp: string;
}
