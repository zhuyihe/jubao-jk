<template>
  <div class="login">
    <v-header :goUrl="{path:'/reg',query:$route.query}" goText="注册" title="登陆"></v-header>
    <mu-form ref="form" :model="validateForm" class="mu-demo-form forms">
      <mu-form-item label="用户名/手机号" prop="mobile" :rules="mobileRules" icon="account_circle">
        <mu-text-field v-model="validateForm.mobile" prop="mobile" label-float></mu-text-field>
      </mu-form-item>
      <mu-form-item label="密码" prop="password" :rules="passwordRules" icon="locked">
        <mu-text-field type="password" v-model="validateForm.password" prop="password" label-float></mu-text-field>
      </mu-form-item>
      <mu-form-item prop="rememberMe" class="mu-check">
        <mu-checkbox label="记住密码" v-model="validateForm.rememberMe"></mu-checkbox>
      </mu-form-item>
      <mu-form-item>
        <mu-button
          color="primary"
          @click="login"
          full-width
          large
          v-loading="loading"
          data-mu-loading-size="24"
        >提交</mu-button>
        <div class="buttons">
          <mu-button flat :to="{path:'/recovery'}">忘记密码</mu-button>
          <mu-button flat color="primary" :to="{path:'/smslogin',query:$route.query}">验证码登陆</mu-button>
        </div>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
import { cmnServiceConfig, cmnChannelLogin } from "@api";
import { setLocalStorage } from "@assets/js/SessionStorage";
import { mobile_reg } from "@assets/js/reg";
import { toast, message } from "@assets/js/common";
export default {
  data() {
    return {
      mobileRules: [
        { validate: val => !!val, message: "必须填写手机号" },
        { validate: val => mobile_reg.test(val), message: "手机号不正确" }
      ],
      passwordRules: [
        { validate: val => !!val, message: "必须填写密码" },
        {
          validate: val => val.length >= 3 && val.length <= 10,
          message: "密码长度大于3小于10"
        }
      ],
      validateForm: {
        mobile: "",
        password: "",
        rememberMe: false
      },
      loading: false
    };
  },
  mounted() {
    this.getTitle();
  },
  methods: {
    getTitle() {
      cmnServiceConfig({ os_type: 8 }).then(res => {
        if (res.err_code == 0) {
          document.title = res.data.app_name;
          setLocalStorage("docTitle", res.data.app_name);
        }
      });
    },
    login() {
      let self = this;
      this.loading = true;
      this.$refs.form.validate().then(result => {
        if (result) {
          let data = {
            mobile: self.validateForm.mobile,
            password: self.validateForm.password
          };
          cmnChannelLogin(data)
            .then(res => {
              this.loading = false;
              let userInfo={
                appname:res.data.app_alias,
                app_id:res.data.app_id,
                app_key:res.data.app_key,
                app_name:res.data.app_name
              }
              console.log(userInfo)
              self.$store.commit('USER_INFO',userInfo)
              self.$store.commit('COMMIT_TOKEN',res.data.access_token)
              self.$router.replace("/dashboard");
            })
            .catch(e => {
              switch (e.err_code) {
                case 113:
                  message("alert", e.err_msg, { okLabel: "去注册" }).then(
                    () => {
                      self.$router.push("/reg");
                    }
                  );
                  break;
                case 1014:
                  message(
                    "alert",
                    "您的账户已被锁定，请联系管理员40080-59680！",
                    { type: "warning", okLabel: "知道了" }
                  );
                  break;
                case 1103:
                  message(
                    "alert",
                    "该用户绑定的平台不存在，请联系管理员40080-59680！",
                    { type: "warning", okLabel: "知道了" }
                  );
                  break;
                default:
                  toast("error", e.err_msg);
              }

              this.loading = false;
            });
        } else {
          this.loading = false;
        }
      });
    },
    // 加密记住用户信息
    rememberUser() {
      if (this.rememberMe) {
        this.setCookie("rmbUser", "true", 30 * 24); //存储一个带 30 天期限的cookie
        this.setCookie("mobile", encodeURI(this.validateForm.mobile), 30 * 24);
        this.setCookie(
          "password",
          encodeURI(this.validateForm.password),
          30 * 24
        );
      } else {
        this.setCookie("rmbUser", "false", -1); //存储一个带 30 天期限的cookie
        this.setCookie("mobile", this.validateForm.mobile, -1);
        this.setCookie("password", this.validateForm.password, -1);
      }
    },
    // 读取选择记住密码的用户信息
    readrmbUser() {
      if (this.getCookie("rmbUser") == "true") {
        this.rememberMe = true;
        this.validateForm.mobile = decodeURI(this.getCookie("mobile"));
        this.validateForm.password = decodeURI(this.getCookie("password"));
      }
    },
    // 存cookie
    setCookie(name, value, time) {
      let hours = time ? time : 4; //单位小时
      let exp = new Date();
      exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
      document.cookie =
        name +
        "=" +
        escape(value) +
        ";expires=" +
        exp.toGMTString() +
        ";path=/";
    },
    // 读cookie
    getCookie(name) {
      let arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
      if ((arr = document.cookie.match(reg))) {
        return unescape(arr[2]);
      } else {
        return null;
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
  width: 90%;
  margin: auto;
  margin-top: 200px;
}
.mu-form-item .mu-button {
  margin: 0;
}
.mu-check {
  padding-left: 18px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>


