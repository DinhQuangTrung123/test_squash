import { Injectable, Body, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TitleEntity } from './entity/title.entity';
import { CreateTitleDTO } from './dtos/create-title.dto';
import { FilterTitleDTO, ArrayTitleDTO } from './dtos/filter-title.dto';
import { In } from 'typeorm';

@Injectable()
export class TitlesService {
  constructor(
    @InjectRepository(TitleEntity)
    private titleEntity: Repository<TitleEntity>,
  ) {}

  async findAll(): Promise<TitleEntity[]> {
    return await this.titleEntity.find();
  }

  async create(title: CreateTitleDTO): Promise<TitleEntity> {
    console.log('+++++++++++++++++++++++++++++++++');
    return await this.titleEntity.save(title);
  }

  async findOne(title: FilterTitleDTO): Promise<TitleEntity> {
    const result = await this.titleEntity.findOneBy({
      id: title.id,
    });
    if (!result) throw new NotFoundException('Title does not exist!');
    return result;
  }

  async BulkDeleteTitle(arrayTitleDTO: ArrayTitleDTO): Promise<any> {
    console.log('++++++++++++++++++++++++=');
    const result = await this.titleEntity.findBy({ id: In(arrayTitleDTO.ids) });
    if (result.length != arrayTitleDTO.ids.length || result.length == 0) {
      throw new NotFoundException('Some Title does not exist!');
      // console.log("Some Title does not exist!")
    }
    await this.titleEntity.remove(result);
    return result;
  }

  async UpdateTitle(
    filterTitleDTO: FilterTitleDTO,
    updateTitleDTO: CreateTitleDTO,
  ): Promise<TitleEntity> {
    // const result = await this.titleEntity.findOneBy({
    //     id:filterTitleDTO.id
    // });
    const result = await this.titleEntity.preload({
      id: Number(filterTitleDTO.id),
      ...updateTitleDTO,
    });
    if (!result) {
      throw new NotFoundException('Some Title does not exist!');
    }
    const resultupdate = this.titleEntity.save(result);

    return resultupdate;
  }
}
