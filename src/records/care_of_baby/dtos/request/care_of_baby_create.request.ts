import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { HOW_FEED } from 'src/utils/enums/howFeed.enum';
import { COBBabyCareCreate } from './cob_baby_care_create.request';

export class CareOfBabyCreate {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  patientId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  firstExaminationDateTime?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  firstFeedAfterBirth?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  firstBreastfeedTime?: Date;

  @ApiProperty({ required: false, enum: HOW_FEED })
  @IsOptional()
  @IsEnum(HOW_FEED)
  howFeed?: HOW_FEED;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  weakSuckReason?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  dryBaby?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  keptWarm?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  dontBath?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  wrappedCloseToMother?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  exclusivelyBreastfed?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  cordCare?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  unusualFindings?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  referredToHigherCentre?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  referralReason?: string;

  @ApiProperty({required:false})
  @IsString()
  @IsOptional()
  notes:string;

  @ApiProperty({ type: [COBBabyCareCreate] })
  @ValidateNested({ each: true })
  @Type(() => COBBabyCareCreate)
  babyCares: COBBabyCareCreate[];
}
