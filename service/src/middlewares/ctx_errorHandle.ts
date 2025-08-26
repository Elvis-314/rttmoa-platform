import { Context } from 'koa';

// * 错误处理中间件
const errorHandle = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
		console.log('捕捉错误', ctx.status);

    // 如果下游没有处理响应
    if (ctx.status === 404 && !ctx.body) {
      ctx.status = 404;
      ctx.body = {
        code: 404,
        message: "Error Handle Not Found"
      };
    }
  } catch (err: any) {
    console.log('middlewares/errorHandle 捕捉错误 ==> ', err.message);

    if (err.status === 401 && err.name === 'UnauthorizedError') {
      ctx.status = 401;

      let message;
      if (err.message.includes('expired')) {
        message = 'Token expired. Please log in again.';
      } else {
        message = err.message;
      }

      return ctx.sendError(401, message);
    } else {
      ctx.status = err.status || 500;
      return ctx.sendError(ctx.status, err.message || 'Server error.');
    }
  }
};

export default errorHandle;