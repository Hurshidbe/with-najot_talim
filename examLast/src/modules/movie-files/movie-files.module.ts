import { Module } from '@nestjs/common';
import { MovieFilesService } from './movie-files.service';
import { MovieFilesController } from './movie-files.controller';

@Module({
  controllers: [MovieFilesController],
  providers: [MovieFilesService],
})
export class MovieFilesModule {}
