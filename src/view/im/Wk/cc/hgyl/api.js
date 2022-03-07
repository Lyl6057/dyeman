/*
 * @Author: Lyl
 * @Date: 2021-11-16 10:39:54
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-01 16:30:43
 * @Description:
 */
import axios from "axios";

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
