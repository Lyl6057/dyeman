/*
 * @Author: Lyl
 * @Date: 2021-03-25 14:04:15
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-25 15:08:47
 * @Description:
 */
import axios from 'axios'
export function getSx(params) {
  return axios({
    url: '/api/basYarnsData/page',
    method: 'get',
    params: params
  })
}
export function getPb(params) {
  return axios({
    url: '/api/basCalico/page',
    method: 'get',
    params: params
  })
}

export function getHgyl(params) {
  return axios({
    url: '/api/BasChemicalmatNew/page',
    method: 'get',
    params: params
  })
}

export function getYl(params) {
  return axios({
    url: '/api/basPigment/page',
    method: 'get',
    params: params
  })
}

export function getScfl(params) {
  return axios({
    url: '/api/basProductivesupplies/page',
    method: 'get',
    params: params
  })
}
export function getWj(params) {
  return axios({
    url: '/api/basHardwarearticles/page',
    method: 'get',
    params: params
  })
}
export function getXz(params) {
  return axios({
    url: '/api/basAdsuppliesarticles/page',
    method: 'get',
    params: params
  })
}