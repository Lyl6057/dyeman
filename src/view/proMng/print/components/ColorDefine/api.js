/*
 * @Description: 
 * @Version: 2.0
 * @Author: Symbol_Yang
 * @Date: 2022-08-12 09:26:23
 * @LastEditors: Symbol_Yang
 * @LastEditTime: 2022-08-12 11:06:34
 */
import axios from "axios";


export function fetchDict2Color(){
    return axios({
        url: "/api/getcodeValue?codeTableId=bas_colorclTepth",
        method: "get",
    })
}


export function fetchWeaveDcsByWeaveJobId(params){
    return axios({
        url: "/api/proWeaveJobDcs/list",
        method: "get",
        params: params,
      })
}

// 批保存
export function batchSaveWeaveDcsData(data){
    return axios({
        url: "/api/proWeaveJobDcs/batch/saveOrUpdate",
        method: "post",
        data: data,
      })
}











