/*
 * @Author: Lyl
 * @Date: 2022-01-13 09:53:53
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-13 15:57:05
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\api.js
 * @Description:
 */
import axios from "axios";

// 查询布票称重记录 state = 1 已称重 2 已入仓
export function getInCloth(params) {
  return axios({
    url: "/api/proClothNote",
    method: "get",
    params: params
  });
}

// 修改布票记录
export function updateNote(data) {
  return axios({
    url: "/api/proClothNote",
    method: "put",
    params: data
  });
}

// 查询成品布码卡称重记录 state = 1 已称重 2 已入仓
export function getInFinished(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: params
  });
}

// 修改码卡记录
export function updateFinished(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "put",
    params: data
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

// 新增出仓记录
export function addOutWhse(data) {
  return axios({
    url: "/api/whseMaterial",
    method: "post",
    params: data
  });
}

// 新增出仓明细
export function addOutDtla(data) {
  return axios({
    url: "/api/whseMaterialDla",
    method: "post",
    params: data
  });
}

// 新增出仓批号资料
export function addOutDtlb(data) {
  return axios({
    url: "/api/whseMaterialDlb",
    method: "post",
    params: data
  });
}

// 新增入仓记录
export function addInFinishedWhse(data) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/save",
    method: "post",
    params: data
  });
}

// 新增入仓明细
export function addInFinishedDtla(data) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/save",
    method: "post",
    params: data
  });
}

// 新增成品布出仓记录
export function addOutFinishedWhse(data) {
  return axios({
    url: "/api/whseFinclothsellout",
    method: "post",
    params: data
  });
}

// 新增出仓明细
export function addOutFinishedDtla(data) {
  return axios({
    url: "/api/whseFinclothselloutDtla",
    method: "post",
    params: data
  });
}

// 新增出仓批号资料
export function addOutFinishedDtlb(data) {
  return axios({
    url: "/api/whseFinclothselloutDtlb",
    method: "post",
    params: data
  });
}
