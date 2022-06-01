/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:39
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-01 11:11:25
 * @FilePath: \iot.vue\src\view\quaLity\abnormalDaily\api.js
 * @Description:
 */
import axios from 'axios'

export function getRunJobByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

export function getFinishedNoteList(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "get",
    params: params
  });
}

export function fetchQcCheckClothDayDetailByPage(params){
  return axios({
    url:"/api/qcCheckClothDayDetail/page",
    params: params,
    method: "get"
  })
}

export function addQcCheckClothDayDetail(params){
  return axios({
    url: "/api/qcCheckClothDayDetail",
    params: params,
    method: "post"
  })
}

export function updateQcCheckClothDayDetail(params){
  return axios({
    url: "/api/qcCheckClothDayDetail",
    params: params,
    method: "put"
  })
}

export function removeQcCheckClothDayDetail(id){
  return axios({
    url: "/api/qcCheckClothDayDetail?detailId=" + id,
    method: "delete"
  })
}

export function createRepairPdf(id){
  return axios({
    url:"/api/qcClothBackRepair/repairPdf?id=" + id,
    method: "get"
  })
}

export function fetchQcClothBackRepairByPage(params){
  return axios({
    url:"/api/qcClothBackRepair/page",
    params: params,
    method: "get"
  })
}

export function addQcClothBackRepair(params){
  return axios({
    url: "/api/qcClothBackRepair",
    params: params,
    method: "post"
  })
}

export function updateQcClothBackRepair(params){
  return axios({
    url: "/api/qcClothBackRepair",
    params: params,
    method: "put"
  })
}

export function removeQcClothBackRepair(id){
  return axios({
    url: "/api/qcClothBackRepair?repairId=" + id,
    method: "delete"
  })
}