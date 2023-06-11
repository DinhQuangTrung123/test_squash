import {
  Controller,
  Post,
  Body,
  Get,
  Inject,
  ConsoleLogger,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { QuestionsService } from './questions.service';
import { CreateQuestionDTO } from './dtos/create-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(
    @Inject('QuestionsService')
    private readonly questionService: QuestionsService,
  ) {}

  @Get('/getAllQuestions')
  async getQuestions() {
    const allquestions = await this.questionService.findAll();
    return allquestions;
  }

  @Post('/CreateQuestions')
  async CreateQuestions(@Body() createQuestionDTO: CreateQuestionDTO) {
    const allquestions = await this.questionService.create(createQuestionDTO);
    return allquestions;
  }

  @Get('/GetOneQuestions/:id')
  async GetOneQuestions(@Param('id') id: number) {
    const question = await this.questionService.findOnequestion(id);
    return question;
  }

  @Put('/UpdateOneQuestions/:id')
  async UpdateOneQuestions(
    @Param('id') id: number,
    @Body() updateQuestionDTO: CreateQuestionDTO,
  ) {
    const question = await this.questionService.updateOnequestion(
      id,
      updateQuestionDTO,
    );
    return question;
  }

  @Delete('/BulkDeleteQuestions')
  async BulkDeleteQuestions(@Body('ids') ids: number[]) {
    // console.log(ids)
    const question = await this.questionService.bulkdeleteOnequestion(ids);
    return {
      'delete questions': 'is success',
    };
  }

  // @Get('/TestrawQuery')
  // async Testrawquery(){
  //     const question = await this.questionService.testrawquery();
  //     return question;
  // }
}
