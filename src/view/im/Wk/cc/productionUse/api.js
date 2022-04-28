/*
 * @Author: Lyl
 * @Date: 2021-11-16 10:39:54
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-28 08:49:42
 * @Description:
 */
import axios from "axios";

// 检验出仓数据
export function fetchValidOutWeight(dataList) {
  return axios({
    url: "/api/viewYarnStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

export function updateSglyd(params) {
  return axios({
    url: "/api/purSingle",
    method: "put",
    params: params
  });
}

export function getSglydmx(params) {
  return axios({
    url: "/api/purSingleDtl",
    method: "get",
    params: params
  });
}

export function getLydmx(params) {
  return axios({
    url: "/api/purApplicationDtl",
    method: "get",
    params: params
  });
}

export function getHgylStock(params) {
  return axios({
    url: "/api/viewChemicalStock",
    method: "get",
    params: params
  });
}
