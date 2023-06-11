import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateQuestionDTOTest } from './dtos/create-question.dto';
import { QuestionEntity } from './entity/question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

describe(`${QuestionsService.name}`, () => {
  let service: QuestionsService;
  let questionsRepository: Repository<QuestionEntity>;
  let dataSource: DataSource;
  const jestMockResolveData: CreateQuestionDTOTest[] = [
          {
              "id": 1,
              "content": "history la gi 123",
              "title": {
                  "id": 1,
                  "name": "hello IOT"
              }
          },
          {
            "id": 2,
            "content": "history la gi 123",
            "title": {
                "id": 1,
                "name": "hello IOT"
            }
        }
      ]


  beforeEach(async () => {
    // mockQuestionsService.mockReset();
    // mockQuestionsService.mockResolvedValue(jestMockResolveData);

    // mockdataSource = {
    //   findAll: jest.fn()
    // };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionsService],
      providers: [
        QuestionsService,
        {
          provide: getRepositoryToken(QuestionEntity),
          useClass: Repository,
        },
        {
          provide: DataSource,
          useFactory:()=>({
            getRepository: jest.fn().mockReturnThis(),
            createQueryBuilder: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            into: jest.fn().mockReturnThis(),
            values: jest.fn().mockReturnThis(),
            // execute: jest.fn().mockResolvedValue(jestMockResolveData),
            getMany: jest.fn().mockResolvedValue(jestMockResolveData),
          //   getRepository: jest.fn().mockReturnValue({
          //     createQueryBuilder: jest.fn().mockReturnValue({
          //       leftJoinAndSelect: jest.fn().mockReturnValue({
          //         getMany: jest.fn().mockResolvedValue([]),
          //       })
          //     })
          //   })
          // },
          })
        },
      ],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
    questionsRepository = module.get<Repository<QuestionEntity>>(getRepositoryToken(QuestionEntity));
    dataSource = module.get<DataSource>(DataSource);
  });                  

  it('should return an array of questions', async () => {
    // service.findAll.mockResolvedValue(jestMockResolveData)
    const queryBuilder = dataSource.createQueryBuilder();
    const result = await service.findAll();
    expect(dataSource.createQueryBuilder).toHaveBeenCalled();
    expect(dataSource.getRepository).toHaveBeenCalled();
    expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalled();
    expect(queryBuilder.getMany).toHaveBeenCalled();
    console.log(jestMockResolveData)
    // expect(dataSource.leftJoinAndSelect).toHaveBeenCalled();
    expect(result).toEqual(jestMockResolveData);
    // expect(result).toEqual([]);
  });
});
