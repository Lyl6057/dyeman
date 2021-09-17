/*
 * @Author: Lyl
 * @Date: 2021-09-01 18:04:08
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-01 18:11:13
 * @Description:
 */
import copy from "./copy";
const directives = {
  copy
};

export default {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }
};
