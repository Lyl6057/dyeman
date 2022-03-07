/*
 * @Author: Lyl
 * @Date: 2022-02-23 08:11:26
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-01 13:16:05
 * @FilePath: \iot.vue\src\view\proMng\proWeaveOutworkShip\api.js
 * @Description:
 */
import axios from "axios";

export function get(params) {
  return axios({
    url: "/api/proWeaveOutworkShip/page",
    method: "get",
    params: params
  });
}

export function add(params) {
  return axios({
    url: "/api/proWeaveOutworkShip",
    method: "post",
    params: params
  });
}
export function auditOne(id) {
  return axios({
    url: "/api/proWeaveOutworkShip/audit?id=" + id,
    method: "post"
  });
}
export function update(params) {
  return axios({
    url: "/api/proWeaveOutworkShip",
    method: "put",
    params: params
  });
}
export function del(id) {
  return axios({
    url: "/api/proWeaveOutworkShip?shipId=" + id,
    method: "delete"
  });
}

export function getNote(params) {
  return axios({
    url: "/api/proWeaveOutworkShipdetail/page",
    method: "get",
    params: params
  });
}

export function addNote(params) {
  return axios({
    url: "/api/proWeaveOutworkShipdetail",
    method: "post",
    params: params
  });
}

export function updateNote(params) {
  return axios({
    url: "/api/proWeaveOutworkShipdetail",
    method: "put",
    params: params
  });
}
export function delNote(id) {
  return axios({
    url: "/api/proWeaveOutworkShipdetail?noteId=" + id,
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

// 代码表
export function getDepth(params) {
  return axios({
    url: "/api/codeValue",
    method: "post",
    params: params
  });
}

// 获取色号流水号
export function getCodeSupply(params) {
  return axios({
    url: "/api/singleCodeSupply?code=color_num",
    method: "get"
  });
}
