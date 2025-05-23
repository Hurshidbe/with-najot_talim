import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log('[LOG]', message);
  }

  error(message: string) {
    console.error('[ERROR]', message);
  }

  warn(message: string) {
    console.warn('[WARN]', message);
  }
}
