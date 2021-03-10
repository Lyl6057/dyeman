/*
 * @Author: Lyl
 * @Date: 2021-01-23 09:57:49
 * @LastEditors: Lyl
 * @LastEditTime: 2021-01-28 16:18:36
 * @Description: 
 */
import axios from 'axios';

// 办布布料明细单
export function getVLabArranRd(params) {
  return axios({
    url: '/api/vLabArranRd/page',
    method: 'get',
    params: params
  })
}
// 送办单
export function getLabArrangecloth(params) {
  return axios({
    url: '/api/labArrangeclothScheduleList',
    method: 'get',
    params: params
  })
}


export function addLabArrangecloth(params) {
  return axios({
    url: '/api/labArrangeclothSchedule',
    method: 'put',
    params: params
  })
}


export function updateLabArrangecloth(params) {
  return axios({
    url: '/api/labArrangeclothSchedule',
    method: 'post',
    params: params
  })
}
export function delLabArrangecloth(id) {
  return axios({
    url: '/api/labArrangeclothSchedule?schId=' + id,
    method: 'delete',
  })
}


// 化验室提供给客户的样办记录
export function getCustomerSample(params) {
  return axios({
    url: '/api/labCustomerSample/page',
    method: 'get',
    params: params
  })
}


export function addCustomerSample(params) {
  return axios({
    url: '/api/labCustomerSample',
    method: 'post',
    params: params
  })
}


export function updateCustomerSample(params) {
  return axios({
    url: '/api/labCustomerSample',
    method: 'put',
    params: params
  })
}
export function delLabCustomerSample(id) {
  return axios({
    url: '/api/labCustomerSample?sampleId=' + id,
    method: 'delete',
  })
}
