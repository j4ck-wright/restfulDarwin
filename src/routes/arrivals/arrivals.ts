import Router, { RouterContext } from 'koa-router';
import { buildXMLString } from '../../utils/buildXML';
import { type IServiceBoard } from '../../types/Darwin';
import { departuresTemplate } from '../../utils/templates';
import { fetchDarwinResponse } from '../../utils/darwinResponse';

export const router = new Router();

router.post('/arrivals', async (ctx: RouterContext) => {
  const token = ctx.get('X-DARWIN-TOKEN');

  const params = ctx.request.body as IServiceBoard;
  if (!params.crs) {
    return (ctx.status = 400), (ctx.body = 'Mandatory field CRS not given');
  }

  params.crs = params.crs.toUpperCase();

  const serviceBoard: IServiceBoard = {
    ...params,
  };

  const xml = buildXMLString(departuresTemplate, token, serviceBoard);
  const { status, data } = await fetchDarwinResponse(xml);

  if (!data && status !== 200) {
    return (ctx.status = status);
  }

  return (ctx.status = 501), (ctx.body = 'Not implemented yet');
});
