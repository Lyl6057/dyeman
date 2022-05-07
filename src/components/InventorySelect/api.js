/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:58
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-05 14:02:59
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

