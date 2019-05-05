<template>
  <div class="reg">
    <v-header title="注册"></v-header>
    <mu-form ref="form" class="mu-demo-form forms" :model="validateForm">
      <mu-form-item :rules="mobileRules" label="请输入电话号码" icon="phone" prop="mobile">
        <mu-text-field v-model="validateForm.mobile" full-width prop="mobile"></mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="smsCode" label="输入验证码" icon="sms" prop="sms_code">
        <mu-text-field v-model="validateForm.sms_code" full-width prop="sms_code">
          <mu-button color="info" small round @click="getCode" :disabled="disabled">{{text}}</mu-button>
        </mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="passwordRules" label="请输入密码" icon="lock_open" prop="password">
        <mu-text-field v-model="validateForm.password" full-width prop="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="确认密码" icon="lock" prop="repassword">
        <mu-text-field v-model="repassword" full-width prop="repassword"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="邀请码" icon="face" prop="invite_code" :rules="inviteCode">
        <mu-text-field v-model="validateForm.invite_code" full-width prop="invite_code"></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="isAgree" :rules="argeeRules" class="mu-agrees">
        <mu-checkbox label="同意" v-model="validateForm.isAgree" class="mu-agrees"></mu-checkbox>
        <span class="mu-agree" @click="show">用户协议</span>
      </mu-form-item>
      <mu-button
        color="primary"
        @click="reg"
        full-width
        large
        v-loading="loading"
        data-mu-loading-size="24"
      >提交</mu-button>
    </mu-form>
    <dialog :openFullscreen='openFullscreen' :title="agreementContent.title"></dialog>
  </div>
</template>
<script>
import { cmnAgreementList } from "@api";
import  Dialog  from "@/components/Dialog";
export default {
  components: {
    Dialog
  },
  data() {
    return {
      validateForm: {
        mobile: "",
        sms_code: "",
        password: "",
        invite_code: ""
      },
      openFullscreen: false,
      repassword: "",
      text: "获取验证码",
      agreementContent: "",
      count: 60,
      disabled: false,
      mobileRules: [
        { validate: val => !!val, message: "必须填写手机号" },
        { validate: val => mobile_reg.test(val), message: "手机号不正确" }
      ],
      smsCode: [{ validate: val => !!val, message: "必须填写验证码" }],
      inviteCode: [{ validate: val => !!val, message: "必须填写邀请码" }],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6,
          message: "密码长度大于6位数"
        }
      ],
      argeeRules: [{ validate: val => !!val, message: "必须同意用户协议" }],
      loading: false
    };
  },
  mounted() {
    this.getAgreement();
  },
  methods: {
    reg() {},
    getCode() {},
    getcaptchaCode() {},
    show(){
        this.openFullscreen=true;
    },
    async getAgreement() {
      let res = await cmnAgreementList();
      var arr = res.data.filter(item => {
        return item.title == "用户协议";
      });
      this.agreementContent = arr[0];
      console.log(res);
    }
  }
};
</script>
<style lang="scss" scoped>
.forms {
  width: 80%;
  margin: auto;
  margin-top: 100px;
}
.mu-agree {
  font-size: 14px;
  color: $blue;
}
.mu-agrees {
  margin-right: 0;
}
</style>

