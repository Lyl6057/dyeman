/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-14 15:23:01
 * @Description:
 */

import axios from "axios";

export function get(params) {
  return axios({
    url: "/api/proShipMarkRecord/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proShipMarkRecord",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proShipMarkRecord",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proShipMarkRecord?markId=" + id,
    method: "delete"
  });
}
// 打印佈飛
export function print(params) {
  return axios({
    url: "/api/proShipMarkRecord/proFinishPdf",
    method: "get",
    params: params
  });
}
