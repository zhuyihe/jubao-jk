<template>
  <div class="addAddress">
    <mu-appbar style="width: 100%;" class="navbar">
      <mu-button icon slot="left" :to="backUrl">
        <mu-icon value="arrow_back"></mu-icon>
      </mu-button>添加地址
      <mu-button slot="right" flat class="baocun" @click="save">保存</mu-button>
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
      <mu-form-item label="所在地区" >
        <mu-text-field  @click="addressPicker" v-model="address"></mu-text-field>
      </mu-form-item>
      <mu-form-item label="详细地址" prop="street" :rules="streetRule">
        <mu-text-field multi-line :rows="3" :rows-max="6" v-model="validateForm.street"  prop="street"></mu-text-field>
      </mu-form-item>
    </mu-form>
  </div>
</template>
<script>
import dataList from '@assets/js/cityData'
import { mobile_reg } from "@assets/js/reg";
import { toast } from "@assets/js/common";
import { cmnUseraddressAdd } from "@api";
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
  mounted(){
    //编辑
    if(JSON.stringify(this.$route.query)!='{}'){
        this.init(this.$route.query)
    }
  },
  data() {
    return {
      mobileRules: [
        { validate: val => !!val, message: "必须填写联系电话" },
        { validate: val => mobile_reg.test(val), message: "手机号不正确" }
      ],
      perRuls: [{ validate: val => !!val, message: "请填写收件人" }],
      streetRule: [{ validate: val => !!val, message: "请填写详细地址" }],
      validateForm: {
        id:'',
        mobile: "",
        recipients: "",
        province: "",
        city: "",
        district: "",
        street: ""
      },
      address:"",
      loading: false
    };
  },
  methods: {
    init(item){
        this.validateForm.mobile=item.mobile
        this.validateForm.recipients=item.recipients
        this.validateForm.street=item.street
        this.validateForm.province=item.province
        this.validateForm.city=item.city
        this.validateForm.district=item.district
        this.address=item.province +'-'+item.city+'-'+item.district
        this.validateForm.id=item.id
    },
    addressPicker() {
      let vm = this;
      weui.picker(dataList.dataList, {
        showDistrict: true,
        defaultValue: ["北京", "北京市", "东城区"],
        onChange: function(result) {
          // console.log(result)  // 可选 
        },
        onConfirm: function(result) {
          vm.validateForm.province = result[0].label;
          vm.validateForm.city = result[1].label;
          vm.validateForm.district = result[2].label;
          vm.address=vm.validateForm.province +'-'+vm.validateForm.city+'-'+vm.validateForm.district
        }
      });
    },
    save(){
      let self=this;
      this.$refs.form.validate().then(result=>{
        if(result){
          if(self.address){
            if(!this.validateForm.id) delete this.validateForm.id
            cmnUseraddressAdd(this.validateForm).then(res=>{
              toast("success", '地址添加成功');
              history.go(-1)
            }).catch(e=>{
              toast("error", e.err_code);
            })
          }else{
            toast("error", '请选择地址');
          }
        }
      })
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
