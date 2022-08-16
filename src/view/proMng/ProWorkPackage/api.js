/*
 * @Author: Lyl
 * @Date: 2021-03-30 08:20:46
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-01 11:19:33
 * @Description: 
 */
import axios from 'axios'


export function getStep(params) {
  return axios({
    url: '/api/baseWorkStep/tree',
    method: 'get',
    params: params
  })
}

export function addPackageStep(params) {
  return axios({
    url: '/api/baseWorkPackageStep',
    method: 'post',
    params: params
  })
}
export function get(params) {
  return axios({
    url: '/api/baseWorkPackage/list',
    method: 'get',
    params: params
  })
}
export function add(params) {
  return axios({
    url: '/api/baseWorkPackage',
    method: 'post',
    params: params
  })
}
export function update(params) {
  return axios({
    url: '/api/baseWorkPackage',
    method: 'put',
    params: params
  })
}
export function del(id) {
  return axios({
    url: '/api/baseWorkPackage?id=' + id,
    method: 'delete',
  })
}

export function delStepPackage(id) {
  return axios({
    url: '/api/baseWorkPackageStep?id=' + id,
    method: 'delete',
  })
}