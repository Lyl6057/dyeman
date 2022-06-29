/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-29 08:33:24
 */

import axios from "axios";


// 新增主数据
export function addStkinMemoData(data){
    return axios({
        url: "/api/proClothStkinMemo",
        method: "post",
        data: data
    })
}

export function updateStkinMemoData(data){
    return axios({
        url: "/api/proClothStkinMemo",
        method: "put",
        data: data
    })
}

export function delterStkinMemoData(params){
    return axios({
        url: "/api/proClothStkinMemo",
        method: "delete",
        params: params,
    })
}

// 获取胚布入仓通知单数据
export function fetchProClothStkinMemeByPage(params){
    return axios({
        url: "/api/proClothStkinMemo/includeWeight/page",
        method: "get",
        params: params
    })
}

// 获取未入仓的胚布资料
export function fetchUnStoreClothByPage(params){
    return axios({
        url: "/api/proClothStkinMemoDtl/unStore/page",
        method: "get",
        params: params
    })
}

// 通过载具获取对应的明细数据
export function fetchStkinMemoDataByStoreLoadCode(params){
    return axios({
        url: "/api/proClothStkinMemoDtl/whole/data/byStoreLoadCode",
        method: "get",
        params: params
    })
}

// 通过主键获取对应的明细数据
export function fetchStkinMemoDataByStkinOid(params){
    return axios({
        url: "/api/proClothStkinMemoDtl/whole/data/byStkinId",
        method: "get",
        params: params
    })
}



// 批量新增明细数据
export function batchSaveOrUpDate(data){
    return axios({
        url: "/api/proClothStkinMemoDtl/batch/saveOrUpdate",
        method: "post",
        data: data
    })
}


