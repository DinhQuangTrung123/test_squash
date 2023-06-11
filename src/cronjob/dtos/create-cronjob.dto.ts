import {
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateCronjobDTO {
    @IsString()
    jobName: string;

    @IsString()
    time: string;

  }

  export class CronjobDTO {
    @IsString()
    jobName: string;
  }