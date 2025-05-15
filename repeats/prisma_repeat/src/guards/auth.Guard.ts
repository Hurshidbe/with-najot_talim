import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class authGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.authToken;
    if (!token) throw new HttpException(`token yo'q`, 401);
    try {
      const decoded = this.jwtService.verifyAsync(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException(
        `token muddati eskirgan iltimos qayta logindan o'ting`,
        403,
      );
    }
  }
}
