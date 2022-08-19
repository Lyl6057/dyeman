/*
 * @Description: 载具整理
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-17 11:23:46
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-17 11:27:47
 */


import axios from "axios";


// 根据单号获取布票数据
export function fetchNoteDataByCode(params){
    return axios({
        url: "/api/whseVehicleLocation/noteCode/byCode",
        method: "get",
        params: params
    })
}

// 批量修改布票台账的载具编号
export function batchUpdateNoteStoreLoadCode(data){
    return axios({
        url: "/api/whseVehicleLocation/batch/update/note/storeLoadCode",
        method: "post",
        data: data
    })
}

// 获取胚布整理数据
export function fetchNoteSeitDataByPage(params){
    return axios({
        url: "/api/whseVehicleOrganize/page",
        method: "get",
        params: params
    })
}
