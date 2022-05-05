/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-03 10:43:58
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-04 13:55:19
 */

import axios from "axios";


export function fetchInventoryDataByPage(params, data){
    return axios({
        url: "/api/viewYarnStock/filter/page",
        method: "post",
        params: params,
        data: data,
    })
}

