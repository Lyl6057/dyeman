/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 08:21:45
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-10 16:34:25
 */

import axios from "axios";

import { dataTyptEnum } from "./data"

// 获取分页数据
export function fetchWithDrawalListByPage(params,matType){
    return axios({
        url: `/api/${dataTyptEnum[matType].tableName}/page`,
        method: "get",
        params:params
    })
}

// 根据oid获取明细数据
export function fetchWithDrwarlDtlDataList(params,matType){
    return axios({
        url: `/api/${dataTyptEnum[matType].dtlTableName}/list`,
        method: "get",
        params:params
    })
}

// 新增退纱通知单
export function addWithDrawal(data,matType){
    return axios({
        url: `/api/${dataTyptEnum[matType].tableName}`,
        method: "post",
        data:data
    })
}

// 批量新增修改退纱通知单明细
export function batchAddOrUpdateDtl(dataList,matType){
    return axios({
        url: `/api/${dataTyptEnum[matType].dtlTableName}/batch/saveOrUpdate`,
        method: "post",
        data:dataList
    })
}
// 批量删除退纱通知单明细数据
export function batchDelDtlDataById(oids,matType){
    return axios({
        url: `/api/${dataTyptEnum[matType].dtlTableName}/batch/delete`,
        method: "post",
        data:oids
    })
}

// 修改退纱通知单
export function updateWithDrawal(data,matType){
    return axios({
        url: `/api/${dataTyptEnum[matType].tableName}`,
        method: "put",
        data:data
    })
}

// 删除数据
export function removeWithDrawalById(id,matType){
    return axios({
        url: `/api/${dataTyptEnum[matType].tableName}`,
        method: "delete",
        params: {id}
    })
}
