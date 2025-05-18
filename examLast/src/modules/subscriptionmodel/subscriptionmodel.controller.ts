import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionmodelService } from './subscriptionmodel.service';

@Controller('subscriptionmodel')
export class SubscriptionmodelController {
  constructor(
    private readonly subscriptionmodelService: SubscriptionmodelService,
  ) {}
}
