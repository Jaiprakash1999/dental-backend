import { User } from 'src/entities/dynamic/user.entity';
import { UserResponseDto } from '../dtos/response/user.response';

export function mapUserResponse(
  user: User,
  userNames: object[],
): UserResponseDto {
  const response = new UserResponseDto();
  response.id = user.id;
  response.username = user.username;
  response.userType = user.userType;
  response.headId = user.headId;
  response.headName = user.headId
    ? userNames.find((name) => name['id'] == user.headId)['name']
    : null;
  response.name = user.name;
  response.mobileNumber = user.mobileNumber;
  response.email = user.email;
  response.age = user.age;
  response.registrationNo = user.registrationNo;
  response.signature = user.signature;
  response.photo = user.photo;
  response.stamp = user.stamp;
  response.createdAt = user.createdAt;
  response.updatedAt = user.updatedAt;
  response.isDelete = user.isDelete;
  return response;
}

export function mapUserWithoutSignatureAndStamp(user: User): UserResponseDto {
  const response = new UserResponseDto();
  response.id = user.id;
  response.username = user.username;
  response.userType = user.userType;
  response.headId = user.headId;
  response.name = user.name;
  response.mobileNumber = user.mobileNumber;
  response.email = user.email;
  response.registrationNo = user.registrationNo;
  response.age = user.age;
  response.signature = user.signature;
  response.photo = null;
  response.stamp = null;
  response.createdAt = user.createdAt;
  response.updatedAt = user.updatedAt;
  response.isDelete = user.isDelete;
  return response;
}
