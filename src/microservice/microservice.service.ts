import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
// import { CreateUserDto } from '@nestjs-microservices/shared/dto';
import { CreateOrderRequest } from './dtos/create-user.dto';
import { OrderCreatedEvent } from './order-created.event';
@Injectable()
export class AuthService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka
  ) {}

   createOrder({ userId, price }: CreateOrderRequest) {
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent('123', userId, price),
    );
  }
}