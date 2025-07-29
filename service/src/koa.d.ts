import { MongoService } from "./middlewares/mongo/mongoService";
import type { MongoType } from "./middlewares/mongo/mongoService";

declare module "koa" {
	interface Context {
		mongo: MongoType; // ctx.MongoService.find()
		params: Record<string, string>; // 添加这一行
		send: (data: any, msg?: string, page?: any, code?: number) => void;
		sendError: (code: number, msg?: string, statusCode?: number) => void;
	}
}
