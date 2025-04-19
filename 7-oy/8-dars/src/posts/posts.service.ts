import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}
  async findAll() {
    return await this.postRepo.find();
  }
  async create(createPostDto: CreatePostDto, userdata: any) {
    const postData = {
      ...createPostDto,
      author: {
        id: userdata.user_id,
        email: userdata.user_email,
      },
    };
    const post = this.postRepo.create(postData);
    const newPost = await this.postRepo.save(post);
    return { message: 'Post muvafaqiyatli yaratildi✅', newPost };
  }

  async findById(id: number) {
    const findPost = await this.postRepo.findOne({ where: { id: id } });
    if (!findPost)
      throw new HttpException('Bunday id li post majvud emas❗', 401);
    return {
      message: 'Post topildi✅',
      post: findPost,
    };
  }

  async update(id: number, datas: UpdatePostDto, userData: any) {
    const findPost = await this.postRepo.findOne({ where: { id: id } });
    if (!findPost) throw new HttpException('Bunday id li post topilmadi', 500);
    if (findPost.author.email !== userData.user_email)
      throw new HttpException(
        'Bu postni taxrirlashga sizga ruxsat berilmagan',
        500,
      );
    if (
      findPost.author.email === userData.user_email ||
      userData.role === 'admin'
    ) {
      const updatedPost = this.postRepo.merge(findPost, datas);
      const data = await this.postRepo.save(updatedPost);
      return {
        message: 'Post taxrirlandi✅',
        data,
      };
    }
  }

  async delete(id: number, userData: any) {
    const findPost = await this.postRepo.findOne({ where: { id: id } });
    if (!findPost) throw new HttpException('Bunday id li post topilmadi', 401);
    if (findPost.author.email !== userData.user_email)
      throw new HttpException(
        "Bu postni o'chirishga sizga ruxsat berilmagan",
        500,
      );
    if (
      findPost.author.email === userData.user_email ||
      userData.role === 'admin'
    ) {
      await this.postRepo.remove(findPost);
      return {
        message: "Post o'chirildi",
      };
    }
  }
}
