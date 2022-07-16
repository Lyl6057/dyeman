/*
 * @Author: PMP
 * @Date: 2022-07-13 12:55:12
 * @LastEditors: 
 * @LastEditTime: 
 * @Description:
 */

import axios from "axios";


export function getallDpt() {
  return axios({
    url: "/api/proDptworkProcess",
    method: "get"
  })
}

export function getFinishedNoteByPage(params) {
  return axios({
    url: "/api/proFinalProductCard/page",
    method: "get",
    params: params
  });
}



export function getinfoCard(data) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: data
  });
}


export function getJob(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

export function getMargePage(data) {
  return axios({
    url: "/api/proFinalProductMerge/page",
    method: "get",
    params: data
  });
}

export function postMarge(data) {
  return axios({
    url: "/api/proFinalProductMerge",
    method: "post",
    params: data
  });
}

export function updateMarge(data) {
  return axios({
    url: "/api/proFinalProductMerge",
    method: "put",
    params: data
  });
}

export function deleteMarge(id) {
  return axios({
    url: "/api/proFinalProductMerge?mergeId=" + id,
    method: "delete",
  });
}


export function getMargedtl(data) {
  return axios({
    url: "/api/proFinalProductMergeDtl",
    method: "get",
    params: data
  });
}

export function getMargePagedtl(data) {
  return axios({
    url: "/api/proFinalProductMergeDtl/page",
    method: "get",
    params: data
  });
}

export function getMargeDetaildtl(id) {
  return axios({
    url: "/api/proFinalProductMergeDtl/mfk?mergeFk=" + id,
    method: "get",
  });
}



export function postMargedtl(data) {
  return axios({
    url: "/api/proFinalProductMergeDtl",
    method: "post",
    params: data
  });
}

export function updateMargedtl(data) {
  return axios({
    url: "/api/proFinalProductMergeDtl",
    method: "put",
    params: data
  });
}

export function deleteMargedtl(id) {
  return axios({
    url: "/api/proFinalProductMergeDtl?dtlId=" + id,
    method: "delete",
  });
}