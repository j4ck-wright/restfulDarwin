import { Next } from 'koa';
import { RouterContext } from 'koa-router';

export const apiTokenExists = (ctx: RouterContext, next: Next) => {
  if (!ctx.get('X-DARWIN-TOKEN')) {
    return (ctx.body = 'X-DARWIN-TOKEN Not present'), (ctx.status = 401);
  }
  next();
};
