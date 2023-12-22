import Router, { RouterContext } from 'koa-router';
const router = new Router();

router.get('/health', async (ctx: RouterContext) => {
  try {
    ctx.body = {
      status: 'OK',
    };
  } catch (e: unknown) {
    console.error(e);
  }
});

export default router;
