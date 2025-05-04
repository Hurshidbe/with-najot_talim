import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request } from 'express';
import authGuard from 'src/guards/auth.guard';
import { UUID } from 'crypto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @UseGuards(authGuard)
  @Post() //// post new post
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    const texterName = req.user['name'];
    return this.postsService.create(createPostDto, texterName);
  }

  @UseGuards(authGuard)
  @Get() //// get all own posts
  findAll(@Req() req: any) {
    const texterName = req.user['name'];
    return this.postsService.findAll(texterName);
  }

  @UseGuards(authGuard)
  @Get(':id') //// get may post by id
  findOne(@Param('id') id: string, @Req() req: any) {
    const texterName = req.user['name'];
    return this.postsService.findOne(id, texterName);
  }

  @UseGuards(authGuard)
  @Patch(':id')
  update(
    @Param('id') id: any,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    console.log(id);
    const texterName = req.user.name;
    return this.postsService.update(texterName, updatePostDto, id);
  }

  @UseGuards(authGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    try {
      const texterName = req.user.name;
      return await this.postsService.remove(id, texterName);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
