import {
  IsOptional,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  IsArray,
  NotEquals,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Gender } from 'src/utils/enums/gender.enum';
import { PNCPostpartumCareUpdate } from './pnc_postpartum_care_update.request';

export class PostNatalCareUpdate {
  @ApiProperty({ description: 'urineAlbumin' })
  @IsString()
  @IsOptional()
  deliveryDetails: string;

  @ApiProperty({
    description: 'Delivery date',
    required: false,
    example: '2025-02-10',
  })
  @IsOptional()
  @IsDateString()
  deliveryDate?: Date;

  @ApiProperty({ description: 'Delivery place', required: false })
  @IsOptional()
  @IsString()
  deliveryPlace?: string;

  @ApiProperty({ description: 'pregnancy Outcome' })
  @IsOptional()
  pregnancyOutcome: string;

  @ApiProperty({
    description: 'Delivery type',
  })
  @IsString()
  @IsOptional()
  deliveryType?: string;

  @ApiProperty({ description: 'Baby gender', required: false, enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  @NotEquals(Gender.OTHER, { message: 'Gender cannot be OTHER' })
  babySex?: Gender;

  @ApiProperty({
    description: 'Baby weight in kg',
    required: false,
    example: 3.2,
  })
  @IsOptional()
  babyWeightInKg?: number;

  @ApiProperty({ example: 98, description: 'SpO2 in percentage' })
  @IsNumber()
  @Min(0, { message: 'SpO2 must be at least 80%' })
  @Max(100, { message: 'SpO2 must not exceed 100%' })
  @IsOptional()
  hemoglobinInPercent?: number;

  @ApiProperty({
    description: 'Did the baby cry immediately after birth?',
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  criedImmediatelyAfterBirth?: boolean;

  @ApiProperty({
    description: 'Was breastfeeding initiated?',
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  initiatedBreastfeeding?: boolean;

  @ApiProperty({
    description: 'Was a Vitamin K injection given?',
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  vitaminKInjection?: boolean;

  @ApiProperty({
    description: 'Family planning counseling details',
    required: false,
  })
  @IsOptional()
  @IsArray()
  familyPlanningCounselling?: string[];

  @ApiProperty()
  @IsOptional()
  notes: string;

  @ApiProperty({
    description: 'Postpartum care records',
    type: [PNCPostpartumCareUpdate],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => PNCPostpartumCareUpdate)
  postpartumCareRecords: PNCPostpartumCareUpdate[];
}
