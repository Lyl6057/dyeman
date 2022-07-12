/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-08 16:37:43
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

// 獲取织单已生产重量
export function getNowWeight(weaveJobCode) {
  return axios({
    url: '/api/proWeaveJobSumOutput/yieldSum?weaveJobCode=' + weaveJobCode,
    method: 'get'
  })
}

// 獲取打印記錄
export function get(params, r_clothCheckTime_r) {
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
//历史
export function getHistory(data) {
  return axios({
    url: '/api/proClothNoteHis',
    method: 'get',
    params: data
  })
}
//回复
export function recover(data) {
  return axios({
    url: '/api/proClothNoteHis/rcv',
    method: 'put',
    params:data
  })
}


