/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-31 13:07:51
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
    url: '/api/proLdNotice/page',
    method: 'get',
    params: params
  })
}

// 新增
export function add(data) {
  return axios({
    url: '/api/proLdNotice',
    method: 'post',
    params: data
  })
}

// 修改
export function update(data) {
  return axios({
    url: '/api/proLdNotice',
    method: 'put',
    params: data
  })
}

// 修改
export function del(id) {
  return axios({
    url: '/api/proLdNotice?ldNoticeId=' + id,
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



export function getComp(params) {
  return axios({
    url: '/api/proLdNoticeFabric/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addComp(data) {
  return axios({
    url: '/api/proLdNoticeFabric',
    method: 'post',
    params: data
  })
}

// 修改
export function updateComp(data) {
  return axios({
    url: '/api/proLdNoticeFabric',
    method: 'put',
    params: data
  })
}

// 刪除
export function delComp(id) {
  return axios({
    url: '/api/proLdNoticeFabric?compId=' + id,
    method: 'delete',
  })
}

export function getColor(params) {
  return axios({
    url: '/api/proLdNoticeColor/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addColor(data) {
  return axios({
    url: '/api/proLdNoticeColor',
    method: 'post',
    params: data
  })
}

// 修改
export function updateColor(data) {
  return axios({
    url: '/api/proLdNoticeColor',
    method: 'put',
    params: data
  })
}

// 刪除
export function delColor(id) {
  return axios({
    url: '/api/proLdNoticeColor?noticeColorId=' + id,
    method: 'delete',
  })
}



