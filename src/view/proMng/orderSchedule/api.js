/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-08 13:36:12
 * @Description:
 */

import axios from "axios";

// 通过排期类型过滤工作包
export function getPackage(params) {
  return axios({
    url: "/api/baseWorkPackage",
    method: "get",
    params: params
  });
}

// 查询织单
export function getWeaveByPage(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

// 查询运转单
export function getRunByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
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

// 通过排期类型查找工作包
export function get(params) {
  return axios({
    url: "/api/proSalScheduleList",
    method: "post",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/createSch",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proSalSchedule",
    method: "post",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proSalSchedule?schId=" + id,
    method: "delete"
  });
}

// 查询明细
export function getDetail(params) {
  return axios({
    url: "/api/proSalScheduleDetail",
    method: "get",
    params: params
  });
}

// 新增
export function addDetail(data) {
  return axios({
    url: "/api/proSalScheduleDetail",
    method: "post",
    params: data
  });
}

// 修改
export function updateDetail(data) {
  return axios({
    url: "/api/proSalScheduleDetail",
    method: "put",
    params: data
  });
}

// 修改
export function delDetail(id) {
  return axios({
    url: "/api/proSalScheduleDetail?detailId=" + id,
    method: "delete"
  });
}
