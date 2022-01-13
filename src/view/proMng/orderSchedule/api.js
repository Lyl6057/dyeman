/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-01-10 15:56:43
 * @Description:
 */

import axios from 'axios';

// 查询织单
export function getWeaveByPage(params) {
  return axios({
    url: '/api/proWeaveJob/page',
    method: 'get',
    params: params
  })
}

// 查询运转单
export function getRunByPage(params) {
  return axios({
    url: '/api/proBleadyeRunJob/page',
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
    url: '/api/proSalScheduleList',
    method: 'post',
    params: params
  })
}

// 新增
export function add(data) {
  return axios({
    url: '/api/proSalSchedule',
    method: 'put',
    params: data
  })
}

// 修改
export function update(data) {
  return axios({
    url: '/api/proSalSchedule',
    method: 'post',
    params: data
  })
}

// 修改
export function del(id) {
  return axios({
    url: '/api/proSalSchedule?schId=' + id,
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



