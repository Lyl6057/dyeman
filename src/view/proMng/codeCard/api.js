/*
 * @Author: Lyl
 * @Date: 2021-08-07 07:57:55
 * @LastEditors: Lyl
 * @LastEditTime: 2021-08-07 14:46:57
 * @Description:
 */
import axios from "axios";

export function getWeave(params) {
  return axios({
    url: "/api/proWeaveJob",
    method: "get",
    params: params
  });
}

export function get(params) {
  return axios({
    url: "/api/proAppColorCard/page",
    method: "get",
    params: params
  });
}

// 新增
export function add(data) {
  return axios({
    url: "/api/proAppColorCard",
    method: "post",
    params: data
  });
}

// 修改
export function update(data) {
  return axios({
    url: "/api/proAppColorCard",
    method: "put",
    params: data
  });
}

// 修改
export function del(id) {
  return axios({
    url: "/api/proAppColorCard?cardId=" + id,
    method: "delete"
  });
}
