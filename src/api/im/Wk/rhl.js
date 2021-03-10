import axios from 'axios';

export function getviPurchNostock(params) {
  return axios({
    url: '/api/whseChemicalin/viPurchNostock',
    method: 'get',
    params: params
  })
}