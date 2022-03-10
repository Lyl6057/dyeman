/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:44
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-10 10:18:20
 * @FilePath: \iot.vue\src\config\seal.js
 * @Description:
 */
import { MessageBox } from "element-ui";
import { Message } from "element-ui";

export function cofirm(text, _this, type = "warning") {
  return MessageBox.confirm(text, {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: type,
    center: true
  });
}
//可以直接在页面中这样使用
// cofirm("text","warning").then(res=>{
// 这是点击确定的操作
// }).catch(err=>{
// 这是点击取消的操作
// })

``;
//正确提示框
export function success(message) {
  return Message.success({ message: message, duration: 2000 });
}

//错误提示框
export function error(message) {
  return Message.error({ message: message, duration: 2000 });
}

//警告提示框
export function warning(message) {
  return Message.warning({ message: message, duration: 2000 });
}

//取消操作提示框
export function info(message) {
  return Message.info({ message: message, duration: 2000 });
}
