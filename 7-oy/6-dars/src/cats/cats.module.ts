import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class catsModule {}
