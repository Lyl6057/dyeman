/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 16:43:52
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-06 10:31:05
 */

import axios from "axios";


// 获取数据
export function fetchSeitLocData(params){
    return axios({
        url: "/api/whseSeitlocation/page",
        method: "get",
        params: params
    })
}

// 通过主表oid获取明细数据
export function fetchDtlDataListByOid(seitLocId){
    return axios({
        url: `/api/whseSeitlocationDtla/list/bySeitLocId/${seitLocId}`,
        method: "get",
    })
}

export function saveSeitLocData(data){
    return axios({
        url: "/api/whseSeitlocation",
        method: "post",
        data: data
    })
}


export function updateSeitLocData(data){
    return axios({
        url: "/api/whseSeitlocation",
        method: "put",
        data: data
    })
}

export function removeSeitLocData(params){
    return axios({
        url: "/api/whseSeitlocation",
        method: "delete",
        params: params
    })
}

// 批量新增明细数据
export function batchSaveOrUpdateDtla(dataList){
    return axios({
        url: "/api/whseSeitlocationDtla/batch/saveOrUpdate",
        method: "post",
        data: dataList
    })
}

// 批量新增明细货位数据
export function batchSaveOrUpdateDtlb(dataList){
    return axios({
        url: "/api/whseSeitlocationDtlb/batch/saveOrUpdate",
        method: "post",
        data: dataList
    })
}

// 批量删除明细数据
export function batchRemoveDtla(dataList){
    return axios({
        url: "/api/whseSeitlocationDtla/batch/removeById",
        method: "post",
        data: dataList
    })
}

// 批量删除明细货位数据
export function batchRemoveDtlb(dataList){
    return axios({
        url: "/api/whseSeitlocationDtlb/batch/removeById",
        method: "post",
        data: dataList
    })
}

// 货位整理
export function fetchLocationConfirm(type = '0', seitLocId){
    return axios({
        url: `/api/whseSeitlocation/location/confirm/${type}/${seitLocId}`,
        method: "get",
    })
}



// 检验出仓数据
export function fetchValidOutWeight(dataList, controllerName){
    return axios({
        url: `/api/${controllerName}/valid/outStock`,
        method: "post",
        data: dataList
    })
}