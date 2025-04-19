import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.authToken;
    if (!token) {
      throw new HttpException("Oldin registarsiyadan o'tish kerak", 401);
    }
    try {
      const decoded = await this.jwt.verifyAsync(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException('Token muddati eskirgan', 401);
    }
  }
}
