import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscriptionmodel.controller';
import { SubscriptionService } from './subscriptionmodel.service';

@Module({
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionmodelModule {}
