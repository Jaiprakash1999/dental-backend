import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsBoolean,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class ANCOptionalInvestigationUpdate {
  @ApiProperty({ description: 'Antenatal care ID', required: false })
  @IsOptional()
  id?: string;

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

  @ApiProperty({
    description: 'Indicates if the record is deleted',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  isDelete: boolean;
}
