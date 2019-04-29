<template>
  <mu-appbar style="width: 100%;" class="navbar">
    <router-link
      :to="backUrl || $store.state.backUrl"
      tag="span"
      class="header_back"
      @click.native="back"
    >
      <mu-button icon slot="left" v-if="backShow">
        <mu-icon value="perm_identity"></mu-icon>
      </mu-button>
    </router-link>

    <!--如果没有输入backUrl，则不能为router-link-->
    <!-- <mu-button icon slot="left" @click="back" >
      <mu-icon value="perm_identity" v-if="backShow"></mu-icon>
    </mu-button> -->
    aaaaa
    <!-- <mu-button icon slot="right">
      <a :href="telphone" class="phone">
        <mu-icon value="phone"></mu-icon>
      </a>
    </mu-button> -->
  </mu-appbar>
</template>
<script>
import { removeStorage } from "@assets/js/SessionStorage";
export default {
  props: {
    className: { type: String, default: "" },
    routerLinkMode: { type: Boolean, default: true },
    backUrl: { default: "" }, //返回的路由地址，eg: /dashboard
    backIcon: { type: String, default: "icon-fanhui" }, //返回按钮对应的图标，默认为 < 图标
    backText: { type: String, default: "" }, //返回按钮对应的文本；一般会在文本和图标中二选一
    backShow: { type: Boolean, default: true }, //是否显示返回图标；默认为显示，也可以适应没有返回图标的情况

    goUrl: { type: [String, Object], default: "" }, //右侧的路由地址，eg: /dashboard
    goIcon: { type: String, default: "" }, //右侧按钮对应的图标，默认没有图标
    goText: { type: String, default: "" }, //右侧按钮对应的文本；一般会在文本和图标中二选一
    goShow: { type: Boolean, default: false }, //是否显示右侧图标；默认为显示，也可以适应没有右侧图标的情况
    title: { type: String, default: "" }, //header的中心部分的标题文本
    touchFeel: { type: Object, default: () => ({ color: "#f2f2f2" }) }, //点击背景变色功能；结合自身封装的指令才能正常运行；由于需求问题，暂时没有单独设置back和go的touchFeel，可以根据需求修改组件
    goTouchFlag: { type: Boolean, default: false }
  },
  mounted(){
      console.log(this.routerLinkMode)
  },
  methods: {
    back() {
      this.$emit("back");
      removeStorage("createdRouter");
    },
    go() {
      this.$emit("go");
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  text-align: center;
}
</style>

