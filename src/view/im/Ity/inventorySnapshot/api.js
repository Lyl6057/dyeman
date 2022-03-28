/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-26 09:59:34
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-03-28 14:39:59
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

export function fetchInvSnapDataByPage(params){
    return axios({
        url: "/api/whseInventory/page",
        method: "get",
        params: params
      });
}

export function fetchUpdateInvSnapData(params){
  return axios({
    url: "/api/whseInventory/update",
    method: "put",
    params: params
  });
}