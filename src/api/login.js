import request from '@/utils/request'

let BASEPATH = "/asdc-admin"

export function login(username, password) {
    return request({
        url: BASEPATH + '/admin/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

export function getInfo() {
    return request({
        url: BASEPATH + '/admin/info',
        method: 'get',
    })
}

export function logout() {
    return request({
        url: BASEPATH + '/admin/logout',
        method: 'post'
    })
}

export function fetchList(params) {
    return request({
        url: BASEPATH + '/admin/list',
        method: 'get',
        params: params
    })
}

export function createAdmin(data) {
    return request({
        url: BASEPATH + '/admin/register',
        method: 'post',
        data: data
    })
}

export function updateAdmin(id, data) {
    return request({
        url: BASEPATH + '/admin/update/' + id,
        method: 'post',
        data: data
    })
}

export function updateStatus(id, params) {
    return request({
        url: BASEPATH + '/admin/updateStatus/' + id,
        method: 'post',
        params: params
    })
}

export function deleteAdmin(id) {
    return request({
        url: BASEPATH + '/admin/delete/' + id,
        method: 'delete'
    })
}

export function getRoleByAdmin(id) {
    return request({
        url: BASEPATH + '/admin/role/' + id,
        method: 'get'
    })
}

export function allocRole(data) {
    return request({
        url: BASEPATH + '/admin/role/update',
        method: 'post',
        data: data
    })
}