import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreate } from './dtos/request/user_create.request';
import { User } from '../entities/dynamic/user.entity';
import { UserUpdate } from './dtos/request/user_update.request';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, In, Not, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dtos/response/login.response';
import { UserType } from '../utils/enums/UserType.enum';
import { UserResponseDto } from './dtos/response/user.response';
import { plainToInstance } from 'class-transformer';
import { mapCreateUser, mapUpdateUser } from './mappers/auth-entity.mapper';
import {
  mapUserResponse,
  mapUserWithoutSignatureAndStamp,
} from './mappers/auth-response.mapper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User, 'dynamicDB')
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // Define the default user details
    const defaultUser = {
      username: 'akshat@parchaa.com',
      password: '$2b$10$lwbgIYDQZTzzNXtR6kKWoe65r0qA6NqhXUYUMB.taPnaX4x.CoXoy',
      userType: UserType.SUPERADMIN,
      name: 'Akshat Goyal',
      isDelete: false,
    };

    // Check if a user with the default username exists
    const existingUser = await this.userRepository.findOneBy({
      username: defaultUser.username,
    });

    if (!existingUser) {
      // Hash the default password

      // Create and save the default user
      const newUser = this.userRepository.create({
        ...defaultUser,
      });
      await this.userRepository.save(newUser);

      console.log(`Default superadmin user created: ${defaultUser.username}`);
    } else {
      console.log('Default superadmin user already exists.');
    }
  }

  async getHeadAndStaff(userType?: UserType) {
    return await this.userRepository.find({
      where: {
        userType: userType
          ? userType
          : In([UserType.MMUHEAD, UserType.MMUSTAFF]),
        isDelete: false,
      },
    });
  }
  async verifyUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { isDelete: false, id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async login(username: string, password: string): Promise<LoginResponse> {
    // Fetch the user by username
    const user: User | null = await this.userRepository.findOne({
      where: { username, isDelete: false },
    });
    // If user not found, throw exception
    if (!user) {
      throw new NotFoundException(`User not found with username: ${username}`);
    }
    if (user.userType == UserType.SUPERADMIN) {
      throw new UnauthorizedException('Super admin cannot login into system');
    }
    // Compare the password with the stored hash
    const passwordMatch: boolean = password == user.password;
    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect password');
    }

    // Prepare the JWT payload (user claims)
    const payload = {
      username: user.username,
      userType: user.userType,
      id: user.id,
      name: user.name,
      headId: user.headId ?? null, // Handle optional fields explicitly
    };

    // Generate the JWT token
    const token: string = this.jwtService.sign(payload);

    // Return the login response with the token and user type
    const loginResponse: LoginResponse = {
      token,
      userType: user.userType,
    };

    return loginResponse;
  }

  async createUser(body: UserCreate): Promise<UserResponseDto> {
    if (body.userType == UserType.SUPERADMIN) {
      throw new UnauthorizedException('You cant create a superadmin');
    }
    const adminUsers = await this.userRepository.find({
      where: { isDelete: false, userType: UserType.ADMIN },
    });
    if (adminUsers.length > 0 && body.userType == UserType.ADMIN) {
      throw new BadRequestException(
        'There is already a admin registered to the system',
      );
    }
    // Allowing only 8 active user at a time
    const allUsers = await this.userRepository.find({
      where: { isDelete: false },
    });
    if (allUsers.length == 10) {
      throw new BadRequestException('There can be maximum of 8 user');
    }
    //If staff is generated then a head has to be assigned
    if (body.userType == UserType.MMUSTAFF) {
      const headUser = await this.userRepository.findOne({
        where: { id: body.headId, isDelete: false },
      });
      if (!headUser || headUser.userType != UserType.MMUHEAD) {
        throw new BadRequestException(
          'There should be a active head assigned to the user',
        );
      }
    }
    // Cheking if the username is already associated with a user
    const existingUser = await this.userRepository.findOne({
      where: { username: body.username, isDelete: false },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }
    try {
      // Hashing the password
      const user = mapCreateUser(body, body.password);
      // saving the new user
      const savedUser = await this.userRepository.save(user);
      return mapUserResponse(savedUser, await this.getUserInfo());
    } catch (error) {
      // Handle all other errors as internal server errors
      throw new InternalServerErrorException(
        'There is some error while saving the user',
      );
    }
  }

  async findAllUsers(
    role: UserType,
    userType?: UserType[], // Optional filter
  ): Promise<UserResponseDto[]> {
    // Determine if we should include deleted users
    const includeDeletedUsers =
      role === UserType.ADMIN || role === UserType.SUPERADMIN;
    const query = {
      ...(userType?.length
        ? {
            userType: In(
              userType.filter((type) => type !== UserType.SUPERADMIN),
            ),
          }
        : { userType: Not(UserType.SUPERADMIN) }),
      ...(includeDeletedUsers ? {} : { isDelete: false }),
    };
    // Fetch users from the database with the correct conditions
    const users: User[] = await this.userRepository.find({
      where: query,
    });

    const nameOfUsers = await this.getUserInfo();

    // Map response based on role
    return users
      .map((user) =>
        includeDeletedUsers
          ? mapUserResponse(user, nameOfUsers)
          : mapUserWithoutSignatureAndStamp(user),
      )
      .sort((a, b) => Number(a.isDelete) - Number(b.isDelete));
  }

  async findUserById(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });

    if (!user) {
      throw new NotFoundException({
        message: `User with ID ${id} not found or has been deleted`,
        statusCode: 404,
      });
    }

    return mapUserWithoutSignatureAndStamp(user);
  }

  async getUserDetails(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });

    // If user not found or deleted, throw exception
    if (!user) {
      throw new NotFoundException({
        message: `User with ID ${id} not found or has been deleted`,
        statusCode: 404,
      });
    }

    return mapUserResponse(user, await this.getUserInfo());
  }

  async updateUser(id: number, body: UserUpdate): Promise<UserResponseDto> {
    let user = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });

    // If user not found or deleted, throw exception
    if (!user) {
      throw new NotFoundException({
        message: `User not found with ID: ${id} or has been deleted`,
        statusCode: 404,
      });
    }

    // Throw error when the headProvided does not exist
    if (body.headId) {
      const headUser = await this.userRepository.findOne({
        where: { id: body.headId, isDelete: false },
      });
      if (!headUser) {
        throw new BadRequestException('Assigned head user not found');
      }
    }

    // Update user fields
    user = mapUpdateUser(user, body);

    // Save updated user to the database
    const updatedUser = await this.userRepository.save(user);

    // Return the updated user response as UserResponseDto
    return mapUserResponse(updatedUser, await this.getUserInfo());
  }

  async deleteUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { id, isDelete: false },
    });

    // If user not found or already deleted, throw exception
    if (!user) {
      throw new NotFoundException({
        message: `User not found with ID: ${id} or already deleted`,
        statusCode: 404,
      });
    }

    // Mark the user as deleted by setting isDelete to true
    user.isDelete = true;

    // Save the updated user with the isDelete flag set to true
    await this.userRepository.save(user);

    // Return the updated user response as UserResponseDto
    return plainToInstance(UserResponseDto, user);
  }

  async getUserInfo(): Promise<object[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
    }));
  }
}
