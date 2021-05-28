import { login, logout, getInfo } from '@/api/login'
import service from '@/api/mobileApi';
import { getPublicKey } from  '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/tokenActions'

const user = {
    state: {
        name: '',
        menuName:'',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_MENU_NAME:(state, menuName) =>{
            state.menuName = menuName;
        }
    },

    actions: {
        // 登录
        // Login({ commit }, userInfo) {
        //     const username = userInfo.username.trim()
        //     return new Promise((resolve, reject) => {
        //         login(username, userInfo.password).then(response => {
        //             debugger;
        //             const code = response.code
        //             if(code == 0){
        //                 resolve();
        //             }else{
        //                 reject(response.message);
        //             }
                    
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // // 获取用户信息
        // GetInfo({ commit, state }) {
        //     // commit('SET_NAME', 'admin')
        //     return new Promise((resolve, reject) => {
        //         getInfo().then(response => {
        //             const data = response.data
        //             if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
        //                 commit('SET_ROLES', data.roles)
        //             } else {
        //                 reject('用户没有绑定权限，请联系系统管理员!')
        //             }
        //             commit('SET_NAME', data.username)
        //             resolve(response)
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // // 登出
        // LogOut({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //         var token = getToken();
        //         logout(token).then(() => {
        //             commit('SET_ROLES', [])
        //             removeToken()
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // },

        // GetPublicKey({ commit }){
        //     return new Promise((resolve, reject) => {
        //         getPublicKey().then(response => {
        //             if (response.code !== 200 ) {
        //                 reject('获取秘钥失败 !')
        //             }
        //             resolve(response)
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })

        // },
        SetMenuName({ commit, menuName }){
            return new Promise(resolve => {
                commit('SET_MENU_NAME', menuName)
            })
        }
    }

}

export default user