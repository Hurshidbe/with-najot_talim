import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
  UseGuards,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async getAll() {
    try {
      return await this.postsService.findAll();
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const postId = +id;
    try {
      return await this.postsService.findById(postId);
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @UseGuards(AuthGuard)
  @Post('create')
  async createPost(@Req() req: any, @Body() body: CreatePostDto) {
    const user = req.user;
    try {
      return await this.postsService.create(body, user);
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @UseGuards(AuthGuard)
  @Put('update/:id')
  async update(
    @Req() req: any,
    @Body() body: UpdatePostDto,
    @Param('id') id: string,
  ) {
    try {
      const postId = +id;
      const userData = req.user;
      return this.postsService.update(postId, body, userData);
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const userData = req.user;
    const postId = +id;
    try {
      return this.postsService.delete(postId, userData);
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
}
