<template>
  <div class="orderList">
    <mu-list-item :ripple="false">
      <mu-list-item-title>{{orderInfo.product_name}}</mu-list-item-title>
      <mu-list-item-title class="phone">{{orderInfo.order_status_text}}</mu-list-item-title>
    </mu-list-item>
    <mu-divider></mu-divider>
    <mu-list textline="three-line">
      <mu-list-item avatar :ripple="false" button>
        <mu-list-item-action>
          <mu-avatar>
            <img :src="require(`@assets/imgs/${orderInfo.product_name}@2x.png`)">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>订单号：{{orderInfo.seq_no}}</mu-list-item-title>
          <mu-list-item-title>被保险人：{{orderInfo.beneficiary}}</mu-list-item-title>
          <mu-list-item-title>投保时间：{{orderInfo.created_at | dateTran}}</mu-list-item-title>
          <mu-list-item-title>保费：{{(orderInfo.price/100).toFixed(2)}}</mu-list-item-title>
        </mu-list-item-content>
      </mu-list-item>
    </mu-list>
    <mu-divider></mu-divider>
    <mu-list-item :ripple="false" class="adress" left>
      <mu-list-item-title class="dothis">
        <mu-button color="#666" small flat class="boder1" v-show="[16,128,256,512].indexOf(orderInfo.order_status)===-1">取消订单</mu-button>
        <mu-button color="#06acf9" small flat class="boder2" v-show="orderInfo.order_status===8">待付款</mu-button>
        <mu-button color="#06acf9" small flat class="boder2" v-show="orderInfo.order_status===2">上传投保单</mu-button>
        <mu-button color="#06acf9" small flat class="boder2" v-show="[4,128,256,512].indexOf(orderInfo.order_status)!==-1">查看详情</mu-button>
      </mu-list-item-title>
    </mu-list-item>
    <mu-divider></mu-divider>
  </div>
</template>
<script>
const productInfo = {
  'zxb': "/zxbConfirm", //专线保 514
  'ygb': "/ygbDetails", //员工保 4
  'zcb': "/zcbConfirm", //整车保  2
  'jkx': "/axjkxDetail", //安享一生癌症医疗险 515
  'spb': "/spbOrderDetails", //商铺档口火灾保 16
  'dchyb-xdphb': "/phbConfirm", //信达普货保 32
  'dchyb-ddphb': "/phbConfirm", //大地普货保 516
  'hynb-dchynb': "/dchynbOrderDetails", //定车货运年保 512
  'hynb-hczdsgb': "/hcbOrderDetails", //货车重大事故保 256
  'dchyb-djb': "/djbConfirm", //大件保 519
  'dchyb-jyb-new': '/phbConfirm', //新轿运保 131102
  'dchyb-jyb-old': '/phbConfirm', //旧轿运保  131103
  'dchyb-ddphb-zhx': '/phbConfirm',
  'dchyb-gsb': '/phbConfirm',
  'dchyb-llb': '/phbConfirm',
  'dchyb-jyb-new-zhx': '/phbConfirm',
  'hyx':"/hyxComfirm"
};
export default {
  props: {
    orderInfo: {
      product_name: ""
    }
  },
  filters: {
    dateTran(val) {
      let str = val.substring(0, val.indexOf("+"));
      return str.replace("T", " ");
    }
  },
};
</script>

<style lang="scss" scoped>
.phone {
  text-align: right;
  color: #06acf9;
}
.mu-avatar {
  border-radius: 0;
  margin-top: 0 !important;
}
.mu-item-action {
  min-width: 100px;
}
.mu-avatar {
  width: 80px !important;
  height: 80px !important;
}
.dothis {
  text-align: right;
  overflow: inherit;
  .boder1 {
    border: 1px solid #999;
  }
  .boder2 {
    border: 1px solid #06acf9;
  }
}
.mu-flat-button {
  border-radius: 30px;
  margin-right: 10px;
}
</style>

