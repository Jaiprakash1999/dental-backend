import { ApiProperty } from '@nestjs/swagger';
import { HOW_FEED } from 'src/utils/enums/howFeed.enum';
import { ABDOMEN_CONDITION } from 'src/utils/enums/abdomenCondition.enum';
import { CRY_CONDITION } from 'src/utils/enums/cryCondition.enum';
import { FEEDING_CONDITION } from 'src/utils/enums/feedingCondition.enum';

class COBBabyCareResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({
    description: 'Day',
    required: false,
    example: '1st day',
  })
  day: string;

  @ApiProperty({ required: false })
  date?: Date;

  @ApiProperty({ required: false })
  weightInKg?: number;

  @ApiProperty({ required: false })
  temperatureInCelsius?: number;

  @ApiProperty({ required: false })
  urineOutput?: string;

  @ApiProperty({ required: false })
  stoolPattern?: string;

  @ApiProperty({ required: false })
  eyesCondition?: string[];

  @ApiProperty({ required: false })
  skinCondition?: string;

  @ApiProperty({ required: false, isArray: true })
  skinFoldCondition?: string[];

  @ApiProperty({ required: false })
  yellowEyes?: boolean;

  @ApiProperty({ required: false })
  yellowSkin?: boolean;

  @ApiProperty({ required: false })
  umbilicalCordBleed?: boolean;

  @ApiProperty({ required: false })
  cleanThreadUsed?: boolean;

  @ApiProperty({ required: false, enum: FEEDING_CONDITION })
  feedingCondition?: FEEDING_CONDITION;

  @ApiProperty({ required: false, enum: CRY_CONDITION })
  cryCondition?: CRY_CONDITION;

  @ApiProperty({ required: false, enum: ABDOMEN_CONDITION })
  abdomenCondition?: ABDOMEN_CONDITION;

  @ApiProperty({ required: false })
  coldToTouch?: boolean;

  @ApiProperty({ required: false })
  chestIndrawn?: boolean;

  @ApiProperty({ required: false })
  pusOnUmbilicus?: boolean;

  @ApiProperty({ required: false })
  respiratoryRate?: boolean;
}

export class CareOfBabyResponse {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: false })
  firstExaminationDateTime?: Date;

  @ApiProperty({ required: false })
  firstFeedAfterBirth?: string;

  @ApiProperty({ required: false })
  firstBreastfeedTime?: Date;

  @ApiProperty({ required: false, enum: HOW_FEED })
  howFeed?: HOW_FEED;

  @ApiProperty({ required: false })
  weakSuckReason?: string;

  @ApiProperty({ required: false })
  dryBaby?: boolean;

  @ApiProperty({ required: false })
  keptWarm?: boolean;

  @ApiProperty({ required: false })
  dontBath?: boolean;

  @ApiProperty({ required: false })
  wrappedCloseToMother?: boolean;

  @ApiProperty({ required: false })
  exclusivelyBreastfed?: boolean;

  @ApiProperty({ required: false })
  cordCare?: boolean;

  @ApiProperty({ required: false })
  unusualFindings?: string;

  notes: string;

  @ApiProperty({ type: [COBBabyCareResponse] })
  babyCares: COBBabyCareResponse[];

  @ApiProperty({ required: false })
  referredToHigherCentre?: boolean;

  @ApiProperty({ required: false })
  referralReason?: string;
}
