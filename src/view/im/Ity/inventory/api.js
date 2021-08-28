/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:09
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-26 18:59:19
 * @Description:
 */
import axios from "axios";

export function getRhlList(params) {
  return axios({
    url: "/api/viewChemicalStock",
    method: "get",
    params: params
  });
}

export function getRhl(params) {
  return axios({
    url: "/api/viewChemicalStock/page",
    method: "get",
    params: params
  });
}

export function getRllList(params) {
  return axios({
    url: "/api/viewDyestuffStock",
    method: "get",
    params: params
  });
}
export function getRll(params) {
  return axios({
    url: "/api/viewDyestuffStock/page",
    method: "get",
    params: params
  });
}
