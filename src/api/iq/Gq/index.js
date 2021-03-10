import axios from 'axios';
// ---- 仓库区域
export function getWarehouseArea(params) {
  return axios({
    url: '/api/iotWarehouseArea',
    method: 'get',
    params: params
  })
}
// 储物箱位置
export function getBoxLocation(params) {
  return axios({
    url: '/api/iotBoxLocation',
    method: 'get',
    params: params
  })
}

// 储物箱位置
export function updateBoxLocation(params) {
  return axios({
    url: '/api/iotBoxLocation',
    method: 'put',
    params: params
  })
}

// 储物箱放了啥
export function getBoxDetail(params) {
  return axios({
    url: '/api/iotBoxLocation/listCalicoIn',
    method: 'get',
    params: params
  })
}
