import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './app.service';

interface InewUser {
  name: string;
  email: string;
  password: string;
  age: number;
}
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  userlar: InewUser[] = [];
  @Post('/user')
  addUser(@Body() newUser: InewUser) {
    if (!newUser.age || !newUser.email || !newUser.password || !newUser.name) {
      return "kiritilgan ma'lumotlar qolipga mos emas";
    } else {
      this.userlar.push(newUser);
      return { message: 'user added successfully', data: newUser };
    }
  }

  @Get('/users')
  getAllUsers() {
    return this.userlar;
  }

  @Get('/user/:id')
  getUserById(@Param('id') id: string) {
    const user = this.userlar[+id];
    if (!user) {
      return 'user topilmadi';
    } else {
      return user;
    }
  }

  @Put('/user/:id')
  updateUserById(@Param('id') id: string, @Body() updateduser: InewUser) {
    const userindex = +id;
    if (userindex < 0) {
      return 'id lar faqat musbat sonlarda kiritilishi kerak';
    }
    if (userindex >= this.userlar.length) {
      return 'bu id ostida user mavjud emas';
    } else {
      const user = this.userlar[userindex];
      if (updateduser.name) user.name = updateduser.name;
      if (updateduser.age) user.age = updateduser.age;
      if (updateduser.email) user.email = updateduser.email;
      if (updateduser.password) user.password = updateduser.password;

      return {
        message: 'yangilandi',
        user: user,
      };
    }
  }

  @Delete('/user/:id')
  deleteUserById(@Param('id') id: string) {
    const userIndex = +id;

    if (userIndex < 0 || userIndex >= this.userlar.length) {
      return `Foydalanuvchi ${id} topilmadi`;
    }

    const deletedUser = this.userlar.splice(userIndex, 1);

    return {
      message: 'User ochirildi',
      deletedUser: deletedUser[0],
    };
  }
}
