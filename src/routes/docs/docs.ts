import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';
import path from 'path';

export const router = new Router();

const spec = yamljs.load(path.join(__dirname, '../../swagger.yaml'));

router.get(
  '/docs',
  koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
);
