/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-09-02 09:28:45
 */

import axios from "axios";


// 通过布料外键检验缸号是否已存在
export function fetchValidVatNo(data){
    return axios({
        url: "/api/proFinishStkinMemoDtl/valid/vatNo",
        method: "post",
        data: data
    })
}

// 新增主数据
export function addStkinMemoData(data){
    return axios({
        url: "/api/proFinishStkinMemo",
        method: "post",
        data: data
    })
}

export function updateStkinMemoData(data){
    return axios({
        url: "/api/proFinishStkinMemo",
        method: "put",
        data: data
    })
}

export function delterStkinMemoData(params){
    return axios({
        url: "/api/proFinishStkinMemo",
        method: "delete",
        params: params,
    })
}

// 获取胚布入仓通知单数据
export function fetchproFinishStkinMemeByPage(params){
    return axios({
        url: "/api/proFinishStkinMemo/includeWeight/page",
        method: "get",
        params: params
    })
}

// 获取未入仓的胚布资料
export function fetchUnStoreClothByPage(params){
    return axios({
        url: "/api/proFinishStkinMemoDtl/unStore/page",
        method: "get",
        params: params
    })
}

// 通过载具获取对应的明细数据
export function fetchStkinMemoDataByVatNos(params){
    return axios({
        url: "/api/proFinishStkinMemoDtl/whole/data/byVatNo",
        method: "get",
        params: params
    })
}

// 通过主键获取对应的明细数据
export function fetchStkinMemoDataByStkinOid(params){
    return axios({
        url: "/api/proFinishStkinMemoDtl/whole/data/byStkinId",
        method: "get",
        params: params
    })
}



// 批量新增明细数据
export function batchSaveOrUpDate(data){
    return axios({
        url: "/api/proFinishStkinMemoDtl/batch/saveOrUpdate",
        method: "post",
        data: data
    })
}


