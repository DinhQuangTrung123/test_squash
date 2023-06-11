import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('start')
  async Chat(@Res() res) {
    // console.log("+++++++++++++++++++++++++++++++")
    const messages = await this.chatService.getMessages();
    res.json(messages);
  }
}
