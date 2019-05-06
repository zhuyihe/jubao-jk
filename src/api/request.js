import axios from "axios";
import router from "../router/router";
import Loading from 'muse-ui-loading';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import { toast } from '@assets/js/common.js'
import store from '../store/store'
axios.defaults.timeout = 60000;
axios.defaults.baseURL = process.env.VUE_APP_LOGOUT_URL;
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded;charset=UTF-8";
axios.defaults.headers["Platform"] = "H5"
// let loading= Loading({
//     text: "正在加载中......",
// });
/*
 *请求前拦截
 *用于处理需要请求前的操作
 */
axios.interceptors.request.use(
    config => {
        if (store.state.access_token) {
            config.headers["Authorization"] = "Bearer " + store.state.access_token;
        }
        if(store.state.userInfo.app_key){
            config.headers["AppKey"] = store.state.userInfo.app_key;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
/*
 *请求响应拦截
 *用于处理数据返回后的操作
 */
axios.interceptors.response.use(
    response => {
        return new Promise((resolve, reject) => {
            //请求成功后关闭加载框
            // if (loading) {
            //     loading.close();
            // }
            const res = response.data;
            if (res.err_code === 0) {
                resolve(res)
            } else {
                reject(res)
            }
        })
    },
    error => {
        console.log(error)
        //请求成功后关闭加载框
        // if (loading) {
        //     loading.close();
        // }
        //断网处理或者请求超时
        if (!error.response) {
            //请求超时
            if (error.message.includes("timeout")) {
                console.log("超时了");
                toast("error", "请求超时，请检查互联网连接");
            } else {
                //断网，可以展示断网组件
                console.log("断网了");
                toast("error", "请检查网络是否已连接");
            }
            return;
        }
        const status = error.response.status;
        switch (status) {
            case 500:
                toast("error", "服务器内部错误");
                break;
            case 404:
                toast(
                    "error",
                    "未找到远程服务器"
                );
                break;
            case 403:
                toast("warning", "用户登陆过期，请重新登陆");
                store.state.commit('COMMIT_TOKEN', '')
                setTimeout(() => {
                    router.replace({
                        path: "/login",
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
                break;
            case 400:
                toast("error", "数据异常，详情请咨询聚保服务热线");
                break;
            default:
                toast("error", error.response.data.message);
        }
        return Promise.reject(error);
    }
);
/*
 *get方法，对应get请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}
/*
 *post方法，对应post请求
 *@param {String} url [请求的url地址]
 *@param {Object} params [请求时候携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}