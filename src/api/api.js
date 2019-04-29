import {post,get} from './request.js' 
//登陆
export const  login= (login)=>post('/api/post/user/login',login) 
//获取app配置信息
export const cmnServiceConfig = (params) => get("/v1/cmn/service/config", params); 
//banner 
export const cmnBizBannerList=(params)=>get('/v1/cmn/biz/banner/list',params)
//获取栏目列表
export const cmnServiceCategoryList = (params) => get("/v1/cmn/service/category/list", params);
//获取产品列表
export const cmnServiceProductList =(params)=>get('/v1/cmn/service/product/list',params)