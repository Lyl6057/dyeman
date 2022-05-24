/*
 * @Author: Lyl
 * @Date: 2022-05-24 08:12:04
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-24 15:11:14
 * @FilePath: \iot.vue\src\api\im\Wk\cc\equipment.js
 * @Description: 设备出仓
 */
import axios from 'axios'

export function getEquipmentOut(params) {
  return axios({
    url: "/api/whseEquipmentOut/page",
    method: "get",
    params: params
  });
}
export function addEquipmentOut(params) {
  return axios({
    url: "/api/whseEquipmentOut",
    method: "post",
    params: params
  });
}
export function updateEquipmentOut(params) {
  return axios({
    url: "/api/whseEquipmentOut",
    method: "put",
    params: params
  });
}
export function delEquipmentOut(id) {
  return axios({
    url: "/api/whseEquipmentOut?id=" + id,
    method: "delete"
  });
}
export function getEquipmentOutDtl(params) {
  return axios({
    url: "/api/whseEquipmentOutDtl/page",
    method: "get",
    params: params
  });
}
export function addEquipmentOutDtl(params) {
  return axios({
    url: "/api/whseEquipmentOutDtl",
    method: "post",
    params: params
  });
}
export function updateEquipmentOutDtl(params) {
  return axios({
    url: "/api/whseEquipmentOutDtl",
    method: "put",
    params: params
  });
}
export function delEquipmentOutDtl(id) {
  return axios({
    url: "/api/whseEquipmentOutDtl?id=" + id,
    method: "delete"
  });
}

export function getEquipmentOutDtla(params) {
  return axios({
    url: "/api/whseEquipmentOutDtla/list",
    method: "get",
    params: params
  });
}
export function addEquipmentOutDtla(params) {
  return axios({
    url: "/api/whseEquipmentOutDtla",
    method: "post",
    params: params
  });
}
export function updateEquipmentOutDtla(params) {
  return axios({
    url: "/api/whseEquipmentOutDtla",
    method: "put",
    params: params
  });
}
export function delEquipmentOutDtla(id) {
  return axios({
    url: "/api/whseEquipmentOutDtla?id=" + id,
    method: "delete"
  });
}
