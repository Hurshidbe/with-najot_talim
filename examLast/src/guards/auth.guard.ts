import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.authtoken;
    if (!token)
      throw new HttpException("token yo'q. iltomos ro'yhatdan o'ting", 402);
    try {
      const decoded = this.jwt.verifyAsync(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException('token expired', 403);
    }
  }
}
