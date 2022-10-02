//验证模块
const Joi = require('joi');
const username = Joi.string().required();//用户名
const password = Joi.string().required();//密码规则
const register = Joi.object().keys({
  username,
  password,
  id: Joi.required(),
})
const name = Joi.object().keys({
  // username: Joi.string().required(),
  username,
})
const login = Joi.object().keys({
  // username: Joi.string().required(),
  username,
  password,
})

//注册验证
function registerSchema(obj) {
  //验证
  let res = "";
  try {
    res = register.validate(obj, {
      // 允许验证被对象包含没有定义校验规则的未知字段，否则会认为被校验数据不通过
      allowUnknown: true
    });
  } catch (error) {
    return error;
  }
  return res
}

//用户名
function usernameSchema(obj) {
  let res = ""
  try {
    res = name.validate(obj, {allowUnknown: true})
  } catch (err) {
    return err;
  }
  return res;
}

//登录验证
function loginSchema(obj) {
  return login.validate(obj);
}

exports.usernameSchema = usernameSchema
exports.registerSchema = registerSchema
exports.loginSchema = loginSchema
