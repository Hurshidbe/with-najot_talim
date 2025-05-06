import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { ProductsModule } from './products/products.module';
import { CategorisModule } from './categoris/categoris.module';
import { OrderGetawayModule } from './order_getaway/order_getaway.module';
import { prismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    CategoriesModule,
    UsersModule,
    OrdersModule,
    OrderItemsModule,
    ProductsModule,
    prismaModule,
    CategorisModule,
    OrderGetawayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
