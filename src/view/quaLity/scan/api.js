/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-15 16:37:27
 * @Description:
 */

import axios from "axios";

// 查询载具使用记录
export function getStorageLog(params) {
  return axios({
    url: "/api/whsCarriageStorageLog",
    method: "get",
    params: params
  });
}

// 新增载具记录
export function addStorageLog(params) {
  return axios({
    url: "/api/whsCarriageStorageLog",
    method: "post",
    params: params
  });
}

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

export function getWeave(params) {
  return axios({
    url: "/api/proWeaveJob",
    method: "get",
    params: params
  });
}

// 獲取打印記錄
export function get(params) {
  return axios({
    url: "/api/proClothNote",
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
