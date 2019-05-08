<template>
<mu-paper :z-depth="1" class="demo-list-wrap">
<mu-sub-header inset v-if="showTitle">{{title}}</mu-sub-header>
  <div v-for="(val,idx) in products" :key="idx"  @click="goDetail(val.link)">
      <mu-list textline="two-line">
        <mu-list-item avatar button :ripple="true" :dense='false'>
        <mu-list-item-action class="actions">
            <mu-avatar class="imgAva">
             <img :src="`${val.category_image_url}`">
            </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
            <mu-list-item-title>{{val.product_name}}</mu-list-item-title>
            <mu-list-item-sub-title>{{val.description}}</mu-list-item-sub-title>
             <mu-badge :content="val.company" color="#06acf9" class="badge"></mu-badge>
        </mu-list-item-content>
        <mu-list-item-action>
           <mu-list-item-title class="prices">{{val.min_premium.toFixed(2)}}元<span class="qi">起</span></mu-list-item-title>
        </mu-list-item-action>
        </mu-list-item>
    </mu-list>
    <mu-divider inset class="insets"></mu-divider>
  </div>
</mu-paper>
</template>
<script>
import {
  getLocalStorage,
  getStorage,
} from "@assets/js/SessionStorage";
export default {
  props: {
    title: "",
    desc: "",
    tags: "",
    minPremium: "",
    products: { type: Array, default: [] },
    showTitle: { type: Boolean }
  },
  data() {
    return {
      aliasConfig: ""
    };
  },
  created() {
    if (this.$route.query.alias && this.$route.query.alias != "null") {
      this.aliasConfig = getStorage("locationQuery").alias;
    } else {
      this.aliasConfig = getLocalStorage("aliasConfig");
    }
  },
  methods: {
    goDetail(link) {
      if(link){
         window.location.href = link + this.aliasConfig;
      }
     
      console.log(link)
    }
  }
};
</script>
<style lang="scss" scoped>
.badge{
    padding-top: 10px;
    padding-bottom:5px; 
}
.prices{
    color: #ff6600;
    font-weight: bold;
    font-size: 30px;
    span{
        color: $black;
        font-size: 24px;
    }
}
.imgAva{
    height: 120px !important;
    width: 120px !important;
    border-radius: 0;
    img{
         border-radius: 0;
    }
}
.actions{
    min-width:160px;
}
.insets{
    margin-left: 190px;
    width:550px;
}
.mu-sub-header{
    font-weight:bold;
}
.demo-list-wrap{
    box-shadow: none;
}
</style>
