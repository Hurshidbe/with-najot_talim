import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  HttpException,
} from '@nestjs/common';
import { AdminPanelService } from './admin-panel.service';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/guards/auth.guard';
import { addAdminDto } from './dto/addAdminDto';
@UseGuards(AuthGuard, RolesGuard) //2 ta guardni alohida aalohida yozilsa to'g'ri ishlamas ekan!!!!!!!
@Roles(Role.Superadmin)
@Controller('adminPanel')
export class AdminPanelController {
  constructor(private readonly adminPanelService: AdminPanelService) {}

  @Put('newAdmin') /////  userni emaili va passwordi orqli uni admin etib saylash
  async createnewAdmin(@Body() newAdminData: addAdminDto) {
    try {
      return await this.adminPanelService.newAdminAdder(newAdminData);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('unadmin') /////// adminlar ish ko'rsatib qo'ysa roleni oddiy user qilib qo'yish
  async unadmin(@Body() admindata: addAdminDto) {
    try {
      return await this.adminPanelService.unadmination(admindata);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('addsuperadmin') /////// adminlar ish ko'rsatib qo'ysa roleni oddiy user qilib qo'yish
  async newSuper(@Body() admindata: addAdminDto) {
    try {
      return await this.adminPanelService.newSuper(admindata);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('allAdmins')
  async getAdmins() {
    try {
      return await this.adminPanelService.getAdmins();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('allusers')
  async getallusers() {
    try {
      return await this.adminPanelService.getallusers();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
