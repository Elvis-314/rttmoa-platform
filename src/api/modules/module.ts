import { httpUpack } from '..';

type Params = { [key: string]: any };

// * httpUpack://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表
// export const GetShelfStock = (params: any) => httpUpack.get(`/shelf/stock`, params);

// export const GetAllShelf = (params: Params) => httpUpack.get(`/shelf/stocks`, params);

export class moduleAPI {
	private static AUTH_API_PREFIX = '/auth';

	static PEFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`;

	// 库位库存 报表
	static getStock(params: Params) {
		return httpUpack.get(`/shelf/storages`, params);
	}

	// 库位库存 表格
	static getShelf(params: Params) {
		return httpUpack.get(`/shelf/shelfs`, params);
	}
}
