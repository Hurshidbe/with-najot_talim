import { Update, Start, Ctx, Action } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { Markup } from 'telegraf';

@Update()
export class BotUpdate {
  @Start()
  async startCommand(@Ctx() ctx: Context) {
    await ctx.reply(
      `Salom Hurshid. Qaysi kungi dars jadvalini ko'rmoqchisan?`,
      Markup.inlineKeyboard([
        [Markup.button.callback('Dushanba', 'DUSHANBA')],
        [Markup.button.callback('Seshanba', 'SESHANBA')],
        [Markup.button.callback('Chorshanba', 'CHORSHANBA')],
        [Markup.button.callback('Payshanba', 'PAYSHANBA')],
        [Markup.button.callback('Juma', 'JUMA')],
      ]),
    );
  }

  @Action('DUSHANBA')
  async dushanba(@Ctx() ctx: Context) {
    await ctx.reply(
      '📅 Dushanba:\n8:30 - Ornatilgan tizimlar\nxona : 117\n10:00 - Operatsion tizimlar\nxona : 218\n11:30 - Hayot faoliyati xavfsizligi\nxona :309',
    );
  }

  @Action('SESHANBA')
  async seshanba(@Ctx() ctx: Context) {
    await ctx.reply(
      `📅 Seshanba:\n8:30 - Tarmoq xavfsizligi\nxona : 201\n10:00 - Mobil ilovalarni ishlab chiqish\nxona : 229\n11:20 - O‘rnatilgan tizimlar\nxona : 208`,
    );
  }

  @Action('CHORSHANBA')
  async chorshanba(@Ctx() ctx: Context) {
    await ctx.reply(
      '📅 Chorshanba:\n8:30 - O‘rnatilgan tizimlar\nxona : 201\n10:00 - Tarmoq xavfsizligi\nxona : 301',
    );
  }

  @Action('PAYSHANBA')
  async payshanba(@Ctx() ctx: Context) {
    await ctx.reply(
      `📅 Payshanba:\n8:30 - Tarmoq xavfsizligi\nxona : 101\n10:00 - Mobil ilovalarni ishlab chiqish\nxona : 107`,
    );
  }

  @Action('JUMA')
  async juma(@Ctx() ctx: Context) {
    await ctx.reply(
      '📅 Juma:\n8:30 - Operatsion tizimlar\nxona : akt\n10:00 - Hayot faoliyati xavfsizligi\nxona : 209',
    );
  }
}
