import Router, { RouterContext } from 'koa-router';
import { xml2json } from 'xml-js';
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

  if (!data) {
    return (ctx.status = status);
  }

  const jsonResponse = xml2json(data.toString(), {
    compact: true,
    spaces: 4,
  });

  ctx.status = 200;
  ctx.body = jsonResponse;
});
