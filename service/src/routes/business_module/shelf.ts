import Router = require("@koa/router")
import Shelf from '../../controllers/business_module/shelf'
const router = new Router();

// * 这几个接口为测试 mongodb 使用
router.get('/mongo/all_shelf', Shelf.findShelf);  
router.get('/mongo/update_shelf', Shelf.upShelf);  
router.get('/mongo/insert_shelf', Shelf.insShelf);  
router.get('/mongo/delete_shelf', Shelf.delShelf);  



// * 功能模块 —— 库存库位报表接口 1880个货位
router.get('/storages', Shelf.Storages); 


// * 功能模块 —— 仓库货架表 所有数据
router.get('/shelfs', Shelf.Shelfs); 


export default router;