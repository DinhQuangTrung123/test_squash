import {
  IsString,
  IsNumber,
  IsArray,
} from 'class-validator';
import { TitleEntity } from 'src/titles/entity/title.entity';
export class CreateSupplierTypeOrmDTO {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsNumber()
    phone: number;
    
    @IsArray()
    title: TitleEntity[]

    constructor(init?: Partial<CreateSupplierTypeOrmDTO>) {
      Object.assign(this, init);
    }

  }


  