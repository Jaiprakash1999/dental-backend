import { IsOptional, IsDateString, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Breasts } from 'src/utils/enums/breasts.enum';
import { NIPPLES } from 'src/utils/enums/nipples.enum';
import { UTERUS_TENDERNESS } from 'src/utils/enums/uterusTenderness.enum';
import { BLEEDING_PV } from 'src/utils/enums/bleedingPv.enum';
import { LOCHIA } from 'src/utils/enums/lochia.enum';
import { EPISIOTOMY_TEAR } from 'src/utils/enums/episiotomyTear.enum';

export class PNCPostpartumCareCreate {
  @ApiProperty({
    description: 'Day',
    required: false,
    example: '1st day',
  })
  @IsString()
  @IsOptional()
  day: string;

  @ApiProperty({
    description: 'Date of postpartum care',
    required: false,
    example: '2025-02-15',
  })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ description: 'Any complaints', required: false })
  @IsOptional()
  @IsString()
  anyComplaints?: string;

  @ApiProperty({ description: 'Pallor condition', required: false })
  @IsOptional()
  @IsString()
  pallor?: string;

  @ApiProperty({ description: 'Pulse rate', required: false })
  @IsOptional()
  @IsString()
  pulseRate?: string;

  @ApiProperty({ description: 'Blood pressure', required: false })
  @IsOptional()
  @IsString()
  bloodPressure?: string;

  @ApiProperty({
    description: 'Body temperature (°C)',
    required: false,
    example: 36.5,
  })
  @IsOptional()
  temperature?: number;

  @ApiProperty({
    description: 'Breasts condition',
    required: false,
    enum: Breasts,
  })
  @IsOptional()
  @IsEnum(Breasts)
  breasts?: Breasts;

  @ApiProperty({
    description: 'Nipples condition',
    required: false,
    enum: NIPPLES,
  })
  @IsOptional()
  @IsEnum(NIPPLES)
  nipples?: NIPPLES;

  @ApiProperty({
    description: 'Uterus tenderness',
    required: false,
    enum: UTERUS_TENDERNESS,
  })
  @IsOptional()
  @IsEnum(UTERUS_TENDERNESS)
  uterusTenderness?: UTERUS_TENDERNESS;

  @ApiProperty({
    description: 'Bleeding PV condition',
    required: false,
    enum: BLEEDING_PV,
  })
  @IsOptional()
  @IsEnum(BLEEDING_PV)
  bleedingPV?: BLEEDING_PV;

  @ApiProperty({
    description: 'Lochia condition',
    required: false,
    enum: LOCHIA,
  })
  @IsOptional()
  @IsEnum(LOCHIA)
  lochia?: LOCHIA;

  @ApiProperty({
    description: 'Episiotomy tear condition',
    required: false,
    enum: EPISIOTOMY_TEAR,
  })
  @IsOptional()
  @IsEnum(EPISIOTOMY_TEAR)
  episiotomyTear?: EPISIOTOMY_TEAR;

  @ApiProperty({ description: 'Pedal Edema', required: false })
  @IsOptional()
  pedalEdema: boolean;

  @ApiProperty({
    description: 'Family planning counseling details',
    required: false,
  })
  @IsOptional()
  @IsString()
  familyPlanningCounselling?: string;

  @ApiProperty({ description: 'Other complications', required: false })
  @IsOptional()
  @IsString()
  otherComplications?: string;
}
