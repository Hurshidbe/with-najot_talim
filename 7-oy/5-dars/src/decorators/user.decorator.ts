import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user || { id: 1, name: 'Hurshid Dev' }; // fake user
    return data ? user?.[data] : user;
  },
);
