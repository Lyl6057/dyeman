import axios from "axios";

// ---- 货位
export function getLocation(params) {
  return axios({
    url: "/api/whseLocation",
    method: "get",
    params: params
  });
}

// ---- 纱线
export function getSx(params) {
  return axios({
    url: "/api/whseYarnin/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addSx(params) {
  return axios({
    url: "/api/whseYarnin/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateSx(params) {
  return axios({
    url: "/api/whseYarnin/v1.0/updateById",
    method: "put",
    params: params
  });
}
export function delSx(id) {
  return axios({
    url: "/api/whseYarnin/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

export function getSxDetali(params) {
  return axios({
    url: "/api/whseYarninDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addSxDetali(params) {
  return axios({
    url: "/api/whseYarninDtl/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateSxDetali(params) {
  return axios({
    url: "/api/whseYarninDtl/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delSxDetali(id) {
  return axios({
    url: "/api/whseYarninDtl/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

export function getSxDtla(params) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/list",
    method: "get",
    params: params
  });
}
export function addSxDtla(params) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateSxDtla(params) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delSxDtla(id) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

export function getSxLoc(params) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addSxLoc(params) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateSxLoc(params) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delSxLoc(id) {
  return axios({
    url: "/api/whseYarninDtla/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

// 来纱登记
export function getIncoming(params) {
  return axios({
    url: "/api/salIncomingyarn/page",
    method: "get",
    params: params
  });
}

// 胚布
export function getPb(params) {
  return axios({
    url: "/api/whseCalicoin/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addPb(params) {
  return axios({
    url: "/api/whseCalicoin/v1.0/save",
    method: "post",
    params: params
  });
}
export function updatePb(params) {
  return axios({
    url: "/api/whseCalicoin/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delPb(id) {
  return axios({
    url: "/api/whseCalicoin/v1.0/removeById?id=" + id,
    method: "delete"
  });
}
export function getPbDetali(params) {
  return axios({
    url: "/api/whseCalicoinDtla/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function getPbDetaliList(params) {
  return axios({
    url: "/api/whseCalicoinDtla/v1.0/list",
    method: "get",
    params: params
  });
}
export function addPbDetali(params) {
  return axios({
    url: "/api/whseCalicoinDtla/v1.0/save",
    method: "post",
    params: params
  });
}
export function updatePbDetali(params) {
  return axios({
    url: "/api/whseCalicoinDtla/v1.0/updateById",
    method: "put",
    params: params
  });
}
export function delPbDetali(id) {
  return axios({
    url: "/api/whseCalicoinDtla/v1.0/removeById?id=" + id,
    method: "delete"
  });
}
// 疋号信息
export function getPbPh(params) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addPbPhDetali(params) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/save",
    method: "post",
    params: params
  });
}
export function updatePbPhDetali(params) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delPbPhDetali(id) {
  return axios({
    url: "/api/whseCalicoinDtlb/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

// ------ 成品布
export function getCpb(params) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addCpb(params) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateCpb(params) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delCpb(id) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/removeById?id=" + id,
    method: "delete"
  });
}
export function getCpbDetali(params) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function getCpbDetaliList(params) {
  return axios({
    url: "/api/whseFinishedclothin/v1.0/list",
    method: "get",
    params: params
  });
}
export function addCpbDetali(params) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateCpbDetali(params) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delCpbDetali(id) {
  return axios({
    url: "/api/whseFinishedclothinDtl/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

export function getCpbDtlb(params) {
  return axios({
    url: "/api/whseFinishedclothcargopackDtl",
    method: "get",
    params: params
  });
}
export function addCpbDtlb(params) {
  return axios({
    url: "/api/whseFinishedclothcargopackDtl",
    method: "post",
    params: params
  });
}
export function updateCpbDtlb(params) {
  return axios({
    url: "/api/whseFinishedclothcargopackDtl",
    method: "put",
    params: params
  });
}

export function delCpbDtlb(id) {
  return axios({
    url:
      "/api/whseFinishedclothcargopackDtl?whseFinishedclothcargopackDtloid=" +
      id,
    method: "delete"
  });
}
// 化工原料
export function getRhl(params) {
  return axios({
    url: "/api/whseChemicalin/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addRhl(params) {
  return axios({
    url: "/api/whseChemicalin/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateRhl(params) {
  return axios({
    url: "/api/whseChemicalin/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delRhl(id) {
  return axios({
    url: "/api/whseChemicalin/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

export function getRhlDetali(params) {
  return axios({
    url: "/api/whseChemicalinDtla/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addRhlDetali(params) {
  return axios({
    url: "/api/whseChemicalinDtla/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateRhlDetali(params) {
  return axios({
    url: "/api/whseChemicalinDtla/v1.0/updateById",
    method: "put",
    params: params
  });
}
export function delRhlDetali(id) {
  return axios({
    url: "/api/whseChemicalinDtla/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

// 疋号信息
export function getRhlPhList(params) {
  return axios({
    url: "/api/whseChemicalinDtlb/v1.0/list",
    method: "get",
    params: params
  });
}

export function getRhlPh(params) {
  return axios({
    url: "/api/whseChemicalinDtlb/v1.0/list",
    method: "get",
    params: params
  });
}
export function addRhlPhDetali(params) {
  return axios({
    url: "/api/whseChemicalinDtlb/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateRhlPhDetali(params) {
  return axios({
    url: "/api/whseChemicalinDtlb/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delRhlPhDetali(id) {
  return axios({
    url: "/api/whseChemicalinDtlb/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

// 貨位信息
export function getRhlLoc(params) {
  return axios({
    url: "/api/whseChemicalinDtlc/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addRhlLoc(params) {
  return axios({
    url: "/api/whseChemicalinDtlc/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateRhlLoc(params) {
  return axios({
    url: "/api/whseChemicalinDtlc/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delRhlLoc(id) {
  return axios({
    url: "/api/whseChemicalinDtlc/v1.0/removeById?id=" + id,
    method: "delete"
  });
}
// 顔料  ------------------------- 華麗的分割綫------------------------
export function getYl(params) {
  return axios({
    url: "/api/whseDyesalin/page",
    method: "get",
    params: params
  });
}
export function addYl(params) {
  return axios({
    url: "/api/whseDyesalin",
    method: "post",
    params: params
  });
}
export function updateYl(params) {
  return axios({
    url: "/api/whseDyesalin",
    method: "put",
    params: params
  });
}

export function delYl(id) {
  return axios({
    url: "/api/whseDyesalin?whseDyesalinoid=" + id,
    method: "delete"
  });
}

export function getYlDtla(params) {
  return axios({
    url: "/api/whseDyesalInDtla/page",
    method: "get",
    params: params
  });
}
export function addYlDtla(params) {
  return axios({
    url: "/api/whseDyesalInDtla",
    method: "post",
    params: params
  });
}
export function updateYlDtla(params) {
  return axios({
    url: "/api/whseDyesalInDtla",
    method: "put",
    params: params
  });
}
export function delYlDtla(id) {
  return axios({
    url: "/api/whseDyesalInDtla?whseDyesalInDtlaoid=" + id,
    method: "delete"
  });
}

// 疋号信息
export function getYlDtlb(params) {
  return axios({
    url: "/api/whseDyesalInDtlb",
    method: "get",
    params: params
  });
}
export function addYlDtlb(params) {
  return axios({
    url: "/api/whseDyesalInDtlb",
    method: "post",
    params: params
  });
}
export function updateYlDtlb(params) {
  return axios({
    url: "/api/whseDyesalInDtlb",
    method: "put",
    params: params
  });
}

export function delYlDtlb(id) {
  return axios({
    url: "/api/whseDyesalInDtlb?whseDyesalInDtlboid=" + id,
    method: "delete"
  });
}

// 貨位信息
export function getYlLoc(params) {
  return axios({
    url: "/api/whseDyesalInDtlc/page",
    method: "get",
    params: params
  });
}
export function addYlLoc(params) {
  return axios({
    url: "/api/whseDyesalInDtlc",
    method: "post",
    params: params
  });
}
export function updateYlLoc(params) {
  return axios({
    url: "/api/whseDyesalInDtlc",
    method: "put",
    params: params
  });
}

export function delYlLoc(id) {
  return axios({
    url: "/api/whseDyesalInDtlc?whseDyesalInDtlcoid=" + id,
    method: "delete"
  });
}

// ------ 生产辅料
export function getScfl(params) {
  return axios({
    url: "/api/whseAccessoriesIn/page",
    method: "get",
    params: params
  });
}

export function addScfl(params) {
  return axios({
    url: "/api/whseAccessoriesIn",
    method: "post",
    params: params
  });
}
export function updateScfl(params) {
  return axios({
    url: "/api/whseAccessoriesIn",
    method: "put",
    params: params
  });
}

export function delScfl(id) {
  return axios({
    url: "/api/whseAccessoriesIn?whseAccessoriesinoid=" + id,
    method: "delete"
  });
}

export function getScflDetali(params) {
  return axios({
    url: "/api/whseAccessoriesDtl/page",
    method: "get",
    params: params
  });
}
export function addScflDetali(params) {
  return axios({
    url: "/api/whseAccessoriesDtl",
    method: "post",
    params: params
  });
}

export function updateScflDetali(params) {
  return axios({
    url: "/api/whseAccessoriesDtl",
    method: "put",
    params: params
  });
}

export function delScflDetali(id) {
  return axios({
    url: "/api/whseAccessoriesDtl?whseAccessoriesDtloid=" + id,
    method: "delete"
  });
}

export function getScflLoc(params) {
  return axios({
    url: "/api/whseAccessoriesDtla/page",
    method: "get",
    params: params
  });
}
export function getScflLocList(params) {
  return axios({
    url: "/api/whseAccessoriesDtla",
    method: "get",
    params: params
  });
}
export function addScflLoc(params) {
  return axios({
    url: "/api/whseAccessoriesDtla",
    method: "post",
    params: params
  });
}

export function updateScflLoc(params) {
  return axios({
    url: "/api/whseAccessoriesDtla",
    method: "put",
    params: params
  });
}

export function delScflLoc(id) {
  return axios({
    url: "/api/whseAccessoriesDtla?whseAccessoriesDtlaoid=" + id,
    method: "delete"
  });
}

// ------ 五金
export function getWj(params) {
  return axios({
    url: "/api/whseHardwareIn/page",
    method: "get",
    params: params
  });
}

export function addWj(params) {
  return axios({
    url: "/api/whseHardwareIn",
    method: "post",
    params: params
  });
}
export function updateWj(params) {
  return axios({
    url: "/api/whseHardwareIn",
    method: "put",
    params: params
  });
}

export function delWj(id) {
  return axios({
    url: "/api/whseHardwareIn?whseAccessoriesinoid=" + id,
    method: "delete"
  });
}

export function getWjDetali(params) {
  return axios({
    url: "/api/whseHardwareDtl/page",
    method: "get",
    params: params
  });
}
export function addWjDetali(params) {
  return axios({
    url: "/api/whseHardwareDtl",
    method: "post",
    params: params
  });
}

export function updateWjDetali(params) {
  return axios({
    url: "/api/whseHardwareDtl",
    method: "put",
    params: params
  });
}

export function delWjDetali(id) {
  return axios({
    url: "/api/whseHardwareDtl?whseAccessoriesDtloid=" + id,
    method: "delete"
  });
}

export function getWjLoc(params) {
  return axios({
    url: "/api/whseAccessoriesDtla2/page",
    method: "get",
    params: params
  });
}
export function getWjLocList(params) {
  return axios({
    url: "/api/whseAccessoriesDtla2",
    method: "get",
    params: params
  });
}
export function addWjLoc(params) {
  return axios({
    url: "/api/whseAccessoriesDtla2",
    method: "post",
    params: params
  });
}

export function updateWjLoc(params) {
  return axios({
    url: "/api/whseAccessoriesDtla2",
    method: "put",
    params: params
  });
}

export function delWjLoc(id) {
  return axios({
    url: "/api/whseAccessoriesDtla2?whseAccessoriesDtlaoid=" + id,
    method: "delete"
  });
}

// ------ 行政
export function getXz(params) {
  return axios({
    url: "/api/whseOfficeIn/page",
    method: "get",
    params: params
  });
}

export function addXz(params) {
  return axios({
    url: "/api/whseOfficeIn",
    method: "post",
    params: params
  });
}
export function updateXz(params) {
  return axios({
    url: "/api/whseOfficeIn",
    method: "put",
    params: params
  });
}

export function delXz(id) {
  return axios({
    url: "/api/whseOfficeIn?whseAccessoriesinoid=" + id,
    method: "delete"
  });
}

export function getXzDetali(params) {
  return axios({
    url: "/api/whseOfficeDtl/page",
    method: "get",
    params: params
  });
}
export function addXzDetali(params) {
  return axios({
    url: "/api/whseOfficeDtl",
    method: "post",
    params: params
  });
}

export function updateXzDetali(params) {
  return axios({
    url: "/api/whseOfficeDtl",
    method: "put",
    params: params
  });
}

export function delXzDetali(id) {
  return axios({
    url: "/api/whseOfficeDtl?whseAccessoriesDtloid=" + id,
    method: "delete"
  });
}

export function getXzLoc(params) {
  return axios({
    url: "/api/whseOfficeDtla/page",
    method: "get",
    params: params
  });
}
export function getXzLocList(params) {
  return axios({
    url: "/api/whseOfficeDtla",
    method: "get",
    params: params
  });
}
export function addXzLoc(params) {
  return axios({
    url: "/api/whseOfficeDtla",
    method: "post",
    params: params
  });
}

export function updateXzLoc(params) {
  return axios({
    url: "/api/whseOfficeDtla",
    method: "put",
    params: params
  });
}

export function delXzLoc(id) {
  return axios({
    url: "/api/whseOfficeDtla?whseAccessoriesDtlaoid=" + id,
    method: "delete"
  });
}

// ------ 能源
export function getRl(params) {
  return axios({
    url: "/api/whseEnergyIn/page",
    method: "get",
    params: params
  });
}

export function addRl(params) {
  return axios({
    url: "/api/whseEnergyIn",
    method: "post",
    params: params
  });
}
export function updateRl(params) {
  return axios({
    url: "/api/whseEnergyIn",
    method: "put",
    params: params
  });
}

export function delRl(id) {
  return axios({
    url: "/api/whseEnergyIn?energyInId=" + id,
    method: "delete"
  });
}

export function getRlDetali(params) {
  return axios({
    url: "/api/whseEnergyDtl/page",
    method: "get",
    params: params
  });
}
export function addRlDetali(params) {
  return axios({
    url: "/api/whseEnergyDtl",
    method: "post",
    params: params
  });
}

export function updateRlDetali(params) {
  return axios({
    url: "/api/whseEnergyDtl",
    method: "put",
    params: params
  });
}

export function delRlDetali(id) {
  return axios({
    url: "/api/whseEnergyDtl?energyDtloid=" + id,
    method: "delete"
  });
}

export function getRlLoc(params) {
  return axios({
    url: "/api/whseEnergyDtla/page",
    method: "get",
    params: params
  });
}
export function getRlLocList(params) {
  return axios({
    url: "/api/whseEnergyDtla",
    method: "get",
    params: params
  });
}
export function addRlLoc(params) {
  return axios({
    url: "/api/whseEnergyDtla",
    method: "post",
    params: params
  });
}

export function updateRlLoc(params) {
  return axios({
    url: "/api/whseEnergyDtla",
    method: "put",
    params: params
  });
}

export function delRlLoc(id) {
  return axios({
    url: "/api/whseEnergyDtla?whseEnergyDtlaId=" + id,
    method: "delete"
  });
}

export function getEqu(params) {
  return axios({
    url: "/api/whseEquipmentIn/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addEqu(params) {
  return axios({
    url: "/api/whseEquipmentIn/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateEqu(params) {
  return axios({
    url: "/api/whseEquipmentIn/v1.0/updateById",
    method: "put",
    params: params
  });
}
export function delEqu(id) {
  return axios({
    url: "/api/whseEquipmentIn/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

export function getEquDtla(params) {
  return axios({
    url: "/api/whseEquipmentDtl/v1.0/listByPage",
    method: "get",
    params: params
  });
}
export function addEquDtla(params) {
  return axios({
    url: "/api/whseEquipmentDtl/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateEquDtla(params) {
  return axios({
    url: "/api/whseEquipmentDtl/v1.0/updateById",
    method: "put",
    params: params
  });
}
export function delEquDtla(id) {
  return axios({
    url: "/api/whseEquipmentDtl/v1.0/removeById?id=" + id,
    method: "delete"
  });
}

// 疋号信息
export function getEquDtlb(params) {
  return axios({
    url: "/api/whseEquipmentDtla/v1.0/list",
    method: "get",
    params: params
  });
}
export function addEquDtlb(params) {
  return axios({
    url: "/api/whseEquipmentDtla/v1.0/save",
    method: "post",
    params: params
  });
}
export function updateEquDtlb(params) {
  return axios({
    url: "/api/whseEquipmentDtla/v1.0/updateById",
    method: "put",
    params: params
  });
}

export function delEquDtlb(id) {
  return axios({
    url: "/api/whseEquipmentDtla/v1.0/removeById?id=" + id,
    method: "delete"
  });
}
