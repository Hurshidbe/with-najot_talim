import { Injectable } from '@nestjs/common';
import { CreateCategorisDto } from './dto/create-categoris.dto';
import { UpdateCategorisDto } from './dto/update-categoris.dto';

@Injectable()
export class CategorisService {
  create(createCategorisDto: CreateCategorisDto) {
    return 'This action adds a new categoris';
  }

  findAll() {
    return `This action returns all categoris`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoris`;
  }

  update(id: number, updateCategorisDto: UpdateCategorisDto) {
    return `This action updates a #${id} categoris`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoris`;
  }
}
