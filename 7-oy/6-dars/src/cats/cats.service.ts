import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cats.entity';

import { catsModule } from './cats.module';
import { error } from 'console';
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

  async findCatBYID(id: number): Promise<Cat | string | null> {
    try {
      const searching_cat = await this.catRepo.findOneBy({ id });
      if (!searching_cat) {
        return 'Bu id ostida mushuk mavjud emas';
      } else {
        return searching_cat;
      }
    } catch (error) {
      throw new Error('Xatolik yuz berdi: ' + error.message);
    }
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
  async updateCatInfo(id: number, catdata: Cat): Promise<object> {
    const cat = await this.catRepo.findOneBy({ id });
    if (!cat) {
      throw new error('Cat could not be found');
    }

    cat.laqab = catdata.laqab;
    cat.narxi = catdata.narxi;
    cat.zoti = catdata.zoti;
    cat.tugulgan_sana = catdata.tugulgan_sana;

    await this.catRepo.save(cat);

    return { message: 'Cat info updated successfully', data: cat };
  }
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
