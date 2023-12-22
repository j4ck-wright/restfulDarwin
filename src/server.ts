import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';

import { config } from './config';
import { apiTokenExists } from './utils/validators';

import { arrivalsRouter, docsRouter, healthRouter } from './routes';

const app = new Koa();
const PORT = config.port;

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(logger());
app.use(json());

app.use(healthRouter.routes());
app.use(docsRouter.routes());

app.use(apiTokenExists);
app.use(arrivalsRouter.routes());

export const server = app
  .listen(PORT, async () => {
    console.log(`🚝 - Darwin is listening on http://localhost:${PORT}`);
  })
  .on('error', (err: unknown) => {
    console.error(err);
  });
