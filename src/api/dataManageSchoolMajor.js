import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/schoolMajor";



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
        url: BASEPATH + '/getSchoolMajorList' ,
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

export default {
    createData,
    updateData,
    fetchList,
    deleteTable
}