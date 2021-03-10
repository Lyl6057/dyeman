/*
 * @Author: Lyl
 * @Date: 2021-02-25 09:27:48
 * @LastEditors: Lyl
 * @LastEditTime: 2021-03-05 10:44:05
 * @Description:
 */

import axios from 'axios';

// ---- 纱线
export function getSx(params) {
  return axios({
    url: '/api/whseRetyarnin/page',
    method: 'get',
    params: params
  })
}
export function addSx(params) {
  return axios({
    url: '/api/whseRetyarnin',
    method: 'post',
    params: params
  })
}
export function updateSx(params) {
  return axios({
    url: '/api/whseRetyarnin',
    method: 'put',
    params: params
  })
}
export function delSx(id) {
  return axios({
    url: '/api/whseRetyarnin?whseRetyarninoid=' + id,
    method: 'delete',
  })
}
export function getSxDetali(params) {
  return axios({
    url: '/api/whseRetyarninDtl/page',
    method: 'get',
    params: params
  })
}
export function addSxDetali(params) {
  return axios({
    url: '/api/whseRetyarninDtl',
    method: 'post',
    params: params
  })
}
export function updateSxDetali(params) {
  return axios({
    url: '/api/whseRetyarninDtl',
    method: 'put',
    params: params
  })
}
export function delSxDetali(id) {
  return axios({
    url: '/api/whseRetyarninDtl?whseRetyarninDtloid=' + id,
    method: 'delete',
  })
}

// ---- 胚布
export function getPb(params) {
  return axios({
    url: '/api/whseMaterial/page',
    method: 'get',
    params: params
  })
}
export function addPb(params) {
  return axios({
    url: '/api/whseMaterial',
    method: 'post',
    params: params
  })
}
export function updatePb(params) {
  return axios({
    url: '/api/whseMaterial',
    method: 'put',
    params: params
  })
}
export function delPb(id) {
  return axios({
    url: '/api/whseMaterial?whseMaterialoid=' + id,
    method: 'delete',
  })
}
export function getPbDla(params) {
  return axios({
    url: '/api/whseMaterialDla/page',
    method: 'get',
    params: params
  })
}
export function addPbDla(params) {
  return axios({
    url: '/api/whseMaterialDla',
    method: 'post',
    params: params
  })
}
export function updatePbDla(params) {
  return axios({
    url: '/api/whseMaterialDla',
    method: 'put',
    params: params
  })
}
export function delPbDla(id) {
  return axios({
    url: '/api/whseMaterialDla?whseMaterialDlaoid=' + id,
    method: 'delete',
  })
}

export function getPbDlb(params) {
  return axios({
    url: '/api/whseMaterialDlb/page',
    method: 'get',
    params: params
  })
}
export function addPbDlb(params) {
  return axios({
    url: '/api/whseMaterialDlb',
    method: 'post',
    params: params
  })
}
export function updatePbDlb(params) {
  return axios({
    url: '/api/whseMaterialDlb',
    method: 'put',
    params: params
  })
}
export function delPbDlb(id) {
  return axios({
    url: '/api/whseMaterialDlb?whseMaterialDlboid=' + id,
    method: 'delete',
  })
}


// ---- 化工原料
export function getHgyl(params) {
  return axios({
    url: '/api/whseChemical/page',
    method: 'get',
    params: params
  })
}
export function addHgyl(params) {
  return axios({
    url: '/api/whseChemical',
    method: 'post',
    params: params
  })
}
export function updateHgyl(params) {
  return axios({
    url: '/api/whseChemical',
    method: 'put',
    params: params
  })
}
export function delHgyl(id) {
  return axios({
    url: '/api/whseChemical?whseChemicaloid=' + id,
    method: 'delete',
  })
}
export function getHgylDla(params) {
  return axios({
    url: '/api/whseChemicalDla/page',
    method: 'get',
    params: params
  })
}
export function addHgylDla(params) {
  return axios({
    url: '/api/whseChemicalDla',
    method: 'post',
    params: params
  })
}
export function updateHgylDla(params) {
  return axios({
    url: '/api/whseChemicalDla',
    method: 'put',
    params: params
  })
}
export function delHgylDla(id) {
  return axios({
    url: '/api/whseChemicalDla?whseChemicalDlaoid=' + id,
    method: 'delete',
  })
}

export function getHgylDlb(params) {
  return axios({
    url: '/api/whseChemicalDlb/page',
    method: 'get',
    params: params
  })
}
export function addHgylDlb(params) {
  return axios({
    url: '/api/whseChemicalDlb',
    method: 'post',
    params: params
  })
}
export function updateHgylDlb(params) {
  return axios({
    url: '/api/whseChemicalDlb',
    method: 'put',
    params: params
  })
}
export function delHgylDlb(id) {
  return axios({
    url: '/api/whseChemicalDlb?whseChemicalDlboid=' + id,
    method: 'delete',
  })
}


// ---- 顏料
export function getYl(params) {
  return axios({
    url: '/api/whseChemical/page',
    method: 'get',
    params: params
  })
}
export function addYl(params) {
  return axios({
    url: '/api/whseChemical',
    method: 'post',
    params: params
  })
}
export function updateYl(params) {
  return axios({
    url: '/api/whseChemical',
    method: 'put',
    params: params
  })
}
export function delYl(id) {
  return axios({
    url: '/api/whseChemical?whseChemicaloid=' + id,
    method: 'delete',
  })
}
export function getYlDla(params) {
  return axios({
    url: '/api/whseChemicalDla/page',
    method: 'get',
    params: params
  })
}
export function addYlDla(params) {
  return axios({
    url: '/api/whseChemicalDla',
    method: 'post',
    params: params
  })
}
export function updateYlDla(params) {
  return axios({
    url: '/api/whseChemicalDla',
    method: 'put',
    params: params
  })
}
export function delYlDla(id) {
  return axios({
    url: '/api/whseChemicalDla?whseChemicalDlaoid=' + id,
    method: 'delete',
  })
}

export function getYlDlb(params) {
  return axios({
    url: '/api/whseChemicalDlb/page',
    method: 'get',
    params: params
  })
}
export function addYlDlb(params) {
  return axios({
    url: '/api/whseChemicalDlb',
    method: 'post',
    params: params
  })
}
export function updateYlDlb(params) {
  return axios({
    url: '/api/whseChemicalDlb',
    method: 'put',
    params: params
  })
}
export function delYlDlb(id) {
  return axios({
    url: '/api/whseChemicalDlb?whseChemicalDlboid=' + id,
    method: 'delete',
  })
}
