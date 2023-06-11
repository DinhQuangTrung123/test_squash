import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductDTO, ParamPagDTO } from './dtos/filter-product.dto';
import { CreateProductDTO } from './dtos/create-product.dto';
import { EntityRepository } from 'database/entity.repository';

@Injectable()
export class ProductRepository extends EntityRepository<ProductDocument>{
  constructor(@InjectModel('Product')  productModel: Model<ProductDocument>) { 
    super(productModel)
  }
}

