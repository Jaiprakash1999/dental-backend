import { ApiProperty } from '@nestjs/swagger';

class BirthVaccines {
  @ApiProperty({ default: false })
  bcg: boolean;

  @ApiProperty({ default: false })
  opv0: boolean;

  @ApiProperty({ default: false })
  hepatitisB: boolean;
}

class SixWeekVaccines {
  @ApiProperty({ default: false })
  opv1: boolean;

  @ApiProperty({ default: false })
  pentavalent1: boolean;

  @ApiProperty({ default: false })
  rvv1: boolean;

  @ApiProperty({ default: false })
  fipv1: boolean;

  @ApiProperty({ default: false })
  pcv1: boolean;
}

class TenWeekVaccines {
  @ApiProperty({ default: false })
  opv2: boolean;

  @ApiProperty({ default: false })
  pentavalent2: boolean;

  @ApiProperty({ default: false })
  rvv2: boolean;
}

class FourteenWeekVaccines {
  @ApiProperty({ default: false })
  opv3: boolean;

  @ApiProperty({ default: false })
  pentavalent3: boolean;

  @ApiProperty({ default: false })
  fipv2: boolean;

  @ApiProperty({ default: false })
  rvv3: boolean;

  @ApiProperty({ default: false })
  pcv2: boolean;
}

class TwelveMonthVaccines {
  @ApiProperty({ default: false })
  mr1: boolean;

  @ApiProperty({ default: false })
  je1: boolean;

  @ApiProperty({ default: false })
  pcvBooster: boolean;
}

class TwentyFourMonthVaccines {
  @ApiProperty({ default: false })
  mr2: boolean;

  @ApiProperty({ default: false })
  je2: boolean;

  @ApiProperty({ default: false })
  diphtheria: boolean;

  @ApiProperty({ default: false })
  dptBooster1: boolean;

  @ApiProperty({ default: false })
  opvBooster: boolean;
}

class FiveToSixYearVaccines {
  @ApiProperty({ default: false })
  dptBooster2: boolean;
}

export class VaccinationFormResponse {
  @ApiProperty({ description: 'id of the vaccination form' })
  id: string;

  @ApiProperty({ description: 'date of birth of the child' })
  dateOfBirth: string;

  @ApiProperty({ type: BirthVaccines })
  birth: BirthVaccines;

  @ApiProperty({ type: SixWeekVaccines })
  sixWeeks: SixWeekVaccines;

  @ApiProperty({ type: TenWeekVaccines })
  tenWeeks: TenWeekVaccines;

  @ApiProperty({ type: FourteenWeekVaccines })
  fourteenWeeks: FourteenWeekVaccines;

  @ApiProperty({ type: TwelveMonthVaccines })
  nineToTwelveMonths: TwelveMonthVaccines;

  @ApiProperty({ type: TwentyFourMonthVaccines })
  sixteenToTwentyFourMonths: TwentyFourMonthVaccines;

  @ApiProperty({ type: FiveToSixYearVaccines })
  fiveToSixYears: FiveToSixYearVaccines;

  @ApiProperty({})
  notes: string;
}
