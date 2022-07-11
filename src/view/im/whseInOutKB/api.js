/*
 * @Author: Lyl
 * @Date: 2022-01-13 09:53:53
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-30 09:11:58
 * @FilePath: \iot.vue\src\view\im\whseInOutKB\api.js
 * @Description:
 */
import axios from "axios";

// 新增载具日志
export function addStorageLog(data) {
  return axios({
    url: "/api/whsCarriageStorageLog",
    method: "post",
    params: data
  });
}

// 查询载具日志
export function getStorageLog(params) {
  return axios({
    url: "/api/whsCarriageStorageLog",
    method: "get",
    params: params
  });
}

// 修改载具日志
export function updateStorageLog(data) {
  return axios({
    url: "/api/whsCarriageStorageLog",
    method: "put",
    params: data
  });
}

// 查询成品布库存
export function getFinalStock(params) {
  return axios({
    url: "/api/viewWmsTray/page", //prodStock
    method: "get",
    params: params
  });
}

// 查询胚布库存
export function getNoteStock(params) {
  return axios({
    url: "/api/viewWmsCalicoTray/page", //prodStock
    method: "get",
    params: params
  });
}

// 发送任务
export function sendTask(data) {
  return axios({
    url: "/erp/sendWmsIns",
    method: "post",
    data: data
  });
}
// 发送任务,不生成入库记录
export function sendTaskNoin(data) {
  return axios({
    url: "/erp/sendWmsInsEx",
    method: "post",
    data: data
  });
}

export function sendTestTaskNoin(data) {
  return axios({
    url: "/erp/sendWmsInsExtest",
    method: "post",
    data: data
  });
}
// 新增任务记录
export function addTask(data) {
  return axios({
    url: "/erp",
    method: "post",
    params: data
  });
}

// 修改任务记录
export function updateTask(data) {
  return axios({
    url: "/erp",
    method: "put",
    params: data
  });
}

// 查询任务信息
export function getTaskList(params) {
  return axios({
    url: "/erp",
    method: "get",
    params: params
  });
}

export function getTask(params) {
  return axios({
    url: "/erp/page",
    method: "get",
    params: params
  });
}

// 查询布票称重记录 state = 1 已称重 2 已入仓
export function getInCloth(params) {
  return axios({
    url: "/api/proClothNote/page",
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
    url: "/api/proFinalProductCard/stockpage",
    method: "get",
    params: params
  });
}

// 查询成品布码卡称重记录 state = 1 已称重 2 已入仓
export function getInFinishedByPage(params) {
  return axios({
    url: "/api/proFinalProductCard/page",
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

// 查询胚布入仓记录
export function getInWhse(params) {
  return axios({
    url: "/api/whseCalicoin/v1.0/list",
    method: "get",
    params: params
  });
}

// 修改入仓记录
export function updateInWhse(data) {
  return axios({
    url: "/api/whseCalicoin/v1.0/updateById",
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

// 查询胚布入仓记录
export function getInDtla(params) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/list",
    method: "get",
    params: params
  });
}

// 修改入仓明细
export function updateInDtla(data) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/updateById",
    method: "put",
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

// 查询成品布入仓记录
export function getInFinishedWhse(params) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/list",
    method: "get",
    params: params
  });
}

// 新增成品布入仓记录
export function addInFinishedWhse(data) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/save",
    method: "post",
    params: data
  });
}

// 修改成品布入仓记录
export function updateFinishedWhse(data) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/updateById",
    method: "put",
    params: data
  });
}

// 查询成品布入仓明细
export function getInFinishedDtla(params) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/list",
    method: "get",
    params: params
  });
}

// 新增成品布入仓明细
export function addInFinishedDtla(data) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/save",
    method: "post",
    params: data
  });
}
// 修改成品布入仓明细记录
export function updateFinishedDtla(data) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/updateById",
    method: "put",
    params: data
  });
}

// 新增入仓货物包明细
export function addInFinishedDtlb(data) {
  return axios({
    url: "/api/whseFinishedclothcargopackDtl",
    method: "post",
    params: data
  });
}

// 查询成品布出仓记录
export function getOutFinishedWhse(data) {
  return axios({
    url: "/api/whseFinclothsellout",
    method: "get",
    params: data
  });
}
// 修改成品布出仓记录
export function updateOutFinishedWhse(data) {
  return axios({
    url: "/api/whseFinclothsellout",
    method: "put",
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
