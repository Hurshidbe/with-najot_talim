import { Module } from '@nestjs/common';
import { UsersSubscriptionService } from './users-subscription.service';
import { UserSubscriptionController } from './users-subscription.controller';

@Module({
  controllers: [UserSubscriptionController],
  providers: [UsersSubscriptionService],
})
export class UsersSubscriptionModule {}
