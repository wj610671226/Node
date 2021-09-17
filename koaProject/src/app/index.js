const Koa = require("koa");
const bodyParser = require('koa-bodyparser');
const useRoutes = require('../router');
const errorHandle = require('./error-handle');
const { accessLogger }  = require('../app/logs-config');

const app = new Koa();

// koa-log
app.use(accessLogger());
app.use(bodyParser());
app.useRoutes = useRoutes;
app.useRoutes();
app.on('error', errorHandle);

module.exports = app;