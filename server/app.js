import http from 'http';
import koa from 'koa';
import cors from 'koa-cors';
import render from 'koa-ejs';
import koaStatic from 'koa-static';
import router from './router';
import path from 'path';
import bodyparser from 'koa-bodyparser';


var app = koa();

render(app, {
  root: path.join(__dirname, '..', 'app/dist'),
  layout: false,
  viewExt: 'html',
  debug: false,
  cache: true
});


app.use(koaStatic('./app',{
  maxage: 129600
}));


app.use(koaStatic('./app/demo',{
  maxage: 129600
}));

app.use(cors({
  credentials: true
}));

app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());

const server =  http.createServer(app.callback());
export default server;