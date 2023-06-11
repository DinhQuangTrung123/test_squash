import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose'; // 1.1 Import the mongoose module
import { AppService } from './app.service';
import { ProductModule } from './product/product.module'; // 2.1 Import the product module
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { config } from '../database/data-source';
// import { config } from '../orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierModule } from './supplier/supplier.module';
import { LoggerModule } from './logger/logger.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceModule } from './microservice/microservice.module';
import { CronjobModule } from './cronjob/cronjob.module';
import { MessagesModule } from './messages/messages.module';
import { QuestionsModule } from './questions/questions.module';
import { TitlesModule } from './titles/titles.module';
import { CategoryModule } from './category/category.module';
import { ChatModule } from './chat/chat.module';
import 'dotenv/config';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL), // 1.2 Setup the database
    TypeOrmModule.forRoot(config),
    ProductModule,
    UserModule,
    AuthModule,
    CartModule,
    SupplierModule,
    LoggerModule,
    CronjobModule,
    // MicroserviceModule,  // 2.2 Add the product module
    ClientsModule.register([
      {
        name: 'BILLING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'billing',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'billing-consumer',
          },
        },
      },
    ]),
    MessagesModule,
    QuestionsModule,
    TitlesModule,
    CategoryModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
