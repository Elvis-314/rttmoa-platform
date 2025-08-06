import httpUpack from '@/api/upack';
type Params = { [key: string]: any };

// * httpUpack://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表
export const GetShelfStock = (params: any) => httpUpack.get(`/shelf/stock`, params);

export const GetAllShelf = (params: Params) => httpUpack.get(`/shelf/stocks`, params);

export class moduleAPI {
	private static AUTH_API_PREFIX = '/auth';

	static PEFRESH_API_URL = `${this.AUTH_API_PREFIX}/refresh`;

	static GetShelfStock() {
		return httpUpack.get(`/shelf/Warehouse_Report`);
	}

	static GetAllShelf(params: Params) {
		return httpUpack.get(`/shelf/Warehouse_All_Shelf`, params);
	}
}
