import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getStorage } from "@assets/js/SessionStorage"
import { setLocationQuery } from "@assets/js/query"
import store from '@/store/store'
Vue.use(Router)
// 路由懒加载
const getComponent = (name, component) => () => import(`@/views/${name}/${component}.vue`);
let router = [
  { path: '/', redirect: 'home' },
  {
    path: '/home',
    name: 'home',
    component: getComponent('home', 'Home'),
    meta: { level: 1 }
  },
  {
    path: '/login',
    name: 'login',
    component: getComponent('login', 'login'),
    meta: { level: 7 }
  },
  { path: '/smslogin', component:  getComponent('login', 'SMSlogin'), name: 'smslogin' ,meta:{ level: 8 }},
  {
    path: '/reg',
    name: 'reg',
    component: getComponent('reg', 'reg'),
    meta:{ level: 9 }
  },
  { path: '/dashboard', component: getComponent('user', 'dashboard'), name: 'dashboard', meta: { requiresAuth: true, level: 1 } },
]
const routers = new Router({
  routes: router
})
routers.beforeEach((to, from, next) => {
  NProgress.start()
  let query = getStorage("locationQuery");
  console.log("---from---------");
  console.log(from);
  console.log("---to---------");
  console.log(to);
  //token验证功能,token过期则跳回登陆界面
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(!store.state.access_token)
    if (!store.state.access_token) {
      if (query && query["alias"]) {
        routers.push(setLocationQuery("/login", { "alias": query["alias"] }));
      } else {
        routers.push("/login");
      }
    }
  }
  // 1,只有alias； 2，有alias和AppKey
  if (query && query["alias"]) {
    if (to.fullPath.indexOf("alias") === -1) {
      let o = { "alias": query["alias"] };
      // if(query["AppKey"]){o.AppKey=query["AppKey"] };
      routers.push(setLocationQuery(to.fullPath, o))
      // router.push(to.fullPath+`${to.fullPath.indexOf("?")!==-1?"&":"?"}alias=${query["alias"]}`)
    }
  }
  // NProgress.done() // 结束Progress
  next();

})
routers.afterEach(transition => {
  NProgress.done();
});
export default routers;