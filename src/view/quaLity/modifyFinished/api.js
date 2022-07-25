/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-21 15:45:01
 * @Description:
 */

import axios from "axios";

// 修改
export function updateFinished(data) {
  return axios({
    url: "/api/proFinalProductCard/",
    method: "put",
    params: data
  });
}

//回复
export function updateFinishedRCV(data) {
  return axios({
    url: "/api/proFinalProductCard/rcv", // new recovery
    method: "put",
    params: data
  });
}

// 修改
export function addFinished(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "post",
    params: data
  });
}

export function getFinishList(params) {
  return axios({
    url: "/api/proFinalProductCard",
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

export function getFinish(params, r_clothCheckTime_r) {
  return axios({
    url:
      "/api/proFinalProductCard/page?r_clothCheckTime_r=" + r_clothCheckTime_r,
    method: "get",
    params: params
  });
}

export function del(id) {
  return axios({
    url: "/api/proFinalProductCard?cardId=" + id,
    method: "delete"
  });
}
