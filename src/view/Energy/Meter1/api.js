/*
 * @Author: Lyl
 * @Date: 2021-03-30 08:20:46
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-13 20:06:40
 * @Description: 
 */
import axios from 'axios'


export function getStep(params) {
  return axios({
    url: '/api/baseWorkStepTree',
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
    url: '/api/eneMeter',
    method: 'get',
    params: params
  })
}
export function add(params) {
  return axios({
    url: '/api/eneMeter',
    method: 'post',
    params: params
  })
}
export function update(params) {
  return axios({
    url: '/api/eneMeter',
    method: 'put',
    params: params
  })
}
export function del(id) {
  return axios({
    url: '/api/eneMeter?eneMeteroid=' + id,
    method: 'delete',
  })
}

export function addEq(params) {
  return axios({
    url: '/api/eneMeterEqu',
    method: 'post',
    params: params
  })
}
export function updateEq(params) {
  return axios({
    url: '/api/eneMeterEqu',
    method: 'put',
    params: params
  })
}
export function delEq(id) {
  return axios({
    url: '/api/eneMeterEqu?eneMeterEquoid=' + id,
    method: 'delete',
  })
}
export function getType(params) {
  return axios({
    url: '/api/eneMeterType',
    method: 'get',
    params: params
  })
}
export function getTypePage(params) {
  return axios({
    url: '/api/eneMeterType/page',
    method: 'get',
    params: params
  })
}
export function addType(params) {
  return axios({
    url: '/api/eneMeterType',
    method: 'post',
    params: params
  })
}
export function updateType(params) {
  return axios({
    url: '/api/eneMeterType',
    method: 'put',
    params: params
  })
}
export function delType(id) {
  return axios({
    url: '/api/eneMeterType?eneMeterTypeoid=' + id,
    method: 'delete',
  })
}


// 歸屬區域
export function getArea(params) {
  return axios({
    url: '/api/eneMeterTypeArea',
    method: 'get',
    params: params
  })
}
export function addArea(params) {
  return axios({
    url: '/api/eneMeterTypeArea',
    method: 'post',
    params: params
  })
}
export function updateArea(params) {
  return axios({
    url: '/api/eneMeterTypeArea',
    method: 'put',
    params: params
  })
}
export function delArea(id) {
  return axios({
    url: '/api/eneMeterTypeArea?eneMeterTypeAreaoid=' + id,
    method: 'delete',
  })
}

export function getStaff(params) {
  return axios({
    url: '/api/eneStaff',
    method: 'get',
    params: params
  })
}

export function getStaffPage(params) {
  return axios({
    url: '/api/eneStaff/page',
    method: 'get',
    params: params
  })
}

export function addStaff(params) {
  return axios({
    url: '/api/eneStaff',
    method: 'post',
    params: params
  })
}
export function updateStaff(params) {
  return axios({
    url: '/api/eneStaff',
    method: 'put',
    params: params
  })
}
export function delStaff(id) {
  return axios({
    url: '/api/eneStaff?eneStaffoid=' + id,
    method: 'delete',
  })
}

export function getMStaff(params) {
  return axios({
    url: '/api/eneMeterStaff',
    method: 'get',
    params: params
  })
}
export function addMStaff(params) {
  return axios({
    url: '/api/eneMeterStaff',
    method: 'post',
    params: params
  })
}
export function updateMStaff(params) {
  return axios({
    url: '/api/eneMeterStaff',
    method: 'put',
    params: params
  })
}
export function delMStaff(id) {
  return axios({
    url: '/api/eneMeterStaff?eneMeterStaffoid=' + id,
    method: 'delete',
  })
}
