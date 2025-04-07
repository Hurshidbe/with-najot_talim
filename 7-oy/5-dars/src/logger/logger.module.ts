import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [
    {
      provide: 'LOGGER_SERVICE',
      useClass: LoggerService,
    },
  ],
  exports: ['LOGGER_SERVICE'],
})
export class LoggerModule {}
