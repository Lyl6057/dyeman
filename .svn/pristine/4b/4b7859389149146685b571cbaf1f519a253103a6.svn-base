import axios from 'axios'

let Axios = axios.create({
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9',
    'Content-Type': 'application/json'
  }
})

const urlPath = 'http://10.0.168.127:8091';
export const http = {
  post: (params, path) => {
    console.log(path);
    return Axios({
      method: 'post',
      url: path,
      data: params,
    }).then(res => {
      return showcheckStatus(res)
    }).catch(err => {
      return showError(err)
    })
  },
  get: (params, path) => {
    console.log(path);
    return Axios({
      method: 'get',
      url: path,
      params: params
    }).then(res => {
      return res
    }).catch(err => {
      return err
    })
  },
}

function showcheckStatus(response) {
  return response
}

function showError(err) {
  util.showError(err.response.status)
  return err.response
}

export default ({
  Vue
}) => {
  // Vue.prototype.$http = http
  Vue.prototype.$axios = http
}
