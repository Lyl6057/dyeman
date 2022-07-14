/*
 * @Author: Lyl
 * @Date: 2021-04-23 09:20:20
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-14 09:04:58
 * @Description:
 */
import axios from 'axios'

export function fetchProSchuduleData(params) {
  return axios({
    url: '/api/proWeaveJob/prod/schedule',
    method: 'get',
    params: params
  })
}

