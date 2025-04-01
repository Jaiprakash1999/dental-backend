import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { FETAL_MOVEMENTS } from 'src/utils/enums/fetal_movements.enum';

export class ANCAntenatalVisitUpdate {
  @ApiProperty({
    description: 'id of the antenatal visit care if there is any',
  })
  @IsOptional()
  @IsString()
  id: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
  day: string;

  @ApiProperty({
    example: '2025-02-19',
    description: 'Date of the visit',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({
    example: 'Headache and nausea',
    description: 'Visit complaints',
    required: false,
  })
  @IsOptional()
  @IsString()
  complaints?: string;

  @ApiProperty({
    example: 20,
    description: 'Period of Gestation in weeks',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pogWeeks?: number;

  @ApiProperty({ example: 60.5, description: 'Weight in kg', required: false })
  @IsOptional()
  @IsNumber()
  weightInKg?: number;

  @ApiProperty({
    example: 80,
    description: 'Pulse rate in BPM',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pulseRateInBpm?: number;

  @ApiProperty({
    example: '120/80',
    description: 'Blood pressure',
    required: false,
  })
  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @ApiProperty({
    example: 'Normal',
    description: 'Pallor observation',
    required: false,
  })
  @IsOptional()
  @IsString()
  pallor?: string;

  @ApiProperty({
    example: 'Mild',
    description: 'Oedema observation',
    required: false,
  })
  @IsOptional()
  @IsString()
  oedema?: string;

  @ApiProperty({
    example: 'No jaundice',
    description: 'Jaundice observation',
    required: false,
  })
  @IsOptional()
  @IsString()
  jaundice?: string;

  @ApiProperty({
    example: '36 cm',
    description: 'Fundal height',
    required: false,
  })
  @IsOptional()
  @IsString()
  fundalHeight?: string;

  @ApiProperty({
    example: 'Cephalic',
    description: 'Lie Presentation',
    required: false,
  })
  @IsOptional()
  @IsString()
  liePresentation?: string;

  @ApiProperty({
    example: FETAL_MOVEMENTS.NORMAL,
    enum: FETAL_MOVEMENTS,
    description: 'Fetal Movements',
    required: false,
  })
  @IsOptional()
  @IsEnum(FETAL_MOVEMENTS)
  fetalMovements?: FETAL_MOVEMENTS;

  @ApiProperty({
    example: 140,
    description: 'Fetal Heart Rate per min',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fetalHeartRatePerMin?: number;

  @ApiProperty({
    example: 'Not done',
    description: 'PV if done',
    required: false,
  })
  @IsOptional()
  @IsString()
  pvIfDone?: string;

  @ApiProperty({
    example: '13.5 g/dL',
    description: 'Haemoglobin level',
    required: false,
  })
  @IsOptional()
  @IsString()
  haemoglobin?: string;

  @ApiProperty({
    example: 'Negative',
    description: 'HIV Screening result',
    required: false,
  })
  @IsOptional()
  @IsString()
  hivScreening?: string;

  @ApiProperty({
    example: 'Non-reactive',
    description: 'VDRL test result',
    required: false,
  })
  @IsOptional()
  @IsString()
  vdrl?: string;

  @ApiProperty({
    example: 'Negative',
    description: 'HbsAg test result',
    required: false,
  })
  @IsOptional()
  @IsString()
  hbsAg?: string;

  @ApiProperty({
    example: '90 mg/dL',
    description: 'Blood Sugar level',
    required: false,
  })
  @IsOptional()
  @IsString()
  bloodSugar?: string;

  @ApiProperty({
    example: 'Negative',
    description: 'Urine Albumin test result',
    required: false,
  })
  @IsOptional()
  @IsString()
  urineAlbumin?: string;

  @ApiProperty({
    example: 'Negative',
    description: 'Urine Sugar test result',
    required: false,
  })
  @IsOptional()
  @IsString()
  urineSugar?: string;

  @ApiProperty({
    example: 'Normal',
    description: 'Ultrasonography findings',
    required: false,
  })
  @IsOptional()
  @IsString()
  ultraSonography?: string;
}
