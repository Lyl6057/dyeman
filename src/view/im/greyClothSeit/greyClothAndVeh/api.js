

import axios from "axios";


// 根据单号获取布票数据
export function fetchNoteDataByCode(params){
    return axios({
        url: "/api/whseClothVehicle/noteCode/byCode",
        method: "get",
        params: params
    })
}

// 批量修改布票台账的载具编号
export function batchUpdateNoteStoreLoadCode(data){
    return axios({
        url: "/api/whseClothVehicle/batch/update/note/storeLoadCode",
        method: "post",
        data: data
    })
}

// 获取胚布整理数据
export function fetchNoteSeitDataByPage(params){
    return axios({
        url: "/api/whseClothOrganize/page",
        method: "get",
        params: params
    })
}
