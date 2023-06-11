import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { TitleEntity } from './entity/title.entity';
import { TitlesService } from './titles.service';
import { CreateTitleDTO } from './dtos/create-title.dto';
import { FilterTitleDTO, ArrayTitleDTO } from './dtos/filter-title.dto';

@Controller('titles')
export class TitlesController {
  constructor(private readonly titlesService: TitlesService) {}

  @Get('/GetAllTitle')
  async GetAllTitle(): Promise<TitleEntity[]> {
    return await this.titlesService.findAll();
  }

  @Post('/CreateTitle')
  async CreateTitle(@Body() title: CreateTitleDTO): Promise<TitleEntity> {
    return await this.titlesService.create(title);
  }

  @Get('/GetDetailTitle/:id')
  async GetDetailTitle(@Param() title: FilterTitleDTO): Promise<TitleEntity> {
    // console.log(title.id)
    // return {"result": "ok"}
    return await this.titlesService.findOne(title);
  }

  @Delete('/DeleteListTitle/')
  async DeleteListTitle(@Body() title: ArrayTitleDTO) {
    const result = await this.titlesService.BulkDeleteTitle(title);
    // if (!result) throw new NotFoundException('Some title does not exist');
    return { result: 'success' };
    // return await this.titlesService.findOne(title)
  }

  @Put('/UpdateTitle/:id')
  async UpdateTitle(
    @Param() title: FilterTitleDTO,
    @Body() updateTitleDTO: CreateTitleDTO,
  ): Promise<TitleEntity> {
    // console.log(title)
    // console.log(updateTitleDTO)
    const result = await this.titlesService.UpdateTitle(title, updateTitleDTO);
    // if (!result) throw new NotFoundException('Some title does not exist');
    return result;
    // return await this.titlesService.findOne(title)
  }
}
