<template>
  <div class="addAddress">
    <mu-appbar style="width: 100%;" class="navbar">
      <mu-button icon slot="left" :to="backUrl">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>添加地址
      <mu-button slot="right" flat class="baocun">保存</mu-button>
    </mu-appbar>
    <mu-form
      ref="form"
      :model="validateForm"
      class="mu-demo-form forms"
      label-position="right"
      label-width="100"
    >
      <mu-form-item label="收件人" prop="recipients" :rules="perRuls">
        <mu-text-field v-model="validateForm.recipients" prop="recipients"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="联系电话" prop="mobile" :rules="mobileRules">
        <mu-text-field v-model="validateForm.mobile" prop="mobile"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="所在地区" prop="mobile" :rules="addressRule">
        <mu-text-field v-model="validateForm.mobile" prop="mobile"></mu-text-field>
      </mu-form-item>
      <div @click="addressPicker">aaaa</div>
      <mu-form-item label="详细地址" prop="mobile" :rules="streetRule">
        <mu-text-field multi-line :rows="3" :rows-max="6" v-model="validateForm.street"></mu-text-field>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
const dataList = () => import("@assets/js/cityData");
const weui = () => import("@/components/weui.js");
import "@assets/css/weui.min.css";
export default {
  computed: {
    backUrl() {
      if (this.$store.state.routerFrom.path.toLowerCase().includes("create")) {
        return "/dashboard";
      } else {
        return this.$store.state.backUrl;
      }
    }
  },
  data() {
    return {
      mobileRules: [
        { validate: val => !!val, message: "必须填写联系电话" },
        { validate: val => mobile_reg.test(val), message: "手机号不正确" }
      ],
      perRuls: [{ validate: val => !!val, message: "请填写收件人" }],
      addressRule: [{ validate: val => !!val, message: "请选择地区" }],
      streetRule: [{ validate: val => !!val, message: "请填写详细地址" }],
      validateForm: {
        mobile: "",
        recipients: "",
        province: "",
        city: "",
        district: "",
        street: ""
      },
      loading: false
    };
  },
  mounted() {
    // weui.alert("alert");
  },
  methods: {
    async addressPicker() {
      let _weui = await weui();
      let _dataList = await dataList();
      let vm = this;
      weui.picker(_dataList, {
        showDistrict: true,
        defaultValue: ["北京", "北京市", "东城区"],
        onChange: function(result) {
          // console.log(result)  // 可选
        },
        onConfirm: function(result) {
          vm.addressPro = result[0].label;
          vm.addressCity = result[1].label;
          vm.addressDis = result[2].label;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  text-align: center;
}
.baocun {
  color: $blue;
}
.forms {
  width: 90%;
  margin: auto;
  margin-top: 100px;
}
.mu-input {
  width: 250px;
}
</style>
