import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CustomRequest } from 'src/custom-types';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('login')
  async create(@Body() body: CreateUserDto) {
    try {
      const data = await this.usersService.createUser(body);
      return data;
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @Post('register')
  async register(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const { token, data } = await this.usersService.register(body);
      res.cookie('authToken', token, {
        httpOnly: true,
      });
      return { data };
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  async getMe(@Req() req: CustomRequest) {
    return await this.usersService.getMe(req.user);
  }
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      res.clearCookie('authToken', { httpOnly: true });
      return { message: 'Tizimdan chiqdingiz✅' };
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @Get('admin')
  async getAll() {
    try {
      return await this.usersService.getAll();
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
  @Delete('admin/:id')
  async deleteUser(@Param('id') id: string) {
    const userId = +id;
    try {
      return this.usersService.deleteById(userId);
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }
}
