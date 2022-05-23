/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-05-23 09:24:34
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-05-23 10:46:30
 */
import axios from "axios";


// 未出仓数据统计
export function fetchUnOutStockCountData(types){
    return axios({
        url: "/api/whseManage/unOutCount",
        method: "GET",
        params: {
            types,
        }
    })
}

// 未入仓数据统计
export function fetchUnInStockCountData(types){
    return axios({
        url: "/api/whseManage/unInCount",
        method: "GET",
        params: {
            types,
        }
    })
}




