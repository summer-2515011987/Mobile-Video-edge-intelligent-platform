const API_LOGINSYSTEM = "/asdc-admin/admin/login";
const API_PUBLICKEY = "/asdc-auth/web/publicKey";
const API_ASDMININFO = "/asdc-admin/admin/info";
const API_GETROUTES = "/asdc-admin/admin/getRoutes";

export function loginSystem(vueCtx, option) {
    vueCtx.sendPostRequest({
        url: API_LOGINSYSTEM,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

export function getPublicKey(vueCtx, option) {
    vueCtx.sendGetRequest({
        url: API_PUBLICKEY,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

export function getMenu(vueCtx, option) {
    vueCtx.sendGetRequest({
        url: API_ASDMININFO,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}

export function getRoutes(vueCtx, option) {
    vueCtx.sendGetRequest({
        url: API_GETROUTES,
        data: option.data || {},
        procgress: true,
        back: option.back
    });
}


export default {
    loginSystem,
    getPublicKey,
    getMenu,
    getRoutes
}