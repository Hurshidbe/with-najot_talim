import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs('jwt_func', (): JwtModuleOptions => {
  return {
    global: true,
    secret: process.env.jwt_key,
    signOptions: { expiresIn: '10m' },
  };
});
