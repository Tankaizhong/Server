//错误处理
module.exports = {
  userAlreadyExited: {
    code: "100002",
    message: "用户已经存在",
    result: ""
  },
  dataTypeError: {
    code: "100001",
    message: "数据类型错误",
    result: ""
  },
  loginError_D: {
    code: "100003",
    message: "登录异常",
    result: ""
  },
  userNotExited: {
    code: "100004",
    message: "用户未注册",
    result: ""
  },
  passwordError: {
    code: "100005",
    message: "密码错误",
    result: ""
  },
  unknownError:{
    code: "110000",
    message: "异常错误",
    result: ""
  }
}