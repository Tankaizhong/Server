/**
 * @description user controller
 * @author Tankaizhong
 */
const path = require('path');
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/config.default')//
const {User} = require('../models/index')
const {
  createUser,//生成新用户
  getUser,//获得用户
  updateById,//用户信息更改
  updateLoginTime,//更新登录时间
} = require('../service/User')
const {SuccessModel, ErrorModel} = require("../res-model");
const {unknownError} = require("../constant/err.type");

/**
 * 注册方法
 * @param {Object} userInfo 用户信息
 * @returns
 */
class UserController {
  async register(ctx, next) {
    // 1. 解析数据
    const {request: {body}} = ctx;
    let res = null;
    //2. 操作数据库
    try {
      res = await createUser(body);
    } catch (error) {
      return new ErrorModel(0, {data: error.message, msg: "注册失败!",});
    }
    //3. 返回结果
    return ctx.body = new SuccessModel({username: res.username, msg: "注册成功!"})
  }

  async login(ctx, next) {
    const {request: {body: {username}}} = ctx;
    console.log("11111111111111111", username)
    try {
      const res = await getUser(username);
      // console.log(res)
      const {password, ...resUser} = res;//剔除 password
      const token = {
        token: jwt.sign(resUser, JWT_SECRET, {
          expiresIn: '12h' //过期时间 1天
        })
      }
      await updateLoginTime(res);
      return ctx.body = new SuccessModel({username: res.username, msg: "用户登录成功!", token})
    } catch (err) {
      return ctx.body = new ErrorModel({
        ...unknownError,
        err
      })
    }

  }
}


module.exports = new UserController()