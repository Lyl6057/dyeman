import axios from "axios";
// 布笼详细信息
export function getCloth(params) {
  return axios({
    url: "/api/clothDetaInformation",
    method: "get",
    params: params
  });
}

// ---- 纱线
export function getSx(params) {
  return axios({
    url: "/api/whseYarninDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}
// 胚布
export function getPb(params) {
  return axios({
    url: "/api/whseCalicoinDtlb/listByPages",
    method: "get",
    params: params
  });
}
// 成品布
export function getCpb(params) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}

// 染化料
export function getRhl(params) {
  return axios({
    url: "/api/whseChemicalinDtla/v1.0/listByPage",
    method: "get",
    params: params
  });
}

// 生产辅料
export function getScfl(params) {
  return axios({
    url: "/api/whseAccessoriesDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}

export function sendData(params) {
  return axios({
    dataType: "json",
    "content-type": "application/json",
    url: "/api/whsMateInventory/list",
    method: "post",
    data: params
  });
}
