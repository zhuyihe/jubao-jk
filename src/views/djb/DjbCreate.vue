<template>
  <div class="djb">
    <v-header title="投保信息填写" class="header"></v-header>
    <div class="main mu-main">
      <mu-snackbar color="info" :open.sync="open">
        <mu-icon left value="info"></mu-icon>已是会员?
        <mu-button flat slot="action" color="#fff" @click="gologin">立即登陆</mu-button>
      </mu-snackbar>
      <mu-list>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">投保人</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="text"
                  placeholder="与被保险人一致"
                  readonly
                  :value="form.beneficiary"
                >
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell weui-cells_form">
              <div class="weui-cell__hd">
                <label class="weui-label">选择方式</label>
              </div>
              <div class="weui-cell__bd">
                <mu-radio v-model="radio" value="first" label="填写" :disabled="disabled"></mu-radio>
                <mu-radio v-model="radio" value="second" label="选择" :disabled="disabled"></mu-radio>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content v-if="radio=='first'">
            <div class="weui-cell weui-cells_form">
              <div class="weui-cell__hd">
                <label class="weui-label">被保险人</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="text"
                  placeholder="请输入被保险人"
                  v-model.trim="form.beneficiary"
                  :class="{red:!reg_company.test(form.beneficiary)}"
                >
              </div>
            </div>
          </mu-list-item-content>
          <mu-list-item-content v-else>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
              <div class="weui-cell__hd">
                <label class="weui-label">被保险人</label>
              </div>
              <div class="weui-cell__bd">
                <select class="weui-select" v-model="form.customer_id">
                  <option :value="''">未选择</option>
                  <option
                    v-for="(val,idx) in customerList"
                    :key="idx"
                    :value="val.id"
                  >{{val.company_name}}</option>
                </select>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">货车类型</label>
              </div>
              <div class="weui-cell__bd">
                <mu-button
                  flat
                  small
                  class="putong"
                  :class="{active:form.truck_type==2}"
                  @click="form.truck_type=2"
                >普通货车</mu-button>
                <mu-button
                  flat
                  small
                  class="putong"
                  :class="{active:form.truck_type==1}"
                  @click="form.truck_type=1"
                >带挂货车</mu-button>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">头车牌号</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="text"
                  :placeholder="form.truck_type==1?'请填写头车牌号':'请填写车牌号'"
                  v-model.trim="form.plate_no"
                  :class="{red:!carId.test(form.plate_no)}"
                >
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx" v-if="form.truck_type==1">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">挂车牌号</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="text"
                  placeholder="请输入挂车牌号"
                  v-model.trim="form.plate_extra_no"
                >
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider v-if="form.truck_type==1"></mu-divider>
        <mu-list-item button :ripple="false" class="felx fles">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">始发地</label>
              </div>
              <div class="weui-cell__bd">
                <select class="weui-select" v-model="form.start_province">
                  <option :value="''">请选择省份</option>
                  <option v-for="(val,idx) in provinceList" :value="val" :key="idx">{{val}}</option>
                </select>
                <select class="weui-select" v-model="form.start_city">
                  <option :value="''">请选择城市</option>
                  <option
                    v-for="(val,idx) in startCityList"
                    :value="val.city"
                    :key="idx"
                  >{{val.city}}</option>
                </select>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx fles">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">目的地</label>
              </div>
              <div class="weui-cell__bd">
                <select class="weui-select" v-model="form.end_province">
                  <option :value="''">请选择省份</option>
                  <option v-for="(val,idx) in provinceList" :value="val" :key="idx">{{val}}</option>
                </select>
                <select class="weui-select" v-model="form.end_city">
                  <option :value="''">请选择城市</option>
                  <option v-for="(val,idx) in endCityList" :value="val.city" :key="idx">{{val.city}}</option>
                </select>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell weui-cell_select weui-cell_select-after">
              <div class="weui-cell__hd">
                <label class="weui-label">货物类别</label>
              </div>
              <div class="weui-cell__bd">
                <select class="weui-select" v-model="form.goodsType">
                  <option :value="''">未选择</option>
                  <option v-for="(val,idx) in goodsNameList" :key="idx" :value="val">{{val}}</option>
                </select>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">保险金额(万元)</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="number"
                  :placeholder="'保额不超过'+(max_coverage/10000)+'万元'"
                  v-model="form.coverage"
                  @blur="countPrice"
                >
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">保险费率</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="text"
                  readonly
                  :value="rate ? (rate/10000)+'%' : '--'"
                >
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">最低保费</label>
              </div>
              <div class="weui-cell__bd">
                <input class="weui-input" type="text" readonly :value="`${min_premium}元`">
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <mu-checkbox v-model="select" label="增加放弃向承运商追偿" @change="selected"></mu-checkbox>
          </mu-list-item-content>
          <mu-list-item-action>增加{{(form.coverage*0.3).toFixed(2)}}元</mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <mu-checkbox v-model="select1" label="增加三个以内共同被保险人" @change="selected1"></mu-checkbox>
          </mu-list-item-content>
          <mu-list-item-action v-if="select2">增加{{(form.coverage*0.6).toFixed(2)}}元</mu-list-item-action>
          <mu-list-item-action v-else>增加{{(form.coverage*0.3).toFixed(2)}}元</mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <div class="baoxianren" v-if="select1">
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人一</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    class="weui-input"
                    type="text"
                    placeholder="请输入被保险人名称"
                    v-model.trim="addOne"
                  >
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人二</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    class="weui-input"
                    type="text"
                    placeholder="请输入被保险人名称"
                    v-model.trim="addTwo"
                  >
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人三</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    class="weui-input"
                    type="text"
                    placeholder="请输入被保险人名称"
                    v-model.trim="addThree"
                  >
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
        </div>
        <mu-divider v-if="select1"></mu-divider>
        <mu-list-item button :ripple="false" class="felx" v-if="select1">
          <mu-list-item-content class="addStress">
            <mu-checkbox v-model="select2" label="再增加三个以内共同被保险人" @change="selected2"></mu-checkbox>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider v-if="select1"></mu-divider>
        <div class="baoxianren" v-if="select2">
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人一</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    class="weui-input"
                    type="text"
                    placeholder="请输入被保险人名称"
                    v-model.trim="addAgainOne"
                  >
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider v-if="select2"></mu-divider>
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人二</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    class="weui-input"
                    type="text"
                    placeholder="请输入被保险人名称"
                    v-model.trim="addAgainTwo"
                  >
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人三</label>
                </div>
                <div class="weui-cell__bd">
                  <input
                    class="weui-input"
                    type="text"
                    placeholder="请输入被保险人名称"
                    v-model.trim="addAgainThree"
                  >
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
        </div>
        <mu-divider v-if="select2"></mu-divider>
        <div class="tabs">
          <mu-tabs
            :value.sync="active"
            ripple="true"
            indicator-color="#409EFF"
            text-color="#409EFF"
            color="white"
            @change="tabs(active)"
            full-width
          >
            <mu-tab>单票投</mu-tab>
            <mu-tab>整车投</mu-tab>
          </mu-tabs>
          <mu-divider></mu-divider>
          <div class="danpiao" v-if="active === 0">
            <mu-list-item button :ripple="false" class="felx">
              <mu-list-item-content>
                <div class="weui-cell">
                  <div class="weui-cell__hd">
                    <label class="weui-label">运单号</label>
                  </div>
                  <div class="weui-cell__bd">
                    <input
                      class="weui-input"
                      type="text"
                      placeholder="请输入运单号"
                      v-model="form.track_no"
                    >
                  </div>
                </div>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
            <mu-list-item button :ripple="false" class="felx">
              <mu-list-item-content>
                <div class="weui-cell">
                  <div class="weui-cell__hd">
                    <label class="weui-label">货物名称</label>
                  </div>
                  <div class="weui-cell__bd">
                    <input
                      class="weui-input"
                      type="text"
                      placeholder="请输入货物名称"
                      v-model="form.cargo_name"
                    >
                  </div>
                </div>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
            <mu-list-item button :ripple="false" class="felx">
              <mu-list-item-content>
                <div class="weui-cell">
                  <div class="weui-cell__hd">
                    <label class="weui-label">数量单位</label>
                  </div>
                  <div class="weui-cell__bd">
                    <input
                      class="weui-input"
                      type="text"
                      placeholder="请输入数量和单位如10吨、20件"
                      v-model="form.quantity"
                    >
                  </div>
                </div>
              </mu-list-item-content>
            </mu-list-item>
          </div>
          <div class="zhengche" v-if="active === 1">
            <div class="upload-excel">
              <upload :maxLimit="10" v-model="form.cargo_file_urls" :url="fileUrl"></upload>
            </div>
            <div class="tip">温馨提示：请上传装车清单照片</div>
          </div>
        </div>
        <mu-divider></mu-divider>
      </mu-list>
      <div class="agresss">
        <div class="check">
          <mu-checkbox v-model="agree" value="eat"></mu-checkbox>
        </div>
        <div class="neirong">
          我已阅读并同意
          <span class="blue" @click.stop="getAgree('公路货物运输保险条款',1)">《公路货物运输保险条款》</span>
          <span class="blue" @click.stop="getAgree('投保须知',1)">《投保须知》</span>
          <span class="blue" @click.stop="getAgree('大地保险公司服务信息披露')">《大地保险公司服务信息披露》</span>
          <span class="blue" @click.stop="getAgree('保险经纪委托协议')">《保险经纪委托协议》</span>
          <span class="blue" @click.stop="getAgree('客户告知书')">《客户告知书》</span>
        </div>
      </div>
      <mu-divider></mu-divider>
      <ul class="bottom" v-if="!open">
        <li class="mon">￥{{(form.price/100).toFixed(2)}}</li>
        <li class="button">
          <mu-button color="info" @click="next()">下一步</mu-button>
        </li>
      </ul>
    </div>
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
const upload = () => import("@/components/weuiUpload/weuiUpload");
import { login } from "@/mixins/login.js";
import { reg_company, carId } from "@assets/js/reg";
import {
  allProvinceList,
  cmnProductpriceList,
  cmnCityList,
  dchybOrderPrice,
  cmnAdminAgreementList,
  cmnChannelUserList,
  cmnDchybChannelSave
} from "@api";
import { toast, debounce } from "@assets/js/common";
import Dialogs from "@/components/Dialog";
export default {
  components: {
    upload,
    Dialogs
  },
  data() {
    return {
      open: false, //未登录提示登录
      productName: "大件保",
      form: {
        id: "", //	id为0，创建新订单；id不为0，修改已有订单
        price_id: "",
        beneficiary: "", //被保险人
        truck_type: 2, //货车类型 2普通 1带挂
        plate_extra_no: "", //挂车牌号
        plate_no: "", //头车牌号
        start_province: "", //始发地省份
        start_city: "", //始发地市
        end_province: "", //目的地省份
        end_city: "", //目的地市
        goodsType: "", //货物类别
        coverage: "", //保险金额
        track_no: "", //运单号
        cargo_name: "", //货物名称
        quantity: "", //货物重量
        cargo_file_urls: [], //图片数组
        customer_id: "", //客户id
        type: 1, //1单票 2整车
        price: "", //价格 单位分
        co_beneficiary: "", //共同被保险人，最多6个，以中文顿号（、）分隔；
        add_waiver_of_recovery_from_carrier: false //增加放弃向承运商追偿
      },
      rate: "", //费率
      min_premium: "", //最低保费
      max_coverage: "", //最大保额
      min_coverage: "", //最小保额
      select: false,
      select1: false,
      select2: false,
      agree: false,
      addOne: "",
      addTwo: "",
      addThree: "",
      addAgainOne: "",
      addAgainTwo: "",
      addAgainThree: "",
      active: 0, //tab
      reg_company: reg_company,
      carId: carId, //车牌正则
      fileUrl: "", //图片上传地址
      provinceList: [],
      goodsTypeList: [],
      goodsNameList: [],
      startCityList: [],
      endCityList: [],
      agreementContent: "",
      openFullscreen: false,
      radio: "first",
      customerList: [],
      disabled: false
    };
  },
  mounted() {
    this.fileUrl = process.env.VUE_APP_FILE_URL;
    this.initData();
  },
  mixins: [login],
  watch: {
    //监听对象中的某个属性
    async "form.start_province"(val, oldVal) {
      if (!val) return;
      let res = await cmnCityList({ province: val });
      console.log(res);
      if (res.err_code !== 0) {
        toast("error", res.err_msg || "未知错误");
        return;
      }
      this.startCityList = res.data;
      if (oldVal) {
        this.form.start_city = "";
      }
    },
    async "form.end_province"(val, oldVal) {
      if (!val) return;
      let res = await cmnCityList({ province: val });
      if (res.err_code !== 0) {
        toast("error", res.err_msg || "未知错误");
        return;
      }
      this.endCityList = res.data;
      if (oldVal) {
        this.form.end_city = "";
      }
    },
    "form.goodsType"(val, oldVal) {
      var obj = this.goodsTypeList.find(item => {
        return item.name == val;
      });
      this.rate = obj.rate;
      this.min_premium = obj.min_premium;
      this.max_coverage = obj.max_coverage;
      this.min_coverage =
        Math.ceil(this.min_premium / (this.rate / 1000000)) / 10000;
      this.form.price_id = obj.id;
      this.form.price = this.rate * this.form.coverage; //动态计算价格
      console.log(this.form.price);
      this.countPrice();
      // console.log(
      //   this.rate,
      //   this.min_premium,
      //   this.max_coverage,
      //   this.min_coverage,
      //   this.form.price_id
      // );
    },
    "form.customer_id"(val, oldVal) {
      if (val != "") {
        let beneficiary = this.customerList.filter(item => {
          return val == item.id;
        });
        this.form.beneficiary = beneficiary[0].company_name;
      }
    },
    radio(val, old) {
      this.form.customer_id = "";
      this.form.beneficiary = "";
    }
  },
  methods: {
    async initData() {
      let res = await Promise.all([
        allProvinceList(),
        cmnProductpriceList({ product_name: this.productName }),
        cmnChannelUserList({ product_name: this.productName })
      ]);
      if (res[0].err_code === 0) {
        this.provinceList = res[0].data;
      } else {
        toast("error", res[0].err_msg || "未知错误");
      }
      //保额列表
      if (res[1].err_code === 0) {
        if (res[1].rows[0]) {
          res[1].rows = res[1].rows.sort(this.compare("rate"));
          res[1].rows.forEach(item => {
            if (item.name.indexOf("-") == -1)
              this.goodsNameList.push(item.name);
          });
          this.goodsTypeList = res[1].rows;
          this.rate = res[1].rows[0].rate;
          this.min_premium = res[1].rows[0].min_premium;
          this.max_coverage = res[1].rows[0].max_coverage;
          this.min_coverage =
            Math.ceil(this.min_premium / (this.rate / 1000000)) / 10000;
          this.form.price_id = res[1].rows[0].id;
        }
      }
      //客户列表
      if (res[2].err_code === 0) {
        if (res[2].rows.length == 0) {
          this.disabled = true;
        } else {
          this.customerList = res[2].rows.filter(item => {
            return item.company_name;
          });
        }
      } else {
        toast("error", res[0].err_msg || "未知错误");
      }
    },
    selected() {
      if (this.select) {
        this.form.add_waiver_of_recovery_from_carrier = true;
      } else {
        this.form.add_waiver_of_recovery_from_carrier = false;
      }
      this.countPrice();
    },
    selected1() {
      this.countPrice();
    },
    selected2() {
      if (!this.addOne || !this.addTwo || !this.addThree) {
        toast("error", "请先填写上方的被保险人！");
        this.select2 = false;
      } else {
        this.countPrice();
      }
    },
    //计算价格
    countPrice: debounce(async function() {
      if (this.form.goodsType == "" || !this.form.goodsType) {
        toast("error", "请选择货物类别！");
        return;
      }
      if (!this.form.coverage) {
        this.form.price = 0;
        return;
      }
      if (this.form.coverage < 0) {
        toast("error", "您输入的保险金额有误！");
        return;
      }
      if (this.form.coverage > this.max_coverage / 10000) {
        toast(
          "error",
          "保险金额不得超过" + this.max_coverage / 10000 + "万元！"
        );
        this.form.coverage = 300;
      }
      if (this.form.coverage < this.min_coverage) {
        this.form.coverage = this.min_coverage;
      }
      let res = await dchybOrderPrice({
        price_id: this.form.price_id,
        coverage: (this.form.coverage * 10000) | 0
      });
      if (res.err_code === 0) {
        if (this.select) {
          if (this.select1) {
            if (this.select2) {
              this.form.price = res.price + this.form.coverage * 90;
            } else {
              this.form.price = res.price + this.form.coverage * 60;
            }
          } else {
            this.form.price = res.price + this.form.coverage * 30;
          }
        } else if (!this.select) {
          if (this.select1) {
            if (this.select2) {
              this.form.price = res.price + this.form.coverage * 60;
            } else {
              this.form.price = res.price + this.form.coverage * 30;
            }
          } else {
            this.form.price = res.price;
          }
        } else {
          this.form.price = res.price;
        }
      } else {
        toast("error", res.err_msg || "未知错误");
      }
    }, 400),
    next() {
      if (!this.checkData()) return;
      this.getAgree("不保货物", 1);
    },
    checkData() {
      let errMsg = [];
      if (!this.form.beneficiary) errMsg.push("请填写或者选择被保险人");
      if (!this.reg_company.test(this.form.beneficiary))
        errMsg.push("被保险人名称格式有误！");
      if (!this.form.plate_no) errMsg.push("请输入运输车辆的车牌号码！");
      if (!this.carId.test(this.form.plate_no))
        errMsg.push("运输车辆的车牌号码格式有误！");
      if (this.form.truck_type === 1 && !this.form.plate_extra_no)
        errMsg.push("带挂货车请输入运输车辆的挂车牌号码！");
      if (
        !this.form.start_province ||
        !this.form.start_city ||
        !this.form.end_province ||
        !this.form.end_city
      )
        errMsg.push("请选择本次路线的始发地和目的地！");
      if (!this.form.goodsType) errMsg.push("请选择货物类别！");
      if (!this.form.coverage) errMsg.push("请输入保险金额！");
      if (this.form.coverage < 0) errMsg.push("您输入的保险金额有误！");
      if (this.form.coverage > this.max_coverage / 10000)
        errMsg.push("保险金额不得超过" + this.max_coverage / 10000 + "万！");
      if (this.active === 0 && !this.form.track_no)
        errMsg.push("单票投请输入运单号！");
      if (this.active === 0 && !this.form.cargo_name)
        errMsg.push("单票投请输入货物名称！");
      if (this.active === 0 && !this.form.quantity)
        errMsg.push("单票投请输入数量和单位！");
      if (this.active === 1 && this.form.cargo_file_urls.length === 0)
        errMsg.push("请上传装车清单照片！");
      if (!this.agree) errMsg.push("请阅读并勾选相关协议！");
      if (errMsg.length > 0) {
        toast("error", errMsg[0]);
        return false;
      }
      return true;
    },
    tabs(value) {
      if (value == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    compare(property) {
      return function(a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    //接受子组件传过来的数据
    getOpen(data) {
      this.openFullscreen = !data;
    },
    goNext(data) {
      if (data == true) {
        this.openFullscreen = !data;
      } else {
        //创建订单
        this.openFullscreen = !data.openFullscreen;
        this.cteateOrder();
      }
    },
    cteateOrder() {
      let cargo = {};
      if (this.form.type === 1) {
        //按票
        cargo = {
          track_no: this.form.track_no,
          cargo_name: this.form.cargo_name,
          quantity: this.form.quantity
        };
      } else {
        //按车
        cargo.cargo_file_urls = this.form.cargo_file_urls;
      }
      let data = {
        id: this.form.id ? this.form.id * 1 : 0,
        price_id: this.form.price_id,
        beneficiary: this.form.beneficiary,
        coverage: (this.form.coverage * 10000) | 0, //与后台对接的单位是元，页面显示的默认单位是万元；
        price: parseInt(this.form.price),
        type: this.form.type,
        plate_no: this.form.plate_no,
        plate_extra_no: this.form.plate_extra_no,
        start_province: this.form.start_province,
        start_city: this.form.start_city,
        end_province: this.form.end_province,
        end_city: this.form.end_city,
        add_waiver_of_recovery_from_carrier: this.form
          .add_waiver_of_recovery_from_carrier,
        ...cargo
      };
      if (this.form.customer_id) {
        data.customer_id = this.form.customer_id;
      }
      if (this.select1) {
        if (this.addOne) {
          data.co_beneficiary = this.addOne;
        }
        if (this.addTwo && this.addTwo) {
          data.co_beneficiary = this.addOne + "、" + this.addTwo;
        }
        if (this.addTwo && this.addTwo && this.addThree) {
          data.co_beneficiary =
            this.addOne + "、" + this.addTwo + "、" + this.addThree;
        }
        if (this.addTwo && this.addTwo && this.addThree && this.addAgainOne) {
          data.co_beneficiary =
            this.addOne +
            "、" +
            this.addTwo +
            "、" +
            this.addThree +
            "、" +
            this.addAgainOne;
        }
        if (
          this.addTwo &&
          this.addTwo &&
          this.addThree &&
          this.addAgainOne &&
          this.addAgainTwo
        ) {
          data.co_beneficiary =
            this.addOne +
            "、" +
            this.addTwo +
            "、" +
            this.addThree +
            "、" +
            this.addAgainOne +
            "、" +
            this.addAgainTwo;
        }
        if (
          this.addTwo &&
          this.addTwo &&
          this.addThree &&
          this.addAgainOne &&
          this.addAgainTwo &&
          this.addAgainThree
        ) {
          data.co_beneficiary =
            this.addOne +
            "、" +
            this.addTwo +
            "、" +
            this.addThree +
            "、" +
            this.addAgainOne +
            "、" +
            this.addAgainTwo +
            "、" +
            this.addAgainThree;
        }
      }
      const loading = this.$loading({
        text: "订单创建中......"
      });
      cmnDchybChannelSave(data)
        .then(res => {
          console.log(res);
          setTimeout(() => {
            loading.close();
          }, 2000);
        })
        .catch(e => {
          console.log(e.err_msg);
          loading.close();
        });
    },
    async getAgree(title, price) {
      let data = { title };
      if (price) {
        data.price_id = this.form.price_id;
      }
      let res = await cmnAdminAgreementList(data);
      if (res.err_code === 0) {
        this.agreementContent = res.rows[0];
        this.openFullscreen = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.djb {
  padding-bottom: 150px;
}
.header {
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
}
.tabs .mu-tabs {
  padding: 0 30px;
}
.tabs .mu-tab {
  color: $black;
}
.tabs .mu-tab-active {
  color: $blue;
}
.blue {
  color: $blue;
}
.mu-main {
  margin-top: 50px;
  padding-bottom: 0;
}
.mu-form-item {
  margin-bottom: 0;
  padding-bottom: 0;
}
.felx {
  font-size: 32px;
  .putong {
    border-radius: 30px;
    border: 1px solid #999;
    color: #999;
    margin-left: 10px;
  }
  .active {
    color: #2196f3;
    border: 1px solid #2196f3;
  }
  //   background: white;
}
.fles {
  .weui-cell {
    padding-right: 0;
  }
  select {
    width: 220px;
    padding-left: 0;
  }
}
.weui-label {
  width: 120px;
}
.addStress {
  text-align: center;
}
.zhengche {
  padding: 0 20px;
  .tip {
    font-size: 32px;
  }
}
.agresss {
  background: white;
  display: flex;
  font-size: 30px;
  align-items: center;
  padding: 20px 0;
  .check {
    width: 10%;
    text-align: right;
    margin-right: 20px;
  }
  .neirong {
    width: 80%;
  }
}
.bottom {
  width: 100%;
  height: 100px;
  position: fixed;
  bottom: 0;
  display: flex;
  z-index: 100000;
  li {
    width: 50%;
    list-style: none;
    .mu-raised-button {
      width: 100%;
      height: 100%;
    }
  }
  .mon {
    text-align: center;
    background: white;
    line-height: 100px;
    color: #ff6633;
    font-size: 38px;
    font-weight: bold;
  }
}
.red {
  color: red;
}
</style>
