/*
 * @Author: Lyl
 * @Date: 2021-04-01 17:08:23
 * @LastEditors: Lyl
 * @LastEditTime: 2021-04-01 17:10:43
 * @Description:
 */

import axios from 'axios'

export function add(params) {
  return axios({
    url: '/api/baseEquipment',
    method: 'put',
    params: params
  })
}
export function update(params) {
  return axios({
    url: '/api/baseEquipment',
    method: 'post',
    params: params
  })
}
