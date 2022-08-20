/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-06-29 10:28:36
 * @Description:
 */

import axios from "axios";

export function getDptWorkProcess(params) {
  return axios({
    url: "/api/proDptworkProcess",
    method: "get",
    params: params
  });
}

export function getLoginOrg(params) {
  return axios({
    url: "/api/ucmlOrganize/loginOrg",
    method: "get",
    params: params
  });
}

export function getRunJobByPage(params) {
  return axios({
    url: "/api/proBleadyeRunJob/page",
    method: "get",
    params: params
  });
}

export function getRunJob(params) {
  return axios({
    url: "/api/proBleadyeRunJob",
    method: "get",
    params: params
  });
}

export function getProcess() {
  return axios({
    url: "/api/proDptworkProcess",
    method: "get"
  });
}
// 新增
export function upload(params) {
  return axios({
    url: "/api/proBleadyeTechCode/uploadImg",
    method: "post",
    data: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}

export function getLog(params) {
  return axios({
    url: "/api/proDptworkProcess/recSch",
    method: "get",
    params: params
  });
}

export function get(params) {
  return axios({
    url: "/api/proBleadyeRunJob/recive",
    method: "get",
    params: params
  });
}

export function getWeave(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

export function getYarntest(params) {
  return axios({
    url: "/api/aloYarntest/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proDptReciveLog",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proBleadyeTechCode",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proBleadyeTechCode?bleadyeCodeId=" + id,
    method: "delete"
  });
}

export function getDtl(params) {
  return axios({
    url: "/api/proBleadyeCodeItem/page",
    method: "get",
    params: params
  });
}

// 新增
export function addDtl(data) {
  return axios({
    url: "/api/proBleadyeCodeItem",
    method: "post",
    params: data
  });
}

// 修改
export function updateDtl(data) {
  return axios({
    url: "/api/proBleadyeCodeItem",
    method: "put",
    params: data
  });
}

// 修改
export function delDtl(id) {
  return axios({
    url: "/api/proBleadyeCodeItem?codeItemIt=" + id,
    method: "delete"
  });
}
export function getBaseWorkStep(data) {
  return axios({
    url: "/api/baseWorkStep",
    method: "get",
    params: data
  });
}

