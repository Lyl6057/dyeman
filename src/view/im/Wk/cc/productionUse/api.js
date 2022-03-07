/*
 * @Author: Lyl
 * @Date: 2021-11-16 10:39:54
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-28 19:12:52
 * @Description:
 */
import axios from "axios";

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
