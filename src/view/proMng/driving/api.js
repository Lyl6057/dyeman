/*
 * @Author: Lyl
 * @Date: 2021-10-06 10:07:12
 * @LastEditors: Lyl
 * @LastEditTime: 2021-10-20 08:25:08
 * @Description:
 */
import axios from "axios";
// 发送指令
export function postTask(params) {
  return axios({
    url: "/api/iotDispatchTask/sendInstructions",
    method: "post",
    data: params
  });
}

export function get(params) {
  return axios({
    url: "/api/iotCarryMap",
    method: "get",
    params: params
  });
}

export function getSensorLog(params) {
  return axios({
    url: "/api/iotSensorScanLog",
    method: "get",
    params: params
  });
}

export function getTask(params) {
  return axios({
    url: "/api/iotDispatchTask/relevance",
    method: "get",
    params: params
  });
}

export function cancelTask(id) {
  return axios({
    url: "/api/iotDispatchTask?taseId=" + id,
    method: "delete"
  });
}

export function getZone(params) {
  return axios({
    url: "/api/baseAreaZone",
    method: "get",
    params: params
  });
}

export function getSensor(params) {
  return axios({
    url: "/api/baseScanSensor",
    method: "get",
    params: params
  });
}

export function getLog(params) {
  return axios({
    url: "/api/whsCarriageStorageLog/page",
    method: "get",
    params: params
  });
}

export function getBill(params) {
  return axios({
    url: "/api/whsCarriageStorageBill",
    method: "get",
    params: params
  });
}

export function getStorage(params) {
  return axios({
    url: "/api/whsCarriageStorage",
    method: "get",
    params: params
  });
}

export function getBleadyeJob(params) {
  return axios({
    url: "/api/proBleadyeJob",
    method: "get",
    params: params
  });
}

export function updateStorage(params) {
  return axios({
    url: "/api/whsCarriageStorage",
    method: "put",
    params: params
  });
}

export function updateMap(params) {
  return axios({
    url: "/api/iotCarryMap",
    method: "put",
    params: params
  });
}

export function addLog(params) {
  return axios({
    url: "/api/whsCarriageStorageLog",
    method: "post",
    params: params
  });
}

export function addBill(params) {
  return axios({
    url: "/api/whsCarriageStorageBill",
    method: "post",
    params: params
  });
}
