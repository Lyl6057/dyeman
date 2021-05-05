/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-04 13:45:36
 * @Description:
 */

import axios from 'axios';

// 獲取訂單號
export function getPo(params) {
  return axios({
    url: '/api/salPoList',
    method: 'get',
    params: params
  })
}

// 獲取訂單胚布资料
export function getPoDtla(params) {
  return axios({
    url: '/api/salPoDtlaList',
    method: 'get',
    params: params
  })
}
// 獲取訂單颜色资料
export function getPoDtlb(params) {
  return axios({
    url: '/api/salPoColor',
    method: 'get',
    params: params
  })
}


// 獲取訂單面料资料Sal_bom_fabric
export function getBom(params) {
  return axios({
    url: '/api/salBomFabric',
    method: 'get',
    params: params
  })
}

// 通过排期类型查找工作包
export function get(params) {
  return axios({
    url: '/api/proBleadyeJob/page',
    method: 'get',
    params: params
  })
}

// 新增
export function add(data) {
  return axios({
    url: '/api/proBleadyeJob',
    method: 'post',
    params: data
  })
}

// 修改
export function update(data) {
  return axios({
    url: '/api/proBleadyeJob',
    method: 'put',
    params: data
  })
}

// 修改
export function del(id) {
  return axios({
    url: '/api/proBleadyeJob?bleadyeJobId=' + id,
    method: 'delete',
  })
}
// 打印佈飛
export function print(params) {
  return axios({
    url: '/api/proWeaveJob/prinEntity',
    method: 'get',
    params: params
  })
}


export function getYarn(params) {
  return axios({
    url: '/api/proWeaveJobYarn',
    method: 'get',
    params: params
  })
}


export function getGroup(params) {
  return axios({
    url: '/api/proWeaveJobGroup/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addGroup(data) {
  return axios({
    url: '/api/proWeaveJobGroup',
    method: 'post',
    params: data
  })
}

// 修改
export function updateGroup(data) {
  return axios({
    url: '/api/proWeaveJobGroup',
    method: 'put',
    params: data
  })
}

// 刪除
export function delGroup(id) {
  return axios({
    url: '/api/proWeaveJobGroup?groupId=' + id,
    method: 'delete',
  })
}



