import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateOrderRequest } from './microservice/dtos/create-user.dto';
import { OrderCreatedEvent } from './microservice/order-created.event';
import { ChatEntity } from './chat/entity/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka, // @InjectRepository(ChatEntity) private readonly chatRepository: Repository<ChatEntity>,
  ) {}
  getHello(): string {
    return 'Hello World 456!';
  }

  createOrder({ userId, price }: CreateOrderRequest) {
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent('123', userId, price),
    );
  }

  processPayment(makePaymentDto: CreateOrderRequest) {
    const { userId, price } = makePaymentDto;
    console.log('process payment');
    this.billingClient
      .send('get_user', JSON.stringify({ userId }))
      .subscribe((user: CreateOrderRequest) => {
        console.log(`process payment for user ${user} - amount: ${price}`);
      });
  }

  onModuleInit() {
    this.billingClient.subscribeToResponseOf('get_user');
  }

  // async createMessage(chat: ChatEntity): Promise<ChatEntity> {
  //   return await this.chatRepository.save(chat);
  // }

  // async getMessages(): Promise<ChatEntity[]> {
  //   return await this.chatRepository.find();
  // }
}
