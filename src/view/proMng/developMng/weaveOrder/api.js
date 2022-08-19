/*
 * @Author: Lyl
 * @Date: 2021-02-01 14:06:25
 * @LastEditors: Lyl
 * @LastEditTime: 2022-08-19 08:03:50
 * @Description:
 */

import axios from "axios";


// 用纱明细中通过本厂纱批号获取试纱记录
export function fetchYarnTestByYarnBatch(params){
  return axios({
    url: "/api/proWeaveJobYarn/yarnTest/byBatch/" + params.yarnBatch,
    method: "get",
  });
}

//  根据抽取的已检验数据保存织胚明细
export function saveFlatknitByUnCreate(params){
  return axios({
    url: "/api/proWeaveJobFlatknit/save/byXiaLan/" + params.weaveJobId,
    method: "POST",
    data: params.data,
  });
}

// 根据分组外键（业务外键）获取下栏明细数据
export function fetchXiaLanDtlData(data){
  return axios({
    url: "/api/vGstPoColorpoQty/xiaLan/dtl",
    method: "POST",
    data: data,
  });
}

// 查询未生产的织造通知单
export function fetchUnCreateWeavaJob(params){
  return axios({
    url: "/api/vGstPoColorpoQty/page",
    method: "get",
    params: params
  });
}

// 批量新增织单明细
export function batchSaveOrUpdateWeaveDtlData(data){
  return axios({
    url: "/api/proWeaveJobGstpodetail/batch/saveOrUpdate",
    method: "post",
    data: data,
  })
}

// 获取织单明细
export function fetchWeaveDtlDataByFk(params){
  return axios({
    url: "/api/proWeaveJobGstpodetail/list",
    method: "get",
    params: params,
  })
}


// 查询设备信息
export function fetchEquipmentInfo(params) {
  return axios({
    url: "/api/baseEquipment/list",
    method: "get",
    params: params
  });
}



// 新增设备排期表数据
export function addProEquipmentSchedule(params) {
  return axios({
    url: "/api/proEquipmentSchedule",
    method: "post",
    params: params
  });
}


// 查询 织单布票已生产总重量
export function getNoteSum(params) {
  return axios({
    url: "/api/proWeaveJobSumOutput/yieldSum",
    method: "get",
    params:params
  });
}

// 查询 bom 资料
export function getBom(params) {
  return axios({
    url: "/api/salNewbom",
    method: "get",
    params: params
  });
}

// 查询 织造资料
export function getBomDtlb(params) {
  return axios({
    url: "/api/salNewbomDtlb",
    method: "get",
    params: params
  });
}

// 查询 织造规格明细 Sal_NewBom_Dtlb_Specs
export function getBomDtlbSpecs(params) {
  return axios({
    url: "/api/salNewbomDtlbSpecs",
    method: "get",
    params: params
  });
}

// 查询 营业规格明细 Sal_NewBom_Dtlb_Specs
export function getBomDtlaSpecs(params) {
  return axios({
    url: "/api/salNewbomDtlaSpecs",
    method: "get",
    params: params
  });
}

// 獲取訂單號
export function getPo(params) {
  return axios({
    url: "/api/salPoList",
    method: "get",
    params: params
  });
}

// 獲取訂單胚布资料
export function getPoDtla(params) {
  return axios({
    url: "/api/salPoDtlaList",
    method: "get",
    params: params
  });
}

// 獲取訂單面料资料Sal_bom_fabric
export function getBomFa(params) {
  return axios({
    url: "/api/salBomFabric",
    method: "get",
    params: params
  });
}

// 查询织单
export function fetchWeaveOrderByPage(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params: params
  });
}

// 新增
export function addWeaveOrder(data) {
  return axios({
    url: "/api/proWeaveJob",
    method: "post",
    params: data
  });
}

// 修改
export function updateWeaveOrder(data) {
  return axios({
    url: "/api/proWeaveJob",
    method: "put",
    params: data
  });
}
// 修改
export function removeWeaveOrder(id) {
  return axios({
    url: "/api/proWeaveJob?weaveJobId=" + id,
    method: "delete"
  });
}
// 打印佈飛
export function print(params) {
  return axios({
    url: "/api/proWeaveJob/prinEntityPdf",
    method: "get",
    params: params
  });
}

// 紗長
export function getLong(params) {
  return axios({
    url: "/api/proWeaveJobLengthChanged/page",
    method: "get",
    params: params
  });
}

// 新增
export function addLong(data) {
  return axios({
    url: "/api/proWeaveJobLengthChanged",
    method: "post",
    params: data
  });
}

// 修改
export function updateLong(data) {
  return axios({
    url: "/api/proWeaveJobLengthChanged",
    method: "put",
    params: data
  });
}

// 刪除
export function delLong(id) {
  return axios({
    url: "/api/proWeaveJobLengthChanged?changedId=" + id,
    method: "delete"
  });
}

export function getYarn(params) {
  return axios({
    url: "/api/proWeaveJobYarn/page",
    method: "get",
    params: params
  });
}

// 新增
export function addYarn(data) {
  return axios({
    url: "/api/proWeaveJobYarn",
    method: "post",
    params: data
  });
}

// 修改
export function updateYarn(data) {
  return axios({
    url: "/api/proWeaveJobYarn",
    method: "put",
    params: data
  });
}

// 刪除
export function delYarn(id) {
  return axios({
    url: "/api/proWeaveJobYarn?useYarnId=" + id,
    method: "delete"
  });
}

export function getGroup(params) {
  return axios({
    url: "/api/proWeaveJobGroup/page",
    method: "get",
    params: params
  });
}

// 新增
export function addGroup(data) {
  return axios({
    url: "/api/proWeaveJobGroup",
    method: "post",
    params: data
  });
}

// 修改
export function updateGroup(data) {
  return axios({
    url: "/api/proWeaveJobGroup",
    method: "put",
    params: data
  });
}

// 刪除
export function delGroup(id) {
  return axios({
    url: "/api/proWeaveJobGroup?groupId=" + id,
    method: "delete"
  });
}

export function getCalico(params) {
  return axios({
    url: "/api/proWeaveJobCalico/page",
    method: "get",
    params: params
  });
}

// 新增
export function addCalico(data) {
  return axios({
    url: "/api/proWeaveJobCalico",
    method: "post",
    params: data
  });
}

// 修改
export function updateCalico(data) {
  return axios({
    url: "/api/proWeaveJobCalico",
    method: "put",
    params: data
  });
}

// 刪除
export function delCalico(id) {
  return axios({
    url: "/api/proWeaveJobCalico?washedId=" + id,
    method: "delete"
  });
}

export function getStrain(params) {
  return axios({
    url: "/api/proWeaveJobStrain/page",
    method: "get",
    params: params
  });
}

// 新增
export function addStrain(data) {
  return axios({
    url: "/api/proWeaveJobStrain",
    method: "post",
    params: data
  });
}

// 修改
export function updateStrain(data) {
  return axios({
    url: "/api/proWeaveJobStrain",
    method: "put",
    params: data
  });
}

// 刪除
export function delStrain(id) {
  return axios({
    url: "/api/proWeaveJobStrain?strainId=" + id,
    method: "delete"
  });
}

// 机号
export function getMachine(params) {
  return axios({
    url: "/api/proWeaveJobUseMachine/page",
    method: "get",
    params: params
  });
}

// 新增
export function addMachine(data) {
  return axios({
    url: "/api/proWeaveJobUseMachine",
    method: "post",
    params: data
  });
}

// 修改
export function updateMachine(data) {
  return axios({
    url: "/api/proWeaveJobUseMachine",
    method: "put",
    params: data
  });
}

// 刪除
export function delMachine(id) {
  return axios({
    url: "/api/proWeaveJobUseMachine?useId=" + id,
    method: "delete"
  });
}


// 工艺子表
export function createWeaveJobTechnology(data) {
  return axios({
    url: "/api/proWeaveJobTechnology",
    method: "post",
    params: data
  });
}

export function updateWeaveJobTechnology(data) {
  return axios({
    url: "/api/proWeaveJobTechnology",
    method: "put",
    params: data
  });
}

export function fetchWeaveJobTechnology(data) {
  return axios({
    url: "/api/proWeaveJobTechnology",
    method: "get",
    params: data
  });
}

export function reomveWeaveJobTechnology(id) {
  return axios({
    url: "/api/proWeaveJobTechnology?proWeaveJobTechnologyId=" + id,
    method: "delete",
  });
}


