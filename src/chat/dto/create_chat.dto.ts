import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    description: 'The chat message content',
    example: 'Hello, how can I help you?',
  })
  @IsNotEmpty({ message: 'Message should not be empty' })
  @IsString({ message: 'Message must be a string' })
  message: string;

  @ApiProperty({
    description: 'The ID of the user the chat message is associated with',
    example: 123,
  })
  @IsNotEmpty({ message: 'User ID is required' })
  @IsInt({ message: 'User ID must be an integer' })
  @Min(1, { message: 'User ID must be greater than or equal to 1' })
  userId: number;
}
