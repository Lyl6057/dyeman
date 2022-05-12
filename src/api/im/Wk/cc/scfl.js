/*
 * @Author: Lyl
 * @Date: 2021-01-23 08:03:49
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-11 16:24:14
 * @Description:
 */
import axios from "axios";
// ---- 生产辅料
export function getScfl(params) {
  return axios({
    url: "/api/whseAccessoriesOut/page",
    method: "get",
    params: params
  });
}
export function addScfl(params) {
  return axios({
    url: "/api/whseAccessoriesOut",
    method: "post",
    params: params
  });
}
export function updateScfl(params) {
  return axios({
    url: "/api/whseAccessoriesOut",
    method: "put",
    params: params
  });
}
export function delScfl(id) {
  return axios({
    url: "/api/whseAccessoriesOut?whseAccessoriesoutoid=" + id,
    method: "delete"
  });
}

export function getScflDetali(params) {
  return axios({
    url: "/api/whseAccessoriesOutDtl/page",
    method: "get",
    params: params
  });
}
export function addScflDetali(params) {
  return axios({
    url: "/api/whseAccessoriesOutDtl",
    method: "post",
    params: params
  });
}
export function updateScflDetali(params) {
  return axios({
    url: "/api/whseAccessoriesOutDtl",
    method: "put",
    params: params
  });
}
export function delScflDetali(id) {
  return axios({
    url: "/api/whseAccessoriesOutDtl?whseAccessoriesoutDtloid=" + id,
    method: "delete"
  });
}

export function getScflDtla(params) {
  return axios({
    url: "/api/whseAccessoriesOutDtla",
    method: "get",
    params: params
  });
}

export function addScflDtla(params) {
  return axios({
    url: "/api/whseAccessoriesOutDtla",
    method: "post",
    params: params
  });
}

export function updateScflDtla(params) {
  return axios({
    url: "/api/whseAccessoriesOutDtla",
    method: "put",
    params: params
  });
}

export function delScflDtla(id) {
  return axios({
    url: "/api/whseAccessoriesOutDtla?dtlaId=" + id,
    method: "delete"
  });
}

// ---- 退供應商
export function getRetsup(params) {
  return axios({
    url: "/api/whseRetsuppaccessories/page",
    method: "get",
    params: params
  });
}
export function addRetsup(params) {
  return axios({
    url: "/api/whseRetsuppaccessories",
    method: "post",
    params: params
  });
}
export function updateRetsup(params) {
  return axios({
    url: "/api/whseRetsuppaccessories",
    method: "put",
    params: params
  });
}
export function delRetsup(id) {
  return axios({
    url: "/api/whseRetsuppaccessories?whseRetsuppaccessoriesoid=" + id,
    method: "delete"
  });
}
export function getRetsupDtl(params) {
  return axios({
    url: "/api/whseRetsuppaccessoriesDtl/page",
    method: "get",
    params: params
  });
}
export function addRetsupDtl(params) {
  return axios({
    url: "/api/whseRetsuppaccessoriesDtl",
    method: "post",
    params: params
  });
}
export function updateRetsupDtl(params) {
  return axios({
    url: "/api/whseRetsuppaccessoriesDtl",
    method: "put",
    params: params
  });
}
export function delRetsupDtl(id) {
  return axios({
    url: "/api/whseRetsuppaccessoriesDtl?whseRetsuppaccessoriesDtloid=" + id,
    method: "delete"
  });
}

// ---- 调仓
export function getTra(params) {
  return axios({
    url: "/api/whseTransferaccessories/page",
    method: "get",
    params: params
  });
}
export function addTra(params) {
  return axios({
    url: "/api/whseTransferaccessories",
    method: "post",
    params: params
  });
}
export function updateTra(params) {
  return axios({
    url: "/api/whseTransferaccessories",
    method: "put",
    params: params
  });
}
export function delTra(id) {
  return axios({
    url: "/api/whseTransferaccessories?whseTransferaccessoriesoid=" + id,
    method: "delete"
  });
}
export function getTraDtl(params) {
  return axios({
    url: "/api/whseTransferaccessoriesDtl/page",
    method: "get",
    params: params
  });
}
export function addTraDtl(params) {
  return axios({
    url: "/api/whseTransferaccessoriesDtl",
    method: "post",
    params: params
  });
}
export function updateTraDtl(params) {
  return axios({
    url: "/api/whseTransferaccessoriesDtl",
    method: "put",
    params: params
  });
}
export function delTraDtl(id) {
  return axios({
    url: "/api/whseTransferaccessoriesDtl?whseTransferaccessoriesDtloid=" + id,
    method: "delete"
  });
}

// ---- 生产辅料
export function getRetmaterials(params) {
  return axios({
    url: "/api/whseRetmaterials/page",
    method: "get",
    params: params
  });
}
export function addRetmaterials(params) {
  return axios({
    url: "/api/whseRetmaterials",
    method: "post",
    params: params
  });
}
export function updateRetmaterials(params) {
  return axios({
    url: "/api/whseRetmaterials",
    method: "put",
    params: params
  });
}
export function delRetmaterials(id) {
  return axios({
    url: "/api/whseRetmaterials?whseRetmaterialsoid=" + id,
    method: "delete"
  });
}
export function getRetmaterialsDtl(params) {
  return axios({
    url: "/api/whseRetmaterialsDtl/page",
    method: "get",
    params: params
  });
}
export function addRetmaterialsDtl(params) {
  return axios({
    url: "/api/whseRetmaterialsDtl",
    method: "post",
    params: params
  });
}
export function updateRetmaterialsDtl(params) {
  return axios({
    url: "/api/whseRetmaterialsDtl",
    method: "put",
    params: params
  });
}
export function delRetmaterialsDtl(id) {
  return axios({
    url: "/api/whseRetmaterialsDtl?whseRetmaterialsDtloid=" + id,
    method: "delete"
  });
}
// 配料计划
export function getWhseRetmaterialsPlan(params) {
  return axios({
    url: "/api/vWhseRetmaterialsPlan/page",
    method: "get",
    params: params
  });
}
