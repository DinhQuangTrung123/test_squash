import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { QuestionEntity } from '../../questions/entity/question.entity';

@Entity({})
export class TitleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => QuestionEntity, (question) => question.title)
  questions: QuestionEntity[];
}
