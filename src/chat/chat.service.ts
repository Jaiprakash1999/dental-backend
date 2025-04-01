import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../entities/dynamic/chat.entity';
import { WebsocketGateway } from '../web-socket/web-socket.gateway';
import { In, IsNull, Repository } from 'typeorm';
import { CreateBroadcast } from './dto/create_broadcast.dto';
import { UserType } from 'src/utils/enums/UserType.enum';
import { AuthService } from 'src/auth/auth.service';
import { BroadCast } from 'src/entities/dynamic/broadcast.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat, 'dynamicDB')
    private readonly chatRepository: Repository<Chat>,
    @InjectRepository(BroadCast, 'dynamicDB')
    private readonly broadCastRepository: Repository<BroadCast>,
    private readonly authService: AuthService,
    private readonly notificationGateway: WebsocketGateway,
  ) {}

  async create(id: number, createChatDto: any, name: string) {
    const { message, userId } = createChatDto;
    const user = this.authService.verifyUser(userId);
    await this.chatRepository.save({
      senderId: id,
      message: message,
      receiverId: userId,
    });
    this.notificationGateway.emitNotification(userId, { id, message, name });
    return { success: true };
  }

  async findAll(id: number, userId: number) {
    const chats = await this.chatRepository.find({
      where: [{ senderId: In([userId, id]), receiverId: In([userId, id]) }],
      order: { createdAt: 'ASC' }, // Sort directly in the query
    });
    return chats.map((chat) => {
      return {
        message: chat.message,
        createdAt: chat.createdAt,
        sent: chat.senderId === id,
      };
    });
  }

  async broadCast(id: number, body: CreateBroadcast, name: string) {
    const { subject, message, userType } = body;
    await this.broadCastRepository.save({
      subject: subject,
      senderId: id,
      message: message,
      receiverType: userType ? userType : null,
    });
    const users = await this.authService.getHeadAndStaff(userType);
    for (const user of users) {
      this.notificationGateway.emitNotification(user.id, {
        subject,
        message,
        name,
      });
    }

    return { success: true };
  }

  async findAllBroadcast(id: number, role: UserType) {
    let broadCasts = [];
    if (role == UserType.ADMIN || role == UserType.SUPERADMIN) {
      broadCasts = await this.broadCastRepository.find({
        order: { createdAt: 'ASC' },
      });
    } else {
      broadCasts = await this.broadCastRepository.find({
        where: [
          { receiverType: role }, // When role is defined
          { receiverType: IsNull() }, // Explicitly fetch where receiverType is NULL
        ],
        order: { createdAt: 'ASC' },
      });
    }
    return broadCasts.map((broadCast) => {
      return {
        subject: broadCast.subject,
        message: broadCast.message,
        createdAt: broadCast.createdAt,
        receivers: broadCast.receiverType ? broadCast.receiverType : 'ALL',
      };
    });
  }
}
