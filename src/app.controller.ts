import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './microservice/dtos/create-user.dto';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest);
  }

  // @Get('/api/chat')
  // async Chat(@Res() res) {
  //   console.log()
  //   const messages = await this.appService.getMessages();
  //   res.json(messages);
  // }
}
