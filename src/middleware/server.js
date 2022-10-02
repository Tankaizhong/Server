const ip = require('ip');
const IPInfo = async (ctx, next) => {
  return ctx.cc(ctx, 'IP获得成功!', 200);
}
const updataLoginTime = async(ctx,next)=>{
  await next()
}
module.exports = {
  IPInfo,
}