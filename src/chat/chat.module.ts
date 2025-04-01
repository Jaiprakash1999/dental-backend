import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/entities/dynamic/chat.entity';
import { WebsocketGateway } from 'src/web-socket/web-socket.gateway';
import { BroadCast } from 'src/entities/dynamic/broadcast.entity';
import { User } from 'src/entities/dynamic/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, BroadCast, User], 'dynamicDB')],
  controllers: [ChatController],
  providers: [ChatService, WebsocketGateway],
})
export class ChatModule {}
