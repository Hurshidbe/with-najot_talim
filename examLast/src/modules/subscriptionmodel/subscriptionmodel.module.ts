import { Module } from '@nestjs/common';
import { SubscriptionmodelService } from './subscriptionmodel.service';
import { SubscriptionmodelController } from './subscriptionmodel.controller';

@Module({
  controllers: [SubscriptionmodelController],
  providers: [SubscriptionmodelService],
})
export class SubscriptionmodelModule {}
