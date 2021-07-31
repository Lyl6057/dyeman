import axios from "axios";

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
