/*
 * @Author: Lyl
 * @Date: 2021-07-21 18:22:24
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-21 18:26:23
 * @Description:五金用品
 */
import axios from "axios";

export function getWj(params) {
  return axios({
    url: "/api/whseHardwareOut/page",
    method: "get",
    params: params
  });
}
export function addWj(params) {
  return axios({
    url: "/api/whseHardwareOut",
    method: "post",
    params: params
  });
}
export function updateWj(params) {
  return axios({
    url: "/api/whseHardwareOut",
    method: "put",
    params: params
  });
}
export function delWj(id) {
  return axios({
    url: "/api/whseHardwareOut?whseHardwareOutId=" + id,
    method: "delete"
  });
}
export function getWjDtl(params) {
  return axios({
    url: "/api/whseHardwareOutDtl/page",
    method: "get",
    params: params
  });
}
export function addWjDtl(params) {
  return axios({
    url: "/api/whseHardwareOutDtl",
    method: "post",
    params: params
  });
}
export function updateWjDtl(params) {
  return axios({
    url: "/api/whseHardwareOutDtl",
    method: "put",
    params: params
  });
}
export function delWjDtl(id) {
  return axios({
    url: "/api/whseHardwareOutDtl?whseHardwareOutDtlId=" + id,
    method: "delete"
  });
}
