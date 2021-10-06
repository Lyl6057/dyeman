/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-06 15:39:56
 * @Description:
 */

import axios from "axios";

export function getVat(params) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "get",
    params: params
  });
}
export function get(params) {
  return axios({
    url: "/api/proAppSendSample/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proAppSendSample",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proAppSendSample",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proAppSendSample?sendExId=" + id,
    method: "delete"
  });
}
// 打印佈飛
export function print(params) {
  return axios({
    url: "/api/proAppSendSample/proFinishPdf",
    method: "get",
    params: params
  });
}
