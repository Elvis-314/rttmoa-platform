import http from '@/api/upack';
type Params = { [key: string]: any };

// * http://localhost:9527/upack/shelf/Warehouse_Report // upack为代理地址

// 功能模块 > 库位库存报表
export const GetShelfStock = () => http.get(`/shelf/Warehouse_Report`);
export const GetAllShelf = (params: Params) => http.get(`/shelf/Warehouse_All_Shelf`, params);
