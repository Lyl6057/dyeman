import axios from "axios";

// 仓库
export function getWarehouse(params) {
  return axios({
    url: "/api/whseWarehouse/page",
    method: "get",
    params: params
  });
}

export function addWarehouse(params) {
  return axios({
    url: "/api/whseWarehouse",
    method: "post",
    params: params
  });
}
export function updateWarehouse(params) {
  return axios({
    url: "/api/whseWarehouse",
    method: "put",
    params: params
  });
}
export function delWarehouse(id) {
  return axios({
    url: "/api/whseWarehouse?whseWarehouseoid=" + id,
    method: "delete"
  });
}

// 仓库分区
export function getPartition(params) {
  return axios({
    url: "/api/whsePartition/page",
    method: "get",
    params: params
  });
}

export function addPartition(params) {
  return axios({
    url: "/api/whsePartition",
    method: "post",
    params: params
  });
}
export function updatePartition(params) {
  return axios({
    url: "/api/whsePartition",
    method: "put",
    params: params
  });
}
export function delPartition(id) {
  return axios({
    url: "/api/whsePartition?whsePartitionoid=" + id,
    method: "delete"
  });
}

// 仓库货架
export function getShelves(params) {
  return axios({
    url: "/api/whseShelves",
    method: "get",
    params: params
  });
}

export function addShelves(params) {
  return axios({
    url: "/api/whseShelves",
    method: "post",
    params: params
  });
}
export function updateShelves(params) {
  return axios({
    url: "/api/whseShelves",
    method: "put",
    params: params
  });
}
export function delShelves(id) {
  return axios({
    url: "/api/whseShelves?whseShelvesoid=" + id,
    method: "delete"
  });
}

// 仓库货位
export function getLocation(params) {
  return axios({
    url: "/api/whseLocation/page",
    method: "get",
    params: params
  });
}

// 仓库货位
export function getLocationList(params) {
  return axios({
    url: "/api/whseLocation",
    method: "get",
    params: params
  });
}

export function addLocation(params) {
  return axios({
    url: "/api/whseLocation",
    method: "post",
    params: params
  });
}
export function updateLocation(params) {
  return axios({
    url: "/api/whseLocation",
    method: "put",
    params: params
  });
}
export function delLocation(id) {
  return axios({
    url: "/api/whseLocation?whseLocationoid=" + id,
    method: "delete"
  });
}
export function delAllLocation(id) {
  return axios({
    url: "/api/whseLocation/batchDelete?id=" + id,
    method: "delete"
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
