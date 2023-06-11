import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitleEntity } from './entity/title.entity';
import { TitlesController } from './titles.controller';
import { TitlesService } from './titles.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TitleEntity])
  ],
  controllers: [TitlesController],
  providers: [TitlesService]
})
export class TitlesModule {}
