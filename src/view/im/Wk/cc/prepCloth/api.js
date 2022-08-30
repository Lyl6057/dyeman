/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 08:21:45
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-30 14:21:34
 */

import axios from "axios";



export function fetchFinishPrepCloth(whsePrepClothSheetOid){
    return axios({
        url: "/api/whsePreclothSheet/finish/" + whsePrepClothSheetOid,
        method: "get",
    })
}


// 获取未入仓分页数据
export function fetchUnCreateByWhsePrep(params){
    return axios({
        url: "/api/whsePreclothSheet/unCreate/page",
        method: "get",
        params:params
    })
}

// 获取分页数据
export function fetchWhsePreclothSheetByPage(params){
    return axios({
        url: "/api/whsePreclothSheet/page",
        method: "get",
        params:params
    })
}


// 获取台账数据
export function fetchClothNoteDataList(params){
    return axios({
        url: "/api/proClothNote/v2/list/byWeaveJobCode",
        method: "get",
        params:params
    })
}


// 获取明细数据
export function fetchWhseInFlatDtlDataByList(params){
    return axios({
        url: "/api/whsePreclothSheetDtl/include/other/list",
        method: "get",
        params:params
    })
}



// 生成备布单数据
export function addWhsePreclothSheet(data){
    return axios({
        url: "/api/whsePreclothSheet",
        method: "post",
        data: data,
    })
}

// 修改备布单数据
export function updateWhsePreclothSheet(data){
    return axios({
        url: "/api/whsePreclothSheet",
        method: "put",
        data: data,
    })
}



// 批量新增或修改
export function batchSaveOrUpdateData(dataList){
    return axios({
        url: "/api/whsePreclothSheetDtl/batch/saveOrUpdate",
        method: "post",
        data: dataList,
    })
}

// 批量删除
export function batchDelDtlDataById(ids){
    return axios({
        url: "/api/whsePreclothSheetDtl/batch/removeByIds",
        method: "post",
        data: ids,
    })
}

