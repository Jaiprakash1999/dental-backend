import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsNumberString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty decorator
import { UserType } from '../../../utils/enums/UserType.enum';
import { IsNotEmptyString } from 'src/utils/decorator/is_not_empty_string_decorator.util';

export class UserCreate {
  @ApiProperty({
    description: 'The username of the user',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotEmptyString()
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  registrationNo: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  @IsNotEmptyString()
  password: string;

  @ApiProperty({
    description: 'The type of the user',
    enum: UserType,
    example: UserType.ADMIN,
  })
  @IsEnum(UserType)
  @IsNotEmpty()
  userType: UserType;

  @ApiProperty({
    description: "The ID of the user's head (optional)",
    type: Number,
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  headId?: number;

  @ApiProperty({
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The mobile number of the user (optional)',
    example: '+1234567890',
    required: false,
  })
  @IsString()
  @IsNumberString()
  @IsOptional()
  mobileNumber?: string;

  @ApiProperty({
    description: 'The email address of the user (optional)',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The age of the user (optional)',
    example: 30,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Signature of the user',
    example: 'eyfkasjl.asdfkjoijosadf........',
    required: false,
  })
  @IsString()
  @IsOptional()
  signature?: string;

  @ApiProperty({
    description: 'Stamp of the user',
    example: 'eysdfds.sdfjasdjkljdskjdlk.........',
    required: false,
  })
  @IsString()
  @IsOptional()
  stamp?: string;

  @ApiProperty({
    description: 'Photo of the user',
    example: 'eysdfds.sdfjasdjkljdskjdlk.........',
    required: false,
  })
  @IsString()
  @IsOptional()
  photo?: string;
}
