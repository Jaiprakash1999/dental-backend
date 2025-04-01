import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// Birth Vaccines
class BirthVaccines {
  @ApiProperty({ default: false })
  @IsBoolean()
  bcg: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  opv0: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  hepatitisB: boolean = false;
}

// After 6 Weeks
class SixWeeksVaccines {
  @ApiProperty({ default: false })
  @IsBoolean()
  opv1: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  pentavalent1: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  rvv1: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  fipv1: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  pcv1: boolean = false;
}

// After 10 Weeks
class TenWeeksVaccines {
  @ApiProperty({ default: false })
  @IsBoolean()
  opv2: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  pentavalent2: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  rvv2: boolean = false;
}

// After 14 Weeks
class FourteenWeeksVaccines {
  @ApiProperty({ default: false })
  @IsBoolean()
  opv3: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  pentavalent3: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  fipv2: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  rvv3: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  pcv2: boolean = false;
}

// After 9-12 Months
class NineToTwelveMonthsVaccines {
  @ApiProperty({ default: false })
  @IsBoolean()
  mr1: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  je1: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  pcvBooster: boolean = false;
}

// After 16-24 Months
class SixteenToTwentyFourMonthsVaccines {
  @ApiProperty({ default: false })
  @IsBoolean()
  mr2: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  je2: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  diphtheria: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  dptBooster1: boolean = false;

  @ApiProperty({ default: false })
  @IsBoolean()
  opvBooster: boolean = false;
}

// After 5-6 Years
class FiveToSixYearsVaccines {
  @ApiProperty({ default: false })
  @IsBoolean()
  dptBooster2: boolean = false;
}

export class VaccinationFormUpdate {
  @ApiProperty({ description: 'Date of Birth' })
  @IsDateString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ description: 'notes' })
  @IsOptional()
  @IsString()
  notes: string;

  @ApiProperty({ type: BirthVaccines })
  @ValidateNested()
  @Type(() => BirthVaccines)
  birth: BirthVaccines;

  @ApiProperty({ type: SixWeeksVaccines })
  @ValidateNested()
  @Type(() => SixWeeksVaccines)
  sixWeeks: SixWeeksVaccines;

  @ApiProperty({ type: TenWeeksVaccines })
  @ValidateNested()
  @Type(() => TenWeeksVaccines)
  tenWeeks: TenWeeksVaccines;

  @ApiProperty({ type: FourteenWeeksVaccines })
  @ValidateNested()
  @Type(() => FourteenWeeksVaccines)
  fourteenWeeks: FourteenWeeksVaccines;

  @ApiProperty({ type: NineToTwelveMonthsVaccines })
  @ValidateNested()
  @Type(() => NineToTwelveMonthsVaccines)
  nineToTwelveMonths: NineToTwelveMonthsVaccines;

  @ApiProperty({ type: SixteenToTwentyFourMonthsVaccines })
  @ValidateNested()
  @Type(() => SixteenToTwentyFourMonthsVaccines)
  sixteenToTwentyFourMonths: SixteenToTwentyFourMonthsVaccines;

  @ApiProperty({ type: FiveToSixYearsVaccines })
  @ValidateNested()
  @Type(() => FiveToSixYearsVaccines)
  fiveToSixYears: FiveToSixYearsVaccines;
}
