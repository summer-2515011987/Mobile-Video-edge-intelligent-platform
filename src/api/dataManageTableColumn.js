import request from '@/utils/request'
const BASEPATH="/asdc-datamanage/tableColumn";
const BASETYPEPATH="/asdc-datamanage/tableColumnType";


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
        url: BASEPATH + '/getTableColumnsList' ,
        method: 'get',
        params: params
    })
}

export function deleteTableColumn(id,data) {
    return request({
        url: BASEPATH + '/delete/' + id,
        method: 'post',
        data: data
    })
}


export function getTypeList() {
    return request({
        url: BASETYPEPATH + '/search' ,
        method: 'get',
    })
}

export function searchByDbId(params) {
    return request({
        url: BASEPATH + '/searchByDbId?dbId=' + params ,
        method: 'get',
    })
}

export function getTableValList(tablev,searchTableColumn) {
    let params = new URLSearchParams();
    params.append('tablename', tablev.tablename);
    params.append('dbId', tablev.dbId);
    params.append('pageNum', tablev.pageNum);
    params.append('pageSize', tablev.pageSize);
    params.append('searchTableColumn', JSON.stringify(searchTableColumn));
    return request({
        url: BASEPATH + '/getTableValListForPage'  ,
        method: 'post',
        params: params
    })
}

export function deleteTableVal(id,tableName) {
    let params = new URLSearchParams();
    params.append('tableName', tableName);
    params.append('id', id);
    return request({
        url: BASEPATH + '/deleteTableVal',
        method: 'post',
        params:params
    })
}
export function updatetableValData(tablename,tableColumnData) {
    let params = new URLSearchParams();
    let map = new Map();
    params.append('tableName', tablename);
    for (let val of tableColumnData) {
        map.set(val.key,val.value);
    }
    params.append('tableColumnData', JSON.stringify(map));

    return request({
        url: BASEPATH + '/updatetableValData',
        method: 'post',
        params:params
    })
}


export default {
    createData,
    updateData,
    fetchList,
    deleteTableColumn,
    getTypeList,
    searchByDbId,
    getTableValList,
    deleteTableVal,
    updatetableValData,
}