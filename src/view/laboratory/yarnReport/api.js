/*
 * @Author: Lyl
 * @Date: 2022-02-23 08:11:26
 * @LastEditors: Lyl
 * @LastEditTime: 2022-02-23 15:04:13
 * @FilePath: \iot.vue\src\view\laboratory\yarnReport\api.js
 * @Description:
 */
import axios from "axios";

// 颜色管理
export function getYarnTestReport(params) {
  return axios({
    url: "/api/labYarnTestReport/page",
    method: "get",
    params: params
  });
}

export function addYarnTestReport(params) {
  return axios({
    url: "/api/labYarnTestReport",
    method: "post",
    params: params
  });
}
export function updateYarnTestReport(params) {
  return axios({
    url: "/api/labYarnTestReport",
    method: "put",
    params: params
  });
}
export function delYarnTestReport(id) {
  return axios({
    url: "/api/labYarnTestReport?rptId=" + id,
    method: "delete"
  });
}

export function uploadXlxs(params) {
  return axios({
    url: "/api/labYarnTestReport/uploadxlxs",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
export function downloadXlxs(id) {
  return axios({
    url: "/api/labYarnTestReport/findFileById?id=" + id,
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
