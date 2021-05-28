import { asyncRouterMap, constantRouterMap } from '@/router/index';

//对菜单进行排序
function sortRouters(accessedRouters) {
    for (let i = 0; i < accessedRouters.length; i++) {
        let router = accessedRouters[i];
        if(router.children && router.children.length > 0){
            router.children.sort(compare("sort"));
        }
    }
    accessedRouters.sort(compare("sort"));
}

//降序比较函数
function compare(p){
    return function(m,n){
        let a = m[p];
        let b = n[p];
        return b - a;
    }
}

const permission = {
    state: {
        routers: constantRouterMap.concat(asyncRouterMap),
    },
};

export default permission;