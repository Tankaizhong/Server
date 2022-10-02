/**
 * @description 错误返回的数据结构
 * @author Tankaizhong
 */

class ErrorModel {
  constructor(data) {
    this.errno = -1;
    this.data = data
  }
}

module.exports = ErrorModel