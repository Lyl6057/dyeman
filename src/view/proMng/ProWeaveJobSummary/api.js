/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-14 09:15:17
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-14 09:15:17
 */
import axios from "axios";

// 获得拆缸后的重量
export function fetchProBleadyeRunJobByPage(params) {
  return axios({
    url: "/api/proWeaveJob/weaveJob/summary",
    method: "get",
    params: params,
  });
}

