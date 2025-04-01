import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  Headers,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserCreate } from './dtos/request/user_create.request';
import { UserUpdate } from './dtos/request/user_update.request';
import { LoginResponse } from './dtos/response/login.response';
import { LoginRequest } from './dtos/request/login.request';
import { Roles } from '../utils/decorator/role_decorator.util';
import { UserType } from '../utils/enums/UserType.enum';
import { UserResponseDto } from './dtos/response/user.response';
import { ParseEnumArrayPipe } from 'src/utils/parse-enum-array.pipe';

@ApiTags('Authentication')
@Controller('/api/v1/mmu/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate a user using their credentials.',
  })
  @ApiBody({ type: LoginRequest, description: 'Login request payload' })
  @ApiResponse({
    status: 200,
    type: LoginResponse,
    description: 'Login successful',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Roles('SUPERADMIN', 'ADMIN')
  @Post('/user')
  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user in the system.',
  })
  @ApiBody({ type: UserCreate, description: 'User creation payload' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createUser(
    @Body() createUserDto: UserCreate,
  ): Promise<UserResponseDto> {
    const createdUser = await this.authService.createUser(createUserDto);
    return createdUser; // Return the created user as a UserResponseDto
  }

  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @Get('/user/getAll')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve all users filtered by user type.',
  })
  @ApiQuery({
    name: 'userType',
    type: [String],
    required: false,
    description: 'Filter users by type',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden access' })
  async findAllUsers(
    @Headers('role') role: UserType,
    @Query('userType', new ParseEnumArrayPipe(UserType)) userTYpe: UserType[],
  ) {
    return this.authService.findAllUsers(role, userTYpe);
  }

  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @Get('/user/getDetails')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve all users filtered by user type.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users retrieved successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden access' })
  async getUserDetails(@Headers('id') id: number) {
    return this.authService.getUserDetails(id);
  }

  @Roles('SUPERADMIN', 'ADMIN', 'MMUHEAD', 'MMUSTAFF')
  @Get('/user/:id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a user by their unique ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findUserById(@Param('id') id: number) {
    return this.authService.findUserById(id);
  }

  @Roles('SUPERADMIN', 'ADMIN')
  @Put('/user/:id')
  @ApiOperation({
    summary: 'Update user',
    description: 'Update an existing user by their unique ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: UserUpdate, description: 'User update payload' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UserUpdate) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Roles('SUPERADMIN', 'ADMIN')
  @Delete('/user/:id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete a user by their unique ID.',
  })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Headers('id') id: number, @Param('id') deleteId: number) {
    if (id == deleteId) {
      throw new BadRequestException('Cant Delete Yourself');
    }
    return this.authService.deleteUser(deleteId);
  }
}
