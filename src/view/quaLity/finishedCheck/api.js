/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-09-11 15:47:00
 * @Description:
 */

import axios from "axios";

// 修改佈飛记录
export function updateNote(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "put",
    params: data
  });
}
// 獲取打印記錄
export function getJob(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

// 獲取打印記錄
export function get(params) {
  return axios({
    url: "/api/proFinalProductCard/page",
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
    url: "/api/proFinalProductCard",
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
