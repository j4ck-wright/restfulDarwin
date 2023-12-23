import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';

import { config } from './config';

import { arrivalsRouter, docsRouter, healthRouter } from './routes';

const app = new Koa();
const PORT = config.port;

if (!config.darwin_endpoint) {
  throw Error(`🚝 - Darwin endpoint missing from config file. Aborting.`);
}

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(logger());
app.use(json());

app.use(healthRouter.routes());
app.use(docsRouter.routes());

app.use(async (ctx, next) => {
  !ctx.get('X-DARWIN-TOKEN')
    ? ((ctx.body = 'X-DARWIN-TOKEN Not present'), (ctx.status = 401))
    : await next();
});

app.use(arrivalsRouter.routes());

export const server = app
  .listen(PORT, async () => {
    console.log(`🚝 - Darwin is listening on http://localhost:${PORT}`);
  })
  .on('error', (err: unknown) => {
    console.error(err);
  });
