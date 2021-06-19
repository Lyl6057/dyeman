/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:20:20
 * @LastEditors: Lyl
 * @LastEditTime: 2021-06-09 14:37:22
 * @Description:
 */
import axios from 'axios'
export function get(params) {
  return axios({
    url: '/api/whsCarriageStorage/page',
    method: 'get',
    params: params
  })
}


// 新增佈飛记录
export function add(data) {
  return axios({
    url: '/api/whsCarriageStorage',
    method: 'post',
    params: data
  })
}

// 修改佈飛记录
export function update(data) {
  return axios({
    url: '/api/whsCarriageStorage',
    method: 'put',
    params: data
  })
}

export function del(id) {
  return axios({
    url: '/api/whsCarriageStorage?carriageStorageId=' + id,
    method: 'delete',
  })
}

// 订单信息
export function getPo(params) {
  return axios({
    url: '/api/salPoList',
    method: 'get',
    params: params
  })
}
// 订单胚布信息
export function getPoDtla(params) {
  return axios({
    url: '/api/salPoDtlaList',
    method: 'get',
    params: params
  })
}

// 订单胚布信息
export function getPoColor(params) {
  return axios({
    url: '/api/salPoColor',
    method: 'get',
    params: params
  })
}
