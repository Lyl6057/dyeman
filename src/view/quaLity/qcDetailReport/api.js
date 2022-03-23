/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-23 10:11:37
 * @Description:
 */

import axios from "axios";

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
