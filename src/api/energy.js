import axios from 'axios'

export function eneBusiness(query) {
    return axios({
        url: '/api/eneBusiness',
        method: 'get',
        params: query
    })
}

export function getPositionList() {
    return axios({
        url: '/api/getPositionList',
        method: 'get',
    })
}