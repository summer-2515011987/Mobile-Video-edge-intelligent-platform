import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/table";



export function createData(data) {
    return request({
        url: BASEPATH + '/create',
        method: 'post',
        data: data
    })
}

export function updateData(id, data) {
    return request({
        url: BASEPATH + '/update/' + id,
        method: 'post',
        data: data
    })
}


export function fetchList(params) {
    return request({
        url: BASEPATH + '/getTableList' ,
        method: 'get',
        params: params
    })
}

export function deleteTable(id) {
    return request({
        url: BASEPATH + '/delete/' + id,
        method: 'get',
    })
}

export function getDbList() {
    return request({
        url: BASEPATH + '/getDbList' ,
        method: 'get',
    })
}


export function getUserList() {
    return request({
        url: BASEPATH + '/getUserList' ,
        method: 'get',
    })
}


export function getDataUrlInfo() {
    return request({
        url: BASEPATH + '/getDataUrlInfo' ,
        method: 'get',
    })
}

export function createTable(tablename, data) {
    return request({
        url: BASEPATH + '/createTable/' + tablename,
        method: 'post',
        data: data,
    })
}


export function searchColumns(tablename) {
    return request({
        url: BASEPATH + '/searchColumns/'+tablename ,
        method: 'get',
    })
}


export function changeTable(tablename, data) {
    return request({
        url: BASEPATH + '/changeTable/' + tablename,
        method: 'post',
        data: data,
    })
}

export default {
    createData,
    updateData,
    fetchList,
    deleteTable,
    getDbList,
    getUserList,
    getDataUrlInfo,
    createTable,
    searchColumns,
    changeTable
}