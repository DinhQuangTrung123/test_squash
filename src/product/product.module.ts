import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose'; // 1. Import mongoose module
import { ProductSchema } from './schemas/product.schema'; // 2. Import product schema
import { ProductRepository } from './product.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    forwardRef(() => ProductModule),
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), // 3. Setup the mongoose module to use the product schema
    MulterModule.register({
      dest: './files',
    })
  ],
  controllers: [ProductController],
  
  providers: [
    ProductService,
    ProductRepository
  ],
  exports: [ProductService],
})
export class ProductModule {}
