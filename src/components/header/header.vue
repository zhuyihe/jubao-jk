<template>
 <mu-appbar style="width: 100%;" class="navbar" :class="className">
      <mu-button icon slot="left" :to='backUrl || $store.state.backUrl' @click.native="back" v-if="routerLinkMode">
        <mu-icon :value="backIcon" v-if='backShow'></mu-icon>
        {{backText}}
      </mu-button>
      <mu-button icon slot="left"  @click.native="back" v-else>
        <mu-icon :value="backIcon" v-if='backShow'></mu-icon>
        {{backText}}
      </mu-button>
      {{title}}
      <template v-if='goIcon'>
        <mu-button icon slot="right" :to="goUrl" v-if="goUrl"  @click="go">
          <mu-icon :value="goIcon"  v-if="goShow"></mu-icon>
      </mu-button>
      <mu-button icon slot="right"  v-if="!goUrl && !goTouchFlag"  @click="go">
          <mu-icon :value="goIcon"  v-if="goShow"></mu-icon>
      </mu-button>
       <mu-button icon slot="right"  v-if="!goUrl && goTouchFlag"  @click="go">
          <mu-icon :value="goIcon"  v-if="goShow"></mu-icon>
      </mu-button>
      </template>
      <template v-else>
         <mu-button flat slot="right" :to="goUrl" v-if="goUrl"  @click="go">
          {{goText}}
      </mu-button>
      <mu-button flat slot="right"  v-if="!goUrl && !goTouchFlag"  @click="go">
          {{goText}}
      </mu-button>
       <mu-button flat slot="right"  v-if="!goUrl && goTouchFlag"  @click="go">
          {{goText}}
      </mu-button>
      </template>
    </mu-appbar>
</template>
<script>
import { removeStorage } from "@assets/js/SessionStorage";
export default {
  props: {
    className: { type: String, default: "" },
    routerLinkMode: { type: Boolean, default: true },
    backUrl: { default: "" }, //返回的路由地址，eg: /dashboard
    backIcon: { type: String, default: "arrow_back" }, //返回按钮对应的图标，默认为 < 图标
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

