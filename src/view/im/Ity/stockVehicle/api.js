/*
 * @Author: Lyl
 * @Date: 2021-03-24 14:21:09
 * @LastEditors: Lyl
 * @LastEditTime: 2022-07-06 13:41:06
 * @Description:
 */
import axios from "axios";

export function fetchStockVehicleByPage(params) {
  return axios({
    url: "/api/viewWmsTray/page",
    method: "get",
    params: params
  });
}

export function fetchNoteStockVehicleByPage(params) {
  return axios({
    url: "/api/viewWmsCalicoTray/page",
    method: "get",
    params: params
  });
}
