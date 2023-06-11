import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './microservice.service';
import { AppService } from '../app.service';
import { CreateOrderRequest } from './dtos/create-user.dto';
@Controller('/test')
export class AuthController {
  constructor(private readonly appService: AppService) {}

  @Post('/')
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest);
  }
}
