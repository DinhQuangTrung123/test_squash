import {
  IsString,
  IsEmpty
} from 'class-validator';

export class ParamPagDTO{
  offset: 1;
  limit: 1;
} 

export class FilterDTO{
  search: string;
  category: string;
  id:string;
  price:number;
} 

export class ProductDTO {
    filter: FilterDTO;
    page: ParamPagDTO;
  } 

