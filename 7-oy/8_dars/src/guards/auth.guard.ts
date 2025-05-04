import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
class authGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies.authToken;
    if (!token)
      throw new HttpException(`token topilmadi. iltimos logindan o'ting`, 402);
    try {
      const decoded = await this.jwt.verifyAsync(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new HttpException(
        `token muddati eskirgan, iltimos qaytadan login qiling`,
        403,
      );
    }
  }
}
export default authGuard;
