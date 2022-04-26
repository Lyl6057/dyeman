/*
 * @Author: Lyl
 * @Date: 2022-04-25 14:34:24
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-25 16:26:31
 * @FilePath: \iot.vue\src\view\im\transferLoadQa\api.js
 * @Description:
 */
import axios from "axios";

export function fetchStockVehicleByPage(params) {
  return axios({
    url: "/api/viewWmsTray/page",
    method: "get",
    params: params
  });
}

export function sendTask(params) {
  return axios({
    url: "/api/viewWmsTray/page",
    method: "get",
    params: params
  });
}

export function getTask(params) {
  return axios({
    url: "/erp/page",
    method: "get",
    params: params
  });
}
