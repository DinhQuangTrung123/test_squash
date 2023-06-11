import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CronjobController } from './cronjob.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductService } from 'src/product/product.service'; 
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
     ScheduleModule.forRoot(),
     ProductModule,
  ],
  providers: [CronjobService],
  controllers: [CronjobController],
})
export class CronjobModule {}
