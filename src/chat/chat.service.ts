import { Injectable } from '@nestjs/common';
import { ChatEntity } from './entity/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}
  async createMessage(chat: ChatEntity): Promise<ChatEntity> {
    return await this.chatRepository.save(chat);
  }

  async getMessages(): Promise<ChatEntity[]> {
    return await this.chatRepository.find();
  }
}
