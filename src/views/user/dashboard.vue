<template>
  <div class="dashboard">
    <v-header title="个人中心" backIcon></v-header>
    <mu-list textline="two-line" class="price">
      <mu-list-item ripple>
        <mu-list-item-content>
          <mu-list-item-title>0.00</mu-list-item-title>
          <mu-list-item-sub-title>累计保费</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple>
        <mu-list-item-content>
          <mu-list-item-title>0.00</mu-list-item-title>
          <mu-list-item-sub-title>本月保费</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple>
        <mu-list-item-content>
          <mu-list-item-title>0.00</mu-list-item-title>
          <mu-list-item-sub-title>昨日保费</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-list class="showAll">
      <mu-list-item button ripple to='orderList'>
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
      <mu-list-item ripple button to='orderList?active1=1'>
        <mu-list-item-content>
          <mu-icon value="assignment_returned" color="info"></mu-icon>
          <mu-list-item-sub-title>未生效</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple button to='orderList?active1=2'>
        <mu-list-item-content>
          <mu-icon value="assignment_turned_in" color="info"></mu-icon>
          <mu-list-item-sub-title>已生效</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
      <mu-list-item ripple button to='orderList?active1=3'>
        <mu-list-item-content>
          <mu-icon value="assignment_late" color="info">查看全部</mu-icon>
          <mu-list-item-sub-title>已失效</mu-list-item-sub-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-list class="ltemlist">
      <mu-list-item button ripple to='setTel'>
        <mu-list-item-action>
          <mu-icon value="smartphone" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>手机号</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button ripple to='recovery'>
        <mu-list-item-action>
          <mu-icon value="assignment" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>登陆密码</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button ripple to='setEmail'>
        <mu-list-item-action>
          <mu-icon value="email" color="blue" class="icons"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>邮箱</mu-list-item-title>
        <mu-list-item-action>
          <mu-icon value="keyboard_arrow_right"></mu-icon>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button ripple to='setAddress'>
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
      <mu-divider></mu-divider> -->
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
import {message} from '@assets/js/common'
export default {
  components: {
    Tab
  },
  methods:{
      signOut(){
          message('confirm','确定退出吗？').then(res=>{
              this.$store.commit('COMMIT_TOKEN','')
              this.$store.commit('USER_INFO',{})
              this.$router.push('/home')
          }).catch(e=>{
              
          })
      }
  }
};
</script>
<style lang="scss" scoped>
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
