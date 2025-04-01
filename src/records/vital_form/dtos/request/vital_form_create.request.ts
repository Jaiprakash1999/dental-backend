import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  Max,
  Matches,
  IsOptional,
} from 'class-validator';
import { LungsOptions } from 'src/utils/enums/lungs_condition.enum';

export class VitalFormCreate {
  @ApiProperty({ example: 70.5, description: 'Weight in kilograms' })
  @IsNumber()
  @Min(2, { message: 'Weight must be at least 2.13 kg' })
  @Max(635, { message: 'Weight must not exceed 635 kg' })
  @IsOptional()
  weightInKg?: number;

  @ApiProperty({ example: 175, description: 'Height in centimeters' })
  @IsNumber()
  @Min(54, { message: 'Height must be at least 54.6 cm' })
  @Max(272, { message: 'Height must not exceed 272 cm' })
  @IsOptional()
  heightInCm?: number;

  @ApiProperty({ example: 72, description: 'Heart rate in beats per minute' })
  @IsString()
  @IsOptional()
  heart?: string;

  @ApiProperty({
    example: 'lung',
    description: 'Lungs condition (e.g., Clear, Wheezing, Rales)',
  })
  @IsOptional()
  lungs?: string;

  @ApiProperty({
    example: 'string',
  })
  @IsOptional()
  notes: string;

  @ApiProperty({ example: '120/80', description: 'Blood pressure' })
  @IsString()
  @Matches(/^([6-9][0-9]|[1][0-3][0-9])\/([3-8][0-9]|90)$/, {
    message: 'Blood pressure must be between 60/30 and 140/90',
  })
  @IsOptional()
  bloodPressure?: string;

  @ApiProperty({ example: 98, description: 'SpO2 in percentage' })
  @IsNumber()
  @Min(0, { message: 'SpO2 must be at least 80%' })
  @Max(100, { message: 'SpO2 must not exceed 100%' })
  @IsOptional()
  spo2InPercent?: number;

  @ApiProperty({ example: 98, description: 'SpO2 in percentage' })
  @IsNumber()
  @Min(0, { message: 'SpO2 must be at least 80%' })
  @Max(100, { message: 'SpO2 must not exceed 100%' })
  @IsOptional()
  hemoglobinInPercent?: number;

  @ApiProperty({ example: 98, description: 'Temperature in Celsius' })
  @IsNumber()
  @Min(35, { message: 'Temperature must be at least 35°C' })
  @Max(104, { message: 'Temperature must not exceed 104°C' })
  @IsOptional()
  tempInCelsius?: number;

  @ApiProperty({
    example: 16,
    description: 'Respiratory rate in breaths per minute',
  })
  @IsNumber()
  @Min(12, { message: 'Respiratory rate must be at least 12 BPM' })
  @Max(60, { message: 'Respiratory rate must not exceed 60 BPM' })
  @IsOptional()
  respiratoryRateInBpm?: number;

  @ApiProperty({ example: 72, description: 'Pulse rate in beats per minute' })
  @IsNumber()
  @Min(50, { message: 'Pulse rate must be at least 50 BPM' })
  @Max(180, { message: 'Pulse rate must not exceed 180 BPM' })
  @IsOptional()
  pulseRateInBpm?: number;

  @ApiProperty({ example: 'uuid-example', description: 'Visit ID' })
  @IsString()
  @IsNotEmpty()
  visitId: string;
}
