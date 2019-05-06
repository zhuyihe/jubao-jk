<template>
  <div class="address">
    <v-header title="地址管理" class="header"></v-header>
    <mu-list ref="container" v-if="addressRows.length!==0" class="mu-listss">
      <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
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
              <mu-checkbox v-model="item.is_primary" label="默认地址"></mu-checkbox>
            </mu-list-item-title>
            <mu-list-item-title class="dothis">
              <mu-button color="primary" small flat>
                <mu-icon left value="border_color"></mu-icon>编辑
              </mu-button>
              <mu-button color="red" small flat>
                <mu-icon left value="delete"></mu-icon>删除
              </mu-button>
            </mu-list-item-title>
          </mu-list-item>
        </div>
        <mu-divider></mu-divider>
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
import { cmnUseraddressList } from "@api";
export default {
  data() {
    return {
      checkbox: true,
      refreshing: false,
      loading: false,
      addressRows: [],
      total: ""
    };
  },
  mounted() {
    this.getAdress();
  },
  methods: {
    async getAdress() {
      let res = await cmnUseraddressList();
      if (res.err_code === 0) {
        this.addressRows = res.rows;
        this.total = res.total;
        console.log(this.addressRows.length);
      }
    },
    refresh() {
      this.refreshing = true;
      this.$refs.container.scrollTop = 0;
      setTimeout(() => {
        this.refreshing = false;
        // this.text = this.text === "List" ? "Menu" : "List";
        // this.num = 10;
      }, 2000);
    },
    load() {}
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
</style>
