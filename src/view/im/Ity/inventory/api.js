/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:09
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-20 09:05:23
 * @Description:
 */
import axios from "axios";


// 根据纱线信息获取出入仓明细
export function fetchWhseDtlDataByYarns(params){
  return axios({
    url: "/api/viewYarnStock/whseDtl/page",
    method: "get",
    params: params
  });
}

// 判断当天是否已存在清单
export function fetchCheckHasExistByNow(params) {
  return axios({
    url: "/api/whseInventory/check/has/exist",
    method: "get",
    params: params
  });
}

// 生成指定的材料类型盘点清单快照
export function createSnapshot2StockType(params) {
  return axios({
    url: "/api/whseInventory/snapshot",
    method: "get",
    params: params
  });
}

export function getSxList(params) {
  return axios({
    url: "/api/viewYarnStock",
    method: "get",
    params: params
  });
}

export function getSx(params) {
  return axios({
    url: "/api/viewYarnStock/page",
    method: "get",
    params: params
  });
}

export function getRhlList(params) {
  return axios({
    url: "/api/viewChemicalStock",
    method: "get",
    params: params
  });
}

export function getRhl(params) {
  return axios({
    url: "/api/viewChemicalStock/page",
    method: "get",
    params: params
  });
}

export function getRllList(params) {
  return axios({
    url: "/api/viewDyestuffStock",
    method: "get",
    params: params
  });
}
export function getRll(params) {
  return axios({
    url: "/api/viewDyestuffStock/page",
    method: "get",
    params: params
  });
}

export function getCpbList(params) {
  return axios({
    url: "/api/prodStock",
    method: "get",
    params: params
  });
}
export function getCpb(params) {
  return axios({
    url: "/api/prodStock/page",
    method: "get",
    params: params
  });
}

export function getNote(params) {
  return axios({
    url: "/api/proClothNote/page",
    method: "get",
    params: params
  });
}

export function getNoteList(params) {
  return axios({
    url: "/api/proClothNote",
    method: "get",
    params: params
  });
}
