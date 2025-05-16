import { Injectable } from '@nestjs/common';
import { prismaservice } from 'src/prisma/prisma.service';
import { registerDto } from './dto/registerDto';
import { loginDto } from './dto/loginDto';

@Injectable()
export class AuthLoginService {
  constructor(private prisma: prismaservice) {}

  registerchi(userdata: registerDto) {}

  loginchi(logdata: loginDto) {}
}
