/*
 * @Author: Lyl
 * @Date: 2021-10-06 10:07:12
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-06 18:38:59
 * @Description:
 */
import axios from "axios";

export function get(params) {
  return axios({
    url: "/api/iotCarryMap",
    method: "get",
    params: params
  });
}

export function getLog(params) {
  return axios({
    url: "/api/whsCarriageStorageLog/page",
    method: "get",
    params: params
  });
}

export function getBill(params) {
  return axios({
    url: "/api/whsCarriageStorageBill",
    method: "get",
    params: params
  });
}
