import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import header from "@/components/header"
Vue.use(MuseUI);
Vue.use(header);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
