import Router, { RouterContext } from 'koa-router';
import { xml2json } from 'xml-js';
import { buildXMLString } from '../../utils/buildXML';
import { type IServiceBoard } from '../../types/Darwin';
import { arrivalsTemplate } from '../../utils/templates';
import { fetchDarwinResponse } from '../../utils/darwinResponse';
import { formatDarwinJSON } from '../../utils/formatDarwinJson';

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

  console.log(serviceBoard.numRows);

  const xml = buildXMLString(arrivalsTemplate, token, serviceBoard);
  const { status, data } = await fetchDarwinResponse(xml);

  if (!data) {
    return (ctx.status = status);
  }

  const jsonResponse = xml2json(data.toString(), {
    compact: true,
    spaces: 4,
  });

  const formattedJson = formatDarwinJSON(jsonResponse, 'GetStationBoardResult');

  ctx.status = 200;
  ctx.body = formattedJson;
});
