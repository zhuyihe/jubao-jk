<template>
  <div class="login">
    <v-header
      :backUrl="{path:'/login',query:$route.query}"
      :goUrl="{path:'/reg',query:$route.query}"
      goText="注册"
      title="验证码登陆"
    ></v-header>
    <mu-form ref="form" class="mu-demo-form forms" :model="validateForm">
      <mu-text-field
        label="请输入电话号码"
        v-model="validateForm.mobile"
        prefix="+86"
        label-float
        icon="phone"
        :rules="mobileRest"
        full-width
      ></mu-text-field>
      <br>
      <mu-text-field label="输入验证码" v-model="validateForm.sms_code" label-float icon="sms" full-width :rules="smsCode"></mu-text-field>
      <mu-button
          color="primary"
          @click="login"
          full-width
          large
          v-loading="loading"
          data-mu-loading-size="24"
        >提交</mu-button>
      <br>
    </mu-form>
  </div>
</template>
<script>
import { mobile_reg } from "@assets/js/reg";
export default {
  data() {
    return {
      validateForm: {
        mobile: "",
        sms_code: ""
      },
      mobileRest: [
        { validate: val => !!val, message: "必须填写手机号" },
        { validate: val => mobile_reg.test(val), message: "手机号不正确" }
      ],
      smsCode: [
        { validate: val => !!val, message: "必须填写验证码" },
      ],
      loading:false
    };
  },
  methods:{
      login(){
          this.loading=true
          console.log(1)
      }
  }
};
</script>
<style lang="scss" scoped>
.login {
  background: $white;
}
.forms {
  width: 80%;
  margin: auto;
  margin-top: 200px;
}
</style>
