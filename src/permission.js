import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

const whiteList = [ '/setLogin'] // 不重定向白名单
// 全局路由钩子
router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('loginName')) {
        if (to.path === "/setLogin"){
            NProgress.done();
            next({ path: '/sysadmin' });
        }else {
            NProgress.done();
            next();
        }
    } 
    else {
        if (whiteList.indexOf(to.path) !== -1) {
            NProgress.done();
            next();
        } else {
            NProgress.done();
            next('/setLogin');
        }
    }
})

router.afterEach(() => {
    NProgress.done();
})