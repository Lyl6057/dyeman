/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:39
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-17 16:34:40
 * @FilePath: \iot.vue\src\view\proMng\batchColor\ledger\api.js
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

export function fetchProBatchColorLedgerByPage(params){
  return axios({
    url:"/api/proAppColorRec/page",
    params: params,
    method: "get"
  })
}

export function fetchProBatchColorLedgerViewByPage(params){
  return axios({
    url:"/api/proAppColorRec/viewAppColoRec",
    params: params,
    method: "get"
  })
}

export function addProBatchColorLedger(params){
  return axios({
    url: "/api/proAppColorRec",
    params: params,
    method: "post"
  })
}

export function updateProBatchColorLedger(params){
  return axios({
    url: "/api/proAppColorRec",
    params: params,
    method: "put"
  })
}

export function removeProBatchColorLedger(id){
  return axios({
    url: "/api/proAppColorRec?recId=" + id,
    method: "delete"
  })
}

export function createRepairPdf(id){
  return axios({
    url: "/api/proAppColorRec/generatePdf?id=" + id,
    method: "get"
  })
}

