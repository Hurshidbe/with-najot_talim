import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { updatepassDto } from './dto/updatePass.dto';

@Module({
  imports: [TypeOrmModule.forFeature([User, updatepassDto])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
