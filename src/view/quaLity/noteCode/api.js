/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-06 15:07:03
 * @Description:
 */
import axios from "axios";


export function getLoom(params) {
  return axios({
    url: "/api/proWeaveJobUseMachine",
    method: "get",
    params: params
  });
}


export function getCheckItem(params) {
  return axios({
    url: "/api/qcClothCheckItem",
    method: "get",
    params: params
  });
}

export function getPreview(id) {
  return axios({
    url: "/api/proFinalProductCard/cardPdf?cardId=" + id,
    method: "get"
  });
}

// download
export function download(params) {
  return axios({
    url: "/api/basePrintTemplate/download",
    method: "get",
    params: params
  });
}

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

// 更新
export function updateUpload(params) {
  return axios({
    url: "/api/basePrintTemplate/excelUpdatefile",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export function get(params) {
  return axios({
    url: "/api/proClothNote",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proClothNote",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proClothNote",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proClothNote?noteId=" + id,
    method: "delete"
  });
}
export function getWeave(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

export function getBleadye(params) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "get",
    params: params
  });
}
export function getBleadyeByPage(params) {
  return axios({
    url: "/api/proBleadyeJob/page",
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
