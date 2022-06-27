/*
 * @Author: Lyl
 * @Date: 2021-01-23 08:03:49
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-25 11:30:45
 * @Description:
 */
import axios from "axios";
import { Message } from "element-ui";

axios.defaults.timeout = 30000;
// 返回其他状态码
axios.defaults.validateStatus = function(status) {
  return status >= 200 && status <= 500; // 默认的
};
// axios.defaults.withCredentials = true; // 跨域请求，允许保存cookie
let db = parent.dbID ? parent.dbID.toUpperCase() : "YNYX";
// axios.defaults.headers = {
//   DS: db
// };
let baseUrl =
  window.location.origin.split(":")[1].indexOf("localhost") != -1
    ? process.env.API_HOST
    : "http:" + window.location.origin.split(":")[1] + ":91";
axios.interceptors.request.use(config => {
  config.url = baseUrl + config.url;
  // 请求头中加入操作用户数据
  config.headers.UserName = parent.userID || "HD008";
  return config;
}),
  error => {
    return Promise.reject(error);
  };
// HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    const status = Number(res.status) || 200;
    const message = res.statusText + "( " + res.status + ")";
    if (status === 401) {
      Message({
        message: message,
        type: "error"
      });
      return;
    }
    if (status === 400 || status === 500) {
      Message({
        message: message + "錯誤，請檢查數據格式!",
        type: "error"
      });
      return Promise.reject(new Error(message));
    }
    if (status !== 200 || res.data.code === 1) {
      Message({
        message: message,
        type: "error"
      });
      return Promise.reject(new Error(message));
    }

    return res;
  },
  error => {
    return Promise.reject(new Error(error));
  }
);

// export default axios
export default ({ Vue }) => {
  Vue.prototype.$axios = axios;
};
