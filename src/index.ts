import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';
import { config } from './config';
import yamljs from 'yamljs';

const baseRouter = new Router();
import healthRoutes from './routes/health';

const app = new Koa();
const PORT = config.port;
const spec = yamljs.load('src/swagger.yaml');

baseRouter.get(
  '/',
  koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
);

app.use(bodyParser());
app.use(cors({ origin: '*' }));
app.use(logger());
app.use(json());
app.use(baseRouter.routes());
app.use(healthRoutes.routes());

export const server = app
  .listen(PORT, async () => {
    console.log(`🚝 - Darwin is listening on http://localhost:${PORT}`);
  })
  .on('error', (err: unknown) => {
    console.error(err);
  });
