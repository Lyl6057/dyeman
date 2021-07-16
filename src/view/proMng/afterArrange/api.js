/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-07-15 08:04:47
 * @Description:
 */

import axios from "axios";

export function get(params) {
  return axios({
    url: "/api/proBleadyeFinishJob/bleadyeAndfinishJob",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proBleadyeFinishJob",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proBleadyeFinishJob",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proBleadyeFinishJob?finishJobId=" + id,
    method: "delete"
  });
}
// 打印佈飛
export function print(params) {
  return axios({
    url: "/api/proFinishJob/proFinishPdf",
    method: "get",
    params: params
  });
}
