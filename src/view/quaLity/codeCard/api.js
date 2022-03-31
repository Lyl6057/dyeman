/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-31 14:31:12
 * @Description:
 */

import axios from "axios";

// 查询码卡历史记录
export function getCodeHistory(params) {
  return axios({
    url: "/api/proFinalProductCardHis",
    method: "get",
    params: params
  });
}

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

export function getNotPage(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: params
  });
}

// 獲取打印記錄
export function get(params, r_clothCheckTime_r) {
  return axios({
    url:
      "/api/proFinalProductCard/page?r_clothCheckTime_r=" + r_clothCheckTime_r,
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

export function del(id) {
  return axios({
    url: "/api/proFinalProductCard?cardId=" + id,
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
    url: "/api/whseCalicoin/v1.0/save",
    method: "post",
    params: data
  });
}

// 新增入仓明细
export function addInDtla(data) {
  return axios({
    url: "/api/whseCalicoinDtla/v1.0/save",
    method: "post",
    params: data
  });
}

// 新增入仓批号资料
export function addInDtlb(data) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/save",
    method: "post",
    params: data
  });
}

export function getRevolve(params) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "get",
    params: params
  });
}
