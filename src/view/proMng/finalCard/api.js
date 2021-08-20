/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:55
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-20 09:22:48
 * @Description:
 */
import axios from "axios";

// 新增
export function upload(params) {
  return axios({
    url: "/api/basePrintTemplate/excelfile",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export function get(params) {
  return axios({
    url: "/api/proFinalProductCard/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proFinalProductCard?cardId=" + id,
    method: "delete"
  });
}
export function getWeave(params) {
  return axios({
    url: "/api/proWeaveJob",
    method: "get",
    params: params
  });
}

export function getRevolve(params) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "get",
    params: params
  });
}

export function getTem(params) {
  return axios({
    url: "/api/basePrintTemplate/list",
    method: "get",
    params: params
  });
}

// 新增
export function addTem(data) {
  return axios({
    url: "/api/basePrintTemplate/save",
    method: "post",
    params: data
  });
}

// 修改
export function updateTem(data) {
  return axios({
    url: "/api/basePrintTemplate/updateById",
    method: "put",
    params: data
  });
}

// 修改
export function delTem(id) {
  return axios({
    url: "/api/basePrintTemplate/removeById?id=" + id,
    method: "delete"
  });
}
