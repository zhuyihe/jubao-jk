<template>
  <div class="home">
    <mu-appbar style="width: 100%;" class="navbar">
      <mu-button icon slot="left">
        <mu-icon value="perm_identity"></mu-icon>
      </mu-button>
      {{title}}
      <mu-button icon slot="right">
        <a :href="telphone" class="phone">
          <mu-icon value="phone"></mu-icon>
        </a>
      </mu-button>
    </mu-appbar>
    <div class="mu-homecontent homecontent">
      <mu-carousel hide-controls class="banner">
        <mu-carousel-item v-for="(item,index) in banner" :key="index">
          <img :src="item.image_url" class="ims">
        </mu-carousel-item>
      </mu-carousel>
      <div class="tap">
        <mu-tabs
          :value.sync="active"
          ripple="true"
          indicator-color="#409EFF"
          color="#fff"
          class="tablist"
          center
        >
          <mu-tab
            v-for="(item,index) in columnList"
            :key="index"
            @click="getTab(item)"
          >{{item.name}}</mu-tab>
        </mu-tabs>
        <div v-loading="loading" style="position:relative" class="cir">
          <template v-for="(value,index) in productLists">
            <product-list
              :key="value.id"
              :index="index"
              :title="value.name"
              :showTitle="Boolean(value.id && productLists.length>1)"
              :products="value.products"
            ></product-list>
          </template>
        </div>
      </div>
    </div>
    <tab></tab>
  </div>
</template>
<script>
import {
  cmnServiceConfig,
  cmnBizBannerList,
  cmnServiceProductList,
  cmnServiceCategoryList
} from "@api";
import { toast } from "@assets/js/common.js";
import ProductList from "./ProductList.vue";
import {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  getStorage,
  setStorage
} from "@assets/js/SessionStorage";
import Loading from "muse-ui-loading";
import "muse-ui-loading/dist/muse-ui-loading.css";
import Tab from "@/components/Tab";
export default {
  name: "home",
  components: {
    ProductList,
    Tab
  },
  data() {
    return {
      title: "首页",
      telphone: "tel:4008059680",
      banner: [],
      active: 0,
      productLists: [],
      columnList: [],
      loading: false
    };
  },
  mounted() {
    if (!getStorage("appname") && this.$route.query.appname) {
      setStorage({ appname: this.$route.query.appname });
    }
    this.appname = getStorage("appname") || "baoxianshi";
    //进入首页如果携带有appname则删除aliasConfig
    if (this.$route.query.appname) {
      removeLocalStorage("aliasConfig");
    }
    this.getCofig();
    this.cmnServiceCategoryList();
  },
  methods: {
    async getCofig() {
      let res = await cmnServiceConfig({
        os_type: 8,
        keys: "cmnServiceConfig"
      });
      // console.log(res)
      if (res.err_code !== 0) {
        toast("error", res.err_msg || "未知错误");
      }
      if (res.data.app_name !== "") {
        this.title = res.data.app_name;
      } else {
        this.title = "保险服务平台";
      }
      document.title = this.title;
      setLocalStorage("docTitle", this.title);
      setStorage({ app_id: res.data.app_id || 1 });
      setStorage({ cmnServiceConfig: res });
      this.getBanner(res.data.app_id);
      this.telphone = "tel:" + res.data.phone || "tel:4008059680";
    },
    async getBanner(app_id) {
      let res = await cmnBizBannerList({
        show_type: 2,
        app_id: app_id || getStorage("app_id")
      });
      if (res.err_code === 0) {
        this.banner = res.rows;
      }
    },
    async cmnServiceCategoryList() {
      let res = await cmnServiceCategoryList({ type: 3 });
      console.log(res);
      if (res.err_code !== 0) {
        Toast({ message: res.err_msg || "未知错误", position: "bottom" });
        return;
      }
      this.columnList = res.rows;
      this.active == res.rows.id;
      setStorage({ cmnServiceCategoryList: res });
      this.getProductList(res.rows[0].id);
    },
    async getProductList(category_id) {
      this.loading = true;
      let res = await cmnServiceProductList({ category_id: category_id });
      console.log(res);
      this.loading = false;
      if (res.err_code !== 0) {
        Toast({ message: res.err_msg || "未知错误", position: "bottom" });
        return;
      }
      this.productLists = res.rows;
      setStorage({ cmnServiceProductList: res });
    },
    getTab(item) {
      this.getProductList(item.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.cir {
  position: relative;
}
.navbar {
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000000000000;
}
.mu-homecontent {
  height: calc(100% - 50px);
  overflow: scroll;
  padding-top: 57px;
}
.homecontent {
  padding-bottom: 100px;
}
.phone {
  position: relative;
  color: black;
}
.ims {
  width: 100%;
}
.banner {
  height: 300px !important;
}
// .home{
//   padding-top: 50px;
// }
.tap .mu-tab {
  color: $black;
}
.tap .mu-tab-active {
  color: $blue;
}
</style>

