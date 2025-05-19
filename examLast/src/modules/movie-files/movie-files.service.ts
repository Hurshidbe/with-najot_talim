import { Injectable } from '@nestjs/common';
import { CreateMovieFileDto } from './dto/create-movie-file.dto';
import { UpdateMovieFileDto } from './dto/update-movie-file.dto';

@Injectable()
export class MovieFilesService {
  create(createMovieFileDto: CreateMovieFileDto) {
    return 'This action adds a new movieFile';
  }

  findAll() {
    return `This action returns all movieFiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieFile`;
  }

  update(id: number, updateMovieFileDto: UpdateMovieFileDto) {
    return `This action updates a #${id} movieFile`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieFile`;
  }
}
