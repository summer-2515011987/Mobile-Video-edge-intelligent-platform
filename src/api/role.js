import request from '@/utils/request'

let BASEPATH = "/asdc-admin"

export function fetchList(params) {
    return request({
        url: BASEPATH +  '/role/list',
        method: 'get',
        params: params
    })
}

export function createRole(data) {
    return request({
        url: BASEPATH +  '/role/create',
        method: 'post',
        data: data
    })
}

export function updateRole(id, data) {
    return request({
        url: BASEPATH +  '/role/update/' + id,
        method: 'post',
        data: data
    })
}

export function updateStatus(id, params) {
    return request({
        url: BASEPATH +  '/role/updateStatus/' + id,
        method: 'post',
        params: params
    })
}

export function deleteRole(data) {
    return request({
        url: BASEPATH + '/role/delete',
        method:'delete',
        data:data
    })
}

export function fetchAllRoleList() {
    return request({
        url: BASEPATH +  '/role/listAll',
        method: 'get'
    })
}

export function listMenuByRole(roleId) {
    return request({
        url: BASEPATH +  '/role/listMenu/'+roleId,
        method: 'get'
    })
}

export function listResourceByRole(roleId) {
    return request({
        url: BASEPATH +  '/role/listResource/'+roleId,
        method: 'get'
    })
}

export function allocMenu(data) {
    return request({
        url: BASEPATH +  '/role/allocMenu',
        method: 'post',
        data:data
    })
}

export function allocResource(data) {
    return request({
        url: BASEPATH +  '/role/allocResource',
        method: 'post',
        data:data
    })
}