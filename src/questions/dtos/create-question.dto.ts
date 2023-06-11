import {
  IsString,
  IsNumber,
  isEmpty,
} from 'class-validator';

export class CreateQuestionDTO {
    @IsString()
    content: string;
    
    @IsNumber()
    Idtitle: number;
  }

export class CreateQuestionDTOTest {
    id:number
    @IsString()
    content: string;
    title: Object;
  }

  