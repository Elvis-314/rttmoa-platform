import Router = require("@koa/router")
import ErrorLog from '../../controllers/system_monitor/errorLog'
const router = new Router();

 
// 异常日志
router.get('/errorLog', ErrorLog.findError);  

export default router;

