/*
 * @Author: LRl
 * @Date: 2021-07-21 08:37:13
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-22 17:32:17
 * @Description:
 */
import axios from "axios";
// ---- 颜料
export function getRl(params) {
  return axios({
    url: "/api/whseEnergyOut/page",
    method: "get",
    params: params
  });
}
export function addRl(params) {
  return axios({
    url: "/api/whseEnergyOut",
    method: "post",
    params: params
  });
}
export function updateRl(params) {
  return axios({
    url: "/api/whseEnergyOut",
    method: "put",
    params: params
  });
}
export function delRl(id) {
  return axios({
    url: "/api/whseEnergyOut?energyOutId=" + id,
    method: "delete"
  });
}

export function getRlDtl(params) {
  return axios({
    url: "/api/whseEnergyOutDtl/page",
    method: "get",
    params: params
  });
}
export function addRlDtl(params) {
  return axios({
    url: "/api/whseEnergyOutDtl",
    method: "post",
    params: params
  });
}
export function updateRlDtl(params) {
  return axios({
    url: "/api/whseEnergyOutDtl",
    method: "put",
    params: params
  });
}
export function delRlDtl(id) {
  return axios({
    url: "/api/whseEnergyOutDtl?whseAccessoriesoutDtloid=" + id,
    method: "delete"
  });
}
