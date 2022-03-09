/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:09
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-09 08:20:55
 * @Description:
 */
import axios from "axios";

export function getSxList(params) {
  return axios({
    url: "/api/viewYarnStock",
    method: "get",
    params: params
  });
}

export function getSx(params) {
  return axios({
    url: "/api/viewYarnStock/page",
    method: "get",
    params: params
  });
}

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

export function getCpbList(params) {
  return axios({
    url: "/api/prodStock",
    method: "get",
    params: params
  });
}
export function getCpb(params) {
  return axios({
    url: "/api/prodStock/page",
    method: "get",
    params: params
  });
}
