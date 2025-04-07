import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [LoggerModule],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: 'LOGGER_SERVICE',
      useClass: LoggerService,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {}
