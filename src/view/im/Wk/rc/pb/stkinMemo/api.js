/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-06-29 17:22:33
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-06-30 11:23:29
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