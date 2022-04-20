/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-20 09:20:28
 * @Description:
 */

import axios from "axios";

// 添加出仓主表记录
export function addOutWhse(data) {
  return axios({
    url: "/api/whseMaterial",
    method: "post",
    params: data
  });
}

// 添加出仓明细记录
export function addOutWhseDla(data) {
  return axios({
    url: "/api/whseMaterialDla",
    method: "post",
    params: data
  });
}

// 添加出仓批号记录
export function addOutWhseDlb(data) {
  return axios({
    url: "/api/whseMaterialDlb",
    method: "post",
    params: data
  });
}

// 添加胚布记录
export function addCalico(data) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "post",
    params: data
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

// 新增佈飛记录
export function addNote(data) {
  return axios({
    url: "/api/proClothNote/cpn",
    method: "post",
    params: data
  });
}

// 修改入仓记录
export function updateInwhse(data) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/updateById",
    method: "put",
    params: data
  });
}
// 获取入仓记录
export function getInwhse(data) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/list",
    method: "get",
    params: data
  });
}

// 獲t通知单
export function getWeave(params) {
  return axios({
    url: "/api/proWeaveJob",
    method: "get",
    params: params
  });
}

// 獲取打印記錄
export function getNote(params) {
  return axios({
    url: "/api/proClothNote",
    method: "get",
    params: params
  });
}

// 獲取打印記錄
export function getNoteByPage(params) {
  return axios({
    url: "/api/proClothNote/page",
    method: "get",
    params: params
  });
}

// 獲取运转单胚布信息
export function getJobCalico(params) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "get",
    params: params
  });
}

export function get(params) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "get",
    params: params
  });
}

// 新增佈飛记录
export function add(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
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
    url: "/api/proBleadyeRunJob?runJobId=" + id,
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
