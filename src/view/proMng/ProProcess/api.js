/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-13 15:08:47
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-25 17:37:15
 */

import axios from "axios";


// 查询走货资料基础数据
export function fetchGstPoFData(params){
    return axios({
        url: "/api/gstPoprocess/page",
        method: "get",
        params: params
    });
}

// 根据走货资料外键获取进度数据
export function fetchProcessDataByF(params){
    return axios({
        url: "/api/gstPoprocess/list",
        method: "get",
        params: params
    });
}

// 批量新增进度明细数据
export function batchSaveDtlData(data){
    return axios({
        url: "/api/gstPoprocess/batch/saveOrUpdate",
        method: "post",
        data: data
    });
}

// 获取节点数据
export function fetchProcessData(){
    return axios({
        url: "/api/getcodeValue?codeTableId=GST_PROCESS_DATA_SET",
        method: "get",
    })
}

// 通过走货资料删除进度明细数据
export function  fetchDelDtlDataByGstDtlf(gstPoDltfOid){
    return axios({
        url: "/api/gstPoprocess/byDltFFk/" + gstPoDltfOid,
        method: "delete",
    })
}


