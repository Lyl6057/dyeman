/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:39
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-12 11:23:51
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\api.js
 * @Description:
 */
import axios from 'axios'

export function fetchInWhseStore(params){
  return axios({
    url:"/api/viewWmsTray",
    params: params,
    method: "get"
  })
}


export function fetchQcCheckPlanByPage(params){
  return axios({
    url:"/api/qcCheckPlan/page",
    params: params,
    method: "get"
  })
}

export function fetchBleadyeRunJobByPage(params){
  return axios({
    url: "/api/proBleadyeRunJob/page",
    params: params,
    method: "get"
  })
}

export function fetchFinishedNote(params){
  return axios({
    url: "/api/proFinalProductCard",
    params: params,
    method: "get"
  })
}

export function fetchviewWmsTray(params){
  return axios({
    url: "/api/viewWmsTray",
    params: params,
    method: "get"
  })
}

export function addQcCheckPlanData(params){
  return axios({
    url: "/api/qcCheckPlan",
    params: params,
    method: "post"
  })
}

export function updateQcCheckPlanData(params){
  return axios({
    url: "/api/qcCheckPlan",
    params: params,
    method: "put"
  })
}

export function removeQcCheckPlanData(id){
  return axios({
    url: "/api/qcCheckPlan?planId=" + id,
    method: "delete"
  })
}

export function fetchQcCheckStorePlan(params){
  return axios({
    url:"/api/qcCheckStorePlan",
    params: params,
    method: "get"
  })
}

export function addQcCheckStorePlanData(params){
  return axios({
    url: "/api/qcCheckStorePlan",
    params: params,
    method: "post"
  })
}

export function updateQcCheckStorePlanData(params){
  return axios({
    url: "/api/qcCheckStorePlan",
    params: params,
    method: "put"
  })
}

export function removeQcCheckStoreData(id){
  return axios({
    url: "/api/qcCheckStorePlan?subPlanId=" + id,
    method: "delete"
  })
}

