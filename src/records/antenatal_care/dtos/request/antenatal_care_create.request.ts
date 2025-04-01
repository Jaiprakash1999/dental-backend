import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ANCAntenatalVisitCreate } from './anc_antenatal_visit_create.request';
import { Transform, Type } from 'class-transformer';
import { ANCOptionalInvestigationCreate } from './anc_optional_investigations_create.request';

export class AntenatalCareCreate {
  @ApiProperty({
    description: 'Patient ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'example', description: 'past_surgical_history' })
  @IsOptional()
  pastSurgicalHistory: string;

  @ApiProperty({ example: 'example', description: 'past_medical_history' })
  @IsOptional()
  pastMedicalHistory: string;

  @ApiProperty({ example: 'example', description: 'treatment_history' })
  @IsOptional()
  treatmentHistory: string;

  // Obstetric Complications
  @ApiProperty({ description: 'Antepartum hemorrhage', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  apH: boolean;

  @ApiProperty({ description: 'Eclampsia', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  eclampsia: boolean;

  @ApiProperty({
    description: 'Pregnancy-induced hypertension',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  piH: boolean;

  @ApiProperty({ description: 'Anaemia', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  anaemia: boolean;

  @ApiProperty({ description: 'Obstructed labor', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  obstructedLabor: boolean;

  @ApiProperty({ description: 'Postpartum hemorrhage', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  pPH: boolean;

  @ApiProperty({
    description: 'Lower segment Cesarean section',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  lSCS: boolean;

  @ApiProperty({ description: 'Congenital anomaly', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  congenitalAnomaly: boolean;

  @ApiProperty({ description: 'Other complications', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  otherComplications: boolean;

  // Past History
  @ApiProperty({
    description: 'History of tuberculosis',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  tuberculosis: boolean;

  @ApiProperty({ description: 'Hypertension history', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  hypertension: boolean;

  @ApiProperty({ description: 'Heart disease history', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  heartDisease: boolean;

  @ApiProperty({ description: 'Diabetes history', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  diabetes: boolean;

  @ApiProperty({ description: 'Asthma history', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  asthma: boolean;

  @ApiProperty({ description: 'Other medical history', example: false })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value === null ? false : value)) // Convert null to false
  otherMedicalHistory: boolean;

  @ApiProperty({
    description: 'Gravida-Para-Live-Abortions-Death (GPLAD) status',
    required: false,
  })
  @IsString()
  @IsOptional()
  gplad?: string;

  @ApiProperty({ description: 'previous_delivery', example: 'example' })
  @IsOptional()
  previousDelivery: string;

  @ApiProperty({
    example: ['example'],
    description: 'previous_children',
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  previousChildren: string[];

  // Examination
  @ApiProperty({ description: 'Heart examination', example: 'Normal' })
  @IsString()
  @IsOptional()
  heart: string;

  @ApiProperty({ description: 'Lungs examination', example: 'Clear' })
  @IsString()
  @IsOptional()
  lungs: string;

  @ApiProperty({
    description: 'Breasts examination',
    example: 'No lumps detected',
  })
  @IsString()
  @IsOptional()
  breasts: string;

  @ApiProperty({
    description: 'Breasts examination',
    example: 'No lumps detected',
  })
  @IsString()
  @IsOptional()
  thyroid: string;

  @ApiProperty({
    description: 'Breasts examination',
    example: 'No lumps detected',
  })
  @IsString()
  @IsOptional()
  spine: string;

  @ApiProperty({
    description: 'Breasts examination',
    example: 'No lumps detected',
  })
  @IsString()
  @IsOptional()
  gait: string;

  //Tests
  @ApiProperty({
    description: 'Blood group and Rh typing',
    example: 'O+',
  })
  @IsString()
  @IsOptional()
  urinePregnancyTest: string;

  @ApiProperty({
    description: 'Blood group Rh typing date',
    example: '2024-02-19',
  })
  @IsDateString()
  @IsOptional()
  urinePregnancyTestDate?: Date;

  @ApiProperty({
    description: 'Blood group and Rh typing',
    example: 'O+',
  })
  @IsString()
  @IsOptional()
  bloodGroupRhTyping: string;

  @ApiProperty({
    description: 'Blood group Rh typing date',
    example: '2024-02-19',
  })
  @IsDateString()
  @IsOptional()
  bloodGroupRhTypingDate?: Date;

  @ApiProperty({
    type: [ANCAntenatalVisitCreate],
    description: 'List of antenatal visits',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ANCAntenatalVisitCreate)
  antenatalVisits?: ANCAntenatalVisitCreate[];

  @ApiProperty({
    type: [ANCOptionalInvestigationCreate],
    description: 'List of optional investigations',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ANCOptionalInvestigationCreate)
  optionalInvestigations?: ANCOptionalInvestigationCreate[];

  @ApiProperty({ example: 'example', description: 'notes' })
  @IsOptional()
  notes: string;
}
