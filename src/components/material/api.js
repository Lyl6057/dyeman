/*
 * @Author: Lyl
 * @Date: 2021-03-25 14:04:15
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-31 16:34:38
 * @Description:
 */
import axios from 'axios'
export function getSx(params) {
  return axios({
    url: '/api/basYarnsData/pageBylike',
    method: 'get',
    params: params
  })
}
export function getPb(params) {
  return axios({
    url: '/api/basCalico/pageylike',
    method: 'get',
    params: params
  })
}

export function getHgyl(params) {
  return axios({
    url: '/api/BasChemicalmatNew/pageBylike',
    method: 'get',
    params: params
  })
}

export function getYl(params) {
  return axios({
    url: '/api/basPigment/pageBylike',
    method: 'get',
    params: params
  })
}

export function getScfl(params) {
  return axios({
    url: '/api/basProductivesuppliesnew/pageBylike',
    method: 'get',
    params: params
  })
}
export function getWj(params) {
  return axios({
    url: '/api/basHardwarearticles/pageBylike',
    method: 'get',
    params: params
  })
}
export function getXz(params) {
  return axios({
    url: '/api/basAdsuppliesarticles/pageBylike',
    method: 'get',
    params: params
  })
}