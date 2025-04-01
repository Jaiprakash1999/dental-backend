import { Controller, Get, Post, Body, Headers, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create_chat.dto';
import { Roles } from 'src/utils/decorator/role_decorator.util';
import { CreateBroadcast } from './dto/create_broadcast.dto';
import { UserType } from 'src/utils/enums/UserType.enum';

@ApiTags('Chat')
@Controller('/api/v1/mmu/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new chat message',
    description: 'Send a new chat message for a specific user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Chat message created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
    example: { success: true },
  })
  create(
    @Headers('id') id: number,
    @Headers('name') name: string,
    @Body() createChatDto: CreateChatDto,
  ) {
    return this.chatService.create(id, createChatDto, name);
  }

  @Roles('ADMIN', 'SUPERADMIN')
  @Post('broadcast')
  @ApiOperation({
    summary: 'Create a new chat message',
    description: 'Send a new chat message for a specific user.',
  })
  @ApiResponse({
    status: 201,
    description: 'Chat message created successfully',
    example: { success: true },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  createBroadcast(
    @Headers('id') id: number,
    @Headers('name') name: string,
    @Body() body: CreateBroadcast,
  ) {
    return this.chatService.broadCast(id, body, name);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all chat messages',
    description: 'Retrieve all chat messages for a specific user.',
  })
  @ApiQuery({
    name: 'userId',
    description: 'The ID of the user whose chat messages are to be retrieved',
    required: true,
    type: Number,
    example: 123,
  })
  @ApiResponse({
    status: 200,
    description: 'List of chat messages retrieved successfully',
    example: [
      {
        messege: 'Hi test message',
        createdAt: '2025-01-21T16:03:48.163Z',
        sent: false,
      },
    ],
  })
  findAll(@Headers('id') id: number, @Query('userId') userId: number) {
    return this.chatService.findAll(id, userId);
  }

  @Get('broadcast')
  @ApiOperation({
    summary: 'Get all chat messages',
    description: 'Retrieve all chat messages for a specific user.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of chat messages retrieved successfully',
    example: [
      {
        message: 'Hi test message',
        createdAt: '2025-01-21T16:03:48.163Z',
        subject: 'Test broadcast',
        receivers: 'ALL',
      },
    ],
  })
  findAllBroadcast(@Headers('id') id: number, @Headers('role') role: UserType) {
    return this.chatService.findAllBroadcast(id, role);
  }
}
