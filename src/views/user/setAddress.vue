<template>
  <div class="address demo-loadmore-wrap">
    <v-header title="地址管理" class="header"></v-header>
    <mu-list ref="container" class="demo-loadmore-content mu-listss" v-if="addressRows.length!==0">
      <mu-load-more
        @refresh="refresh"
        :refreshing="refreshing"
        :loading="loading"
        @load="load"
        :loaded-all="loadAll"
        :loading-text="loadText"
      >
        <div class="lsits" v-for="(item,index) in addressRows" :key="index">
          <mu-list-item :ripple="false">
            <mu-list-item-title>{{item.recipients}}</mu-list-item-title>
            <mu-list-item-title class="phone">{{item.mobile}}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item :ripple="false" class="adress">
            <mu-list-item-title>{{item.province+item.city+item.district+item.street}}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item :ripple="false" class="adress">
            <mu-list-item-title>
              <mu-checkbox
                v-model="item.is_primary"
                label="默认地址"
                @click="isTop(item.id,item.is_primary)"
                :readonly="item.is_primary==true"
              ></mu-checkbox>
            </mu-list-item-title>
            <mu-list-item-title class="dothis">
              <mu-button color="primary" small flat @click="edit(item)">
                <mu-icon left value="border_color"></mu-icon>编辑
              </mu-button>
              <mu-button color="red" small flat @click="deleteItem(item)">
                <mu-icon left value="delete"></mu-icon>删除
              </mu-button>
            </mu-list-item-title>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-load-more>
    </mu-list>
    <div class="tupian" v-else>
      <img src="@assets/img/adress.png" alt>
      <p>暂无可用地址</p>
    </div>
    <mu-button fab color="$blue" class="button" to="/addAddress">
      <mu-icon value="add"></mu-icon>
    </mu-button>
  </div>
</template>
<script>
import {
  cmnUseraddressList,
  cmnSetdefaultAddr,
  cmnUseraddressDelete
} from "@api";
import { toast, message } from "@assets/js/common";
export default {
  data() {
    return {
      checkbox: true,
      refreshing: false,
      loading: false,
      addressRows: [],
      total: "",
      pages: {
        page: 1,
        rows: 5
      },
      loadAll: false,
      loadText: "正在加载中"
    };
  },
  mounted() {
    this.getAdress(this.pages);
  },
  methods: {
    async getAdress(data, index) {
      let res = await cmnUseraddressList(data);
      if (res.err_code === 0) {
        //下拉
        if (index === 1) {
          this.addressRows.push(...res.rows);
          setTimeout(() => {
            this.loading = false;
          }, 2000);
          //数据加载完
          if (res.rows.length < 2) {
            this.loadText = "暂无更多数据";
            setTimeout(() => {
              this.loadAll = true;
            }, 2000);
          }
        } else {
          this.addressRows = res.rows;
        }
        this.total = res.total;
      }
    },
    refresh() {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      //重新加载列表
      this.pages.page = 1;
      this.loadAll = false;
      this.getAdress(this.pages);
      setTimeout(() => {
        this.refreshing = false;
      }, 2000);
    },
    load() {
      this.loading = true;
      this.pages.page++;
      this.getAdress(this.pages, 1);
    },
    async isTop(id, isCheck) {
      console.log(isCheck);
      let res = await cmnSetdefaultAddr({ id: id });
      if (res.err_code === 0) {
        //重新加载列表
        this.refresh();
        toast("success", "默认地址设置成功");
      } else {
        toast("error", e.err_msg);
      }
    },
    edit(item) {
      this.$router.push({
        path: "/addAddress",
        query: item
      });
    },
    deleteItem(item) {
      message("confirm", "你确定删除地址吗？")
        .then(() => {
          cmnUseraddressDelete({ id: item.id })
            .then(res => {
              toast("success", "删除成功");
              this.refresh();
            })
            .catch(e => {
              toast("error", e.err_code);
            });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.phone {
  text-align: right;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
}
.dothis {
  text-align: right;
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
.button {
  position: fixed;
  right: 0;
  bottom: 100px;
}
.mu-listss {
  margin-top: 50px;
}
.demo-loadmore-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
