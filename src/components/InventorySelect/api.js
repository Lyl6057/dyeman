/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:58
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-10 15:06:44
 */

import axios from "axios";
import { matTypeEnum } from "./data"

export function fetchInventoryDataByPage(params, data, type){
    return axios({
        url: `/api/${matTypeEnum[type].stockTableName}/filter/page`,
        method: "post",
        params: params,
        data: data,
    })
}

// 检验出仓数据
export function fetchValidOutWeight(dataList, type){
    return axios({
        url: `/api/${matTypeEnum[type].stockTableName}/valid/outStock`,
        method: "post",
        data: dataList
    })
}