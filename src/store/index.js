
import Vue from 'vue'
import Vuex from 'vuex'
import user from './moudles/user'
import serMenuPermission from './moudles/serMenuPermission'

// 使用Vuex
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        serMenuPermission
    },
    getters: {
        avatar: state => state.user.avatar,
        name: state => state.user.name,
        roles: state => state.user.roles,
        routers: state => state.serMenuPermission.routers
    }
})

export default store

