/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-03-26 09:59:34
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-03-29 15:55:23
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


//  获取盘点详情数据
export function fetchInvDtlDataByPage(params){
  return axios({
    url: "/api/whseInventoryDtl/page",
    method: "get",
    params: params
  });
}

// 判断是否存在修改
export function validIsEditQty(params){
  return axios({
    url: "/api/whseInventoryDtl/valid/isEdit/qty",
    method: "get",
    params: params
  });
}

// 一键录入实际库存
export function fetchAllUpdateInvQty(data){
  return axios({
    url: "/api/whseInventoryDtl/update/all/inventory/qty",
    method: "post",
    data: data
  });
}


// 批量修改实际库存值
export function fetchBatchUpdateInvQty(data){
  return axios({
    url: "/api/whseInventoryDtl/batch/update/inventory/qty",
    method: "post",
    data: data
  });
}


