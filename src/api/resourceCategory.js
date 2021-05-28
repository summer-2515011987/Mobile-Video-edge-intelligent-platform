import request from '@/utils/request'

let BASEPATH = "/asdc-admin"

/**
 * 查询所有资源分类
 * @return
 */
export function listAllCate() {
  return request({
    url: BASEPATH + '/resourceCategory/listAll',
    method: 'get'
  })
}

/**
 * 创建资源分类
 * @param data 分类数据
 * @return
 */
export function createResourceCategory(data) {
  return request({
    url: BASEPATH + '/resourceCategory/create',
    method: 'post',
    data: data
  })
}

/**
 * 修改资源分类
 * @param id 分类ID
 * @param data 分类数据
 * @returns
 */
export function updateResourceCategory(id, data) {
  return request({
    url: BASEPATH + '/resourceCategory/update/' + id,
    method: 'post',
    data: data
  })
}

/**
 * 删除一个资源分类
 * @param id 分类ID
 * @returns
 */
export function deleteResourceCategory(id) {
  return request({
    url: BASEPATH + '/resourceCategory/delete/' + id,
    method: 'post'
  })
}

/**
 * 获取资源分类与授权服务器配置关系
 * @param clientId 授权服务器ID
 * @param params 查询数据需要包含分页数据
 */
export function fetchOauthClientAndResourceCategoryList(clientId, params){

  return request({
    url:BASEPATH + '/resourceCategory/fetchOauthClientAndResourceCategoryList/' + clientId,
    method: 'get',
    params : params
  });
}

/**
 * 添加授权服务器与资源分类关系
 * @param resourceCategoryId 资源分类ID
 * @param oauthClientId 授权服务器id
 */
export function createOauthClientAndResourceCategory(resourceCategoryId, oauthClientId){

  const data ={
    resourceCategoryId: resourceCategoryId,
    oauthClientId: oauthClientId
  };

  return request({
    url:BASEPATH + '/resourceCategory/createResourceCategoryOauthClientRelation',
    method: 'POST',
    data : data
  });

}

/**
 * 删除授权服务器与资源
 *
 * @param id
 */
export function deleteOauthClientAndResourceCategory(id){

  return request({
    url:BASEPATH + '/resourceCategory/deleteResourceCategoryOauthClientRelation/' + id,
    method: 'DELETE'
  });

}