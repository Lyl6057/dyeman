/*
 * @Author: Lyl
 * @Date: 2022-02-23 08:11:26
 * @LastEditors: Lyl
 * @LastEditTime: 2022-03-01 10:17:33
 * @FilePath: \iot.vue\src\view\quaLity\qcReport\api.js
 * @Description:
 */
import axios from "axios";

// 颜色管理
export function getQcTestReport(params) {
  return axios({
    url: "/api/qcClothTestReport/page",
    method: "get",
    params: params
  });
}

export function addQcTestReport(params) {
  return axios({
    url: "/api/qcClothTestReport",
    method: "post",
    params: params
  });
}
export function updateQcTestReport(params) {
  return axios({
    url: "/api/qcClothTestReport",
    method: "put",
    params: params
  });
}
export function delQcTestReport(id) {
  return axios({
    url: "/api/qcClothTestReport?rptId=" + id,
    method: "delete"
  });
}

export function uploadXlxs(params) {
  return axios({
    url: "/api/qcClothTestReport/uploadxlxs",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
export function downloadXlxs(id) {
  return axios({
    url: "/api/qcClothTestReport/findFileById?id=" + id,
    method: "get"
  });
}

// 代码表
export function getDepth(params) {
  return axios({
    url: "/api/codeValue",
    method: "post",
    params: params
  });
}

// 获取色号流水号
export function getCodeSupply(params) {
  return axios({
    url: "/api/singleCodeSupply?code=color_num",
    method: "get"
  });
}
