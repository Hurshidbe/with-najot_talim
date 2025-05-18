import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { prismaservice } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: prismaservice) {}

  async createCategory(newCate: CreateCategoryDto) {
    const savedCate = await this.prisma.categories.create({ data: newCate });
    return { status: 'success', savedCate };
  }

  getall() {
    return this.prisma.categories.findMany();
  }

  async deleteCategoryById(id: string) {
    try {
      await this.prisma.categories.delete({ where: { id } });
      return { status: 'success', message: `Category with id ${id} deleted.` };
    } catch (error) {
      // Agar category topilmasa yoki boshqa xatolik bo‘lsa
      return { status: 'error', message: error.message };
    }
  }
}
