import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';

@UseGuards(AuthGuard, RolesGuard) //2 ta guardni alohida aalohida yozilsa to'g'ri ishlamas ekan!!!!!!!
@Roles(Role.Superadmin || Role.Admin)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Post()
  async addCategory(@Body() newcate: CreateCategoryDto) {
    try {
      return await this.categoriesService.createCategory(newcate);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('all')
  getAll() {
    try {
      return this.categoriesService.getall();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.categoriesService.deleteCategoryById(id);
    } catch (error) {}
  }
}
