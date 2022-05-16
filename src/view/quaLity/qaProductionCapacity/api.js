/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:39
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-14 08:39:52
 * @FilePath: \iot.vue\src\view\quaLity\qaProductionCapacity\api.js
 * @Description:
 */
import axios from 'axios'

export function upadQareport(params){
  return axios({
    url:"/api/qaDayOutput/upadQareport",
    method: "get"
  })
}



export function fetchQaDayOutputByPage(params){
  return axios({
    url:"/api/qaDayOutput/page",
    params: params,
    method: "get"
  })
}

export function addQaDayOutputData(params){
  return axios({
    url: "/api/qaDayOutput",
    params: params,
    method: "post"
  })
}

export function updateQaDayOutputData(params){
  return axios({
    url: "/api/qaDayOutput",
    params: params,
    method: "put"
  })
}

export function removeQaDayOutputData(id){
  return axios({
    url: "/api/qaDayOutput?outId=" + id,
    method: "delete"
  })
}

