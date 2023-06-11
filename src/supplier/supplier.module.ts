import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierEntity } from './entity/supplier.entity';
import { TitleEntity } from 'src/titles/entity/title.entity';
import { TitlesModule } from 'src/titles/titles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierEntity, TitleEntity]),
  ],
  providers: [SupplierService],
  controllers: [SupplierController]
  
})
export class SupplierModule {}
