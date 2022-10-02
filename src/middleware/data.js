//数据验证的中间件
const {usernameSchema, loginSchema, registerSchema} = require("./schema");
const {ErrorModel} = require("../res-model");
const {dataTypeError} = require("../constant/err.type");
const verifyDataType = async (ctx, next) => {
  const {request: {body}} = ctx;
  let res = "";
  const {url} = ctx.request;
  switch (url) {
    case '/users/register':
      ///验证注册
      const res1 = await usernameSchema(body).error
      const res2 = await registerSchema(body).error
      if (res1 || res2)
        return ctx.body = new ErrorModel({
          ...dataTypeError,
          result: {
            res1: res1 && res1.details[0].message,
            res2: res2 && res2.details[0].message,
          }
        });
      break;
    case '/users/login':
      const res = await loginSchema(body).error;
      if (res)
        return ctx.body = new ErrorModel({
          ...dataTypeError,
          result: res.details[0].message, msg: "数据格式验证失败!"
        });
      break;
    default:
      return ctx.body = "404";
  }
  await next();
}
module.exports = verifyDataType