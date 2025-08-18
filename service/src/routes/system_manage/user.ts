import Router = require("@koa/router");
import User from "../../controllers/system_manage/user";
const router = new Router();



router.get("/fakeUser", User.addFakeUser); // 生成500个     http://127.0.0.1:6300/userp/fakeUser

router.post("/ins_User", User.addUser);
router.get("/up_User", User.upUser);
router.delete("/users", User.delUser); // 删除
router.post("/delMoreUsers", User.delMoreUser); // 删除更多用户

 
router.get("/users1", User.findProTableUser); // ProTable 获取用户
router.get("/users2", User.findUserManager); // UserManager 用户管理获取用户


 
router.post("/login", User.login); // 登陆
router.post("/logout", User.logout);  // 退出
router.post("/register", User.register);  // 注册



export default router;
