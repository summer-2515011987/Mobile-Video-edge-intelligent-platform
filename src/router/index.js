import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export const asyncRouterMap = [
    {
        path: '/', 
        redirect: '/setLogin',
        hidden: true,
        component: () => import('../pages/login/setLogin')},
        
    {
        path: '/setLogin', //后台管理登录
        hidden: true,
        component: () => import('../pages/login/setLogin')},
    {
        path:'/sysadmin',
        component: () => import('@/pages/sysSettingMgnt/setMain'),
        redirect: '/sysadmin/node',
        name: 'sysadmin',
        meta: {title: '系统管理', icon: 'ums',isLeaf: false},
        children: [{
            path: 'node',
            name: 'node',
            component: () => import("@/pages/sysSettingMgnt/node/index"),
            meta: {title: '边缘节点', icon: 'ums-admin',isLeaf: true}
        },{
            path: 'nodedetail',
            name: 'nodedetail',
            component: () => import("@/pages/sysSettingMgnt/node/nodeDetail"),
            meta: {title: '边缘节点详情', icon: 'ums-admin',isLeaf: true}
        },{
            path: 'role',
            name: 'role',
            component: () => import("@/pages/sysSettingMgnt/role/index"),
            meta: {title: '应用列表', icon: 'ums-role',isLeaf: true}
        },{
            path: 'task',
            name: 'task',
            component: () => import("@/pages/sysSettingMgnt/xfTask/index"),
            meta: {title: '下发任务', icon: 'ums-admin',isLeaf: true}
        },{
            path: 'video',
            name: 'video',
            component: () => import("@/pages/sysSettingMgnt/video/index"),
            meta: {title: '视频源管理', icon: 'ums-admin',isLeaf: true}
        },{
            path: 'log',
            name: 'log',
            component: () => import("@/pages/sysSettingMgnt/log/index"),
            meta: {title: '日志管理', icon: 'ums-admin',isLeaf: true}
        },{
            path: 'result',
            name: 'result',
            component: () => import("@/pages/sysSettingMgnt/result/index"),
            meta: {title: '展示结果', icon: 'ums-admin',isLeaf: true}
        },{
            path: 'resultDetail',
            name: 'resultDetail',
            component: () => import("@/pages/sysSettingMgnt/result/detail"),
            meta: {title: '结果详情', icon: 'ums-admin',isLeaf: true}
        }]
    },
    {path: '*', redirect: '/404', hidden: true}
]


export const constantRouterMap = asyncRouterMap;//routersConfig;

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: asyncRouterMap//routersConfig
})
