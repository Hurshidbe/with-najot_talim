import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CatsModule, DogsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); 
  }
}
