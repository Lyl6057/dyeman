/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 08:21:45
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-08 10:00:29
 */

import axios from "axios";



// 获取分页数据
export function fetchProCollarAccDataByPage(params){
    return axios({
        url: "/api/proCollarAccount/page",
        method: "get",
        params:params
    })
}

// 获取未生成收货台账数据
export function fetchUnCreateDataPage(params){
    return axios({
        url: "/api/proCollarAccount/unCreate/page",
        method: "get",
        params:params
    })
}

// 台账数据审核
export function fetchDataExamine(proCollarAccoutOid){
    return axios({
        url: "/api/proCollarAccount/examine/" + proCollarAccoutOid,
        method: "get",
    })
}


// 获取明细数据
export function fetchCollarAccDtlDataByList(params){
    return axios({
        url: "/api/proCollarAccountDtl/list",
        method: "get",
        params:params
    })
}

// 数据抽取
export function fetchCollarAccDtlBySalPoNo(salPoNo){
    return axios({
        url: "/api/proCollarAccountDtl/extract/weaveJob",
        method: "get",
        params:{salPoNo}
    })
}

// 删除收货数据
export function removeProCollarAccById(id){
    return axios({
        url: "/api/proCollarAccount",
        method: "delete",
        params: {id}
    })
}

// 生成台账数据
export function addCollarAccountData(data){
    return axios({
        url: "/api/proCollarAccount",
        method: "post",
        data: data,
    })
}

// 修改台账数据
export function updateCollarAccountData(data){
    return axios({
        url: "/api/proCollarAccount",
        method: "put",
        data: data,
    })
}

// 批量新增或修改
export function batchSaveOrUpdateData(dataList){
    return axios({
        url: "/api/proCollarAccountDtl/batch/saveOrUpdate",
        method: "post",
        data: dataList,
    })
}

// 批量删除
export function batchDelDtlDataById(ids){
    return axios({
        url: "/api/proCollarAccountDtl/batch/removeByIds",
        method: "post",
        data: ids,
    })
}

