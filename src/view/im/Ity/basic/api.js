/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:09
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-25 19:09:11
 * @Description:
 */
import axios from 'axios'
// 疋号信息
export function get(params) {
  return axios({
    url: '/api/whseMaterialopening/page',
    method: 'get',
    params: params
  })
}
export function add(params) {
  return axios({
    url: '/api/whseMaterialopening',
    method: 'post',
    params: params
  })
}
export function update(params) {
  return axios({
    url: '/api/whseMaterialopening',
    method: 'put',
    params: params
  })
}


export function del(id) {
  return axios({
    url: '/api/whseMaterialopening?whseMaterialopeningoid=' + id,
    method: 'delete',
  })
}
