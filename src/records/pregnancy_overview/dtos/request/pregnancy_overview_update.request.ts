import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Gender } from 'src/utils/enums/gender.enum';
import { Type } from 'class-transformer';

class FamilyIdentification {
  @ApiProperty({ description: 'Mother’s name', required: false })
  @IsString()
  @IsOptional()
  motherName?: string;

  @ApiProperty({ description: 'Mother’s age', required: false, example: 30 })
  @IsInt()
  @IsOptional()
  motherAge?: number;

  @ApiProperty({
    description: 'Mother’s mobile number',
    required: false,
    example: '9876543210',
  })
  @IsString()
  @IsOptional()
  motherMobileNumber?: string;

  @ApiProperty({ description: 'Father’s name', required: false })
  @IsString()
  @IsOptional()
  fatherName?: string;

  @ApiProperty({ description: 'Father’s age', required: false, example: 35 })
  @IsInt()
  @IsOptional()
  fatherAge?: number;

  @ApiProperty({
    description: 'Father’s mobile number',
    required: false,
    example: '9876543211',
  })
  @IsString()
  @IsOptional()
  fatherMobileNumber?: string;

  @ApiProperty({ description: 'Address of the family', required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Mother’s unique ID', required: false })
  @IsString()
  @IsOptional()
  motherId?: string;

  @ApiProperty({ description: 'Bank name', required: false })
  @IsString()
  @IsOptional()
  bankName?: string;

  @ApiProperty({ description: 'Bank account number', required: false })
  @IsString()
  @IsOptional()
  accountNumber?: string;

  @ApiProperty({ description: 'IFSC code', required: false })
  @IsString()
  @IsOptional()
  ifscCode?: string;
}

class PregnancyPeriod {
  @ApiProperty({
    description: 'Date of last menstrual period (LMP)',
    required: false,
    example: '2024-01-01',
  })
  @IsDateString()
  @IsOptional()
  dolmp?: Date;

  @ApiProperty({
    description: 'Expected date of delivery (EDD)',
    required: false,
    example: '2024-10-01',
  })
  @IsDateString()
  @IsOptional()
  edd?: Date;

  @ApiProperty({ description: 'Last delivery location', required: false })
  @IsString()
  @IsOptional()
  lastDeliveryAt?: string;

  @ApiProperty({ description: 'Current delivery details', required: false })
  @IsString()
  @IsOptional()
  currentDeliveryAt?: string;
}

class BirthRecord {
  @ApiProperty({ description: 'Child’s name', required: false })
  @IsString()
  @IsOptional()
  childName?: string;

  @ApiProperty({
    description: 'Child’s date of birth',
    required: false,
    example: '2024-09-15',
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Birth weight (kg)',
    required: false,
    example: 3.2,
  })
  @IsOptional()
  birthWeightInKg?: number;

  @ApiProperty({ description: 'Child’s gender', required: false, enum: Gender })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({ description: 'Birth registration number', required: false })
  @IsString()
  @IsOptional()
  birthRegistrationNumber?: string;

  @ApiProperty({ description: 'Child ID number', required: false })
  @IsString()
  @IsOptional()
  childIdNumber?: string;
}

class InstituteIdentification {
  @ApiProperty({ description: 'ANM name', required: false })
  @IsString()
  @IsOptional()
  anmName?: string;

  @ApiProperty({ description: 'ANM contact number', required: false })
  @IsString()
  @IsOptional()
  anmContact?: string;

  @ApiProperty({ description: 'CHW name', required: false })
  @IsString()
  @IsOptional()
  chwName?: string;

  @ApiProperty({ description: 'CHW contact number', required: false })
  @IsString()
  @IsOptional()
  chwContact?: string;

  @ApiProperty({ description: 'PHC name', required: false })
  @IsString()
  @IsOptional()
  phcName?: string;

  @ApiProperty({ description: 'Hospital name', required: false })
  @IsString()
  @IsOptional()
  phcHospitalName?: string;

  @ApiProperty({ description: 'Referral institution', required: false })
  @IsString()
  @IsOptional()
  referralTo?: string;
}

export class PregnancyOverviewUpdate {
  @ApiProperty({
    description: 'Tubectomy date',
    required: false,
    example: '2024-02-15',
  })
  @IsDateString()
  @IsOptional()
  tubectomyDate?: Date;

  @ApiProperty({
    description: 'Is tubectomy completed?',
    required: false,
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isTubectomyCompleted?: boolean;

  @ApiProperty({
    description: 'Is pregnancy high risk?',
    required: false,
    example: ['Hypertension', 'Diabetes'],
  })
  @IsString({ each: true })
  @IsOptional()
  isPregnancyRiskHigh?: string[];

  @ApiProperty({ description: 'Pregnancy outcome note', required: false })
  @IsString()
  @IsOptional()
  pregnancyOutcomeNote?: string;

  @ApiProperty({ description: 'Personal details', type: FamilyIdentification })
  @Type(() => FamilyIdentification)
  @ValidateNested()
  familyIdentification: FamilyIdentification;

  @ApiProperty({ description: 'Pregnancy details', type: PregnancyPeriod })
  @Type(() => PregnancyPeriod)
  @ValidateNested()
  pregnancyPeriod: PregnancyPeriod;

  @ApiProperty({ description: 'Child details', type: BirthRecord })
  @Type(() => BirthRecord)
  @ValidateNested()
  birthRecord: BirthRecord;

  @ApiProperty({
    description: 'Health worker details',
    type: InstituteIdentification,
  })
  @Type(() => InstituteIdentification)
  @ValidateNested()
  instituteIdentification: InstituteIdentification;

  @ApiProperty()
  @IsOptional()
  notes: string;
}
