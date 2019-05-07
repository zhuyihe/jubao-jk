<template>
  <div class="orderList">
    <div class="header">
      <v-header title="我的保单"></v-header>
      <mu-tabs
        :value.sync="active1"
        inverse
        indicator-color="#409EFF"
        text-color="#409EFF"
        center
        class="mu-ta"
      >
        <template v-for="(item,index) in tabList">
          <mu-tab :key="index">{{item}}</mu-tab>
        </template>
      </mu-tabs>
    </div>
    <div v-if="active1 === 0">
      <keep-alive>
        <all-orders></all-orders>
      </keep-alive>
    </div>
    <div v-if="active1 === 1">
      <keep-alive>
        <all-orders :orderStatus="8"></all-orders>
      </keep-alive>
    </div>
    <div v-if="active1 === 2">
      <keep-alive>
        <all-orders :orderStatus="256"></all-orders>
      </keep-alive>
    </div>
    <div v-if="active1 === 3">
      <keep-alive>
        <all-orders :orderStatus="512"></all-orders>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import AllOrders from "./components/AllOrders.vue";
export default {
  components: { AllOrders },
  data() {
    return {
      active1: 0,
      tabList: ["全部", "未生效", "已生效", "已失效"]
    };
  },
  mounted() {
    if (JSON.stringify(this.$route.query) !== "{}") {
      this.active1 = Number(this.$route.query.active1);
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
  z-index: 10000;
}
.mu-ta {
  //   margin-top: 10px;
}
.mu-ta .mu-tab {
  color: $black;
}
.mu-ta .mu-tab-active {
  color: $blue;
}
</style>

