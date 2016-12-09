import Router from 'koa-router';
import glob from 'glob';

const appRouter = new Router();
glob.sync('./routes/**/*.js', {cwd: __dirname}).forEach((file) => {
  const path = file.replace(/^\.\/routes/, '').replace(/\.js$/, '');
  const subRouter = new Router();
  require(file).default(subRouter);
  appRouter.use(path, subRouter.routes(), subRouter.allowedMethods());
});

export default appRouter;
