import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotEmptyString } from '../../../utils/decorator/is_not_empty_string_decorator.util';

export class LoginRequest {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john.doe',
  })
  @IsString()
  @IsNotEmpty({ message: 'username should be provided' })
  @IsNotEmptyString({ message: 'username should not be a empty string' })
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securePassword',
  })
  @IsString()
  @IsNotEmpty({ message: 'password should be provided' })
  @IsNotEmptyString({ message: 'password should not be a empty string' })
  password: string;
}
