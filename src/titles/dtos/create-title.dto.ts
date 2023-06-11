import { IsString } from 'class-validator';

export class CreateTitleDTO {
  @IsString()
  name: string;
}
