/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-08 19:00:21
 * @Description:
 */

import axios from 'axios';

// 通过排期类型查找工作包
export function get(params) {
  return axios({
    url: '/api/proWeaveJob/page',
    method: 'get',
    params: params
  })
}

// 获取色号流水号
export function getCodeSupply(params) {
  return axios({
    url: '/api/singleCodeSupply?code=color_num',
    method: 'get',
  })
}


// 新增佈飛记录
export function addBf(data) {
  return axios({
    url: '/api/proClothNote/save',
    method: 'post',
    params: data
  })
}
// 打印佈飛
export function printBf(id) {
  return axios({
    url: '/api/proClothNote/preview?id=' + id,
    method: 'get',
  })
}

export function getYarn(params) {
  return axios({
    url: '/api/proWeaveJobYarn',
    method: 'get',
    params: params
  })
}

