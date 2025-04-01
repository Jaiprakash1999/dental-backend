import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { HOW_FEED } from 'src/utils/enums/howFeed.enum';
import { COBBabyCareUpdate } from './cob_baby_care_update.request';

export class CareOfBabyUpdate {
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

  @ApiProperty({ type: [COBBabyCareUpdate] })
  @ValidateNested({ each: true })
  @Type(() => COBBabyCareUpdate)
  babyCares: COBBabyCareUpdate[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  referredToHigherCentre?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  referralReason?: string;

  @ApiProperty({})
  @IsOptional()
  notes: string;
}
