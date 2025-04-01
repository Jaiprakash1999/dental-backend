import { User } from 'src/entities/dynamic/user.entity';
import { UserType } from 'src/utils/enums/UserType.enum';
import { BadRequestException } from '@nestjs/common';
import { UserUpdate } from '../dtos/request/user_update.request';
import { UserCreate } from '../dtos/request/user_create.request';

export function mapUpdateUser(user: User, body: UserUpdate): User {
  user.username = body.username ? body.username : user.username;
  user.userType = body.userType ? body.userType : user.userType;
  user.password = body.password ? body.password : user.password;
  user.headId =
    body.userType === UserType.MMUSTAFF
      ? body.headId ||
        (() => {
          throw new BadRequestException(
            'Please assign head if you are changing the userType to MMU staff',
          );
        })()
      : user.headId;
  user.name = body.name ? body.name : user.name;
  user.mobileNumber = body.mobileNumber ? body.mobileNumber : user.mobileNumber;
  user.email = body.email ? body.email : user.email;
  user.age = body.age ? body.age : user.age;
  user.registrationNo = body.registrationNo
    ? body.registrationNo
    : user.registrationNo;
  user.signature = body.signature ? body.signature : user.signature;
  user.stamp = body.stamp ? body.stamp : user.stamp;
  user.photo = body.photo ? body.photo : user.photo;
  return user;
}

export function mapCreateUser(body: UserCreate, hashedPassword: string): User {
  const user = new User();
  user.username = body.username;
  user.password = hashedPassword;
  user.userType = body.userType;
  user.headId = body.headId;
  user.name = body.name;
  user.registrationNo = body.registrationNo;
  user.mobileNumber = body.mobileNumber;
  user.email = body.email;
  user.age = body.age;
  user.photo = body.photo;
  user.signature = body.signature;
  user.stamp = body.stamp;
  return user;
}
