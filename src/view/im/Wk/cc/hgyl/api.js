/*
 * @Author: Lyl
 * @Date: 2021-11-16 10:39:54
 * @LastEditors: Lyl
 * @LastEditTime: 2021-11-16 16:33:16
 * @Description:
 */
import axios from "axios";

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
