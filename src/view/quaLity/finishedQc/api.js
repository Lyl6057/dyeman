/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-18 14:47:05
 * @Description:
 */

import axios from "axios";

// 查布记录
export function getQcRecord(params) {
  return axios({
    url: "/api/qcClothCheckRecord",
    method: "get",
    params: params
  });
}

// 修改查布记录
export function updateQcRecord(params) {
  return axios({
    url: "/api/qcClothCheckRecord",
    method: "put",
    params: params
  });
}

// 新增查布记录
export function addQcRecord(params) {
  return axios({
    url: "/api/qcClothCheckRecord",
    method: "post",
    params: params
  });
}

// 查布项目
export function getQcItem(params) {
  return axios({
    url: "/api/qcClothCheckItem",
    method: "get",
    params: params
  });
}

// 修改佈飛记录
export function updateNote(data) {
  return axios({
    url: "/api/proClothNote",
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
    url: "/api/proClothNote",
    method: "post",
    params: data
  });
}

// 修改佈飛记录
export function update(data) {
  return axios({
    url: "/api/proClothNote",
    method: "put",
    params: data
  });
}

// 修改佈飛记录
export function del(id) {
  return axios({
    url: "/api/proClothNote?noteId=" + id,
    method: "delete"
  });
}

// 打印佈飛
export function printBf(id) {
  return axios({
    url: "/api/proClothNote/printing?id=" + id,
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
