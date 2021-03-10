/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2021-02-02 15:15:19
 * @Description:
 */

import axios from 'axios';

// 通过排期类型查找工作包
export function getScheduleAndWork(params) {
  return axios({
    url: '/api/scheduleAndSheet',
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

