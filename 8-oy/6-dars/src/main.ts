import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;
  await app.listen(process.env.PORT ?? 3000);
  console.log(`server is running at port  :`, PORT);
}
bootstrap();
