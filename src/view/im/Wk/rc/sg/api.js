import axios from "axios";

// 能源送货单视图
export function getWhseEnergyInV2(params) {
  return axios({
    url: "/api/whseEnergyIn/v2/page",
    method: "get",
    params: params
  });
}

// 纱线入仓分配
export function getRlAlloc(params) {
  return axios({
    url: "/api/whseEnerginAlloc",
    method: "get",
    params: params
  });
}

export function addRlAlloc(params) {
  return axios({
    url: "/api/whseEnerginAlloc",
    method: "post",
    params: params
  });
}

// 纱线
export function getviPuryarnNostock(params) {
  return axios({
    url: "/api/whseYarnin/vnyarn",
    method: "get",
    params: params
  });
}

// 纱线入仓分配
export function getYarninAlloc(params) {
  return axios({
    url: "/api/whseYarninAlloc",
    method: "get",
    params: params
  });
}

export function addYarninAlloc(params) {
  return axios({
    url: "/api/whseYarninAlloc",
    method: "post",
    params: params
  });
}

// 化工原料
export function getviPurchNostock(params) {
  return axios({
    url: "/api/whseChemicalin/viPurchNostock",
    method: "get",
    params: params
  });
}

// 颜料
export function getVpnvex(params) {
  return axios({
    url: "/api/whseChemicalin/vpnvex",
    method: "get",
    params: params
  });
}
// 生产辅料
export function getVpnv(params) {
  return axios({
    url: "/api/whseAccessoriesin/vpnv",
    method: "get",
    params: params
  });
}

// 五金/ 行政
export function getVpnvi(params) {
  return axios({
    url: "/api/whseAccessoriesin/vpnvi",
    method: "get",
    params: params
  });
}

// 原料入仓分配
export function getChemicalinAlloc(params) {
  return axios({
    url: "/api/whseChemicalinAlloc",
    method: "get",
    params: params
  });
}

export function addChemicalinAlloc(params) {
  return axios({
    url: "/api/whseChemicalinAlloc",
    method: "post",
    params: params
  });
}

// 顏料入仓分配Whse_DyesaIn_alloc

export function getDyesainAlloc(params) {
  return axios({
    url: "/api/whseDyesainAlloc",
    method: "get",
    params: params
  });
}

export function addDyesainAlloc(params) {
  return axios({
    url: "/api/whseDyesainAlloc",
    method: "post",
    params: params
  });
}
// 五金/行政/辅料入仓分配
export function getAccessoriesinAlloc(params) {
  return axios({
    url: "/api/whseAccessoriesinAlloc/page",
    method: "get",
    params: params
  });
}

export function addAccessoriesinAlloc(params) {
  return axios({
    url: "/api/whseAccessoriesinAlloc",
    method: "post",
    params: params
  });
}
