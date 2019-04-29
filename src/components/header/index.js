import Header from "./header.vue";
const header = {
  install:function (Vue) {
    Vue.component("v-header",Header);
  }
};
export default header