import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, EntityManager, DataSource, In } from 'typeorm';
import {
  InjectRepository,
  InjectEntityManager,
  InjectDataSource,
} from '@nestjs/typeorm';
import { QuestionEntity } from './entity/question.entity';
import { CreateQuestionDTO } from './dtos/create-question.dto';
import { TitleEntity } from 'src/titles/entity/title.entity';
import { Inject } from '@nestjs/common/decorators';
// import data_Source from 'database/data-source';
// import { data_Source } from 'database/data-source';
// import { MysqlDataSource } from 'orm.config';
// import { config } from 'database/data-source';
// import { DataSource } from 'typeorm';
// import {datasource}

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionsRepository: Repository<QuestionEntity>,
    // @InjectEntityManager() private questionsManager: EntityManager,
    @InjectDataSource() private dataSource: DataSource, // @Inject(DataSource) private dataSource: DataSource
  ) {}

  // async findAll(): Promise<QuestionEntity[]>{
  //     return this.questionsRepository.find({});
  // }

  async findAll() {
    // const questions = this.questionsRepository.find();
    return await this.dataSource
      .getRepository(QuestionEntity)
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.title', 'title')
      // .select(['questions.content', 'title.name', 'title.id'])
      .getMany();
    // .getRawMany(); // hiện thị các khóa ngoại trên cùng một cấp json
  }

  async create(createQuestionDTO: CreateQuestionDTO) {
    // const title = this.questionsRepository.findOneBy({id});
    // const newQuestions = this.questionsRepository.create(createQuestionDTO);
    // return this.questionsRepository.save(newQuestions);
    const result = await this.questionsRepository
      .createQueryBuilder()
      .insert()
      .into(QuestionEntity)
      .values({
        content: createQuestionDTO.content,
        title: {
          id: createQuestionDTO.Idtitle,
        },
      })
      .execute();
    return result;
    // .createQueryBuilder()
    // .insert()
    // .into(EmployeePayroll)
    // .values(employeePayroll)
    // .execute();
  }

  async findOnequestion(id: number): Promise<QuestionEntity> {
    const result = await this.dataSource.getRepository(QuestionEntity).findOne({
      where: {
        id: id,
      },
      relations: {
        title: true,
      },
    });

    if (!result) {
      throw new NotFoundException('Id questions does not exist!');
    }
    return result;
  }

  async updateOnequestion(id: number, updateQuestionDTO: CreateQuestionDTO) {
    // console.log(id)
    // console.log(updateQuestionDTO)
    const result = await this.dataSource
      .createQueryBuilder()
      .update(QuestionEntity)
      .set({
        content: updateQuestionDTO.content,
        title: {
          id: updateQuestionDTO.Idtitle,
        },
      })
      .where('id = :id', { id: id })
      .execute();
    if (!result) {
      throw new NotFoundException('Id questions does not exist!');
    }
    return result;
  }

  async bulkdeleteOnequestion(ids: number[]) {
    // const find_ids =  await this.dataSource
    //                 .getRepository(QuestionEntity)
    //                 .createQueryBuilder()
    //                 .where({id: In(ids)})
    //                 .getMany()
    const find_ids = await this.dataSource
      .getRepository(QuestionEntity)
      .createQueryBuilder('questions')
      .where('questions.id in(:...ids)', { ids: ids })
      .getMany();
    console.log(find_ids.length);
    if (find_ids.length != ids.length) {
      throw new NotFoundException('Some id questions does not exist!');
    } else {
      const result = await this.dataSource
        .createQueryBuilder()
        .delete()
        .from(QuestionEntity)
        .where({ id: In(ids) })
        .execute();
    }
    // return find_ids
  }
  // async getquestionbyid(id:string):  Promise<QuestionEntity>{

  //     const firstQuestion = await dataSource
  //         .getRepository(QuestionEntity)
  //         .createQueryBuilder("content")
  //         .where("user.id = :id", { id: 1 })
  //         .getOne()
  //     return firstQuestion
  // }

  // async testrawquery(){
  //     const queryRunner = await data_Source.createQueryRunner();
  //     const result = await queryRunner.manager.query(
  //         'select * from public.question_entity as question'
  //     );
  //     return result
  // }
}
