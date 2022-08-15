/*
 * @Author: Lyl
 * @Date: 2021-03-30 08:20:46
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-30 17:19:04
 * @Description: 
 */
import axios from 'axios'


export function get(params) {
  return axios({
    url: '/api/baseWorkStep/tree',
    method: 'get',
    params: params
  })
}
export function add(params) {
  return axios({
    url: '/api/baseWorkStep',
    method: 'put',
    params: params
  })
}
export function update(params) {
  return axios({
    url: '/api/baseWorkStep',
    method: 'post',
    params: params
  })
}
export function del(id) {
  return axios({
    url: '/api/baseWorkStep?stepId=' + id,
    method: 'delete',
  })
}