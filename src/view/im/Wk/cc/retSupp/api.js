/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-04-12 10:09:35
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-01 14:29:46
 */
import axios from "axios";

// 获取分页数据
export function fetchRetRectDataByPage(params,_this){
    return axios({
        // url: `/api/whseRetsuppaccessories/page`,
        url: `/api/${_this.moduleParams.mainApiBaseKey}/page`,
        method: "get",
        params:params
    })
}

// 新增数据
export function addRetRectData(data,_this){
    return axios({
        // url: "/api/whseRetsuppaccessories",
        url: `/api/${_this.moduleParams.mainApiBaseKey}`,
        method: "post",
        data:data
    })
}

// 修改数据
export function updateRetRectData(data,_this){
    return axios({
        // url: "/api/whseRetsuppaccessories",
        url: `/api/${_this.moduleParams.mainApiBaseKey}`,
        method: "put",
        data:data
    })
}


// 删除数据
export function removeRetRectById(params,_this){
    return axios({
        // url: "/api/whseRetsuppaccessories",
        url: `/api/${_this.moduleParams.mainApiBaseKey}`,
        method: "delete",
        params:params
    })
}


// 退纱通知单分页数据获取
export function fetchPurReturnMemoDataByPage(params){
    return axios({
        url: "/api/whseRetsuppaccessories/category/return/memo/page",
        method: "get",
        params:params
    })
}

// 根据主表id获取明细数据
export function fetchRetReatDtlDataByOid(params,_this){
    return axios({
        // url: "/api/whseRetsuppaccessoriesDtl/list",
        url: `/api/${_this.moduleParams.dtlApiBaseKey}/list`,
        method: "get",
        params:params
    })
}


// 根据退货通知单编号获取入库数据
export function fetchWhseYarninByRemeoNo(remeoNo,_this){
    return axios({
        // url: "/api/whseRetsuppaccessoriesDtl/dtl/list/" + remeoNo,
        url: `/api/${_this.moduleParams.dtlApiBaseKey}/dtl/list/${remeoNo}`,
        method: "get",
    })
}

// 批量新增明细数据
export function batchAddOrUpdateRetReatDtlData(dataList,_this){
    return axios({
        // url: "/api/whseRetsuppaccessoriesDtl/batch/addOrUpdate",
        url: `/api/${_this.moduleParams.dtlApiBaseKey}/batch/addOrUpdate`,
        method: "post",
        data: dataList
    })
}

// 检验出仓数据
export function fetchValidOutWeight({dataList, params}, _this){
    return axios({
        url: `/api/${_this.moduleParams.stockKey}/valid/outStock`,
        method: "post",
        data: dataList,
        params: params,
    })
}

// 审核数据
export function fetchExamineDataById(id,_this){
    return axios({
        url: `/api/${_this.moduleParams.mainApiBaseKey}/valid/data/${id}`,
        method: "put",
      
    })
}
