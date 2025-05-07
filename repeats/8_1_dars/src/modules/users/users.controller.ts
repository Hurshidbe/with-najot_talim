import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { extname } from 'path';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async addUser(
    @Body() userdata: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const imagePath = file ? `/uploads/${file.filename}` : null;
      return await this.usersService.addUser({
        ...userdata,
        userImgUrl: imagePath as any,
      });
    } catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
