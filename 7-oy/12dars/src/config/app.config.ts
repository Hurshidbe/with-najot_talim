import { registerAs } from '@nestjs/config';
import { app } from 'src/common/interfaces/app.interface';

export default registerAs('app', (): app => {
  return {
    PORT: parseInt(process.env.PORT as string),
  };
});
