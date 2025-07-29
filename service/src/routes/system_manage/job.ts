import Router = require("@koa/router");
import Job from "../../controllers/system_manage/job";
const router = new Router();



router.get("/job", Job.allJob);  // 查询

router.post("/job", Job.addJob); // 增加

router.put("/job/:id", Job.modifyJob); // 修改

router.delete("/job/:id", Job.delJob);  // 删除

router.post("/jobs", Job.delMoreJob);  // 删除更多


 
export default router;
