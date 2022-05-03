/*
 * @Author: Lyl
 * @Date: 2022-05-03 16:09:39
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-03 16:48:15
 * @FilePath: \iot.vue\src\view\quaLity\qaCheckPlan\api.js
 * @Description:
 */
import axios from 'axios'

export function fetchQcCheckPlanByPage(params){
  return axios({
    url:"/api/qcCheckPlan/page",
    params:params,
    method:"get"
  })
}