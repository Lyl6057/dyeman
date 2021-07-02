import axios from "axios";

// 颜色管理
export function getLabTapcolor(params) {
  return axios({
    url: "/api/labTapcolor/page",
    method: "get",
    params: params
  });
}

export function addLabTapcolor(params) {
  return axios({
    url: "/api/labTapcolor",
    method: "post",
    params: params
  });
}
export function updateLabTapcolor(params) {
  return axios({
    url: "/api/labTapcolor",
    method: "put",
    params: params
  });
}
export function delLabTapcolor(id) {
  return axios({
    url: "/api/labTapcolor?labTapcoloroid=" + id,
    method: "delete"
  });
}
// 代码表
export function getDepth(params) {
  return axios({
    url: "/api/codeValue",
    method: "post",
    params: params
  });
}

// 获取色号流水号
export function getCodeSupply(params) {
  return axios({
    url: "/api/singleCodeSupply?code=color_num",
    method: "get"
  });
}
