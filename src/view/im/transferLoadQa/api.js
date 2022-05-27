/*
 * @Author: Lyl
 * @Date: 2022-04-25 14:34:24
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-24 16:24:33
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\api.js
 * @Description:
 */
import axios from "axios";


export function fetchSelloutByPage(params) {
  return axios({
    url: "/api/whseFinclothselloutDtla/sellout",
    method: "get",
    params: params
  });
}


export function fetchStockVehicleByPage(params) {
  return axios({
    url: "/api/viewWmsTray/page",
    method: "get",
    params: params
  });
}

// 发送任务
export function sendTask(data) {
  return axios({
    url: "/erp/sendWmsIns",
    method: "post",
    data: data
  });
}
export function getTask(params) {
  return axios({
    url: "/erp/page",
    method: "get",
    params: params
  });
}
