/*
 * @Author: Yang 
 * @Date: 2022-03-12 09:51:50 
 * @Last Modified by: Yang
 * @Last Modified time: 2022-03-15 09:05:36
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

  // 获取订单汇总接口数据
export function fetchReveiptSumDataList(params = {}){
  return axios({
    url: "/api/pro/rpt/reveipt/sum",
    method: "get",
    params:params
  });
}