/*
 * @Author: Lyl
 * @Date: 2022-02-23 08:11:26
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-25 10:18:28
 * @FilePath: \iot.vue\src\view\proMng\dyeDeliveryNote\api.js
 * @Description:
 */
import axios from "axios";

export function get(params) {
  return axios({
    url: "/api/proOutFactOrder/page",
    method: "get",
    params: params
  });
}

export function add(params) {
  return axios({
    url: "/api/proOutFactOrder",
    method: "post",
    params: params
  });
}
export function update(params) {
  return axios({
    url: "/api/proOutFactOrder",
    method: "put",
    params: params
  });
}
export function del(id) {
  return axios({
    url: "/api/proOutFactOrder?orderId=" + id,
    method: "delete"
  });
}

export function getNote(params) {
  return axios({
    url: "/api/proOutFactOrderDtl",
    method: "get",
    params: params
  });
}

export function addNote(params) {
  return axios({
    url: "/api/proOutFactOrderDtl",
    method: "post",
    params: params
  });
}

export function updateNote(params) {
  return axios({
    url: "/api/proOutFactOrderDtl",
    method: "put",
    params: params
  });
}
export function delNote(id) {
  return axios({
    url: "/api/proOutFactOrderDtl?dtlId=" + id,
    method: "delete"
  });
}

export function uploadXlxs(params) {
  return axios({
    url: "/api/proWeaveOutworkShip/importExcle",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export function getProOutFactOrderVat(params) {
  return axios({
    url: "/api/proOutFactOrderVat/page",
    method: "get",
    params: params
  });
}

export function addProOutFactOrderVat(params) {
  return axios({
    url: "/api/proOutFactOrderVat",
    method: "post",
    params: params
  });
}

export function delProOutFactOrderVat(id) {
  return axios({
    url: "/api/proOutFactOrderVat?vatRefId=" + id,
    method: "delete"
  });
}
