import {
  IsString,
  IsEmpty,
  IsNumber,
  IsNumberString,
  IsArray,
} from 'class-validator';

export class FilterTitleDTO{
  @IsNumberString()
  id: number;
} 

export class ArrayTitleDTO{
  @IsArray()
  ids: number[];
}

