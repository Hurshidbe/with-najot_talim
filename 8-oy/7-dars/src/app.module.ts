import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { botModule } from './modules/bot/create.bot.module';

@Module({
  imports: [PrismaModule, botModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
