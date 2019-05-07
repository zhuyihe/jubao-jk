// import {
//   getToken
// } from '../assets/js/api'
// import {
//   getLocalStorage
// } from "assets/js/store.js";

export const routeBack = (to, from) => {
  //路由变化 backUrl
  let backUrl = '/';

  //结构介绍
  /*
   * to:当前页面路由
   * defaultBack:该页面默认返回路由
   * from:上一个页面的情况
   *       case:上一个页面的路由数组，back来自这些页面时对应的返回路由    多对一关系
   * */
  let routePathArr = [
    //公共页面
    {
      to: '/login',
      defaultBack: to.query.productType ? from.fullPath : '/home'
    },
    {
      to: '/dashboard',
      defaultBack: '/dashboard',
    },
    {
      to: '/reg',
      defaultBack: from.fullPath,
    },
    {
      to: '/recovery',
      defaultBack: from.fullPath,
    },
    {
      to: '/setEmail',
      defaultBack: from.fullPath,
    },
    {
      to: '/setTel',
      defaultBack: from.fullPath,
    },
    {
      to: '/setAddress',
      defaultBack: '/dashboard',
    },
    {
      to: '/addAddress',
      defaultBack: {
        path: '/setAddress',
        query: to.query
      }
    },
    {
      to: '/orderList',
      defaultBack: '/dashboard'
    },
  ];

  // console.log(from.fullPath)
  routePathArr.forEach((item) => {
    if (item.to === getPath(to.path)) {
      backUrl = item.defaultBack;
      item.from && item.from.forEach((i) => {
        i.case.forEach((j) => {
          if (from.path === j) {
            backUrl = i.back
          }
        })
      })
    }
  });

  // console.log({to:getPath(to.path),from:from,backUrl})

  //处理 '/artDetail/127' 这类路由
  function getPath(path) {
    if (path.substring(1).indexOf('/') === -1) {
      return path
    } else {
      return '/' + path.substring(1).substring(0, path.substring(1).indexOf('/'))
    }
  }
  return backUrl;
};