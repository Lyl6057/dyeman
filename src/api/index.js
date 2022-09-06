/*
 * @Author: Lyl
 * @Date: 2021-03-10 13:20:43
 * @LastEditors: Lyl
 * @LastEditTime: 2022-09-06 10:03:01
 * @Description:
 */
import axios from "axios";

export function fetchBaseWorkStepData(data) {
  return axios({
    url: "/api/baseWorkStep",
    method: "get",
    params: data
  });
}


// 新增收发单信息
export function createProDptReciveLogData(data) {
  return axios({
    url: "/api/proDptReciveLog",
    method: "post",
    params: data
  });
}


// 用户组织信息
export function getLoginOrg(params) {
  return axios({
    url: "/api/ucmlOrganize/loginOrg",
    method: "get",
    params: params
  });
}


export function getPurApplicationDtl(params) {
  return axios({
    url: "/api/purApplicationDtl",
    method: "get",
    params: params
  });
}

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
