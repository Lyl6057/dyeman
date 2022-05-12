/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-11 15:08:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-11 17:30:36
 */

import axios from "axios";

import { dataPropEnum } from "./data"

// 获取本厂退纱列表数据
export function fetchWhseMaterInDataListByPage(params,type = 3){
    return axios({
        url: `/api/${dataPropEnum[type].whseInApiName}/v1.0/listByPage`,
        method: "get",
        params:params
    })
}


// 获取未入分页数据
export function fetchRetMaterNoticDataListByPage(params,type = 3){
    return axios({
        // url: "/api/proChemicalWithdrawalDtl/unIn/page",
        url: `/api/${dataPropEnum[type].proMatWithDtlApiName}/unIn/page`,
        method: "get",
        params:params
    })
}

// 通过退纱通知单号获取入仓数据
export function fetchRetMaterNoticDataList(withdrawalNo,type = 3){
    return axios({
        // url: `/api/proChemicalWithdrawalDtl/list/${withdrawalNo}`,
        url: `/api/${dataPropEnum[type].proMatWithDtlApiName}/list/${withdrawalNo}`,
        method: "get",
    })
}

// 新增纱线入仓主表数据
export function addWhseMaterInData(data,type = 3){
    return axios({
        // url: `/api/whseChemicalin/v2.0/save`,
        url: `/api/${dataPropEnum[type].whseInApiName}/v2.0/save`,
        method: "post",
        data: data,
    })
}

export function updateWhseMaterInData(data,type = 3){
    return axios({
        // url: "/api/whseChemicalin/v2.0/updateById",
        url: `/api/${dataPropEnum[type].whseInApiName}/v2.0/updateById`,
        method: "put",
        data: data,
    })
}

export function removeWhseMaterInData(params,type = 3){
    return axios({
        // url: "/api/whseChemicalin/v1.0/removeByIds",
        url: `/api/${dataPropEnum[type].whseInApiName}/v1.0/removeByIds`,
        method: "delete",
        params: params,
    })
}


// 批量新增纱线入仓明细数据
export function batchSaveOrUpdateDtlDataList(data,type = 3){
    return axios({
        // url: "/api/whseChemicalinDtla/batch/saveOrUpdate",
        url: `/api/${dataPropEnum[type].whseInDtlaApiName}/batch/saveOrUpdate`,
        method: "post",
        data: data,
    })
}

// 批量新增入仓货位明细数据
export function batchSaveOrUpdateDtlaDataList(data,type = 3){
    return axios({
        // url: "/api/whseChemicalinDtlb/batch/saveOrUpdate",
        url: `/api/${dataPropEnum[type].whseInDtlbApiName}/batch/saveOrUpdate`,
        method: "post",
        data: data,
    })
}

// 批量删除货位码明细数据
export function batchRemoveDtlaDataById(data,type = 3){
    return axios({
        // url: "/api/whseChemicalinDtlb/batch/removeByIds",
        url: `/api/${dataPropEnum[type].whseInDtlbApiName}/batch/removeByIds`,
        method: "post",
        data: data,
    })
}


// 根据物料入仓id获取明细数据和货位码数据
export function fetchWhseMaterInDtlAndDtlaData(params,type = 3){
    return axios({
        // url: "/api/whseChemicalinDtla/list/include/dtla",
        url: `/api/${dataPropEnum[type].whseInDtlaApiName}/list/include/dtla`,
        method: "get",
        params: params
    })
}

// 入仓审核检测
export function fetchExamineValid(whseMaterOid,type = 3){
    return axios({
        url: `/api/${dataPropEnum[type].whseInApiName}/valid/examine/${whseMaterOid}`,
        method: "get",
    })
}
