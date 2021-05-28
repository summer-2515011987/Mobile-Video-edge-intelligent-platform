import request from '@/utils/request'

let BASEPATH = "/asdc-admin"

export function fetchList() {
    return request({
        url: BASEPATH + '/dict/query',
        method: 'post'
    })
}

export function fetchListById(dictId) {
    return request({
        url: BASEPATH + '/dict/querybyId/' + dictId,
        method: 'post'
    })
}

export function fetchDataList(dictId) {
    return request({
        url: BASEPATH + '/dict/queryByDictId/' + dictId,
        method: 'post'
    })
}

export function createDict(data) {
    return request({
        url: BASEPATH + '/dict/create',
        method: 'post',
        data: data
    })
}

export function updateDict(dictId,data) {
    return request({
        url: BASEPATH + '/dict/update/'+ dictId,
        method: 'post',
        data: data
    })
}

export function deleteDict(data) {
    return request({
        url: BASEPATH + '/dict/delete',
        method: 'delete',
        data: data
    })
}

export function fetchDataListByDictName(dictName) {
    return request({
        url: BASEPATH + '/dict/queryByName',
        method: 'get',
        params:{
            "name":dictName
        }
    })
}


export function createDatas(dictId,data) {
    return request({
        url: BASEPATH + '/dict/createDatas/'+ dictId,
        method: 'post',
        data: data
    })
}