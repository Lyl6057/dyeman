/*
 * @Author: Lyl
 * @Date: 2021-01-23 08:03:49
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-12 14:54:24
 * @Description: 
 */
import axios from 'axios';
import {
  Message
} from 'element-ui'

axios.defaults.timeout = 30000;

// 返回其他状态码
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500 // 默认的
}

// axios.defaults.withCredentials = true; // 跨域请求，允许保存cookie
let db = parent.dbID ? parent.dbID.toUpperCase() : 'YGTEST'
let userId = ""
// parent.userID
// axios({
//   url: '/api/ucmlUser',
//   method: 'get',
//   params: { usrLogin: parent.userID }
// }).then((Res) => { // 登錄用戶oid
//   userId = Res.data.ucmlUseroid;
// });
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers = {
  "DS": db
}
let baseUrl = ""
// document.cookie.split(";").forEach((item) => {
//   if (item.includes("apiUrl")) {
//     baseUrl = item.split("=")[1];
//   }
// });
axios.interceptors.request.use(config => { // HTTP request拦截
  // if (process.env.NODE_ENV == 'production') {
  //   // if (baseUrl == "") {
  //   // baseUrl = process.env.API_HOST;
  //   // }
  //   //请求之前重新拼装url
  //   config.url = process.env.API_HOST + config.url;
  // }
  // console.log(document.cookie);
  // document.cookie.split(";").forEach((item, index) => {
  //   if (item.includes("apiUrl")) {
  //     baseUrl = item.split("=")[1];
  //   }
  // });
  // if (baseUrl == "") {
  //   baseUrl = process.env.API_HOST;
  // }
  // config.url = baseUrl + config.url;
  config.url = process.env.API_HOST + config.url;
  //请求之前重新拼装url
  // if (config.method === 'post') {
  //   if (config.params) {
  //     config.params.sysCreated = getNowTime()
  //     config.params.sysCreatedby = userId
  //   }
  // } else if (config.method === 'put') {
  //   if (config.params) {
  //     // config.params.sysCreatedby = userId
  //     config.params.sysLastUpd = getNowTime()
  //     config.params.sysLastUpdBy = userId
  //   }
  // }
  // headers中配置serialize为true开启序列化
  if (config.method === 'post' && config.headers.serialize) {
    config.data = serialize(config.data)
    delete config.data.serialize
  }


  return config
}), error => {
  return Promise.reject(error)
};
// HTTPresponse拦截
axios.interceptors.response.use(res => {
  const status = Number(res.status) || 200
  const message = res.statusText + "( " + res.status + ")"
  if (status === 401) {
    Message({
      message: message,
      type: 'error'
    })
    return
  }
  if (status === 400 || status === 500) {
    Message({
      message: message + "錯誤，請檢查數據格式!",
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }
  if (status !== 200 || res.data.code === 1) {
    Message({
      message: message,
      type: 'error'
    })
    return Promise.reject(new Error(message))
  }

  return res
}, error => {
  return Promise.reject(new Error(error))
})

// export default axios
export default ({
  Vue
}) => {
  Vue.prototype.$axios = axios
}
