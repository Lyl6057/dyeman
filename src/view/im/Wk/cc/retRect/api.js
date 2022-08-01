/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 10:09:35
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-01 14:03:51
 */
import axios from "axios";

// 获取分页数据
export function fetchRetRectDataByPage(params){
    return axios({
        url: "/api/whseRetreat/page",
        method: "get",
        params:params
    })
}

// 新增数据
export function addRetRectData(data){
    return axios({
        url: "/api/whseRetreat",
        method: "post",
        data:data
    })
}

// 修改数据
export function updateRetRectData(data){
    return axios({
        url: "/api/whseRetreat",
        method: "put",
        data:data
    })
}


// 删除数据
export function removeRetRectById(whseRetreatoid){
    return axios({
        url: "/api/whseRetreat",
        method: "delete",
        params:{whseRetreatoid}
    })
}


// 根据主表id获取明细数据
export function fetchRetReatDtlDataByOid(params){
    return axios({
        url: "/api/whseRetreatDtl/list",
        method: "get",
        params:params
    })
}



// 退纱通知单分页数据获取
export function fetchPurReturnMemoDataByPage(params){
    return axios({
        url: "/api/whseRetreatDtl/return/meno/page",
        method: "get",
        params:params
    })
}

// 根据退货通知单编号获取入库数据
export function fetchWhseYarninByRemeoNo(remeoNo){
    return axios({
        url: "/api/whseRetreatDtl/whse/yarn/in/dtl/list/" + remeoNo,
        method: "get",
    })
}

// 批量新增明细数据
export function batchAddOrUpdateRetReatDtlData(dataList){
    return axios({
        url: "/api/whseRetreatDtl/batch/addOrUpdate",
        method: "post",
        data: dataList
    })
}

// 批量新增货位明细数据
export function batchAddOrUpdateRetReatDtlaData(dataList){
    return axios({
        url: "/api/whseRetreatDtla/v1.0/batch/save",
        method: "post",
        data: dataList
    })
}

// 批量删除货位明细数据
export function batchRemoveDtlaById(oids){
    return axios({
        url: "/api/whseRetreatDtla/v1.0/batch/removeById",
        method: "post",
        data: oids
    })
}

// 检验出仓数据
export function fetchValidOutWeight({dataList, params}){
    return axios({
        url: "/api/viewYarnStock/valid/outStock",
        method: "post",
        data: dataList,
        params: params
    })
}

// 审核数据
export function fetchExamineDataById(id,_this){
    return axios({
        url: `/api/whseRetreat/valid/data/${id}`,
        method: "put",
      
    })
}