const router = require("koa-router")();
const {register, login} = require("../controller/user");
const {SuccessModel, ErrorModel} = require("../res-model/index");
const loginCheck = require("../middleware/auth");
const {verifyLogin, verifyRegister, register_schema, cryptPassword} = require("../middleware/user");
const verifyDataType = require("../middleware/data")
router.prefix("/users");
// 注册
router.post("/register", verifyDataType, verifyRegister, cryptPassword, register);

// 登录
router.post("/login", verifyDataType, verifyLogin, login);

router.get("/info", loginCheck, async function (ctx, next) {
  // 加了loginCheck之后，因为保证了必须登录
  const session = ctx.session;
  return ctx.body = new SuccessModel(session.userInfo);
});

module.exports = router;
