import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class ANCOptionalInvestigationCreate {
  @ApiProperty({ description: 'Date of the visit', required: false })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ description: 'Title of the investigation', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Value of the investigation', required: false })
  @IsOptional()
  @IsString()
  value?: string;
}