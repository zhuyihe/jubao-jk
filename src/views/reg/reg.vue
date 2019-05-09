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
        <mu-text-field v-model="validateForm.password" full-width prop="password" type="password"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="确认密码" icon="lock" prop="repassword">
        <mu-text-field v-model="repassword" full-width prop="repassword" type="password"></mu-text-field>
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
    <Dialogs
      :openFullscreen="openFullscreen"
      :title="agreementContent.title"
      v-on:getOpen="getOpen"
      v-on:goNext="goNext"
      :html="agreementContent.content"
    ></Dialogs>
  </div>
</template>
<script>
import { cmnAgreementList, cmnSmsSend, cmnChannelReg } from "@api";
import Dialogs from "@/components/Dialog";
import { mobile_reg } from "@assets/js/reg";
import { toast } from "@assets/js/common";
export default {
  components: {
    Dialogs
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
    reg() {
      this.loading = true;
      let self = this;
      this.$refs.form.validate().then(result => {
        if (result) {
          if (self.validateForm.password === self.repassword) {
            cmnChannelReg(this.validateForm)
              .then(res => {
                self.loading = false;
                let userInfo = {
                  appname: res.data.app_alias,
                  app_id: res.data.app_id,
                  app_key: res.data.app_key,
                  app_name: res.data.app_name
                };
                self.$store.commit("USER_INFO", userInfo);
                self.$store.commit("COMMIT_TOKEN", res.data.access_token);
                self.$router.replace("/dashboard");
              })
              .catch(e => {
                self.loading = false;
                toast("error", e.err_msg);
              });
          } else {
            toast("error", "密码不一致，请检查。");
            self.loading = false;
          }
        } else {
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
    },
    show() {
      this.openFullscreen = true;
    },
    getOpen(data) {
      this.openFullscreen = !data;
    },
    goNext(data) {
      if (data == true) {
        this.openFullscreen = !data;
      }
    },
    async getAgreement() {
      let res = await cmnAgreementList();
      var arr = res.data.filter(item => {
        return item.title == "用户协议";
      });
      this.agreementContent = arr[0];
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

