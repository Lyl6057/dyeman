/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-29 17:22:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-07-01 09:43:15
 */
import axios from "axios";

export function fetchUnWhseInByPage(params){
    return axios({
        url: "/api/proClothStkinMemo/unInWhse/page",
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


// 根据通知单主id 修改对应的票布状态  cloth_status 为 2
export function updateNoteClothStatus2(params){
    return axios({
        url: "/api/proClothStkinMemo/update/clothStatus",
        method: "post",
        params: params
    })
}