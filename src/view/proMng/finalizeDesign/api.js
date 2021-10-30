/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-28 10:09:23
 * @Description:
 */

import axios from "axios";

export function getTechargueList(params) {
  return axios({
    url: "/api/baseBleadyeTechargue",
    method: "get",
    params: params
  });
}

// 獲取訂單號
export function getPo(params) {
  return axios({
    url: "/api/salPoList",
    method: "get",
    params: params
  });
}

// 獲取訂單胚布资料
export function getPoDtla(params) {
  return axios({
    url: "/api/salPoDtlaList",
    method: "get",
    params: params
  });
}

// 獲取訂單面料资料Sal_bom_fabric
export function getBom(params) {
  return axios({
    url: "/api/salBomFabric",
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

export function get(params) {
  return axios({
    url: "/api/proFinishJob/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proFinishJob",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proFinishJob",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proFinishJob?finishJobId=" + id,
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

export function getProcess(params) {
  return axios({
    url: "/api/proFinishJobItem",
    method: "get",
    params: params
  });
}

// 新增
export function addProcess(data) {
  return axios({
    url: "/api/proFinishJobItem",
    method: "post",
    params: data
  });
}

// 修改
export function updateProcess(data) {
  return axios({
    url: "/api/proFinishJobItem",
    method: "put",
    params: data
  });
}

// 刪除
export function delProcess(id) {
  return axios({
    url: "/api/proFinishJobItem?jobItmeId=" + id,
    method: "delete"
  });
}

export function getFormula(params) {
  return axios({
    url: "/api/proFinishJobMaterialFormula",
    method: "get",
    params: params
  });
}

// 新增
export function addFormula(data) {
  return axios({
    url: "/api/proFinishJobMaterialFormula",
    method: "post",
    params: data
  });
}

// 修改
export function updateFormula(data) {
  return axios({
    url: "/api/proFinishJobMaterialFormula",
    method: "put",
    params: data
  });
}

// 刪除
export function delFormula(id) {
  return axios({
    url: "/api/proFinishJobMaterialFormula?formulaId=" + id,
    method: "delete"
  });
}
