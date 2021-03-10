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


export function getSxDetali(params) {
  return axios({
    url: '/api/whseYarninDtl/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addSxDetali(params) {
  return axios({
    url: '/api/whseYarninDtl/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateSxDetali(params) {
  return axios({
    url: '/api/whseYarninDtl/v1.0/updateById',
    method: 'put',
    params: params
  })
}


export function delSxDetali(id) {
  return axios({
    url: '/api/whseYarninDtl/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}


export function getSxLoc(params) {
  return axios({
    url: '/api/whseYarninDtla/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addSxLoc(params) {
  return axios({
    url: '/api/whseYarninDtla/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateSxLoc(params) {
  return axios({
    url: '/api/whseYarninDtla/v1.0/updateById',
    method: 'put',
    params: params
  })
}


export function delSxLoc(id) {
  return axios({
    url: '/api/whseYarninDtla/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}

// 来纱登记
export function getIncoming(params) {
  return axios({
    url: '/api/salIncomingyarn/page',
    method: 'get',
    params: params
  })
}

// 胚布
export function getPb(params) {
  return axios({
    url: '/api/whseCalicoin/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addPb(params) {
  return axios({
    url: '/api/whseCalicoin/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updatePb(params) {
  return axios({
    url: '/api/whseCalicoin/v1.0/updateById',
    method: 'put',
    params: params
  })
}

export function delPb(id) {
  return axios({
    url: '/api/whseCalicoin/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}
export function getPbDetali(params) {
  return axios({
    url: '/api/whseCalicoinDtla/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function getPbDetaliList(params) {
  return axios({
    url: '/api/whseCalicoinDtla/v1.0/list',
    method: 'get',
    params: params
  })
}
export function addPbDetali(params) {
  return axios({
    url: '/api/whseCalicoinDtla/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updatePbDetali(params) {
  return axios({
    url: '/api/whseCalicoinDtla/v1.0/updateById',
    method: 'put',
    params: params
  })
}
export function delPbDetali(id) {
  return axios({
    url: '/api/whseCalicoinDtla/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}
// 疋号信息
export function getPbPh(params) {
  return axios({
    url: '/api/whseCalicoinDtlb/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addPbPhDetali(params) {
  return axios({
    url: '/api/whseCalicoinDtlb/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updatePbPhDetali(params) {
  return axios({
    url: '/api/whseCalicoinDtlb/v1.0/updateById',
    method: 'put',
    params: params
  })
}


export function delPbPhDetali(id) {
  return axios({
    url: '/api/whseCalicoinDtlb/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}


// ------ 成品布
export function getCpb(params) {
  return axios({
    url: '/api/whseFinishedclothin/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addCpb(params) {
  return axios({
    url: '/api/whseFinishedclothin/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateCpb(params) {
  return axios({
    url: '/api/whseFinishedclothin/v1.0/updateById',
    method: 'put',
    params: params
  })
}


export function delCpb(id) {
  return axios({
    url: '/api/whseFinishedclothin/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}
export function getCpbDetali(params) {
  return axios({
    url: '/api/whseFinishedclothinDtl/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function getCpbDetaliList(params) {
  return axios({
    url: '/api/whseFinishedclothin/v1.0/list',
    method: 'get',
    params: params
  })
}
export function addCpbDetali(params) {
  return axios({
    url: '/api/whseFinishedclothinDtl/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateCpbDetali(params) {
  return axios({
    url: '/api/whseFinishedclothinDtl/v1.0/updateById',
    method: 'put',
    params: params
  })
}


export function delCpbDetali(id) {
  return axios({
    url: '/api/whseFinishedclothinDtl/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}
// 化工原料
export function getRhl(params) {
  return axios({
    url: '/api/whseChemicalin/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addRhl(params) {
  return axios({
    url: '/api/whseChemicalin/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateRhl(params) {
  return axios({
    url: '/api/whseChemicalin/v1.0/updateById',
    method: 'put',
    params: params
  })
}

export function delRhl(id) {
  return axios({
    url: '/api/whseChemicalin/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}

export function getRhlDetali(params) {
  return axios({
    url: '/api/whseChemicalinDtla/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addRhlDetali(params) {
  return axios({
    url: '/api/whseChemicalinDtla/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateRhlDetali(params) {
  return axios({
    url: '/api/whseChemicalinDtla/v1.0/updateById',
    method: 'put',
    params: params
  })
}
export function delRhlDetali(id) {
  return axios({
    url: '/api/whseChemicalinDtla/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}

// 疋号信息
export function getRhlPh(params) {
  return axios({
    url: '/api/whseChemicalinDtlb/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addRhlPhDetali(params) {
  return axios({
    url: '/api/whseChemicalinDtlb/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateRhlPhDetali(params) {
  return axios({
    url: '/api/whseChemicalinDtlb/v1.0/updateById',
    method: 'put',
    params: params
  })
}

export function delRhlPhDetali(id) {
  return axios({
    url: '/api/whseChemicalinDtlb/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}

// 貨位信息
export function getRhlLoc(params) {
  return axios({
    url: '/api/whseChemicalinDtlc/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addRhlLoc(params) {
  return axios({
    url: '/api/whseChemicalinDtlc/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateRhlLoc(params) {
  return axios({
    url: '/api/whseChemicalinDtlc/v1.0/updateById',
    method: 'put',
    params: params
  })
}

export function delRhlLoc(id) {
  return axios({
    url: '/api/whseChemicalinDtlc/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}
// 顔料  ------------------------- 華麗的分割綫------------------------
export function getYl(params) {
  return axios({
    url: '/api/whseDyesalIn/page',
    method: 'get',
    params: params
  })
}
export function addYl(params) {
  return axios({
    url: '/api/whseDyesalIn',
    method: 'post',
    params: params
  })
}
export function updateYl(params) {
  return axios({
    url: '/api/whseDyesalIn',
    method: 'put',
    params: params
  })
}

export function delYl(id) {
  return axios({
    url: '/api/whseDyesalIn?whseDyesalInoid=' + id,
    method: 'delete',
  })
}

export function getYlDtla(params) {
  return axios({
    url: '/api/whseDyesalInDtla/page',
    method: 'get',
    params: params
  })
}
export function addYlDtla(params) {
  return axios({
    url: '/api/whseDyesalInDtla',
    method: 'post',
    params: params
  })
}
export function updateYlDtla(params) {
  return axios({
    url: '/api/whseDyesalInDtla',
    method: 'put',
    params: params
  })
}
export function delYlDtla(id) {
  return axios({
    url: '/api/whseDyesalInDtla?whseDyesainDtlaoid=' + id,
    method: 'delete',
  })
}

// 疋号信息
export function getYlDtlb(params) {
  return axios({
    url: '/api/whseDyesalInDtlb/page',
    method: 'get',
    params: params
  })
}
export function addYlDtlb(params) {
  return axios({
    url: '/api/whseDyesalInDtlb',
    method: 'post',
    params: params
  })
}
export function updateYlDtlb(params) {
  return axios({
    url: '/api/whseDyesalInDtlb',
    method: 'put',
    params: params
  })
}

export function delYlDtlb(id) {
  return axios({
    url: '/api/whseDyesalInDtlb?whseDyesalInDtlboid=' + id,
    method: 'delete',
  })
}

// 貨位信息
export function getYlLoc(params) {
  return axios({
    url: '/api/whseDyesalInDtlc/page',
    method: 'get',
    params: params
  })
}
export function addYlLoc(params) {
  return axios({
    url: '/api/whseDyesalInDtlc',
    method: 'post',
    params: params
  })
}
export function updateYlLoc(params) {
  return axios({
    url: '/api/whseDyesalInDtlc',
    method: 'put',
    params: params
  })
}

export function delYlLoc(id) {
  return axios({
    url: '/api/whseDyesalInDtlc?whseDyesalInDtlcoid=' + id,
    method: 'delete',
  })
}

// ------ 生产辅料
export function getScfl(params) {
  return axios({
    url: '/api/whseAccessoriesin/v1.0/listByPage',
    method: 'get',
    params: params
  })
}

export function addScfl(params) {
  return axios({
    url: '/api/whseAccessoriesin/v1.0/save',
    method: 'post',
    params: params
  })
}
export function updateScfl(params) {
  return axios({
    url: '/api/whseAccessoriesin/v1.0/updateById',
    method: 'put',
    params: params
  })
}

export function delScfl(id) {
  return axios({
    url: '/api/whseAccessoriesin/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}

export function getScflDetali(params) {
  return axios({
    url: '/api/whseAccessoriesDtl/v1.0/listByPage',
    method: 'get',
    params: params
  })
}
export function addScflDetali(params) {
  return axios({
    url: '/api/whseAccessoriesDtl/v1.0/save',
    method: 'post',
    params: params
  })
}

export function updateScflDetali(params) {
  return axios({
    url: '/api/whseAccessoriesDtl/v1.0/updateById',
    method: 'put',
    params: params
  })
}

export function delScflDetali(id) {
  return axios({
    url: '/api/whseAccessoriesDtl/v1.0/removeById?id=' + id,
    method: 'delete',
  })
}