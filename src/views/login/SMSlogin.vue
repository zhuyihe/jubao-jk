<template>
  <div class="login">
    <v-header
      :backUrl="{path:'/login',query:$route.query}"
      :goUrl="{path:'/reg',query:$route.query}"
      goText="注册"
      title="验证码登陆"
    ></v-header>
    <mu-form ref="form" class="mu-demo-form forms" :model="validateForm">
      <mu-form-item :rules="mobileRules" label="请输入电话号码" icon="phone" prop="mobile">
        <mu-text-field v-model="validateForm.mobile" full-width prop="mobile"></mu-text-field>
      </mu-form-item>
      <br>
      <mu-form-item :rules="smsCode" label="输入验证码" icon="sms" prop="sms_code">
        <mu-text-field v-model="validateForm.sms_code" full-width prop="sms_code">
          <mu-button color="info" small round @click="getCode" :disabled="disabled">{{text}}</mu-button>
        </mu-text-field>
      </mu-form-item>
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
import { cmnSmsSend, cmnChannelLogin } from "@api";
import { toast } from "@assets/js/common";
export default {
  data() {
    return {
      validateForm: {
        mobile: "",
        sms_code: ""
      },
      text: "获取验证码",
      count: 60,
      disabled: false,
      mobileRules: [
        { validate: val => !!val, message: "必须填写手机号" },
        { validate: val => mobile_reg.test(val), message: "手机号不正确" }
      ],
      smsCode: [{ validate: val => !!val, message: "必须填写验证码" }],
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$refs.form.validate().then(result => {
        if (result) {
          cmnChannelLogin(this.validateForm)
            .then(res => {
              console.log(res);
              let userInfo = {
                app_alias: res.data.app_alias,
                app_id: res.data.app_id,
                app_key: res.data.app_key,
                app_name: res.data.app_name
              };
              this.$store.commit("USER_INFO", userInfo);
              this.$store.commit("COMMIT_TOKEN", res.data.access_token);
              this.$router.push("/dashboard");
            })
            .catch(e => {
              this.loading = false;
              toast("error", e.err_msg);
            });
        } else {
          this.loading = false;
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
.login {
  background: $white;
}
.forms {
  width: 80%;
  margin: auto;
  margin-top: 200px;
}
</style>
