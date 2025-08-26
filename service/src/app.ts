import koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import winston from 'winston';
import { errorHandle, sendHandle, dbHandle } from './middlewares/index.ts';
import { protect, unprotect } from './routes/index.ts';
import _crossDomain from './middlewares/app/app_crossDomain.ts';
import _public from './middlewares/app/app_public.ts';
import _security from './middlewares/app/app_security.ts';
import _logger from './middlewares/logger.ts';
import _middleware from './middlewares/_middleware.ts'; // # 在全局 ctx 上挂载 mongo 服务
import './schedule';   // # 定时任务

const app = new koa();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
_security(app); //* 安全头
_public(app); //* 静态资源
app.use(json()); // json中间件
app.use(bodyparser()); // body参数解析中间价
app.use(sendHandle()); // * 响应中间件
app.use(dbHandle()); // 数据库处理中间件
app.use(_middleware); //* 在ctx也可以不用挂载、可以用es6 class的继承方式 this.mongoService
app.use(_logger(winston)); //* 请求日志
_crossDomain.INIT(app); //* 跨域

app.use(errorHandle); // 异常中间件
unprotect(app); // & Router
protect(app);
// ErrorHander.init(app, log4js.getLogger("globallog")); // middleware

app.listen(6300, () => {
	console.dir('---------------------------------- koa is listening in http://127.0.0.1:6300 -------------------------------------');
});
