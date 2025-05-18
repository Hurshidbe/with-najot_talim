import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthLoginModule } from './modules/auth-login/auth-login.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SubscriptionmodelModule } from './modules/subscriptionmodel/subscriptionmodel.module';
import { AdminPanelModule } from './modules/admin-panel/admin-panel.module';
import { MoviesModule } from './modules/movies/movies.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT'),
          signOptions: { expiresIn: '100m' },
        };
      },
      inject: [ConfigService],
    }),
    PrismaModule,
    AuthLoginModule,
    SubscriptionmodelModule,
    AdminPanelModule,
    MoviesModule,
    CategoriesModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
