// & ctx 可以直接调用    ctx.sendHandle    ctx.dbHandle

export { default as _dbHandle } from './ctx/dbHandle' // ctx 挂载 mysql
export { default as _errorHandle } from './ctx/errorHandle' // ctx 捕捉 错误
export { default as _sendHandle } from './ctx/sendHandle' // ctx 挂载 sendError


export { default as _logger } from './logger' 
export { default as _Middleware } from './middleware' 

export { default as _CrossDomain } from './app/crossDomain' 
export { default as _Public } from './app/public' 
export { default as _Security } from './app/security' 





// ctx.dbHandle

// ctx.helper.moment().unix(),

// ctx.cookies.set('token', '', { maxAge: 0 });

// params = ctx.helper.filterEmptyField(params);