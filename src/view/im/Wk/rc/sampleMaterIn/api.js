/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-17 14:07:36
 */

import axios from "axios";
import { dataPropEnum } from "./data" 

// 获取本厂退纱列表数据
export function fetchWhseYarnInDataListByPage(params,type){
    return axios({
        url: `/api/${dataPropEnum[type].whseTableName}/page/include/supp`,
        method: "get",
        params:params
    })
}


// 获取未入分页数据
export function fetchPurYarnForSampleDataListByPage(params, type){
    return axios({
        url: `/api/${dataPropEnum[type].purSamDtlaTableName}/includeAll/page`,
        method: "get",
        params:params
    })
}

// 通过样品通知单号获取入仓数据
export function fetchWhseInDataListBySamNote(samNote, type){
    return axios({
        url: `/api/${dataPropEnum[type].whseDtlaTableName}/list/bySamNote/${samNote}`,
        method: "get",
    })  
}

// 新增纱线入仓主表数据
export function addWhseYarnInData(data,type){
    return axios({
        url: `/api/${dataPropEnum[type].whseTableName}/v2.0/save`,
        method: "post",
        data: data,
    })
}

export function updateWhseYarnInData(data,type){
    return axios({
        url: `/api/${dataPropEnum[type].whseTableName}/v2.0/updateById`,
        method: "put",
        data: data,
    })
}

export function removeWhseYarnInData(params,type){
    return axios({
        url: `/api/${dataPropEnum[type].whseTableName}/v1.0/removeByIds`,
        method: "delete",
        params: params,
    })
}


// 批量新增纱线入仓明细数据
export function batchSaveOrUpdateDtlDataList(data, type){
    return axios({
        url: `/api/${dataPropEnum[type].whseDtlaTableName}/batch/saveOrUpdate`,
        method: "post",
        data: data,
    })
}

// 批量新增入仓货位明细数据
export function batchSaveOrUpdateDtlaDataList(data, type){
    return axios({
        url: `/api/${dataPropEnum[type].whseDtlbTableName}/batch/saveOrUpdate`,
        method: "post",
        data: data,
    })
}

// 批量删除货位码明细数据
export function batchRemoveDtlaDataById(data, type){
    return axios({
        url: `/api/${dataPropEnum[type].whseDtlbTableName}/batch/removeByIds`,
        method: "post",
        data: data,
    })
}


// 根据纱线入仓id获取明细数据和货位码数据
export function fetchWhseYarnInDtlAndDtlaData(params,type){
    return axios({
        url: `/api/${dataPropEnum[type].whseDtlaTableName}/list/include/dtla`,
        method: "get",
        params: params
    })
}



// 入仓审核检测
export function fetchExamineValid(whseMaterOid,type){
    return axios({
        url: `/api/${dataPropEnum[type].whseTableName}/valid/examine/${whseMaterOid}`,
        method: "get",
    })
}

