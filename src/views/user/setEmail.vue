<template>
  <div class="setTel">
    <v-header title="我的手机号"></v-header>
    <mu-form ref="form" class="mu-demo-form forms" :model="validateForm">
      <mu-form-item label="您现在的邮箱为" icon="email">
        <mu-text-field v-model="oldemail" full-width disabled></mu-text-field>
      </mu-form-item>
      <mu-form-item :rules="mobileRules" label="请输入邮箱" icon="email" prop="email">
        <mu-text-field v-model="validateForm.email" full-width prop="email"></mu-text-field>
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
import { cmnUserInfo, cmnUserUpdate } from "@api";
import { email_reg } from "@assets/js/reg";
import { toast } from "@assets/js/common";
export default {
  data() {
    return {
      validateForm: {
        email: ""
      },
      oldemail: "",
      disabled: false,
      mobileRules: [
        { validate: val => !!val, message: "必须填写邮箱" },
        { validate: val => email_reg.test(val), message: "请输入正确的邮箱" }
      ],
      loading: false
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      let res = await cmnUserInfo();
      if (res.err_code === 0) {
        if (res.data.email) {
          this.oldemail = res.data.email;
        } else {
          this.oldemail = "您暂时还没有绑定有邮箱！";
        }
      }
    },
    reg() {
      this.loading = true;
      let self = this;
      this.$refs.form.validate().then(result => {
        console.log(result);
        if (result) {
          cmnUserUpdate(this.validateForm)
            .then(res => {
              toast("success", "邮箱绑定成功");
              self.loading = false;
              this.$router.push("/dashboard");
            })
            .catch(e => {
              self.loading = false;
              toast("error", e.err_msg);
            });
        } else {
          self.loading = false;
        }
      });
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
