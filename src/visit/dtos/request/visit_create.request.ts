import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsArray,
  IsNumber,
  Min,
  Max,
  IsString,
  ArrayMinSize,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
import { VisitTags } from 'src/utils/enums/visit_tags.enum';
import { VisitType } from 'src/utils/enums/visit_type.enum';

export class VisitCreate {
  @ApiProperty({
    description: 'The id of the patient',
    example: 1,
  })
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @ApiPropertyOptional({
    description: 'The ID of the doctor handling the visit',
    example: 'c89b0f4e-5f64-4c2a-8345-a6b77cbd1d9f',
  })
  @IsOptional()
  @IsUUID()
  doctorId?: string;

  @ApiPropertyOptional({
    description: 'The chief complaint of the patient for the visit',
    example: ['Fever', 'Cold symptoms for 3 days'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Validates each item in the array
  @ArrayMinSize(1) // Requires at least one item if provided
  chiefComplaint?: string[];

  @ApiProperty({
    description: 'The type of visit being conducted',
    enum: VisitType,
    example: VisitType.INPERSON,
  })
  @IsEnum(VisitType)
  @IsNotEmpty()
  visitType: VisitType;

  @ApiProperty({
    description: 'The date of the visit in YYYY-MM-DD format',
    example: '2025-01-18',
  })
  @IsNotEmpty()
  @IsDateString()
  visitDate: Date;

  @ApiPropertyOptional({
    description: 'Tags associated with the visit',
    example: [VisitTags.EMERGENCY, VisitTags.BABYDELIVERY],
    enum: VisitTags,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(VisitTags, { each: true }) // Validates each item in the array belongs to VisitTags
  tags?: VisitTags[];

  @ApiProperty({
    description: 'The MMU unit handling the visit',
    enum: MMUUnit,
    example: MMUUnit.PINAPAKA,
  })
  @IsNotEmpty()
  @IsEnum(MMUUnit)
  mmuUnit: MMUUnit;

  @ApiProperty({
    description: 'Latitude of the patient’s location',
    example: 40.712776,
  })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude of the patient’s location',
    example: -74.005974,
  })
  @IsNotEmpty()
  @IsNumber({ allowNaN: false })
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'District where the visit takes place',
    example: 'Manhattan',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiPropertyOptional({
    description: 'Pincode or postal code of the visit place',
    example: '10001',
  })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiProperty({
    description: 'Tehsil of the visit',
    example: 'SDA',
  })
  @IsOptional()
  @IsString()
  tehsil?: string;

  @ApiProperty({
    description: 'State where the patient resides',
    example: 'New York',
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'City where the patient resides',
    example: 'New York City',
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'City where the patient resides',
    example: 'New York City',
  })
  @IsOptional()
  @IsString()
  line?: string;
}
