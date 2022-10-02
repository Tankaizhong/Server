/**
 * @description 成功返回的数据类型
 * @author Tankaizhong
 */

class SuccessModel {
  constructor(data) {
    this.code = 1
    this.data = data;
  }
}

module.exports = SuccessModel