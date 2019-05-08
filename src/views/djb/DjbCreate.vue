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
                  v-model.trim="form.plateNo"
                  :class="{red:!carId.test(form.plateNo)}"
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
                  v-model.trim="form.plateExtraNo"
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
                <select class="weui-select" v-model="form.startProvince">
                  <option value="0">请选择省份</option>
                  <option value="1">中国</option>
                  <option value="2">美国</option>
                  <option value="3">英国</option>
                </select>
                <select class="weui-select" v-model="form.startCity">
                  <option value="0">请选择城市</option>
                  <option value="1">中国</option>
                  <option value="2">美国</option>
                  <option value="3">英国</option>
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
                <select class="weui-select" v-model="form.endProvince">
                  <option value="0">请选择省份</option>
                  <option value="1">中国</option>
                  <option value="2">美国</option>
                  <option value="3">英国</option>
                </select>
                <select class="weui-select" v-model="form.endCity">
                  <option value="0">请选择城市</option>
                  <option value="1">中国</option>
                  <option value="2">美国</option>
                  <option value="3">英国</option>
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
                  <option value="0">请选择</option>
                  <option value="1">中国</option>
                  <option value="2">美国</option>
                  <option value="3">英国</option>
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
                <input class="weui-input" type="text" :placeholder="'保额不超过'+(form.max_coverage/10000)+'万元'" v-model="form.coverage">
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
                <input class="weui-input" type="text" readonly :value="form.rate ? (form.rate/10000)+'%' : '--'">
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
                <input class="weui-input" type="text" readonly :value="`${form.min_premium}元`">
              </div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <mu-checkbox v-model="select" label="增加放弃向承运商追偿"></mu-checkbox>
          </mu-list-item-content>
          <mu-list-item-action>增加{{(form.overage*0.3).toFixed(2)}}元</mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <mu-checkbox v-model="aa" label="增加三个以内共同被保险人"></mu-checkbox>
          </mu-list-item-content>
          <mu-list-item-action v-if='select2'>增加{{(form.coverage*0.3).toFixed(2)}}元</mu-list-item-action>
           <mu-list-item-action v-else>增加{{(form.coverage*0.6).toFixed(2)}}元</mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <div class="baoxianren">
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人一</label>
                </div>
                <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入被保险人名称">
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
                  <input class="weui-input" type="text" placeholder="请输入被保险人名称">
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
                  <input class="weui-input" type="text" placeholder="请输入被保险人名称">
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
        </div>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content class="addStress">
            <mu-checkbox v-model="aa" label="再增加三个以内共同被保险人"></mu-checkbox>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <div class="baoxianren">
          <mu-list-item button :ripple="false" class="felx">
            <mu-list-item-content>
              <div class="weui-cell">
                <div class="weui-cell__hd">
                  <label class="weui-label">共同被保险人一</label>
                </div>
                <div class="weui-cell__bd">
                  <input class="weui-input" type="text" placeholder="请输入被保险人名称">
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
                  <input class="weui-input" type="text" placeholder="请输入被保险人名称">
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
                  <input class="weui-input" type="text" placeholder="请输入被保险人名称">
                </div>
              </div>
            </mu-list-item-content>
          </mu-list-item>
        </div>
        <mu-divider></mu-divider>
        <div class="tabs">
          <mu-tabs
            :value.sync="active2"
            ripple="true"
            indicator-color="#409EFF"
            text-color="#409EFF"
            color="white"
            full-width
          >
            <mu-tab>单票投</mu-tab>
            <mu-tab>整车投</mu-tab>
          </mu-tabs>
          <mu-divider></mu-divider>
          <div class="danpiao" v-if="active2 === 0">
            <mu-list-item button :ripple="false" class="felx">
              <mu-list-item-content>
                <div class="weui-cell">
                  <div class="weui-cell__hd">
                    <label class="weui-label">运单号</label>
                  </div>
                  <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="请输入运单号">
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
                    <input class="weui-input" type="text" placeholder="请输入货物名称">
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
                    <input class="weui-input" type="text" placeholder="请输入数量和单位如10吨、20件">
                  </div>
                </div>
              </mu-list-item-content>
            </mu-list-item>
          </div>
          <div class="zhengche" v-if="active2 === 1">
            <div class="upload-excel">
              <upload :maxLimit="10"></upload>
            </div>
            <div class="tip">温馨提示：请上传装车清单照片</div>
          </div>
        </div>
        <mu-divider></mu-divider>
      </mu-list>
      <div class="agresss">
        <div class="check">
          <mu-checkbox v-model="aa" value="eat"></mu-checkbox>
        </div>
        <div class="neirong">
          我已阅读并同意
          <span class="blue">《投保须知》</span>
          <span class="blue">《大地保险公司服务信息披露》</span>
          <span class="blue">《保险经纪委托协议》</span>
          <span class="blue">《客户告知书》</span>
          <span class="blue">《投保须知》</span>
        </div>
      </div>
      <mu-divider></mu-divider>
      <ul class="bottom" v-if="!open">
        <li class="mon">100</li>
        <li class="button">
          <mu-button color="info">Info</mu-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
const upload = () => import("@/components/weuiUpload/weuiUpload");
import { login } from "@/mixins/login.js";
import { reg_company, carId } from "@assets/js/reg";
export default {
  components: {
    upload
  },
  data() {
    return {
      open: false, //未登录提示登录
      form: {
        beneficiary: "", //被保险人
        truck_type: 2, //货车类型 2普通 1带挂
        plateExtraNo: "", //挂车牌号
        plateNo: "", //头车牌号
        startProvince: "", //始发地省份
        startCity: "", //始发地市
        endProvince: "", //目的地省份
        endCity: "", //目的地市
        goodsType:'',//货物类别
        coverage:'',//保险金额
        rate:'',//费率
        min_premium:'',//最低保费
      },
      select: true,
      select1: true,
      select2: true,
      active2: 0,
      reg_company: reg_company,
      carId: carId
    };
  },
  mounted() {},
  mixins: [login],
  methods: {}
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
