import {
  IsEnum,
  IsOptional,
  IsString,
  IsNumber,
  IsNumberString,
  ValidateIf,
} from 'class-validator';
import { UserType } from '../../../utils/enums/UserType.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdate {
  @ApiProperty({ description: 'updated username' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'updated password' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  registrationNo: string;

  @ApiProperty({ description: 'updated userType' })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;

  @ApiProperty({ description: 'head id' })
  @IsNumber()
  @IsOptional()
  headId?: number;

  @ApiProperty({ description: 'name of the user' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'updated mobile number of the user' })
  @IsNumberString()
  @IsOptional()
  mobileNumber?: string;

  @ApiProperty({ description: 'email of the user' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'updated age of the user' })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({ description: 'updated signature of the user' })
  @IsString()
  @IsOptional()
  signature?: string;

  @ApiProperty({ description: 'updated stamp of the user' })
  @IsString()
  @IsOptional()
  stamp?: string;

  @ApiProperty({ description: 'updated photo of the user' })
  @IsString()
  @IsOptional()
  photo: string;
}
