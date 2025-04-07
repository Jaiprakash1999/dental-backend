import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsBase64,
  IsNumberString,
  IsBoolean,
} from 'class-validator';
import { BloodGroup } from 'src/utils/enums/blood_group.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { MMUUnit } from 'src/utils/enums/mmu_unit.enum';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';

export class PatientCreate {
  @ApiProperty({ description: 'Full name of the patient', example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Gender of the patient',
    enum: Gender,
    example: Gender.MALE,
    required: true,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Full name of the patient father',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  fatherName: string;

  @ApiProperty({ description: 'Year of birth of the patient', example: 1990 })
  @IsInt()
  @Min(1900)
  @IsNotEmpty()
  @Max(new Date().getFullYear()) // Ensures year is not in the future
  yearOfBirth: number;

  @ApiProperty({
    description: 'Date of birth (day) of the patient',
    example: 15,
  })
  @IsInt()
  @Min(1)
  @Max(31) // Validates day of month
  @IsOptional()
  dateOfBirth?: number;

  @ApiProperty({
    description: 'Month of birth of the patient',
    example: 6,
  })
  @IsInt()
  @Min(1)
  @Max(12) // Validates month (1-12)
  @IsOptional()
  monthOfBirth?: number;

  @ApiProperty({
    description: 'Phone number of the patient',
    example: '+1234567890',
  })
  @IsNumberString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Blood group of the patient',
    enum: BloodGroup,
    example: BloodGroup.O_POSITIVE,
    required: false,
  })
  @IsOptional()
  @IsEnum(BloodGroup)
  bloodGroup?: BloodGroup;

  @ApiProperty({
    description: 'Tag for the patient',
    enum: PatientTag,
    example: PatientTag.PREGNANTLADY,
    required: true,
  })
  @IsEnum(PatientTag)
  @IsNotEmpty()
  patientTag: PatientTag;

  @ApiProperty({
    description: 'Base64-encoded string representing the photo of the patient',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA...',
  })
  @IsOptional()
  @IsBase64() // Validates that the photo is a valid base64 string
  photo?: string;

  @ApiProperty({
    description: 'Habitat of the patient',
    example: 1,
  })
  @IsOptional()
  habitat: number;

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
    description: 'Detailed address of the patient',
    example: '123 Main Street, Apt 4B',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'District where the patient resides',
    example: 'Manhattan',
  })
  @IsOptional()
  @IsString()
  district?: string;

  @ApiProperty({
    description: 'Pincode or postal code of the patient’s location',
    example: '10001',
  })
  @IsOptional()
  @IsString()
  pincode?: string;

  @ApiProperty({
    description: 'Tehsil of the patient',
    example: 'SDA',
  })
  @IsOptional()
  @IsString()
  tehsil?: string;

  @ApiProperty({
    description: 'Warning for the duplicate',
    example: true,
  })
  @IsBoolean()
  warning: boolean;

  @ApiProperty({
    description: 'mmu unit',
  })
  @IsEnum(MMUUnit)
  @IsNotEmpty()
  mmuUnit: MMUUnit;
}
