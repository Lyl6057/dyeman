/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-23 10:36:15
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-16 08:57:54
 */
import axios from "axios";

// 获取fineReport路径接口
export function fetchFineReportUrl(params) {
  return axios({
    url: "/api/basFinereporturl/finereport/detail",
    method: "get",
    params:params
  });
}

// 获得拆缸后的重量
export function fetchProBleadyeRunJobByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params,
  });
}

