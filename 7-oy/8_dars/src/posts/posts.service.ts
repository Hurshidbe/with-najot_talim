import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private postsRepo: Repository<Posts>) {}

  async create(createPostDto: CreatePostDto, texterName: string) {
    try {
      const created = this.postsRepo.create({ ...createPostDto, texterName });
      console.log(created);

      const savedPost = await this.postsRepo.save(created);
      return { status: 'success', savedPost };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(texterName: string) {
    try {
      return await this.postsRepo.find({ where: { texterName } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string, texterName: string) {
    ///////  entityda post idsini number qilib qo'shim kerak
    try {
      const findedPost = await this.postsRepo.findOne({
        where: { texterName, id },
      });
      if (!findedPost)
        throw new HttpException('bu id ostida postingiz mavjud emas', 404);
      return { status: 'topildi', post: findedPost };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto, texterName: string) {
    try {
      const isOwnPost = await this.postsRepo.findOne({
        where: { id, texterName },
      });

      if (!isOwnPost) {
        throw new HttpException('Ozingiz yozgan post ID sini kiriting', 403);
      }

      await this.postsRepo.update(id, {
        text: updatePostDto.text,
        title: updatePostDto.title,
      });

      const updatedPost = await this.postsRepo.findOne({ where: { id } });

      return { status: 'yangilandi', updatedPost };
    } catch (error) {
      throw new HttpException(
        error?.message || 'Xatolik yuz berdi',
        error?.status || 500,
      );
    }
  }

  async remove(id: string, texterName: string) {
    const findedPost = await this.postsRepo.findOne({
      where: { id: id, texterName: texterName },
    });

    if (!findedPost) {
      throw new HttpException(
        `Bu ID ostida sizning postingiz mavjud emas`,
        403,
      );
    }

    await this.postsRepo.delete({ id: id });

    return { message: `Postingiz muvaffaqiyatli ochirildi` };
  }
}
