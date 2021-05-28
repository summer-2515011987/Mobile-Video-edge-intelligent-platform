import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import Config from './Config'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/css/common.css";
import 'iview/dist/styles/iview.css';    // 使用 CSS

import JSEncrypt from 'jsencrypt';
import moment from 'moment' //时间处理插件
import '@/permission';

Vue.prototype.$getRsaCode = JSEncrypt
Vue.config.productionTip = false
Vue.prototype.Config = Config;  // 挂载配置
Vue.prototype.moment = moment;

Vue.use(ElementUI)  /* 注册El组件 */

new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
})
