/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:43
 * @LastEditors: Lyl
 * @LastEditTime: 2022-04-28 16:52:31
 * @Description:
 */
import axios from "axios";

export function getSglydmx(params) {
  return axios({
    url: "/api/purSingleDtl",
    method: "get",
    params: params
  });
}

// 获取fineReport路径接口
export function fetchFineReportUrl(params) {
  return axios({
    url: "/api/basFinereporturl/finereport/detail",
    method: "get",
    params: params
  });
}

export function getAuthority(params) {
  return axios({
    url: "/api/ucmlUserLists",
    method: "get",
    params: params
  });
}

export function baseCodeSupply(params) {
  return axios({
    url: "/api/baseCodeSupply",
    method: "get",
    params: params
  });
}
export function baseCodeSupplyEx(params) {
  return axios({
    url: "/api/baseCodeSupplyEx",
    method: "get",
    params: params
  });
}
export function getCodeValue(codeTableId) {
  return axios({
    url: "/api/getcodeValue?codeTableId=" + codeTableId,
    method: "get"
  });
}

export function getHardwarearticles(params) {
  return axios({
    url: "/api/basHardwarearticles",
    method: "get",
    params: params
  });
}

export function getAdsuppliesarticles(params) {
  return axios({
    url: "/api/basAdsuppliesarticles",
    method: "get",
    params: params
  });
}

export function getProductivesupplies(params) {
  return axios({
    url: "/api/basProductivesupplies",
    method: "get",
    params: params
  });
}

export function updatePurApp(params) {
  return axios({
    url: "/api/purApplication",
    method: "put",
    params: params
  });
}

// 申请领用单
export function getPurApplication(params) {
  return axios({
    url: "/api/purApplication",
    method: "get",
    params: params
  });
}
