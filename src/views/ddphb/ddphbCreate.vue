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
                <mu-radio
                  v-model="radio"
                  value="first"
                  label="填写"
                  :disabled="disabled"
                  @change="radios"
                ></mu-radio>
                <mu-radio
                  v-model="radio"
                  value="second"
                  label="选择"
                  :disabled="disabled"
                  @change="radios"
                ></mu-radio>
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
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">保险费率</label>
              </div>
              <div class="weui-cell__bd">
                基本险
                <span style="float:right">{{(basicRate/10000)+'%'}}</span>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label"></label>
              </div>
              <div class="weui-cell__bd">
                <div class="weui-cell__bd">
                  增加放弃向承运商追偿
                  <span style="float:right">{{(noBasicRate/10000)+'%'}}</span>
                </div>
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">保额范围(万元)</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  class="weui-input"
                  type="number"
                  :placeholder="`保额范围(${min_coverage}万元~${max_coverage/10000}万元)`"
                  v-model="form.coverage"
                  @blur="countPrice"
                >
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <div class="fangan">
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">保险方案二选一</label>
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
          <div class="fang_lists">
            <div class="fang_list" :class="index==1?'active':''" @click="statics()">
              基本险
              <br>
              <span class="span">{{(form.coverage*basicRate/100).toFixed(2)}}</span>元
            </div>
            <div class="fang_list" :class="index==0?'active':''" @click="giveUp()">
              放弃向承运商追偿
              <br>
              <span class="span">{{(form.coverage*noBasicRate/100).toFixed(2)}}</span>元
            </div>
          </div>
        </div>
        <mu-divider></mu-divider>
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
  cmnDchybChannelSave,
  dchybOrderInfo
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
      product_alias: "",
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
        coverage: "", //保险金额
        track_no: "", //运单号
        cargo_name: "", //货物名称
        quantity: "", //货物重量
        cargo_file_urls: [], //图片数组
        customer_id: "", //客户id
        type: 1, //1单票 2整车
        price: "" //价格 单位分
      },
      rate: "",
      basicRate: 0, //基本费率
      noBasicRate: 0, //放弃追偿
      min_premium: "", //最低保费
      min_premium_basic: "",
      max_coverage: "", //最大保额
      min_coverage: "", //最小保额
      agree: false,
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
      disabled: false,
      index: 0, //方案选择
      islogin: this.$store.state.access_token
    };
  },
  mounted() {
    this.fileUrl = process.env.VUE_APP_FILE_URL;
    this.product_alias = this.$route.query.product_alias;
    if (this.islogin) {
      if (this.$route.query.orderId) {
        this.form.id = this.$route.query.orderId;
        this.initData().then(() => {
          this.setData();
        });
      } else {
        this.initData();
      }
    }
  },
  mixins: [login],
  watch: {
    //监听对象中的某个属性
    async "form.start_province"(val, oldVal) {
      if (!val) return;
      let res = await cmnCityList({ province: val });
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
    "form.customer_id"(val, oldVal) {
      if (val !== "") {
        let beneficiary = this.customerList.filter(item => {
          return val == item.id;
        });
        if (beneficiary.length !== 0)
          this.form.beneficiary = beneficiary[0].company_name;
      }
    }
  },
  methods: {
    async initData() {
      let res = await Promise.all([
        allProvinceList(),
        cmnProductpriceList({ product_alias: this.product_alias }),
        cmnChannelUserList({ product_alias: this.product_alias })
      ]);
      if (res[0].err_code === 0) {
        this.provinceList = res[0].data;
      } else {
        toast("error", res[0].err_msg || "未知错误");
      }
      //保额列表
      if (res[1].err_code == 0) {
        if (res[1].rows[0]) {
          this.rate = res[1].rows[0].rate;
          this.min_premium = res[1].rows[0].min_premium;
          this.max_coverage = res[1].rows[0].max_coverage;
          this.min_coverage =
            Math.ceil((this.min_premium / this.rate) * 1000000) / 10000;
          this.ddPriceList = res[1].rows;
          this.ddPriceList.map(item => {
            this.form.price_id = item.id;
            if (item.name == "大地普货保-基本险-无追偿") {
              this.noBasicRate = item.rate;
              this.min_premium_no = item.min_premium;
              this.min_coverage =
                Math.ceil((this.min_premium_no / this.noBasicRate) * 1000000) /
                10000;
            } else if (item.name == "普货保-大地财险") {
              this.basicRate = item.rate;
              this.min_premium_basic = item.min_premium;
              // this.min_coverage = Math.ceil((this.min_premium_basic / this.basicRate)*1000000)/10000;
            }
          });
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
      if (this.$route.query.index == 1) {
        this.statics();
        this.index = this.$route.query.index * 1;
      } else if (this.$route.query.index == 0) {
        this.giveUp();
        this.index = this.$route.query.index * 1;
      } else {
        this.giveUp();
      }
      console.log(this.index);
    },
    statics() {
      this.index = 1;
      this.ddPriceList.map((item, index) => {
        if (item.name == "普货保-大地财险") {
          this.form.price_id = item.id;
          this.$route.query.index = 1;
          this.min_coverage =
            Math.ceil((this.min_premium_basic / this.basicRate) * 1000000) /
            10000;
        }
        this.countPrice();
      });
    },
    giveUp() {
      this.index = 0;
      this.ddPriceList.map((item, index) => {
        if (item.name == "大地普货保-基本险-无追偿") {
          this.form.price_id = item.id;
          this.$route.query.index = 0;
          this.min_coverage =
            Math.ceil((this.min_premium_no / this.noBasicRate) * 1000000) /
            10000;
        }
        this.countPrice();
      });
    },
    async setData() {
      let res = await dchybOrderInfo({ id: this.form.id });
      if (res.err_code === 0) {
        if (res.data.user_id !== 0) {
          this.form.customer_id = res.data.user_id;
          this.radio = "second";
        }
        this.form.beneficiary = res.data.policyholder;
        this.form.start_province = res.data.start_province;
        this.form.start_city = res.data.start_city;
        this.form.end_province = res.data.end_province;
        this.form.end_city = res.data.end_city;
        this.form.coverage = res.data.coverage / 10000;
        this.form.price = res.data.price;
        this.form.plate_no = res.data.plate_no;
        this.form.plate_extra_no = res.data.plate_extra_no;
        if (!this.form.plate_extra_no) this.truck_type = 2;
        this.form.type = res.data.type;
        this.form.type == 1 ? (this.active = 0) : (this.active = 1);
        this.form.track_no = res.data.track_no;
        this.form.cargo_name = res.data.cargo_name;
        this.form.quantity = res.data.quantity;
        // this.form.goodsType = res.data.goodsType;
        this.form.cargo_file_urls = res.data.cargo_file_urls
          ? res.data.cargo_file_urls
          : [];
      }
    },
    radios() {
      this.form.customer_id = "";
      this.form.beneficiary = "";
    },
    //计算价格
    //获取价格
    countPrice: debounce(async function() {
      console.log(this.min_coverage, 777);
      if (!this.form.coverage) {
        this.form.price = 0;
        return;
      }
      if (this.form.coverage < 0) {
        toast("error", "你输入的金额有误");
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
        toast("error", "保险金额不得少于" + this.min_coverage + "万元！");
      }
      let res = await dchybOrderPrice({
        price_id: this.form.price_id,
        coverage: Math.round(this.form.coverage * 100 * 100) | 0
      });
      console.log(this.form.price_id);
      console.log(res.price);
      if (res.err_code === 0) {
        this.form.price = res.price;
      } else {
        toast("error", res.err_msg || "未知错误");
      }
    }, 400),
    next() {
      if (this.index == 1) {
        this.statics();
      } else if (this.index == 0) {
        this.giveUp();
      }
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
      if (!this.form.coverage) errMsg.push("请输入保险金额！");
      if (this.form.coverage < 0) errMsg.push("您输入的保险金额有误！");
      if (
        this.form.coverage < this.min_coverage ||
        this.form.coverage > this.max_coverage
      )
        errMsg.push(
          `保险金额应在${this.min_coverage}万元和！${this.max_coverage /
            10000}万元之间`
        );
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
        ...cargo
      };
      if (this.form.customer_id) {
        data.customer_id = this.form.customer_id;
      }
      const loading = this.$loading({
        text: "订单创建中......"
      });
      cmnDchybChannelSave(data)
        .then(res => {
          console.log(res);
          setTimeout(() => {
            loading.close();
            this.$router.push({
              path: "ddphbComfirm",
              query: { orderId: res.data.id, product_alias: this.product_alias }
            });
          }, 2000);
        })
        .catch(e => {
          loading.close();
        });
    },
    async getAgree(title, price) {
      let data = {};
      data.title = title;
      if (price) {
        data.price_id = this.form.price_id;
      }
      let res = await cmnAdminAgreementList(data);
      console.log(res);
      if (res.err_code === 0) {
        if (res.rows.length !== 0) {
          this.agreementContent = res.rows[0];
          this.openFullscreen = true;
        } else {
          toast("warning", "条约整理中，敬请期待！");
        }
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
.fang_lists {
  display: flex;
  text-align: center;
  width: 90%;
  margin: 30px auto;
  justify-content: space-around;
  .active {
    background: #e2f2ff;
    border: 1px solid #2ea3ff;
  }
}
.fang_list {
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  font-size: 36px;
  line-height: 80px;
  width: 350px;
  padding: 30px;
  cursor: pointer;
  .span {
    color: #ff7448;
    font-weight: bold;
    font-size: 50px;
  }
}
</style>
