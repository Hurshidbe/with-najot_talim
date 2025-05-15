import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7945951883:AAHfRHL4O8JnJ5h9KU1etIR0OempkHSfjGw',
    }),
  ],
  providers: [BotUpdate],
})
export class botModule {}
