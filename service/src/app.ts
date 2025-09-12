import koa from 'koa';
import json from 'koa-json';
import bodyparser from 'koa-bodyparser';
import winston from 'winston';
import { _errorHandle, _sendHandle, _dbHandle, _logger, _CrossDomain, _Security, _Public, _Mongo } from './middlewares/index.ts';
import { protect, unprotect } from './routes/index.ts';
import './schedule';   // # 定时任务

const app = new koa();
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

// 安全相关中间件
app.use(_Security()); // 安全头 
app.use(_CrossDomain()); // 跨域 

// 数据处理中间件
app.use(json()); // json中间件
app.use(bodyparser()); // body参数解析中间价

// 静态文件服务 - 应该放在路由之前
app.use(_Public()); // 静态资源

// 数据库中间件
app.use(_Mongo()); // 挂载 ctx.mongo
// app.use(_dbHandle()); // mysql

// 工具中间件
app.use(_sendHandle()); // 挂载 ctx.sendError
app.use(_logger(winston)); //* 请求日志

// 路由 - 应该放在静态文件服务之后
unprotect(app); // & Router  
protect(app);

// 错误处理 - 应该放在最后
app.use(_errorHandle); // * 异常中间件

app.listen(6300, () => {
  console.dir('---------------------------------- koa is listening in http://127.0.0.1:6300 -------------------------------------');
});