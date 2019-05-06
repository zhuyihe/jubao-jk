<template>
  <div class="reg">
    <v-header title="重置密码"></v-header>
    <mu-form ref="form" class="mu-demo-form forms" :model="validateForm">
      <mu-form-item :rules="mobileRules" label="请输入电话号码" icon="phone" prop="mobile">
        <mu-text-field v-model="validateForm.mobile" full-width prop="mobile"></mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="smsCode" label="输入验证码" icon="sms" prop="sms_code">
        <mu-text-field v-model="validateForm.sms_code" full-width prop="sms_code">
          <mu-button color="info" small round @click="getCode" :disabled="disabled">{{text}}</mu-button>
        </mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="passwordRules" label="请输入密码" icon="lock_open" prop="login_password">
        <mu-text-field v-model="validateForm.login_password" full-width prop="login_password" type="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="确认密码" icon="lock" prop="repassword">
        <mu-text-field v-model="repassword" full-width prop="repassword" type="password"></mu-text-field>
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
  </div>
</template>
<script>
import { cmnUserRecover, cmnSmsSend } from "@api";
import { mobile_reg } from "@assets/js/reg";
import { toast } from "@assets/js/common";
export default {
  data() {
    return {
      validateForm: {
        mobile: "",
        sms_code: "",
        login_password: "",
      },
      repassword: "",
      text: "获取验证码",
      count: 60,
      disabled: false,
      mobileRules: [
        { validate: val => !!val, message: "必须填写手机号" },
        { validate: val => mobile_reg.test(val), message: "手机号不正确" }
      ],
      smsCode: [{ validate: val => !!val, message: "必须填写验证码" }],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 6,
          message: "密码长度大于6位数"
        }
      ],
      loading: false
    };
  },
  methods: {
    reg() {
      this.loading = true;
      let self = this;
      this.$refs.form.validate().then(result => {
        if (result) {
          if (self.validateForm.login_password === self.repassword) {
            cmnUserRecover(this.validateForm)
              .then(res => {
                self.loading = false;
                this.$router.push("/login");
              })
              .catch(e => {
                self.loading = false;
                toast("error", e.err_msg);
              });
          } else {
            toast("error", "密码不一致，请检查。");
            self.loading = false;
          }
        }else{
          self.loading = false;
        }
      });
    },
    getCode() {
      let self = this;
      if (mobile_reg.test(this.validateForm.mobile)) {
        let data = {
          mobile: this.validateForm.mobile
        };
        this.disabled = true;
        cmnSmsSend(data).then(res => {
          toast("success", "短信验证码发送成功,请在60秒内输入");
          self.text = "获取验证码(" + self.count + ")";
          let timer = null;
          timer = setInterval(() => {
            self.count--;
            if (self.count === 0) {
              self.text = "获取验证码";
              console.log(self.count);
              clearInterval(timer);
              self.disabled = false;
              self.count = 60;
            } else {
              self.text = "获取验证码(" + self.count + ")";
            }
          }, 1000);
          console.log(res);
        });
      } else {
        toast("error", "请输入正确的手机号");
      }
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
  font-size: 14px;
}
.mu-dialog {
  box-shadow: none !important;
}
</style>

