const Koa = require('koa');
const serve = require('koa-static')
const app = new Koa();

app.use(serve('dist'));

app.listen(3066, () => {
  console.log("listen port is 3066");
});