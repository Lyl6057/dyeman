/*
 * @Author: Lyl
 * @Date: 2022-04-25 14:34:24
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-27 15:44:59
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\api.js
 * @Description:
 */
import axios from "axios";

export function getWayIOState() {
  return axios({
    url: "/api/whseWayIoState",
    method: "get",
  });
}

export function fetchSelloutByPage(params) {
  return axios({
    url: "/api/whseFinclothselloutDtla/sellout",
    method: "get",
    params: params
  });
}

export function fetchPBSellout(params) {
  return axios({
    url: "/api/whseCalicoOutDtla/pbsellout",
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

// 发送任务sendTask
export function sendTask(data) {
  return axios({
    url: "/erp/sendWmsInsEx",
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
export function sendTestTaskNoin(data) {
  return axios({
    url: "/erp/sendWmsInsExtest",
    method: "post",
    data: data
  });
}
