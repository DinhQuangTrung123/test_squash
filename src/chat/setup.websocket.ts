import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AppService } from '../app.service';
import { ChatService } from './chat.service';
import { ChatEntity } from './entity/chat.entity';

//    9001

@WebSocketGateway({ cors: true })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  // async handleSendMessage(): Promise<void> {
  //     await this.appService.createMessage(payload);
  //     this.server.emit('recMessage', payload);
  // }
  handleEvent(client: Socket, data: string): string {
    // console.log("++++++++++++++++++++++++++")
    // console.log(data)
    this.server.emit('recMessage', data);
    return data;
  }

  // async handleSendMessage(client: Socket, payload: ChatEntity): Promise<void> {
  //     // await this.chatService.createMessage(payload);
  //     console.log("+++++++++++++++++++++++++++++++")
  //     console.log(payload)
  //     this.server.emit('recMessage', payload);
  // }

  afterInit(server: Server) {
    // console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
