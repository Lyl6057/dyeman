/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:39
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-15 14:15:13
 * @FilePath: \iot.vue\src\view\quaLity\shearingBoard\api.js
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

export function getFinishedNoteByPage(params) {
  return axios({
    url: "/api/proFinalProductCard/page",
    method: "get",
    params: params
  });
}

export function updateFinishedNoteData(params) {
  return axios({
    url: "/api/proFinalProductCard",
    method: "put",
    params: params
  });
}

export function fetchProFinalProductCardCutByPage(params){
  return axios({
    url:"/api/proFinalProductCardCut/page",
    params: params,
    method: "get"
  })
}

export function addProFinalProductCardCut(params){
  return axios({
    url: "/api/proFinalProductCardCut",
    params: params,
    method: "post"
  })
}

export function updateProFinalProductCardCut(params){
  return axios({
    url: "/api/proFinalProductCardCut",
    params: params,
    method: "put"
  })
}

export function removeProFinalProductCardCut(id){
  return axios({
    url: "/api/proFinalProductCardCut?cutId=" + id,
    method: "delete"
  })
}

export function createRepairPdf(id){
  return axios({
    url: "/api/qcClothBackRepair/repairPdf?id=" + id,
    method: "get"
  })
}

export function getallDpt(){
  return axios({
    url: "/api/proDptworkProcess",
    method: "get"
  })
}

export function fetchBasDefectTypeList(){
  return axios({
    url: "/api/getcodeValue?codeTableId=BAS_DEFECT",
    method: "get"
  })
}

export function fetchBasDefectList(){
  return axios({
    url: "/api/basDefectdata/list",
    method: "get"
  })
}
