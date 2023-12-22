import Router, { RouterContext } from 'koa-router';
import { type IArrivals } from '../../types/requestBodies';

export const router = new Router();

router.post('/arrivals', async (ctx: RouterContext) => {
  const params = ctx.request.body as IArrivals;
  if (!params.crs) {
    return (ctx.status = 400), (ctx.body = 'Mandatory field CRS not given');
  }

  return (ctx.status = 501), (ctx.body = 'Not implemented yet');
});
