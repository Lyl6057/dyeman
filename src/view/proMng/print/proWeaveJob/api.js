/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-29 08:39:55
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
    url: '/api/proWeaveJob/page',
    method: 'get',
    params: params
  })
}

// 新增
export function add(data) {
  return axios({
    url: '/api/proWeaveJob',
    method: 'post',
    params: data
  })
}

// 修改
export function update(data) {
  return axios({
    url: '/api/proWeaveJob',
    method: 'put',
    params: data
  })
}

// 修改
export function del(id) {
  return axios({
    url: '/api/proWeaveJob?weaveJobId=' + id,
    method: 'delete',
  })
}
// 打印佈飛
export function print(params) {
  return axios({
    url: '/api/proWeaveJob/prinEntityPdf',
    method: 'get',
    params: params
  })
}

// 紗長
export function getLong(params) {
  return axios({
    url: '/api/proWeaveJobLengthChanged/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addLong(data) {
  return axios({
    url: '/api/proWeaveJobLengthChanged',
    method: 'post',
    params: data
  })
}

// 修改
export function updateLong(data) {
  return axios({
    url: '/api/proWeaveJobLengthChanged',
    method: 'put',
    params: data
  })
}

// 刪除
export function delLong(id) {
  return axios({
    url: '/api/proWeaveJobLengthChanged?changedId=' + id,
    method: 'delete',
  })
}


export function getYarn(params) {
  return axios({
    url: '/api/proWeaveJobYarn/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addYarn(data) {
  return axios({
    url: '/api/proWeaveJobYarn',
    method: 'post',
    params: data
  })
}

// 修改
export function updateYarn(data) {
  return axios({
    url: '/api/proWeaveJobYarn',
    method: 'put',
    params: data
  })
}

// 刪除
export function delYarn(id) {
  return axios({
    url: '/api/proWeaveJobYarn?useYarnId=' + id,
    method: 'delete',
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



export function getCalico(params) {
  return axios({
    url: '/api/proWeaveJobCalico/page',
    method: 'get',
    params: params
  })
}


// 新增
export function addCalico(data) {
  return axios({
    url: '/api/proWeaveJobCalico',
    method: 'post',
    params: data
  })
}

// 修改
export function updateCalico(data) {
  return axios({
    url: '/api/proWeaveJobCalico',
    method: 'put',
    params: data
  })
}

// 刪除
export function delCalico(id) {
  return axios({
    url: '/api/proWeaveJobCalico?washedId=' + id,
    method: 'delete',
  })
}



export function getStrain(params) {
  return axios({
    url: '/api/proWeaveJobStrain/page',
    method: 'get',
    params: params
  })
}


// 新增
export function addStrain(data) {
  return axios({
    url: '/api/proWeaveJobStrain',
    method: 'post',
    params: data
  })
}

// 修改
export function updateStrain(data) {
  return axios({
    url: '/api/proWeaveJobStrain',
    method: 'put',
    params: data
  })
}

// 刪除
export function delStrain(id) {
  return axios({
    url: '/api/proWeaveJobStrain?strainId=' + id,
    method: 'delete',
  })
}

