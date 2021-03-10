import axios from 'axios';
// ---- 胚布
// export function getOrder(params) {
//   return axios({
//     url: '/api/getWar',
//     method: 'get',
//     params: params
//   })
// }

export function updataPb(params) {
  return axios({
    url: '/api/whseCalicoinDtlb/update',
    method: 'put',
    params: params
  })
}
// 结束点数开始入库
export function sendData(params) {
  return axios({
    dataType: "json",
    'content-type': 'application/json',
    url: '/api/whseCalicoinDtlb/bd',
    method: 'post',
    data: params
  })
}
// 记录储物箱绑定到笼
export function updataCloth(params) {
  return axios({
    url: '/api/clothDetaInformation',
    method: 'put',
    params: params
  })
}
// // 纱线
// export function getyarnInfo(params) {
//   return axios({
//     url: '/api/getyarnInfo',
//     method: 'get',
//     params: params
//   })
// }
export function updataYarn(params) {
  return axios({
    url: '/api/yarnConfirm',
    method: 'post',
    params: params
  })
}

// // 