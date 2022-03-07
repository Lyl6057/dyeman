/*
 * @Author: Lyl
 * @Date: 2021-07-21 08:37:13
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-03 15:15:00
 * @Description:
 */
import axios from "axios";
// ---- 颜料
export function getYl(params) {
  return axios({
    url: "/api/whseDyesalOut/page",
    method: "get",
    params: params
  });
}
export function addYl(params) {
  return axios({
    url: "/api/whseDyesalOut",
    method: "post",
    params: params
  });
}
export function updateYl(params) {
  return axios({
    url: "/api/whseDyesalOut",
    method: "put",
    params: params
  });
}
export function delYl(id) {
  return axios({
    url: "/api/whseDyesalOut?dyesalOutId=" + id,
    method: "delete"
  });
}

export function getYlDtl(params) {
  return axios({
    url: "/api/dyesalOutDtl/page",
    method: "get",
    params: params
  });
}
export function addYlDtl(params) {
  return axios({
    url: "/api/dyesalOutDtl",
    method: "post",
    params: params
  });
}
export function updateYlDtl(params) {
  return axios({
    url: "/api/dyesalOutDtl",
    method: "put",
    params: params
  });
}
export function delYlDtl(id) {
  return axios({
    url: "/api/dyesalOutDtl?energyOutDtlId=" + id,
    method: "delete"
  });
}

export function getYlDtla(params) {
  return axios({
    url: "/api/dyesalOutDtla",
    method: "get",
    params: params
  });
}
export function addYlDtla(params) {
  return axios({
    url: "/api/dyesalOutDtla",
    method: "post",
    params: params
  });
}
export function updateYlDtla(params) {
  return axios({
    url: "/api/dyesalOutDtla",
    method: "put",
    params: params
  });
}
export function delYlDtla(id) {
  return axios({
    url: "/api/dyesalOutDtla?dyesalOutDtl=" + id,
    method: "delete"
  });
}
