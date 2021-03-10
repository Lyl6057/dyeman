import axios from 'axios';
// ---- 纱线
export function getSx(params) {
  return axios({
    url: '/api/whseYarnin/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addSx(params) {
  return axios({
    url: '/api/whseYarnin/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateSx(params) {
  return axios({
    url: '/api/whseYarnin/v1.0/updateById',
    method: 'put',
    params: params
  })
}
export function delSx(id) {
  return axios({
    url: '/api/whseYarnin/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}
