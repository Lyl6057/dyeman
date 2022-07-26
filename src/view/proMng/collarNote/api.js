import axios from "axios";

export function get(params) {
  return axios({
    url: "/api/proCollarNote/page",
    method: "get",
    params: params
  });
}

export function put(params) {
  return axios({
    url: "/api/proCollarNote",
    method: "put",
    params: params
  });
}

export function post(params) {
  return axios({
    url: "/api/proCollarNote",
    method: "post",
    params: params
  });
}

export function remove(collarId) {
  return axios({
    url: "/api/proCollarNote?collarId="+collarId,
    method: "delete",
  });
}

export function getZZ(params) {
  return axios({
    url: "/api/proWeaveJob/page",
    method: "get",
    params:params
  });
}





