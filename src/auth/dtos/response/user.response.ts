import { ApiProperty } from '@nestjs/swagger';
import { UserType } from '../../../utils/enums/UserType.enum';

export class UserResponseDto {
  id: number;
  username: string;
  userType: UserType;
  registrationNo: string;
  headName: string;
  headId: number | null;
  name: string;
  mobileNumber: string | null;
  email: string | null;
  age: number | null;
  photo: string | null;
  signature: string | null;
  stamp: string | null;
  createdAt: Date;
  updatedAt: Date;
  isDelete: boolean;
}
