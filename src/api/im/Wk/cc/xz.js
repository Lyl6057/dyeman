/*
 * @Author: Lyl
 * @Date: 2021-07-21 18:22:24
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-03 13:30:58
 * @Description:五金用品
 */
import axios from "axios";

export function getXz(params) {
  return axios({
    url: "/api/whseOfficeOut/page",
    method: "get",
    params: params
  });
}
export function addXz(params) {
  return axios({
    url: "/api/whseOfficeOut",
    method: "post",
    params: params
  });
}
export function updateXz(params) {
  return axios({
    url: "/api/whseOfficeOut",
    method: "put",
    params: params
  });
}
export function delXz(id) {
  return axios({
    url: "/api/whseOfficeOut?whseOfficeOutId=" + id,
    method: "delete"
  });
}
export function getXzDtl(params) {
  return axios({
    url: "/api/whseOfficeOutDtl/page",
    method: "get",
    params: params
  });
}
export function addXzDtl(params) {
  return axios({
    url: "/api/whseOfficeOutDtl",
    method: "post",
    params: params
  });
}
export function updateXzDtl(params) {
  return axios({
    url: "/api/whseOfficeOutDtl",
    method: "put",
    params: params
  });
}
export function delXzDtl(id) {
  return axios({
    url: "/api/whseOfficeOutDtl?officeOutDtlId=" + id,
    method: "delete"
  });
}

export function getOfficeDtla(params) {
  return axios({
    url: "/api/whseOfficeOutDtla",
    method: "get",
    params: params
  });
}
export function addOfficeDtla(params) {
  return axios({
    url: "/api/whseOfficeOutDtla",
    method: "post",
    params: params
  });
}
export function updateOfficeDtla(params) {
  return axios({
    url: "/api/whseOfficeOutDtla",
    method: "put",
    params: params
  });
}
export function delOfficeDtla(id) {
  return axios({
    url: "/api/whseOfficeOutDtla?dtlaId=" + id,
    method: "delete"
  });
}
