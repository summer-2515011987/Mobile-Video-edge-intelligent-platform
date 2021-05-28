import request from '@/utils/request'

let BASEPATH = "/asdc-admin"

export function fetchList(params) {
    return request({
        url: BASEPATH + '/resource/list',
        method: 'get',
        params: params
    })
}

export function createResource(data) {
    return request({
        url: BASEPATH + '/resource/create',
        method: 'post',
        data: data
    })
}

export function updateResource(id, data) {
    return request({
        url: BASEPATH + '/resource/update/' + id,
        method: 'post',
        data: data
    })
}

export function deleteResource(id) {
    return request({
        url: BASEPATH + '/resource/delete/' + id,
        method: 'delete'
    })
}

export function fetchAllResourceList() {
    return request({
        url: BASEPATH + '/resource/listAll',
        method: 'get'
    })
}