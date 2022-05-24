import axios from "axios";

// 能源入仓审核
export function fetcheEnergyExamineVaild(id) {
  return axios({
    url: "/api/whseEnergyIn/valid/examine/" + id,
    method: "get",
  });
}

// 行政入仓审核
export function fetcheOfficeExamineVaild(id) {
  return axios({
    url: "/api/whseOfficeIn/valid/examine/" + id,
    method: "get",
  });
}

// 五金入仓审核
export function fetchHardwareExamineVaild(id) {
  return axios({
    url: "/api/whseHardwareIn/valid/examine/" + id,
    method: "get"
  });
}

// 化工原料入仓审核
export function fetchChemicalExamineVaild(id) {
  return axios({
    url: "/api/whseChemicalin/valid/examine/" + id,
    method: "get",
    // data: data
  });
}


// 颜料入仓审核
export function fetchDyesalinExamineVaild(id) {
  return axios({
    url: "/api/whseDyesalin/valid/examine/" + id,
    method: "get",
  });
}


// 辅料入仓审核
export function fetchAccessoriesExamineVaild(id) {
  return axios({
    url: "/api/whseAccessoriesIn/valid/examine/" + id,
    method: "get",
  });
}


// 设备入仓审核
export function fetchEquipmentExamineVaild(id) {
  return axios({
    url: "/api/whseEquipmentIn/valid/examine/" + id,
    method: "get",
  });
}


// 纱线入仓审核
export function fetchYarnExamineVaild(data) {
  return axios({
    url: "/api/whseYarnin/v1.0/valid/examine",
    method: "post",
    data: data
  });
}


// 设备申购送货单视图
export function getWhseEquInV2(params) {
  return axios({
    url: "/api/whseEquipmentIn/v1.0/unIn/listByPage",
    method: "get",
    params: params
  });
}

// 能源申购送货单视图
export function getWhseEnergyInV2(params) {
  return axios({
    url: "/api/whseEnergyIn/v2/page",
    method: "get",
    params: params
  });
}

// 五金申购送货单视图
export function getWhseHardwareUnin(params) {
  return axios({
    url: "/api/whseHardwareIn/unIn/page",
    method: "get",
    params: params
  });
}

// 行政申购送货单视图
export function getWhseOfficeUnin(params) {
  return axios({
    url: "/api/whseOfficeIn/unIn/page",
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

export function createOutOrder(id) {
  return axios({
    url: "/api/whseRetyarnin/create/retYarn/byYarnInOid/" + id,
    method: "get"
    // params: params
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
    url: "/api/whseAccessoriesIn/vpnv",
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
