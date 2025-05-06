import { Module } from '@nestjs/common';
import { CategorisService } from './categoris.service';
import { CategorisController } from './categoris.controller';

@Module({
  controllers: [CategorisController],
  providers: [CategorisService],
})
export class CategorisModule {}
