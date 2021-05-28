import request from '@/utils/request'

let BASEPATH = "/asdc-auth"

/**
 * 获取公钥信息
 */
export function getPublicKey() {
    return request({
        url: BASEPATH + '/web/publicKey',
        method: 'get'
    });
}

/**
 * 获取授权服务配置集合
 * @param params 查询参数
 */
export function fetchList(params){
    return request({
        url: BASEPATH + '/clientConfig/list',
        method: 'get',
        params: params
    });
}


/**
 * 获取指定授权服务配置
 * @param clientId ID
 */
export function findById(clientId) {
    return request({
        url: BASEPATH + '/clientConfig/' + clientId,
        method: 'get'
    });
}

/**
 * 修改授权服务配置信息
 * @param clientId 授权ID
 * @param data 配置参数
 */
export function updateOauthClient(clientId, data){
    return request({
        url: BASEPATH + '/clientConfig/update/' + clientId,
        method: 'post',
        data: data
    });
}

/**
 * 创建授权服务器配置信息
 * @param data
 * @returns
 */
export function createOauthClient(data){
    return request({
        url: BASEPATH + '/clientConfig/create',
        method: 'post',
        data: data
    });
}

/**
 * 修改授权服务密码
 * @param clientId 授权ID
 * @param clientSecret 授权密码
 */
export function updateOauthClientSecret(clientId, clientSecret){
    return request({
        url: BASEPATH + '/clientConfig/update/' + clientId,
        method: 'post',
        params: {"clientSecret": clientSecret}
    });
}

/**
 * 删除一个授权服务配置
 * @param clientId
 * @returns
 */
export function removeOauthClient(clientId){

    return request({
        url: BASEPATH + '/clientConfig/remove/' + clientId,
        method: 'delete'
    });
}