/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:20:20
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-12 15:12:50
 * @Description:
 */
import axios from "axios";

export function fetchDayOutputData(params) {
  return axios({
    url: "/api/proWeaveJob/day/output",
    method: "get",
    params: params
  });
}

