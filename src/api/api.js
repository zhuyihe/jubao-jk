import {
    post,
    get
} from './request.js'
//获取app配置信息
export const cmnServiceConfig = (params) => get("/v1/cmn/service/config", params);
//banner 
export const cmnBizBannerList = (params) => get('/v1/cmn/biz/banner/list', params)
//获取栏目列表
export const cmnServiceCategoryList = (params) => get("/v1/cmn/service/category/list", params);
//获取产品列表
export const cmnServiceProductList = (params) => get('/v1/cmn/service/product/list', params)
//代理人登陆
export const cmnChannelLogin = (params) => post('/v1/api/cmn/biz/channel/login', params)
//验证短信验证码
export const cmnSmsVerify = (params) => post("/v1/cmn/sms/verify", params);
//获取短信
export const cmnSmsSend = (params) => post("/v1/cmn/sms/send", params);
// 获取平台服务协议
export const cmnAgreementList = (params) => get("/v1/cmn/agreement/list", params);
// 渠道用户注册
export const cmnChannelReg = (params) => post("/v1/api/cmn/biz/channel/register", params);
// 忘记密码
export const cmnUserRecover = (params) => post("/v1/cmn/user/recover", params);
//获取用户信息
export const cmnUserInfo = (params) => get("/v1/cmn/user/info", params);
//更新用户信息
export const cmnUserUpdate = (params) => post("/v1/cmn/user/update", params);
//邮寄地址
export const cmnUseraddressList = (params) => get("/v1/cmn/useraddress/list", params);
//添加地址
export const cmnUseraddressAdd = (params) => post("/v1/cmn/useraddress/add", params);
//设置默认地址
export const cmnSetdefaultAddr = (params) => get("/v1/cmn/useraddress/setdefaultaddr", params);
//删除地址
export const cmnUseraddressDelete = (params) => get("/v1/cmn/useraddress/delete", params);
//查询所有订单列表
export const cmnBizChanneOrderlList = (params) => get("/v1/cmn/biz/channel/orderflow/list.v2", params);
//代理人保费统计
export const cmnBizPremiumlSum = (params) => get("/v1/cmn/biz/premium/sum", params);
//获取省份
export const allProvinceList = (params) => get("/v1/cmn/all/province/list", params)
//获取价格方案列表
export const cmnProductpriceList = (params) => get("/v1/cmn/productprice/list", params);