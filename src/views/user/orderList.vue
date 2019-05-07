<template>
  <div class="orderList">
    <div class="header">
      <v-header title="我的保单" ></v-header>
      <mu-tabs
        :value.sync="active1"
        inverse
        indicator-color="#409EFF"
        text-color="#409EFF"
        center
        class="mu-ta"
        @change="change"
      >
        <mu-tab>全部</mu-tab>
        <mu-tab>未生效</mu-tab>
        <mu-tab>已生效</mu-tab>
        <mu-tab>已失效</mu-tab>
      </mu-tabs>
    </div>
    <div v-if="active1 === 0">
      <all-orders></all-orders>
    </div>
    <div v-if="active1 === 1">
      <all-orders :orderStatus="8"></all-orders>
    </div>
    <div v-if="active1 === 2">
      <all-orders :orderStatus="256"></all-orders>
    </div>
    <div v-if="active1 === 3">
      <all-orders :orderStatus="512"></all-orders>
    </div>
  </div>
</template>
<script>
import AllOrders from "./components/AllOrders.vue";
export default {
  components: { AllOrders },
  data() {
    return {
      active1: 2
    };
  },
  mounted() {
      this.active1=this.$route.query.active1
      console.log(this.active1)
  },
  methods:{
      change(item){
          console.log(item)
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

