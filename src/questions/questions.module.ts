import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionsController],
  providers: [
    {
      provide: 'QuestionsService',
      useClass: QuestionsService,
    },
  ],
})
export class QuestionsModule {}
