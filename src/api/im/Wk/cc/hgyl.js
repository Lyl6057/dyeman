import axios from "axios";

export function getLyHgyl(params) {
  return axios({
    url: "/api/whseChemical/page",
    method: "get",
    params: params
  });
}
export function addLyHgyl(params) {
  return axios({
    url: "/api/whseChemical",
    method: "post",
    params: params
  });
}
export function updateLyHgyl(params) {
  return axios({
    url: "/api/whseChemical",
    method: "put",
    params: params
  });
}
export function delLyHgyl(id) {
  return axios({
    url: "/api/whseChemical?whseChemicaloid=" + id,
    method: "delete"
  });
}

export function getLyHgylDtla(params) {
  return axios({
    url: "/api/whseChemicalDla/page",
    method: "get",
    params: params
  });
}
export function addLyHgylDtla(params) {
  return axios({
    url: "/api/whseChemicalDla",
    method: "post",
    params: params
  });
}
export function updateLyHgylDtla(params) {
  return axios({
    url: "/api/whseChemicalDla",
    method: "put",
    params: params
  });
}
export function delLyHgylDtla(id) {
  return axios({
    url: "/api/whseChemicalDla?whseChemicalDlaoid=" + id,
    method: "delete"
  });
}

export function getLyHgylDtlb(params) {
  return axios({
    url: "/api/whseChemicalDlb/page",
    method: "get",
    params: params
  });
}
export function addLyHgylDtlb(params) {
  return axios({
    url: "/api/whseChemicalDlb",
    method: "post",
    params: params
  });
}
export function updateLyHgylDtlb(params) {
  return axios({
    url: "/api/whseChemicalDlb",
    method: "put",
    params: params
  });
}
export function delLyHgylDtlb(id) {
  return axios({
    url: "/api/whseChemicalDlb?whseChemicalDlboid=" + id,
    method: "delete"
  });
}

export function getHgyl(params) {
  return axios({
    url: "/api/whseChemicalOut/page",
    method: "get",
    params: params
  });
}
export function addHgyl(params) {
  return axios({
    url: "/api/whseChemicalOut",
    method: "post",
    params: params
  });
}
export function updateHgyl(params) {
  return axios({
    url: "/api/whseChemicalOut",
    method: "put",
    params: params
  });
}
export function delHgyl(id) {
  return axios({
    url: "/api/whseChemicalOut?whseChemicalOutId=" + id,
    method: "delete"
  });
}

export function getHgylDtl(params) {
  return axios({
    url: "/api/whseChemicalOutdtl/page",
    method: "get",
    params: params
  });
}
export function getHgylDtlList(params) {
  return axios({
    url: "/api/whseChemicalOutdtl",
    method: "get",
    params: params
  });
}
export function addHgylDtl(params) {
  return axios({
    url: "/api/whseChemicalOutdtl",
    method: "post",
    params: params
  });
}
export function updateHgylDtl(params) {
  return axios({
    url: "/api/whseChemicalOutdtl",
    method: "put",
    params: params
  });
}
export function delHgylDtl(id) {
  return axios({
    url: "/api/whseChemicalOutdtl?whseChemicalOutdtlId=" + id,
    method: "delete"
  });
}

export function getHgylDtla(params) {
  return axios({
    url: "/api/whseChemicalOutdtla",
    method: "get",
    params: params
  });
}
export function addHgylDtla(params) {
  return axios({
    url: "/api/whseChemicalOutdtla",
    method: "post",
    params: params
  });
}
export function updateHgylDtla(params) {
  return axios({
    url: "/api/whseChemicalOutdtla",
    method: "put",
    params: params
  });
}
export function delHgylDtla(id) {
  return axios({
    url: "/api/whseChemicalOutdtla?retyarninDtlaId=" + id,
    method: "delete"
  });
}

// 销售出仓
export function getCalicosellout(params) {
  return axios({
    url: "/api/whseCalicosellout/page",
    method: "get",
    params: params
  });
}
export function addCalicosellout(params) {
  return axios({
    url: "/api/whseCalicosellout",
    method: "post",
    params: params
  });
}
export function updateCalicosellout(params) {
  return axios({
    url: "/api/whseCalicosellout",
    method: "put",
    params: params
  });
}
export function delCalicosellout(id) {
  return axios({
    url: "/api/whseCalicosellout?whseCalicoselloutoid=" + id,
    method: "delete"
  });
}

// 销售出仓明细
export function getCalicoselloutDtla(params) {
  return axios({
    url: "/api/whseCalicoselloutDtla/page",
    method: "get",
    params: params
  });
}
export function addCalicoselloutDtla(params) {
  return axios({
    url: "/api/whseCalicoselloutDtla",
    method: "post",
    params: params
  });
}
export function updateCalicoselloutDtla(params) {
  return axios({
    url: "/api/whseCalicoselloutDtla",
    method: "put",
    params: params
  });
}
export function delCalicoselloutDtla(id) {
  return axios({
    url: "/api/whseCalicoselloutDtla?whseCalicoselloutDtlaoid=" + id,
    method: "delete"
  });
}

// 销售出仓疋号明细
export function getCalicoselloutDtlb(params) {
  return axios({
    url: "/api/whseCalicoselloutDtlb/page",
    method: "get",
    params: params
  });
}
export function addCalicoselloutDtlb(params) {
  return axios({
    url: "/api/whseCalicoselloutDtlb",
    method: "post",
    params: params
  });
}
export function updateCalicoselloutDtlb(params) {
  return axios({
    url: "/api/whseCalicoselloutDtlb",
    method: "put",
    params: params
  });
}
export function delCalicoselloutDtlb(id) {
  return axios({
    url: "/api/whseCalicoselloutDtlb?whseCalicoselloutDtlboid=" + id,
    method: "delete"
  });
}

// 来胚登记
export function getEmbryogenesisDtl(params) {
  return axios({
    url: "/api/salEmbryogenesisDtl/page",
    method: "get",
    params: params
  });
}

// 本廠配料计划
export function getPbPlan(params) {
  return axios({
    url: "/api/whseMaterialPlan/page",
    method: "get",
    params: params
  });
}

// 外厂廠配料计划
export function getPbOutPlan(params) {
  return axios({
    url: "/api/vWhseMaterialoutPlan/page",
    method: "get",
    params: params
  });
}

// 供应商退胚
export function getRetsuppcalico(params) {
  return axios({
    url: "/api/whseRetsuppcalico/page",
    method: "get",
    params: params
  });
}
export function addRetsuppcalico(params) {
  return axios({
    url: "/api/whseRetsuppcalico",
    method: "post",
    params: params
  });
}
export function updateRetsuppcalico(params) {
  return axios({
    url: "/api/whseRetsuppcalico",
    method: "put",
    params: params
  });
}
export function delRetsuppcalico(id) {
  return axios({
    url: "/api/whseRetsuppcalico?whseRetsuppcalicooid=" + id,
    method: "delete"
  });
}

// 供应商退胚明细
export function getRetsuppcalicoDtl(params) {
  return axios({
    url: "/api/whseRetsuppcalicodtl/page",
    method: "get",
    params: params
  });
}
export function addRetsuppcalicoDtl(params) {
  return axios({
    url: "/api/whseRetsuppcalicodtl",
    method: "post",
    params: params
  });
}
export function updateRetsuppcalicoDtl(params) {
  return axios({
    url: "/api/whseRetsuppcalicodtl",
    method: "put",
    params: params
  });
}
export function delRetsuppcalicoDtl(id) {
  return axios({
    url: "/api/whseRetsuppcalicodtl?whseRetsuppcalicodtloid=" + id,
    method: "delete"
  });
}

// 客人退胚
export function getRetguestcalico(params) {
  return axios({
    url: "/api/whseRetguestcalico/page",
    method: "get",
    params: params
  });
}
export function addRetguestcalico(params) {
  return axios({
    url: "/api/whseRetguestcalico",
    method: "post",
    params: params
  });
}
export function updateRetguestcalico(params) {
  return axios({
    url: "/api/whseRetguestcalico",
    method: "put",
    params: params
  });
}
export function delRetguestcalico(id) {
  return axios({
    url: "/api/whseRetguestcalico?whseRetguestcalicooid=" + id,
    method: "delete"
  });
}
// 客人退胚明细
export function getRetguestcalicodtl(params) {
  return axios({
    url: "/api/whseRetguestcalicodtl/page",
    method: "get",
    params: params
  });
}
export function addRetguestcalicodtl(params) {
  return axios({
    url: "/api/whseRetguestcalicodtl",
    method: "post",
    params: params
  });
}
export function updateRetguestcalicodtl(params) {
  return axios({
    url: "/api/whseRetguestcalicodtl",
    method: "put",
    params: params
  });
}
export function delRetguestcalicodtl(id) {
  return axios({
    url: "/api/whseRetguestcalicodtl?whseRetguestcalicodtloid=" + id,
    method: "delete"
  });
}

// 纱线调仓
export function getTransfercalico(params) {
  return axios({
    url: "/api/whseTransfercalico/page",
    method: "get",
    params: params
  });
}
export function addTransfercalico(params) {
  return axios({
    url: "/api/whseTransfercalico",
    method: "post",
    params: params
  });
}
export function updateTransfercalico(params) {
  return axios({
    url: "/api/whseTransfercalico",
    method: "put",
    params: params
  });
}

export function delTransfercalico(id) {
  return axios({
    url: "/api/whseTransfercalico?whseTransfercalicooid=" + id,
    method: "delete"
  });
}

// 纱线调仓明细
export function getTransfercalicoDtl(params) {
  return axios({
    url: "/api/whseTransfercalicoDtl/page",
    method: "get",
    params: params
  });
}
export function addTransfercalicoDtl(params) {
  return axios({
    url: "/api/whseTransfercalicoDtl",
    method: "post",
    params: params
  });
}
export function updateTransfercalicoDtl(params) {
  return axios({
    url: "/api/whseTransfercalicoDtl",
    method: "put",
    params: params
  });
}
export function delTransfercalicoDtl(id) {
  return axios({
    url: "/api/whseTransfercalicoDtl?whseTransfercalicoDtloid=" + id,
    method: "delete"
  });
}
