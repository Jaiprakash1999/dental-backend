import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { UserType } from 'src/utils/enums/UserType.enum';

export class CreateBroadcast {
  @ApiProperty({
    description: 'The subject of the broadCast',
    example: 'Hello, how can I help you?',
  })
  @IsNotEmpty({ message: 'Subject should not be empty' })
  @IsString({ message: 'Subject must be string' })
  subject: string;

  @ApiProperty({
    description: 'The chat message content',
    example: 'Hello, how can I help you?',
  })
  @IsNotEmpty({ message: 'Message should not be empty' })
  @IsString({ message: 'Message must be a string' })
  message: string;

  @ApiProperty({
    description: 'The type of the user',
    example: 123,
  })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType;
}
