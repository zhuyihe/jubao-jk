import { getLocalStorage } from "@assets/js/SessionStorage"
let router = getLocalStorage('router');
export const state={
    access_token:'',//登陆令牌
    routerFrom:router?router.from:'',//路由跳转时的from
    routerTo:router?router.to : '',  //路由跳转时的to
    backUrl:router?router.backUrl : '/', //路由跳转后返回的地址
    userInfo:{}
}