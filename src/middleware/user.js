const bcrypt = require("bcryptjs");
const {
  registerSchema,
  usernameSchema,
  loginSchema,
} = require("./schema");
const {userAlreadyExited, passwordError, userNotExited, unknownError} = require("../constant/err.type")
const {getUser} = require("../service/User");
const {ErrorModel} = require("../res-model");
//加密中间件
const cryptPassword = async (ctx, next) => {
  const {
    request: {
      body: {password},
    },
  } = ctx;
  const salt = bcrypt.genSaltSync(10);
  ctx.request.body.password = bcrypt.hashSync(password, salt); // 加密
  await next();
};
const verifyRegister = async (ctx, next) => {
  const {request: {body}} = ctx;
  if (await UserExist(body))
    return ctx.body = new ErrorModel(userAlreadyExited)
  await next();
};
//用户登录
const verifyLogin = async (ctx, next) => {
  const {request:{body}} = ctx;
  let res = "";
  try {
    //1.是否存在用户
    res = await UserExist(body);
    if (!res) return ctx.body = new ErrorModel(userNotExited);
  } catch (error) {
    return ctx.body = new ErrorModel(unknownError);
  }
  // 2. 是否匹配密码
  // return ctx.body = res;
  if (!bcrypt.compareSync(body.password, res["password"])) {
    return ctx.body = new ErrorModel(passwordError);
  }
  await next();
};
const UserExist = async ({username}) => {
  let res = "";
  try {
    res = await getUser(username);
  } catch (error) {
    return new ErrorModel(unknownError);
  }
  return res ? res : false;
}


module.exports = {
  cryptPassword,
  verifyRegister,
  verifyLogin,
};
