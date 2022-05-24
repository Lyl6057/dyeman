/*
 * @Author: Lyl
 * @Date: 2021-11-16 10:39:54
 * @LastEditors: Lyl
 * @LastEditTime: 2022-05-24 14:39:57
 * @Description:
 */
import axios from "axios";


// 检验设备出仓数据
export function fetchEquipmentValidOutWeight(dataList) {
  return axios({
    url: "/api/viewEquipmentStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

// 检验能源出仓数据
export function fetchEnergValidOutWeight(dataList) {
  return axios({
    url: "/api/viewOfficeStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

// 检验行政出仓数据
export function fetchOfficeValidOutWeight(dataList) {
  return axios({
    url: "/api/viewOfficeStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

// 检验五金出仓数据
export function fetchHardwareValidOutWeight(dataList) {
  return axios({
    url: "/api/viewHardwareStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

// 检验颜料出仓数据
export function fetchDyesalValidOutWeight(dataList) {
  return axios({
    url: "/api/viewDyestuffStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

// 检验纱线出仓数据
export function fetchChemicalValidOutWeight(dataList) {
  return axios({
    url: "/api/viewChemicalStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

// 检验纱线出仓数据
export function fetchYarnValidOutWeight(dataList) {
  return axios({
    url: "/api/viewYarnStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

// 检验生产辅料出仓数据
export function fetchAccessoricesValidOutWeight(dataList) {
  return axios({
    url: "/api/viewAccessoriesStock/valid/outStock",
    method: "post",
    data: dataList
  });
}

export function updateSglyd(params) {
  return axios({
    url: "/api/purSingle",
    method: "put",
    params: params
  });
}

export function getSglydmx(params) {
  return axios({
    url: "/api/purSingleDtl",
    method: "get",
    params: params
  });
}

export function getLydmx(params) {
  return axios({
    url: "/api/purApplicationDtl",
    method: "get",
    params: params
  });
}

export function getHgylStock(params) {
  return axios({
    url: "/api/viewChemicalStock",
    method: "get",
    params: params
  });
}
