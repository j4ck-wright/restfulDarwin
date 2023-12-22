import Router from 'koa-router';
const router = new Router();

router.get('/health', async (ctx: any) => {
  try {
    ctx.body = {
      status: 'success',
    };
  } catch (e: unknown) {
    console.error(e);
  }
});

export default router;
