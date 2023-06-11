import { TitleEntity } from '../../titles/entity/title.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({})
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => TitleEntity, (title) => title.questions)
  @JoinColumn({
    name: 'title_id',
    referencedColumnName: 'id',
  })
  // @JoinColumn({ name: 'title_id' })
  title: TitleEntity;
}
