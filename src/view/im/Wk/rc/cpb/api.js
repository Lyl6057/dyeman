/*
 * @Author: Lyl
 * @Date: 2021-08-21 16:12:46
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-21 16:13:13
 * @Description:
 */

import axios from "axios";

// 紗線
export function getProRunJob(params) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "get",
    params: params
  });
}
