/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-09 08:21:45
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-04-11 14:19:21
 */

import axios from "axios";


// 获取分页数据
export function fetchWithDrawalListByPage(params){
    return axios({
        url: "/api/proYarnsWithdrawal/v1.0/listByPage",
        method: "get",
        params:params
    })
}

// 根据oid获取明细数据
export function fetchWithDrwarlDtlDataList(params){
    return axios({
        url: "/api/proYarnsWithdrawalDtl/v1.0/list",
        method: "get",
        params:params
    })
}

// 新增退纱通知单
export function addWithDrawal(data){
    return axios({
        url: "/api/proYarnsWithdrawal/v1.0/save",
        method: "post",
        data:data
    })
}

// 批量新增修改退纱通知单明细
export function batchAddOrUpdateDtl(dataList){
    return axios({
        url: "/api/proYarnsWithdrawalDtl/v1.0/batch/saveOrUpdate",
        method: "post",
        data:dataList
    })
}
// 批量删除退纱通知单明细数据
export function batchDelDtlDataById(oids){
    return axios({
        url: "/api/proYarnsWithdrawalDtl/v1.0/batch/delete",
        method: "post",
        data:oids
    })
}

// 修改退纱通知单
export function updateWithDrawal(data){
    return axios({
        url: "/api/proYarnsWithdrawal/v1.0/updateById",
        method: "put",
        data:data
    })
}

// 删除数据
export function removeWithDrawalById(id){
    return axios({
        url: "/api/proYarnsWithdrawal/v1.0/removeById",
        method: "delete",
        params: {id}
    })
}


// 获取领纱数据
export function fetchRetYarnDataByPage(params){
    return axios({
        url: "/api/proYarnsWithdrawalDtl/v1.0/retYarn/listByPage",
        method: "get",
        params:params
    }) 
}

//  获取纱线库存数据
export function fetchYarnStockDataList(params){
    return axios({
        url: "/api/viewYarnStock/page",
        method: "get",
        params:params
    }) 
}
