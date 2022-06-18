/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-17 16:41:27
 * @Description:
 */

import axios from "axios";

// 审核
export function aduitQcCheckoutFabric(params) {
  return axios({
    url: "/api/qcCheckoutFabric/vouch",
    method: "put",
    params
  });
}

// 获得拆缸后的重量
export function getDismantleVatno(val) {
  return axios({
    url: "/api/proFinalProductCard/DismantleVatno?vatNo=" + val,
    method: "get"
  });
}

// 修改运转单记录
export function updateRunJob(data) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "put",
    params: data
  });
}

export function getFinishedNote(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: params
  });
}

export function getRunJobByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

// 查询
export function get(params) {
  return axios({
    url: "/api/qcCheckoutFabric/page",
    method: "get",
    params: params
  });
}

// 新增佈飛记录
export function add(data) {
  return axios({
    url: "/api/qcCheckoutFabric",
    method: "post",
    params: data
  });
}

// 修改佈飛记录
export function update(data) {
  return axios({
    url: "/api/qcCheckoutFabric",
    method: "put",
    params: data
  });
}

// 修改佈飛记录
export function del(id) {
  return axios({
    url: "/api/qcCheckoutFabric?checkoutId=" + id,
    method: "delete"
  });
}
