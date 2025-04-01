import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { BloodGroup } from 'src/utils/enums/blood_group.enum';
import { Gender } from 'src/utils/enums/gender.enum';
import { PatientTag } from 'src/utils/enums/patient_tags.enum';

export class PatientUpdate {
  @ApiProperty({
    description: 'id of the patient',
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'Full name of the patient', example: 'John Doe' })
  @IsOptional()
  @IsString()
  fatherName?: string;

  @ApiProperty({
    description: 'Gender of the patient',
    enum: Gender,
    example: Gender.MALE,
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty({
    description: 'Tag for the patient',
    enum: PatientTag,
    example: PatientTag.PREGNANTLADY,
    required: true,
  })
  @IsEnum(PatientTag)
  @IsOptional()
  patientTag?: PatientTag;

  @ApiProperty({ description: 'Year of birth of the patient', example: 1990 })
  @IsInt()
  @Min(1900)
  @IsOptional()
  @Max(new Date().getFullYear()) // Ensures year is not in the future
  yearOfBirth?: number;

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
    description: 'Blood group of the patient',
    enum: BloodGroup,
    example: BloodGroup.A_POSITIVE,
  })
  @IsOptional()
  @IsEnum(BloodGroup, { message: 'Invalid blood group' })
  bloodGroup?: BloodGroup;

  @ApiProperty({
    description: 'State where the patient resides',
    example: 'New York',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'State must be between 2 and 50 characters' })
  state?: string;

  @ApiProperty({
    description: 'City where the patient resides',
    example: 'New York City',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'City must be between 2 and 50 characters' })
  city?: string;

  @ApiProperty({
    description: 'Detailed address of the patient',
    example: '123 Main Street',
  })
  @IsOptional()
  @IsString()
  @Length(5, 100, { message: 'Address must be between 5 and 100 characters' })
  address?: string;

  @ApiProperty({
    description: 'District where the patient resides',
    example: 'Manhattan',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'District must be between 2 and 50 characters' })
  district?: string;

  @ApiProperty({
    description: 'Postal code of the patient’s location',
    example: '10001',
  })
  @IsOptional()
  @IsPostalCode('any', { message: 'Invalid postal code' })
  pincode?: string;

  @ApiProperty({
    description: 'Tehsil (sub-division) where the patient resides',
    example: 'Malviya Nagar',
  })
  @IsOptional()
  @IsString()
  @Length(2, 50, { message: 'Tehsil must be between 2 and 50 characters' })
  tehsil?: string;

  @ApiProperty({
    description: 'Warning for the duplicate',
    example: true,
  })
  @IsBoolean()
  warning: boolean;

  @ApiProperty({
    description: 'Habitat of the patient',
    example: 1,
  })
  @IsInt()
  @IsOptional()
  habitat: number;
}
