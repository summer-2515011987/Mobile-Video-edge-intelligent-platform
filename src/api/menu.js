import request from '@/utils/request'

let BASEPATH = "/asdc-admin"

export function fetchList(parentId, params) {
    return request({
        url: BASEPATH + '/menu/list/' + parentId,
        method: 'get',
        params: params
    })
}

export function deleteMenu(id) {
    return request({
        url: BASEPATH + '/menu/delete/' + id,
        method: 'delete'
    })
}

export function createMenu(data) {
    return request({
        url: BASEPATH + '/menu/create',
        method: 'post',
        data: data
    })
}

export function updateMenu(id, data) {
    return request({
        url: BASEPATH + '/menu/update/' + id,
        method: 'post',
        data: data
    })
}

export function getMenu(id) {
    return request({
        url: BASEPATH + '/menu/' + id,
        method: 'get',
    })
}

export function updateHidden(id, params) {
    return request({
        url: BASEPATH + '/menu/updateHidden/' + id,
        method: 'post',
        params: params
    })
}

export function fetchTreeList() {
    return request({
        url: BASEPATH + '/menu/treeList',
        method: 'get'
    })
}