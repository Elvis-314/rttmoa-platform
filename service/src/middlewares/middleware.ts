import { mongoService } from "./mongo/mongoService";



//* 挂载到 ctx 上、这样直接调用ctx就可以了 
// ✅ 总结 步骤：
// ✅ 1	在中间件中挂载 ctx.mongoService
// ✅ 2	确保 app.use(dbMongoService) 被调用
// ✅ 3	使用 TypeScript 类型声明扩展 Koa.Context
// ✅ 4	控制器中即可使用 ctx.mongoService，IDE 自动提示

const _Middleware = (): any => {
	return async (ctx: any, next: () => Promise<any>): Promise<void> => {

		// ctx.cookies.get("unique_info")

		// * 挂载 ctx  ||  可以用es6 class的继承方式 this.mongoService 
		ctx.mongo = mongoService;
		
		await next();
	};
};
export default _Middleware 