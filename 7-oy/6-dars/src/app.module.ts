import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { catsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cat } from './cats/entities/cats.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
    catsModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => {
        return {
          type: 'postgres',

          username: ConfigService.get('db_username'),
          password: ConfigService.get('db_password'),
          host: ConfigService.get('db_host'),
          port: ConfigService.get('db_port'),
          database: ConfigService.get('db_name'),
          synchronize: true, ////loyihani yaratib bo'lgach. false qilib qo'yish shart
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
