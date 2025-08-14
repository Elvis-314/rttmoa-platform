import Router = require("@koa/router");
import Job from "../../controllers/system_manage/job";
const router = new Router();



router.post("/job", Job.findJob);  // 查询

router.post("/jobAdd", Job.addJob); // 增加

router.put("/job/:id", Job.modifyJob); // 修改

router.delete("/job/:id", Job.delJob);  // 删除

router.post("/jobDel", Job.delMoreJob);  // 删除更多


router.post("/jobEx", Job.ExJob);  // 删除更多

 
export default router;
