import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  IsArray,
} from 'class-validator';
import { ABDOMEN_CONDITION } from 'src/utils/enums/abdomenCondition.enum';
import { CRY_CONDITION } from 'src/utils/enums/cryCondition.enum';
import { FEEDING_CONDITION } from 'src/utils/enums/feedingCondition.enum';

export class COBBabyCareUpdate {
  @ApiProperty({ description: 'id of the baby care if there is any' })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Day',
    required: false,
    example: '1st day',
  })
  @IsString()
  @IsOptional()
  day: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  weightInKg?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  temperatureInCelsius?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  urineOutput?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  stoolPattern?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  eyesCondition?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  skinCondition?: string;

  @ApiProperty({ required: false, isArray: true })
  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  skinFoldCondition?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  yellowEyes?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  yellowSkin?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  umbilicalCordBleed?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  cleanThreadUsed?: boolean;

  @ApiProperty({ required: false, enum: FEEDING_CONDITION })
  @IsOptional()
  @IsEnum(FEEDING_CONDITION)
  feedingCondition?: FEEDING_CONDITION;

  @ApiProperty({ required: false, enum: CRY_CONDITION })
  @IsOptional()
  @IsEnum(CRY_CONDITION)
  cryCondition?: CRY_CONDITION;

  @ApiProperty({ required: false, enum: ABDOMEN_CONDITION })
  @IsOptional()
  @IsEnum(ABDOMEN_CONDITION)
  abdomenCondition?: ABDOMEN_CONDITION;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  coldToTouch?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  chestIndrawn?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  pusOnUmbilicus?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  respiratoryRate?: boolean;


}
