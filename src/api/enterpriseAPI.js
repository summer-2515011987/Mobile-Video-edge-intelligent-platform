import request from '@/utils/request'
const API_DELETEDATA = "/enterprise/delete/";
const API_CREATEDATA = "/enterprise/create";
const API_UPDATEDATA = "/enterprise/update/";
let BASEPATH = "/asdc-datamanage"

export function deleteEnterprise(id) {
    return request({
        url: BASEPATH + API_DELETEDATA+id,
        method: 'get',
        params: null
    })
}
export function updateEnterprise(id,data) {
    return request({
        url: BASEPATH + API_UPDATEDATA+id,
        method: 'post',
        data: data
    })
}
export function addEnterprise(data) {
    return request({
        url: BASEPATH + API_CREATEDATA,
        method: 'post',
        data: data
    })
}


