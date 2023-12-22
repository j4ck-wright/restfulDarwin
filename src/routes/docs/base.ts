import Router from 'koa-router';
import { koaSwagger } from 'koa2-swagger-ui';
import yamljs from 'yamljs';

const router = new Router();

const spec = yamljs.load('src/swagger.yaml');

router.get(
  '/docs',
  koaSwagger({ routePrefix: false, swaggerOptions: { spec } })
);

export default router;
