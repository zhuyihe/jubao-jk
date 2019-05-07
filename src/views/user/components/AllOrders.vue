<template>
  <div class="demo-loadmore-wrap mu-a">
    <mu-list ref="container" class="demo-loadmore-content mu-listss" v-if="orderRows.length!=0">
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
        :loading-text="loadText"
      >
        <template v-for="(val,index) in orderRows">
          <order-cell :orderInfo="val" :key="index"></order-cell>
        </template>
      </mu-load-more>
    </mu-list>
    <div class="tupian" v-else>
      <img src="@assets/img/dingdan.png" alt>
      <p>暂无订单哟,快去投保吧</p>
    </div>
  </div>
</template>
<script>
import { cmnBizChanneOrderlList } from "@api";
import OrderCell from "./OrderCell.vue";
export default {
  data() {
    return {
      refreshing: false,
      loading: false,
      orderRows: [],
      total: "",
      pages: {
        page: 1,
        rows: 5
      },
      loadAll: false,
      loadText: "正在加载中",
      //状态
      status: ""
    };
  },
  components: {
    OrderCell
  },
  props: {
    orderStatus: Number
  },
  watch: {
    orderStatus(newValue, oldValue) {
      //每次切换
      this.status = newValue;
      this.refresh();
    }
  },
  mounted() {
    this.status = this.orderStatus;
    this.pages.order_status = this.status;
    this.getList(this.pages);
  },
  methods: {
    async getList(data, index) {
      let res = await cmnBizChanneOrderlList(data);
      if (res.err_code === 0) {
        //下拉
        if (index === 1) {
          this.orderRows.push(...res.rows);
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          //数据加载完
          if (res.rows.length < 5) {
            this.loadText = "暂无更多数据";
            setTimeout(() => {
              this.loadAll = true;
            }, 2000);
          }
        } else {
          this.orderRows = res.rows;
        }
        this.total = res.total;
      }
    },
    refresh() {
      this.refreshing = true;
      if (this.orderRows.length !== 0) {
        this.$refs.container.scrollTop = 0;
      }
      //重新加载列表
      this.pages.page = 1;
      this.pages.order_status = this.status;
      this.loadAll = false;
      this.getList(this.pages);
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
    },
    load() {
      this.loading = true;
      this.pages.page++;
      this.pages.order_status = this.status;
      this.getList(this.pages, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.demo-loadmore-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 250px);
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.tupian {
  text-align: center;
  margin-top: 200px;
  font-size: 30px;
  color: #666;
  img {
    width: 300px;
    height: 300px;
  }
}
.mu-a {
  margin-top: 110px;
}
</style>
