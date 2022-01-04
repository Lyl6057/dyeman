/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-12-29 11:18:41
 * @Description:
 */

import axios from 'axios';


// 修改佈飛记录
export function updateNote(data) {
  return axios({
    url: '/api/proClothNote',
    method: 'put',
    params: data
  })
}
// 獲取打印記錄
export function getJob(params) {
  return axios({
    url: '/api/proWeaveJob/page',
    method: 'get',
    params: params
  })
}

// 獲取打印記錄
export function get(params,r_clothCheckTime_r) {
  return axios({
    url: '/api/proClothNote/pages?r_clothCheckTime_r=' + r_clothCheckTime_r,
    method: 'get',
    params: params
  })
}


// 新增佈飛记录
export function add(data) {
  return axios({
    url: '/api/proClothNote',
    method: 'post',
    params: data
  })
}


// 修改佈飛记录
export function update(data) {
  return axios({
    url: '/api/proClothNote',
    method: 'put',
    params: data
  })
}

// 修改佈飛记录
export function del(id) {
  return axios({
    url: '/api/proClothNote?noteId=' + id,
    method: 'delete',
  })
}

// 打印佈飛
export function printBf(id) {
  return axios({
    url: '/api/proClothNote/printing?id=' + id,
    method: 'get',
  })
}


// 新增入仓记录
export function addInWhse(data) {
  return axios({
    url: '/api/whseCalicoin/v1.0/save',
    method: 'post',
    params: data
  })
}


// 新增入仓明细
export function addInDtla(data) {
  return axios({
    url: '/api/whseCalicoinDtla/v1.0/save',
    method: 'post',
    params: data
  })
}

// 新增入仓批号资料
export function addInDtlb(data) {
  return axios({
    url: '/api/whseCalicoinDtlb/v1.0/save',
    method: 'post',
    params: data
  })
}

