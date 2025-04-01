import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/utils/enums/UserType.enum';

export class LoginResponse {
  @ApiProperty({
    description: 'JWT authentication token for the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  token: string;

  @ApiProperty({
    description: 'The type of user (e.g. ADMIN, DOCTOR, etc.)',
    example: 'ADMIN',
  })
  userType: UserType;
}
