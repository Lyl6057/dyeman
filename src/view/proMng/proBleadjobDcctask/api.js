import axios from 'axios';

export function getProBleadjobDcctask(params) {
  return axios({
    url: '/api/proBleadjobDcctask',
    method: 'get',
    params: params
  })
}

export function postProBleadjobDcctask(id) {
  return axios({
    url: '/api/proBleadjobDcctask?bleadJobFk=' + id,
    method: 'post',
  })
}

export function getProBleadjobDcctaskView(params) {
  return axios({
    url: "/api/proBleadjobDcctask/pageview",
    method: "get",
    params: params
  });
}

export function getproBleadyeJobPage(params) {
  return axios({
    url: '/api/proBleadjobDcctask/pageEx',
    method: 'get',
    params: params
  })
}

export function getProBleadyeJobTechargue(params) {
  return axios({
    url: '/api/proBleadyeJobTechargue',
    method: 'get',
    params: params
  })
}

export function getProBleadyeJobTechItem(params) {
  return axios({
    url: '/api/proBleadyeJobTechItem',
    method: 'get',
    params: params
  })
}

