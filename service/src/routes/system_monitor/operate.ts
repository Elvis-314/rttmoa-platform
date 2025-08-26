import Router = require("@koa/router")
import Operate from '../../controllers/system_monitor/operate'
const router = new Router();

 
// 请求日志
router.get('/operate', Operate.findOperate);  

export default router;

