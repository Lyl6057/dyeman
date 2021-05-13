/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-05-13 14:45:23
 * @Description:
 */

import axios from 'axios';

export function get(params) {
  return axios({
    url: '/api/proBleadyeTechCode/page',
    method: 'get',
    params: params
  })
}

// 新增
export function add(data) {
  return axios({
    url: '/api/proBleadyeTechCode',
    method: 'post',
    params: data
  })
}

// 修改
export function update(data) {
  return axios({
    url: '/api/proBleadyeTechCode',
    method: 'put',
    params: data
  })
}

// 修改
export function del(id) {
  return axios({
    url: '/api/proBleadyeTechCode?bleadyeCodeId=' + id,
    method: 'delete',
  })
}

export function getDtl(params) {
  return axios({
    url: '/api/proBleadyeCodeItem/page',
    method: 'get',
    params: params
  })
}

// 新增
export function addDtl(data) {
  return axios({
    url: '/api/proBleadyeCodeItem',
    method: 'post',
    params: data
  })
}

// 修改
export function updateDtl(data) {
  return axios({
    url: '/api/proBleadyeCodeItem',
    method: 'put',
    params: data
  })
}

// 修改
export function delDtl(id) {
  return axios({
    url: '/api/proBleadyeCodeItem?codeItemIt=' + id,
    method: 'delete',
  })
}
