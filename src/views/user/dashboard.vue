<template>
  <div class="dashboard">
    <v-header title="个人中心" backIcon class="header"></v-header>
    <mu-list textline="two-line" class="price mu-price">
      <mu-list-item ripple>
        <mu-list-item-content>
          <mu-list-item-title>{{(totalSum.total/100).toFixed(2)}}</mu-list-item-title>
          <mu-list-item-sub-title>累计保费</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple>
        <mu-list-item-content>
          <mu-list-item-title>{{(totalSum.month/100).toFixed(2)}}</mu-list-item-title>
          <mu-list-item-sub-title>本月保费</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple>
        <mu-list-item-content>
          <mu-list-item-title>{{(totalSum.yesterday/100).toFixed(2)}}</mu-list-item-title>
          <mu-list-item-sub-title>昨日保费</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-list class="showAll">
      <mu-list-item button ripple to="orderList?active1=0">
        <mu-list-item-action>
          <mu-icon value="description" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>我的保单</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <mu-divider></mu-divider>
    <mu-list textline="two-line" class="price pricenone">
      <mu-list-item ripple button to="orderList?active1=1">
        <mu-list-item-content>
          <mu-icon value="assignment_returned" color="info"></mu-icon>
          <mu-list-item-sub-title>未生效</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple button to="orderList?active1=2">
        <mu-list-item-content>
          <mu-icon value="assignment_turned_in" color="info"></mu-icon>
          <mu-list-item-sub-title>已生效</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple button to="orderList?active1=3">
        <mu-list-item-content>
          <mu-icon value="assignment_late" color="info">查看全部</mu-icon>
          <mu-list-item-sub-title>已失效</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-list class="ltemlist">
      <mu-list-item button ripple to="setTel">
        <mu-list-item-action>
          <mu-icon value="smartphone" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>手机号</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button ripple to="recovery">
        <mu-list-item-action>
          <mu-icon value="assignment" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>登陆密码</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button ripple to="setEmail">
        <mu-list-item-action>
          <mu-icon value="email" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>邮箱</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button ripple to="setAddress">
        <mu-list-item-action>
          <mu-icon value="chrome_reader_mode" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>地址管理</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <!-- <mu-list-item button ripple to='bankCard'>
        <mu-list-item-action>
          <mu-icon value="credit_card" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>银行卡管理</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>-->
      <mu-list-item button ripple @click="signOut">
        <mu-list-item-action>
          <mu-icon value="exit_to_app" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>安全退出</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
    <tab></tab>
  </div>
</template>
<script>
import Tab from "@/components/Tab";
import { message, toast } from "@assets/js/common";
import { cmnBizPremiumlSum } from "@api";
export default {
  components: {
    Tab
  },
  data() {
    return {
      totalSum: {}
    };
  },
  mounted() {
    this.getSum();
  },
  methods: {
    signOut() {
      message("confirm", "确定退出吗？")
        .then(res => {
          this.$store.commit("COMMIT_TOKEN", "");
          this.$store.commit("USER_INFO", {});
          this.$router.push("/home");
        })
        .catch(e => {});
    },
    async getSum() {
      let res = await cmnBizPremiumlSum();
      if (res.err_code === 0) {
        console.log(res);
        this.totalSum = res.data;
      } else {
        toast("error", res.err_msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard{
  padding-bottom: 80px
}
.header{
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
  z-index: 10000;
}
.price {
  display: flex;
  justify-content: space-around;
  text-align: center;
  background: white;
  margin-top: 20px;
  padding: 0;
  .mu-item-title {
    color: red;
    text-align: center;
  }
}
.mu-price{
  margin-top: 60px
}
.showAll {
  background: white;
  margin-top: 30px;
  padding: 0;
  .icons {
    margin: auto;
  }
}
.pricenone {
  margin-top: 0;
  .mu-item-content {
    text-align: center;
  }
}
.ltemlist {
  background: white;
  margin-top: 30px;
  padding: 0;
  .icons {
    margin: auto;
  }
}
</style>
