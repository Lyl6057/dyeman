/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:43
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-11 16:15:40
 * @Description:
 */
import axios from "axios";
// ---- 成品布
export function getFinclothsellout(params) {
  return axios({
    url: "/api/whseFinclothsellout/page",
    method: "get",
    params: params
  });
}
export function addFinclothsellout(params) {
  return axios({
    url: "/api/whseFinclothsellout",
    method: "post",
    params: params
  });
}
export function updateFinclothsellout(params) {
  return axios({
    url: "/api/whseFinclothsellout",
    method: "put",
    params: params
  });
}
export function delFinclothsellout(id) {
  return axios({
    url: "/api/whseFinclothsellout?whseFinclothselloutoid=" + id,
    method: "delete"
  });
}

// 明细
export function getFinclothselloutDtla(params) {
  return axios({
    url: "/api/whseFinclothselloutDtla/page",
    method: "get",
    params: params
  });
}
export function addFinclothselloutDtla(params) {
  return axios({
    url: "/api/whseFinclothselloutDtla",
    method: "post",
    params: params
  });
}
export function updateFinclothselloutDtla(params) {
  return axios({
    url: "/api/whseFinclothselloutDtla",
    method: "put",
    params: params
  });
}
export function delFinclothselloutDtla(id) {
  return axios({
    url: "/api/whseFinclothselloutDtla?whseFinclothselloutDtlaoid=" + id,
    method: "delete"
  });
}

// 疋号
export function getFinclothselloutDtlbList(params) {
  return axios({
    url: "/api/whseFinclothselloutDtlb",
    method: "get",
    params: params
  });
}
// 疋号
export function getFinclothselloutDtlb(params) {
  return axios({
    url: "/api/whseFinclothselloutDtlb/page",
    method: "get",
    params: params
  });
}
export function addFinclothselloutDtlb(params) {
  return axios({
    url: "/api/whseFinclothselloutDtlb",
    method: "post",
    params: params
  });
}
export function updateFinclothselloutDtlb(params) {
  return axios({
    url: "/api/whseFinclothselloutDtlb",
    method: "put",
    params: params
  });
}
export function delFinclothselloutDtlb(id) {
  return axios({
    url: "/api/whseFinclothselloutDtlb?whseFinclothselloutDtlboid=" + id,
    method: "delete"
  });
}
