import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/position/info";
const ESPATH="/asdc-search/esProduct";

export function createData(data) {
    return request({
        url: BASEPATH + '/create',
        method: 'post',
        data: data
    })
}

export function updateData(data) {
    return request({
        url: ESPATH + "/update",
        //url: BASEPATH + '/update/' + id,
        method: 'post',
        data: data
    })
}


export function fetchList(params) {
    return request({
        url: ESPATH + "/search",
        //url: BASEPATH + '/getPositionInfoList' ,
        method: 'get',
        params: params
    })
}

export function deleteTableColumn(id) {
    return request({
        url: ESPATH + '/delete/' + id,
        //url: BASEPATH + '/delete/' + id,
        method: 'get',
    })
}


export function getTypeList() {
    return request({
        url: BASETYPEPATH + '/search' ,
        method: 'get',
    })
}


export default {
    createData,
    updateData,
    fetchList,
    deleteTableColumn,
    getTypeList,
}