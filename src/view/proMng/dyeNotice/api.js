/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-24 11:04:04
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

export function get(params) {
  return axios({
    url: '/api/proDyeFinishOrder/page',
    method: 'get',
    params: params
  })
}

// 新增
export function add(data) {
  return axios({
    url: '/api/proDyeFinishOrder',
    method: 'post',
    params: data
  })
}

// 修改
export function update(data) {
  return axios({
    url: '/api/proDyeFinishOrder',
    method: 'put',
    params: data
  })
}

// 修改
export function del(id) {
  return axios({
    url: '/api/proDyeFinishOrder?dyeOrderId=' + id,
    method: 'delete',
  })
}

export function getDtl(params) {
  return axios({
    url: '/api/proDyeFinishOrderFabric',
    method: 'get',
    params: params
  })
}

// 新增
export function addDtl(data) {
  return axios({
    url: '/api/proDyeFinishOrderFabric',
    method: 'post',
    params: data
  })
}

// 修改
export function updateDtl(data) {
  return axios({
    url: '/api/proDyeFinishOrderFabric',
    method: 'put',
    params: data
  })
}

// 修改
export function delDtl(id) {
  return axios({
    url: '/api/proDyeFinishOrderFabric?dyeFabricId=' + id,
    method: 'delete',
  })
}


// 打印佈飛
export function print(params) {
  return axios({
    url: '/api/proLdNotice/exportpdf',
    method: 'get',
    params: params
  })
}

export function getColor(params) {
  return axios({
    url: '/api/proDyeFinishOrderColor/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addColor(data) {
  return axios({
    url: '/api/proDyeFinishOrderColor',
    method: 'post',
    params: data
  })
}

// 修改
export function updateColor(data) {
  return axios({
    url: '/api/proDyeFinishOrderColor',
    method: 'put',
    params: data
  })
}

// 刪除
export function delColor(id) {
  return axios({
    url: '/api/proDyeFinishOrderColor?colorId=' + id,
    method: 'delete',
  })
}


export function getItem(params) {
  return axios({
    url: '/api/proDyeFinishOrderFinish/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addItem(data) {
  return axios({
    url: '/api/proDyeFinishOrderFinish',
    method: 'post',
    params: data
  })
}

// 修改
export function updateItem(data) {
  return axios({
    url: '/api/proDyeFinishOrderFinish',
    method: 'put',
    params: data
  })
}

// 刪除
export function delItem(id) {
  return axios({
    url: '/api/proDyeFinishOrderFinish?finishId=' + id,
    method: 'delete',
  })
}


export function getTest(params) {
  return axios({
    url: '/api/proDyeFinishOrderTest',
    method: 'get',
    params: params
  })
}

// 新增
export function addTest(data) {
  return axios({
    url: '/api/proDyeFinishOrderTest',
    method: 'post',
    params: data
  })
}

// 修改
export function updateTest(data) {
  return axios({
    url: '/api/proDyeFinishOrderTest',
    method: 'put',
    params: data
  })
}

// 刪除
export function delTest(id) {
  return axios({
    url: '/api/proDyeFinishOrderTest?testId=' + id,
    method: 'delete',
  })
}

export function getStandar(params) {
  return axios({
    url: '/api/proDyeFinishOrderTestStandar',
    method: 'get',
    params: params
  })
}

// 新增
export function addStandar(data) {
  return axios({
    url: '/api/proDyeFinishOrderTestStandar',
    method: 'post',
    params: data
  })
}

// 修改
export function updateStandar(data) {
  return axios({
    url: '/api/proDyeFinishOrderTestStandar',
    method: 'put',
    params: data
  })
}

// 刪除
export function delStandar(id) {
  return axios({
    url: '/api/proDyeFinishOrderTestStandar?testStandarId=' + id,
    method: 'delete',
  })
}

export function getTestItem(params) {
  return axios({
    url: '/api/proDyeFinishOrderTestItem/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addTestItem(data) {
  return axios({
    url: '/api/proDyeFinishOrderTestItem',
    method: 'post',
    params: data
  })
}

// 修改
export function updateTestItem(data) {
  return axios({
    url: '/api/proDyeFinishOrderTestItem',
    method: 'put',
    params: data
  })
}

// 刪除
export function delTestItem(id) {
  return axios({
    url: '/api/proDyeFinishOrderTestItem?testItemId=' + id,
    method: 'delete',
  })
}


