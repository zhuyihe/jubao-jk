<template>
  <div class="djb_confirm">
    <v-header title="投保信息确认" class="header"></v-header>
    <mu-list class="mu-lists">
      <mu-list-item button :ripple="false" class="felx">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">投保人</label>
            </div>
            <div class="weui-cell__bd">{{order.policyholder}}</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false" class="felx">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">被保险人</label>
            </div>
            <div class="weui-cell__bd">{{order.beneficiary}}</div>
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
            <div class="weui-cell__bd">{{order.plate_extra_no?'带挂货车':'普通货车'}}</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false" class="felx">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">{{order.plate_extra_no?'头车牌号':'车牌号'}}</label>
            </div>
            <div class="weui-cell__bd">{{order.plate_no}}</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false" class="felx" v-if="order.plate_extra_no">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">挂车牌号</label>
            </div>
            <div class="weui-cell__bd">{{order.plate_extra_no}}</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider v-if="order.plate_extra_no"></mu-divider>
      <mu-list-item button :ripple="false" class="felx">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">始发地</label>
            </div>
            <div class="weui-cell__bd">{{order.start_province + order.start_city || ''}}</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false" class="felx">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">目的地</label>
            </div>
            <div class="weui-cell__bd">{{order.end_province + order.end_city || ''}}</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false" class="felx">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">保险金额</label>
            </div>
            <div class="weui-cell__bd">{{(order.coverage/10000)}}万元</div>
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
            <div class="weui-cell__bd">{{rate ? (rate/10000)+'%' : '--'}}</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false" class="felx felx1">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">货运详情</label>
            </div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <div class="baodan" v-if="order.type == 1">
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">运单号</label>
              </div>
              <div class="weui-cell__bd">{{order.track_no}}</div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">货运名称</label>
              </div>
              <div class="weui-cell__bd">{{order.cargo_name}}</div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item button :ripple="false" class="felx">
          <mu-list-item-content>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label">数量包装</label>
              </div>
              <div class="weui-cell__bd">{{order.quantity}}</div>
            </div>
          </mu-list-item-content>
        </mu-list-item>
        <!-- <mu-divider ></mu-divider> -->
      </div>
      <ul class="imglist" v-if="order.type == 2">
        <li v-for="(val,idx) in order.cargo_file_urls" :key="idx">
          <img :src="val" alt>
        </li>
      </ul>
      <mu-divider></mu-divider>
      <mu-list-item button :ripple="false" class="felx">
        <mu-list-item-content>
          <div class="weui-cell">
            <div class="weui-cell__hd">
              <label class="weui-label">合计保费</label>
            </div>
            <div class="weui-cell__bd">{{order.price ? (order.price/100).toFixed(2) : '0.00'}}元</div>
          </div>
        </mu-list-item-content>
      </mu-list-item>
      <mu-divider></mu-divider>
      <div class="tips">
        提示：已经发生损失事故投保的，保险人不承担任何保险责任，
        且保险人保留向投保人骗取保险金行为的法律权利。
      </div>
      <ul class="bottom">
        <li class="mon">
          <mu-button color="white" class="butt" @click="back">返回并修改</mu-button>
        </li>
        <li class="button">
          <mu-button color="info" @click="goPay" v-loading="loading" data-mu-loading-size="24">立即支付</mu-button>
        </li>
      </ul>
    </mu-list>
  </div>
</template>

<script>
import { dchybOrderInfo, dchybOrderPay } from "@api";
import { toast } from "@assets/js/common";
export default {
  data() {
    return {
      order: {},
      rate: "",
      index: 0,
      loading: false
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.product_alias = this.$route.query.product_alias;
    this.init();
  },
  methods: {
    async init() {
      try {
        let res = await dchybOrderInfo({ id: this.orderId });
        if (res.err_code !== 0) {
          toast("error", res.err_msg || "未知错误");
          return;
        }
        this.order = res.data;
        this.rate = res.data.rate;
        if (res.data.add_waiver_of_recovery_from_carrier) {
          this.rate += 30;
        }
        var addTime = res.data.co_beneficiary.match(/、/g).length;
        if (addTime > 2) {
          this.rate += 60;
        } else {
          this.rate += 30;
        }
      } catch (e) {
        toast("error", e.err_msg);
      }
    },
    back() {
      if (this.order.price_name == "普货保-大地财险") {
        this.index = 1;
      } else if (this.order.price_name == "大地普货保-基本险-无追偿") {
        this.index = 0;
      }
      console.log(this.index, "comfirm");
      this.$router.push({
        path: "ddphbCreate",
        query: {
          orderId: this.$route.query.orderId,
          index: this.index,
          product_alias: this.product_alias
        }
      });
    },
    async goPay() {
      this.loading = true;
      let data = {
        amount: this.order.price,
        order_id: this.orderId * 1
      };
      let res = await dchybOrderPay(data);
      try {
        this.loading = false;
        console.log(res);
        window.location.href = res.data.pay_url;
      } catch (e) {
        console.log(e);
        toast("error", e.err_msg);
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
}
.mu-lists {
  margin-top: 50px;
  padding-bottom: 60px;
}
.felx {
  font-size: 32px;
  background: white;
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
}
.imglist {
  width: 90%;
  margin: auto;
  display: flex;
  // flex-direction: column;
  flex-wrap: wrap;
  li {
    margin: 10px;
    border: 1px solid #e0e0e0;
    list-style: none;
  }
  img {
    width: 200px;
    height: 200px;
  }
}
.felx1 {
  margin-top: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.24);
}
.tips {
  font-size: 26px;
  color: red;
  width: 90%;
  margin: 30px auto;
  line-height: 40px;
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
    // color: #ff6633;
    font-size: 38px;

    // font-weight: bold;
  }
  .butt {
    color: black !important;
  }
}
</style>
