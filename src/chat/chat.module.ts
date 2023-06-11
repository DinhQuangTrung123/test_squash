import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from './entity/chat.entity';
import { AppGateway } from './setup.websocket';

@Module({
  imports: [ TypeOrmModule.forFeature([ChatEntity])],
  providers: [ChatService, AppGateway],
  controllers: [ChatController],
})
export class ChatModule {}
