import axios from "axios";
// ---- 纱线
export function getSx(params) {
  return axios({
    url: "/api/whseRetyarnin/page",
    method: "get",
    params: params
  });
}
export function addSx(params) {
  return axios({
    url: "/api/whseRetyarnin",
    method: "post",
    params: params
  });
}
export function updateSx(params) {
  return axios({
    url: "/api/whseRetyarnin",
    method: "put",
    params: params
  });
}
export function delSx(id) {
  return axios({
    url: "/api/whseRetyarnin?whseRetyarninoid=" + id,
    method: "delete"
  });
}
export function getSxCcDetali(params) {
  return axios({
    url: "/api/whseRetyarninDtl/page",
    method: "get",
    params: params
  });
}
export function addSxDetali(params) {
  return axios({
    url: "/api/whseRetyarninDtl",
    method: "post",
    params: params
  });
}
export function updateSxDetali(params) {
  return axios({
    url: "/api/whseRetyarninDtl",
    method: "put",
    params: params
  });
}
export function delSxDetali(id) {
  return axios({
    url: "/api/whseRetyarninDtl?whseRetyarninDtloid=" + id,
    method: "delete"
  });
}

export function getSxDtlb(params) {
  return axios({
    url: "/api/whseRetyarninDtla",
    method: "get",
    params: params
  });
}
export function addSxDtlb(params) {
  return axios({
    url: "/api/whseRetyarninDtla",
    method: "post",
    params: params
  });
}
export function updateSxDtlb(params) {
  return axios({
    url: "/api/whseRetyarninDtla",
    method: "put",
    params: params
  });
}
export function delSxDtlb(id) {
  return axios({
    url: "/api/whseRetyarninDtla?retyarninDtlaId=" + id,
    method: "delete"
  });
}

// 本廠領用料
export function getSxPlan(params) {
  return axios({
    url: "/api/vWhseRetyarninPlan/page",
    method: "get",
    params: params
  });
}
export function getSxData(params) {
  return axios({
    url: "/api/basYarnsData",
    method: "get",
    params: params
  });
}

// 外厂廠領用料
export function getSxOutPlan(params) {
  return axios({
    url: "/api/vWhseRetyarninoutPlan/page",
    method: "get",
    params: params
  });
}

// 客人退纱
export function getSxRetreat(params) {
  return axios({
    url: "/api/whseRetreat/page",
    method: "get",
    params: params
  });
}
export function addSxRetreat(params) {
  return axios({
    url: "/api/whseRetreat",
    method: "post",
    params: params
  });
}
export function updateSxRetreat(params) {
  return axios({
    url: "/api/whseRetreat",
    method: "put",
    params: params
  });
}
export function delSxRetreat(id) {
  return axios({
    url: "/api/whseRetreat?whseRetreatoid=" + id,
    method: "delete"
  });
}

// 客人退纱明细
export function getSxRetreatDtl(params) {
  return axios({
    url: "/api/whseRetreatDtl/page",
    method: "get",
    params: params
  });
}
export function addSxRetreatDtl(params) {
  return axios({
    url: "/api/whseRetreatDtl",
    method: "post",
    params: params
  });
}
export function updateSxRetreatDtl(params) {
  return axios({
    url: "/api/whseRetreatDtl",
    method: "put",
    params: params
  });
}
export function delSxRetreatDtl(id) {
  return axios({
    url: "/api/whseRetreatDtl?whseRetreatDtloid=" + id,
    method: "delete"
  });
}

// 纱线调仓
export function getSxTransfer(params) {
  return axios({
    url: "/api/whseTransfer/page",
    method: "get",
    params: params
  });
}
export function addSxTransfer(params) {
  return axios({
    url: "/api/whseTransfer",
    method: "post",
    params: params
  });
}
export function updateSxTransfer(params) {
  return axios({
    url: "/api/whseTransfer",
    method: "put",
    params: params
  });
}

export function delSxTransfer(id) {
  return axios({
    url: "/api/whseTransfer?whseTransferoid=" + id,
    method: "delete"
  });
}

// 纱线调仓明细
export function getSxTransferDtl(params) {
  return axios({
    url: "/api/whseTransferDtl/page",
    method: "get",
    params: params
  });
}
export function addSxTransferDtl(params) {
  return axios({
    url: "/api/whseTransferDtl",
    method: "post",
    params: params
  });
}
export function updateSxTransferDtl(params) {
  return axios({
    url: "/api/whseTransferDtl",
    method: "put",
    params: params
  });
}
export function delSxTransferDtl(id) {
  return axios({
    url: "/api/whseTransferDtl?whseTransferDtloid=" + id,
    method: "delete"
  });
}
