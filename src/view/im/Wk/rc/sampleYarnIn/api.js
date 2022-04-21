/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-21 08:34:31
 */

import axios from "axios";


// 获取本厂退纱列表数据
export function fetchWhseYarnInDataListByPage(params){
    return axios({
        url: "/api/whseYarnin/v1.0/listByPage",
        method: "get",
        params:params
    })
}


// 获取未入分页数据
export function fetchPurYarnForSampleDataListByPage(params){
    return axios({
        url: "/api/purYarnforsampleDtl/v2.0/listByPage",
        method: "get",
        params:params
    })
}

// 通过样纱通知单号获取入仓数据
export function fetchYarnForSampleDataByNote(params){
    return axios({
        url: "/api/purYarnforsampleDtl/v2.0/list/byYarnForSampleNote",
        method: "get",
        params:params
    })  
}

// 新增纱线入仓主表数据
export function addWhseYarnInData(data){
    return axios({
        url: "/api/whseYarnin/v2.0/save",
        method: "post",
        data: data,
    })
}

export function updateWhseYarnInData(data){
    return axios({
        url: "/api/whseYarnin/v2.0/updateById",
        method: "put",
        data: data,
    })
}

export function removeWhseYarnInData(params){
    return axios({
        url: "/api/whseYarnin/v2.0/removeById",
        method: "delete",
        params: params,
    })
}


// 批量新增纱线入仓明细数据
export function batchSaveOrUpdateDtlDataList(data){
    return axios({
        url: "/api/whseYarninDtl/v1.0/batch/saveOrUpdate",
        method: "post",
        data: data,
    })
}

// 批量新增入仓货位明细数据
export function batchSaveOrUpdateDtlaDataList(data){
    return axios({
        url: "/api/whseYarninDtla/v1.0/batch/saveOrUpdate",
        method: "post",
        data: data,
    })
}

// 批量删除货位码明细数据
export function batchRemoveDtlaDataById(data){
    return axios({
        url: "/api/whseYarninDtla/v1.0/batch/removeById",
        method: "post",
        data: data,
    })
}


// 根据纱线入仓id获取明细数据和货位码数据
export function fetchWhseYarnInDtlAndDtlaData(params){
    return axios({
        url: "/api/whseYarninDtl/v1.0/list/include/dtla",
        method: "get",
        params: params
    })
}



// 入仓审核检测
export function fetchExamineValid(data){
    return axios({
        url: "/api/whseYarnin/v1.0/valid/examine",
        method: "post",
        data:data
    })
}

