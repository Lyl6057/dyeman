/*
 * @Author: Lyl
 * @Date: 2021-01-23 08:03:49
 * @LastEditors: Lyl
 * @LastEditTime: 2021-01-28 17:31:09
 * @Description: 
 */
import axios from 'axios'
// 化工原料
export function getBasChemicalmat(params) {
  return axios({
    url: '/api/basChemicalmat/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
// 颜料
export function getBasPigment(params) {
  return axios({
    url: '/api/basPigment/page',
    method: 'get',
    params: params
  })
}

// 五金
export function getBasHardwar(params) {
  return axios({
    url: '/api/basHardwarearticles/page',
    method: 'get',
    params: params
  })
}
// 行政
export function getBasAdsupp(params) {
  return axios({
    url: '/api/basAdsuppliesarticles/page',
    method: 'get',
    params: params
  })
}