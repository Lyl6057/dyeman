/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-13 16:32:18
 * @Description:
 */

import axios from "axios";

// 查询漂染单
export function getDye(params) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "get",
    params: params
  });
}
// 修改
export function updateDye(data) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "put",
    params: data
  });
}
export function addDye(data) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "post",
    params: data
  });
}

export function addProject(data) {
  return axios({
    url: "/api/proBleadyeJobItem",
    method: "post",
    params: data
  });
}
export function addDyeProject(data) {
  return axios({
    url: "/api/proBleadyeJobItem",
    method: "post",
    params: data
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
// 獲取訂單颜色资料
export function getPoDtlb(params) {
  return axios({
    url: "/api/salPoColor",
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

export function get(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proBleadyeRunJob?runJobId=" + id,
    method: "delete"
  });
}

export function delDye(id) {
  return axios({
    url: "/api/proBleadyeJob?bleadyeJobId=" + id,
    method: "delete"
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

// 修改入仓记录
export function updateInwhse(data) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/updateById",
    method: "put",
    params: data
  });
}

export function getBf(params) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "get",
    params: params
  });
}

// 新增
export function addBf(data) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "post",
    params: data
  });
}

// 修改
export function updateBf(data) {
  return axios({
    url: "/api/proBleadyeRunJobCalico",
    method: "put",
    params: data
  });
}

// 修改
export function delbf(id) {
  return axios({
    url: "/api/proBleadyeRunJobCalico?recId=" + id,
    method: "delete"
  });
}

export function getTest(params) {
  return axios({
    url: "/api/proBleadyeRunJobTest",
    method: "get",
    params: params
  });
}

// 新增
export function addTest(data) {
  return axios({
    url: "/api/proBleadyeRunJobTest",
    method: "post",
    params: data
  });
}
export function addDyeTest(data) {
  return axios({
    url: "/api/proBleadyeJobTest",
    method: "post",
    params: data
  });
}

// 修改
export function updateTest(data) {
  return axios({
    url: "/api/proBleadyeRunJobTest",
    method: "put",
    params: data
  });
}

// 修改
export function deltest(id) {
  return axios({
    url: "/api/proBleadyeRunJobTest?jobTestId=" + id,
    method: "delete"
  });
}

export function getItem(params) {
  return axios({
    url: "/api/proBleadyeRunJobItem",
    method: "get",
    params: params
  });
}

// 新增
export function addItem(data) {
  return axios({
    url: "/api/proBleadyeRunJobItem",
    method: "post",
    params: data
  });
}

// 修改
export function updateItem(data) {
  return axios({
    url: "/api/proBleadyeRunJobItem",
    method: "put",
    params: data
  });
}

// 修改
export function delitem(id) {
  return axios({
    url: "/api/proBleadyeRunJobItem?itemId=" + id,
    method: "delete"
  });
}

// 打印佈飛
export function print(params) {
  return axios({
    url: "/api/proBleadyeJob/buildWorkOrder",
    method: "get",
    params: params
  });
}

export function getGroup(params) {
  return axios({
    url: "/api/proWeaveJobGroup",
    method: "get",
    params: params
  });
}

export function getYarn(params) {
  return axios({
    url: "/api/proWeaveJobYarn",
    method: "get",
    params: params
  });
}
