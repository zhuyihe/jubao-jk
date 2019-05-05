<template>
  <div class="dialog">
    <mu-dialog transition="slide-bottom" fullscreen :open.sync="openFullscreen" class="all">
      <v-header
        class="header"
        :title="title"
        backIcon="clear"
        @back="closeFullscreenDialog"
        :routerLinkMode="false"
      ></v-header>
      <div class="main">
        <div class="content" v-html="html">网络不佳，暂无数据~</div>
      </div>
      <div class="bottom" @click="closeFullscreenDialog">
        <span>我知道了</span>
      </div>
    </mu-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogs",
  props: {
    title: {
      type: String
    },
    html: {
      type: String,
      default: "网络异常"
    },
    openFullscreen: {
      type: Boolean
    }
  },
  mounted() {
    console.log(this.openFullscreen);
  },
  methods: {
    openFullscreenDialog() {
      // this.openFullscreen = true;
    },
    closeFullscreenDialog() {
      // this.openFullscreen = false;
      this.$emit("getOpen", this.openFullscreen);
      console.log(this.openFullscreen);
    }
  }
};
</script>
<style lang="scss" scoped>
.all {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow-y: scroll;
  z-index: 100;
  background: #fff;
  .header {
    background: #fff;
    position: fixed;
  }
  .main {
    min-height: 100%;
    height: 100%;
  }
  .content {
    padding: 110px 20px 120px;
  }
}
.bottom {
  margin-top: -100px;
  width: 100%;
  height: 100px;
  background-color: #06acf9;
  text-align: center;
  line-height: 100px;
  span {
    font-size: 40px;
    line-height: 36px;
    color: #ffffff;
  }
}
.mu-dialog {
  box-shadow: none !important;
}
</style>
