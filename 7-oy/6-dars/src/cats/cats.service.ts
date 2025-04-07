import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catRepo: Repository<Cat>,
  ) {}

  //// get all cats
  async findAll(): Promise<Cat[]> {
    try {
      return await this.catRepo.find();
    } catch (error) {
      return error;
    }
  }
  //// et cat by id

  async findCatBYID(id: number) {
    return await this.catRepo.findOneBy({ id });
  }
  //// add new cat
  async addNewCat(data: Cat): Promise<Cat> {
    try {
      const newCat = this.catRepo.create(data);
      return await this.catRepo.save(newCat);
    } catch (error) {
      return error.message;
    }
  }
  //// update cat info
  async updateCatInfo(id: number, data) {}
  //// delete cat by id
  async deleteCatBYID(id: number) {
    if (!id) {
      return 'bu id ostida mushuk topilmadi';
    } else {
      await this.catRepo.delete({ id });
      return { message: 'cat delete is successfully' };
    }
  }
}
