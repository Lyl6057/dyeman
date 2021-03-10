import {
  MessageBox
} from 'element-ui'
import {
  Message
} from 'element-ui';

export function cofirm(text = '确定执行此操作吗', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type,
    center: true
  })
}

export function cofirm2(text, _this, type = 'warning') {
  return MessageBox.confirm(text, _this.$t("energy.ts"), {
    confirmButtonText: _this.$t("energy.qd"),
    cancelButtonText: _this.$t("energy.qx"),
    type: type,
    center: true
  })
}
//可以直接在页面中这样使用
// cofirm("text","warning").then(res=>{
// 这是点击确定的操作
// }).catch(err=>{
// 这是点击取消的操作
// })



//正确提示框
export function success(message) {
  return Message.success(message)
}

//错误提示框
export function error(message) {
  return Message.error(message)
}

//警告提示框
export function warning(message) {
  return Message.warning(message)
}

//取消操作提示框
export function info(message) {
  return Message.info(message);
}
