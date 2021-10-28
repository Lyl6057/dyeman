/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-26 19:13:00
 * @Description:
 */

import axios from "axios";

// 通过排期类型查找工作包
export function getW(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

// 修改
export function updateW(data) {
  return axios({
    url: "/api/proWeaveJob",
    method: "put",
    params: data
  });
}

export function get(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

// 新增佈飛记录
export function add(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "post",
    params: data
  });
}

// 修改佈飛记录
export function update(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "put",
    params: data
  });
}

// 修改佈飛记录
export function del(id) {
  return axios({
    url: "/api/proFinalProductCard?noteId=" + id,
    method: "delete"
  });
}

// 打印佈飛
export function printBf(id) {
  return axios({
    url: "/api/proFinalProductCard/printing?id=" + id,
    method: "get"
  });
}

// 新增入仓记录
export function addInWhse(data) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/save",
    method: "post",
    params: data
  });
}

// 新增入仓明细
export function addInDtla(data) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/save",
    method: "post",
    params: data
  });
}
