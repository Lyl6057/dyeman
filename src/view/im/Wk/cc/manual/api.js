import axios from "axios";

// 紗線
export function getHgylInDtl(params) {
  return axios({
    url: "/api/whseChemicalinDtlb/v1.0/list",
    method: "get",
    params: params
  });
}

// 紗線
export function getvNostockinYarddeliData(params) {
  return axios({
    url: "/api/vNostockinYarddeliData/page",
    method: "get",
    params: params
  });
}

// 胚布
export function getvNostockinCalicodeliData(params) {
  return axios({
    url: "/api/vNostockinCalicodeliData/page",
    method: "get",
    params: params
  });
}

// 化工原料
export function getvNostockinChemicaldeliData(params) {
  return axios({
    url: "/api/vNostockinChemicaldeliData/page",
    method: "get",
    params: params
  });
}

// 顔料
export function getvNostockinDyesadeliData(params) {
  return axios({
    url: "/api/vNostockinDyesadeliData/page",
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

// 染化料入仓分配
export function getChemicalinAlloc(params) {
  return axios({
    url: "/api/whseChemicalinAlloc/page",
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

// export function addSx(params) {
//   return axios({
//     url: '/api/whseYarnin/v1.0/save',
//     method: 'post',
//     params: params
//   })
// }
// export function updateSx(params) {
//   return axios({
//     url: '/api/whseYarnin/v1.0/updateById',
//     method: 'put',
//     params: params
//   })
// }
// export function delSx(id) {
//   return axios({
//     url: '/api/whseYarnin/v1.0/removeById?id=' + id,
//     method: 'delete',
//   })
// }
