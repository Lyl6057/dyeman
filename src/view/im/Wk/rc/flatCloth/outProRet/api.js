/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 08:21:45
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-10 16:07:26
 */

import axios from "axios";



// 获取未入仓分页数据
export function fetchProCollarAccDataByPage(params){
    return axios({
        url: "/api/proCollarAccount/page",
        method: "get",
        params:params
    })
}

// 获取分页数据
export function fetchWhseInFlatDataByPage(params){
    return axios({
        url: "/api/whseFlatClothIn/page",
        method: "get",
        params:params
    })
}

// 数据审核
export function fetchDataExamine(whseFlatClothInoid){
    return axios({
        url: "/api/whseFlatClothIn/examine/" + whseFlatClothInoid,
        method: "get",
    })
}

// 获取收货台账明细数据
export function fetchCollarAccDtlDataByList(params){
    return axios({
        url: "/api/proCollarAccountDtl/list",
        method: "get",
        params:params
    })
}


// 获取明细数据
export function fetchWhseInFlatDtlDataByList(params){
    return axios({
        url: "/api/whseFlatClothInDtl/include/other/list",
        method: "get",
        params:params
    })
}


// 删除收货数据
export function removeWhseInFlatById(id){
    return axios({
        url: "/api/whseFlatClothIn",
        method: "delete",
        params: {id}
    })
}

// 生成台账数据
export function addWhseInFlatData(data){
    return axios({
        url: "/api/whseFlatClothIn",
        method: "post",
        data: data,
    })
}

// 修改台账数据
export function updateWhseInFlatData(data){
    return axios({
        url: "/api/whseFlatClothIn",
        method: "put",
        data: data,
    })
}

// 批量新增或修改
export function batchSaveOrUpdateData(dataList){
    return axios({
        url: "/api/whseFlatClothInDtl/batch/saveOrUpdate",
        method: "post",
        data: dataList,
    })
}

// 批量删除
export function batchDelDtlDataById(ids){
    return axios({
        url: "/api/whseFlatClothInDtl/batch/removeByIds",
        method: "post",
        data: ids,
    })
}

