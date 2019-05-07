var isObject = function (arg) {
  if (typeof arg === 'object') {
    return Object.prototype.toString.call(arg) === '[object Object]';
  } else {
    console.log("%c " + arg + " type is not Object", "color:red;")
  }
};
var setStorage = function (L) {
  if (!isObject(L)) {
    return;
  }
  if (!window.sessionStorage) {
    return;
  }
  for (var key in L) {
    window.sessionStorage.setItem(key, JSON.stringify(L[key]));
  }
};
var dchybName = {
  // hwb: "大宗货物保",
  llb: "dchyb-llb",
  xdphb: "dchyb-xdphb",
  ddphb: 'dchyb-ddphb',
  djb: 'dchyb-djb',
  xjyb: 'dchyb-jyb-new',
  jjyb: 'dchyb-jyb-old',
  phbzhx: 'dchyb-ddphb-zhx',
  gsb: 'dchyb-gsb',
  hyx: 'hyx'
};
var Bus = new Vue();
var AddSubtract = {
  template: '<div class="AddSubtract">\n' +
    '    <i class="iconfont icon-jian" @click.stop="num<=0?num=0:num--"></i>\n' +
    '    <div>{{num}}</div>\n' +
    '    <i class="iconfont icon-jia" @click.stop="num++"></i>\n' +
    '  </div>',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
      num: this.value,
      caseIndex: 1,
      truckerNum: 0,
      driverNum: 0,
      clerkNum: 0,
      caseList: [{
          product: '特惠版',
          data: [60, 6, 100, 13],
          price: [600, 300, 800]
        },
        {
          product: '标准版',
          data: [40, 4, 100, 13],
          price: [560, 320, 700]
        },
        {
          product: '尊享版',
          data: [60, 6, 100, 13],
          price: [840, 480, 980]
        },
        {
          product: '旗舰版',
          data: [80, 8, 100, 13],
          price: [900, 500, 1100]
        },
      ]
    };
  },
  watch: {
    num: function (val) {
      this.$emit('input', val);
    }
  },
  computed: {
    allPrice: function () {
      var allprice = this.truckerNum * this.caseList[this.caseIndex].price[2] + this.driverNum * this.caseList[this.caseIndex].price[0] + this.clerkNum * this.caseList[this.caseIndex].price[1];
      priceAll('￥' + allprice + '.00');
      return allprice;
    }
  }
};
// 页面标题
Vue.component("page-title", {
  template: "\n    <div class=\"header\" v-show=\"alias\" style=\"display: none;\">\n    <a :href=\"backUrl\" class=\"back\"><i class=\"iconfont icon-fanhui\"></i></a>\n    {{pageTitle}}\n</div>\n    ",
  props: ["pageTitle"],
  data: function () {
    return {
      alias: getParamName('alias')
    };
  }
});
// 产品Banner
Vue.component("page-banner", {
  template: "\n    <div class=\"banner\">\n    <img :src=\"pageBanner\" alt=\"\">\n    </div>\n    ",
  props: ["pageBanner"]
});
// 产品视频
Vue.component("page-video", {
  template: "\n    <div class=\"pro_video\">\n    <div class=\"video-wrapper\">\n        <video :src=\"videoSrc\"\n               :class=\"{isPlay:!isVideoEnd}\"\n               ref=\"video\"\n               @ended=\"videoEnd\"\n               controls=\"controls\"\n        >\n            \u60A8\u7684\u6E38\u89C8\u5668\u4E0D\u652F\u6301\u89C6\u9891\u64AD\u653E\uFF0C\u8BF7\u5347\u7EA7\uFF01\n        </video>\n        <div class=\"poster\" :style=\"background(poster)\" v-show=\"isVideoEnd\">\n            <div class=\"video-play\" @click=\"videoPlay\">\n                <i class=\"iconfont icon-play\"></i>\n            </div>\n            <div class=\"tip\">{{videoTitle}} </div>\n        </div>\n    </div>\n    </div>\n    ",
  props: ["mediaType", "productName", "productVideo", "productCover"],
  data: function () {
    return {
      mediaType: this.mediaType,
      productName: this.productName,
      productCover: this.productCover,
      productVideo: this.productVideo,
      title: "",
      poster: "https://www.jubao56.com/res/2017/12/27/10/2850411/整车保2.jpg",
      videoSrc: "",
      videoTitle: '',
      isVideoEnd: true,
    };
  },
  watch: {
    productName: {
      handler: function (newVal, oldVal) {
        this.productName = newVal;
      },
      immediate: true
    },
    productVideo: {
      handler: function (newVal, oldVal) {
        this.videoSrc = newVal;
      },
      immediate: true
    },
    productCover: {
      handler: function (newVal, oldVal) {
        this.poster = newVal;
      },
      immediate: true
    },
  },
  methods: {
    _getData: function () {
      var _this = this;
      Ajax({
        url: cmnUrl + '/v1/cmn/biz/media/list',
        type: 'GET',
        data: {
          media_type: _this.mediaType,
          title: _this.productName
        },
        success: function (res) {
          var _productId = getParamName("pid") || "";
          if (res.err_code == 0 && res.rows.length) {
            if (res.rows[0]["title"].indexOf("普货保") > -1) {

              var result = res.rows.filter(function (item) {
                return item.title == _this.productName
              })

              _this.videoSrc = result && result[0].media_url;
              _this.poster = result && result[0].cover_image_url;
              _this.videoTitle = result && result[0].title;

            } else {
              _this.videoSrc = res.rows[0].media_url;
              _this.poster = res.rows[0].cover_image_url;
              _this.videoTitle = res.rows[0].title;
            }
          }
        },
        fail: function (err) {
          console.log(err);
        }
      });
    },
    videoPlay: function () {
      if (this.$refs.video.error) {
        console.log(this.$refs.video.error);
        Toast('视频有误！');
        return;
      }
      this.$refs.video.play();
      this.isVideoEnd = false;
    },
    videoEnd: function () {
      this.isVideoEnd = true;
    },
    background: function (img) {
      return {
        background: 'url("' + img + '") 0 0 no-repeat'
      };
    },
  }
});
// 选项卡(产品介绍，详情)
Vue.component("page-tab", {
  template: "\n    <div class='tab-box'>\n        <div :class=\"fixed?'scrollFixed':''\" class=\"pro_tab\">\n            <div class=\"tab_item\" :class=\"{tab_on: tabIndex===1 }\" @click=\"tabIndex=1\">\n                <span>{{tabLabel[0]}}</span>\n            </div>\n            <div class=\"tab_item\" :class=\"{tab_on: tabIndex===2 }\" @click=\"tabIndex=2\">\n                <span>{{tabLabel[1]}}</span>\n            </div>\n        </div>\n        <div class=\"pro_content\" v-show=\"tabIndex===1\">\n            <div class=\"imgWrapper\">\n                <img :src=\"tabContent[0]\" alt=\"\">\n            </div>\n        </div>\n        <div class=\"pro_info\" v-show=\"tabIndex===2\">\n            <div class=\"imgWrapper\">\n                <img :src=\"tabContent[1]\" alt=\"\">\n            </div>\n        </div>\n    </div>\n    ",
  props: ["tabLabel", "tabContent"],
  data: function () {
    return {
      tabIndex: 1,
      tabLabel: this.tabLabel,
      tabContent: this.tabContent,
      fixed: false
    };
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll: function () {
      var _this = this;
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      var tabBox = document.querySelector(".tab-box").offsetTop;
      var header = document.querySelector(".header").clientHeight;
      if (scrollTop >= tabBox - header) {
        _this.fixed = true;
      } else {
        _this.fixed = false;
      }
    }
  }
});
// 小宝问答
Vue.component("page-faq", {
  template: "\n    <div class=\"pro_faq mt0\">\n        <div class=\"title\">\n            <span class=\"little_faq\">\u5C0F\u4FDD\u7B54\u7591</span><span class=\"view_all\"><a :href=\"'./faq_list.html?id='+productId\">\u67E5\u770B\u5168\u90E8</a></span>\n        </div>\n        <div class=\"content\">\n            <div class=\"question\">\n                <span class=\"ico ico_que\">\u95EE</span>\n                <span>{{question}}</span>\n            </div>\n            <div class=\"answer\">\n                <span class=\"ico ico_ans\">\u7B54</span>\n                <span>{{answer}}</span>\n            </div>\n        </div>\n    </div>\n    ",
  props: ["productId"],
  watch: {
    productId: function (newVal) {
      this.productId = newVal;
      this.getFaqList(true, this.productId);
    }
  },
  mounted: function () {
    var _this = this
    setTimeout(function () {
      _this.getFaqList(true, _this.productId);
    }, 0)
  },
  data: function () {
    return {
      list: [],
      question: "",
      answer: "",
      pageSize: 8,
      total: 0,
      isShowLoading: true,
      answer: "",
      question: "",
      productId: this.productId
    };
  },
  methods: {
    getFaqList: function (isIndexPage, productId, page, done) {
      var _this = this;
      page = page || 1;
      cmnProductFaqList({
        product_id: productId,
        page: page,
        faq_type: 1,
        rows: _this.pageSize
      }, function (res) {
        var rows = res.rows;
        _this.isShowLoading = false;
        _this.total = rows.length;
        if (res.err_code === 0 && rows.length) {
          if (isIndexPage) {
            _this.question = rows[0].question;
            _this.answer = rows[0].answer;
          } else {
            if (page == 1) {
              _this.list = [];
            }
            _this.list = _this.list.concat(rows);
          }
        }
        setTimeout(function () {
          done && done();
        }, 1000);
      });
    }
  }
});
Vue.component("page-footer1", {
  mixins: [mobile],
  template: "\<div class=\"zcb_bottom\" style=\"\"><a :href=\"'tel:'+phoneNumber\" class=\"foot_center w50\">服务顾问</a><span class=\"foot_right w50\" @click=\"insure\">立即投保</span></div>\n",
  props: ["flag", "showData", "insuredLink", "enabledInsure"],
  data: function () {
    return {
      alias: getParamName('alias'),
    }
  },
  watch: {
    enabledInsure: function (newVal) {
      console.log(newVal)
      this.enabledInsure = newVal;
    },
    insuredLink: function (newVal) {
      console.log(newVal)
      this.insuredLink = newVal;
    }
  },
  created: function () {
    this.getPhone();
    console.log(location.hostname)
  },
  methods: {
    insure: function () {
      let data = {
        'effected': true
      };
      console.log(this.alias)
      var logurl = '';
      console.log(location.hostname)
      if (location.hostname.indexOf('192') != -1) {
        pageUrl = 'http://' + location.hostname + '/m#/';
        logurl = pageUrl + 'login'
      } else {
        logurl = pageUrl + '/m/#/login';
        pageUrl = pageUrl + '/m/#/'
      }
      //判断是否登陆
      if (getToken() == null) {
        setStorage({
          'createdRouter': window.location.href
        });
        window.location.href = logurl
      } else {
        hyxUserList(data, function (res) {
          if (res.err_code == 0) {
            if (res.rows.length != 0) {
              window.location.href = pageUrl + 'hyxPlan'
            } else {
              Toast('您尚未制定投保方案，请联系服务顾问制定方案，谢谢！')
            }
          } else {
            Toast(res.err_msg || '未知错误');
          }
        })
      }

    }
  }
})
// 页脚客服，电话，投保
Vue.component("page-footer", {
  mixins: [mobile],
  template: "\n        <div v-if=\"!showDdFlag\" class=\"zcb_bottom\" v-show=\"alias\" style=\"display: none;\">\n            <span :class='[\"foot_left1\",enabledInsure?\"\":\"w50\"]' v-if=\"flag\">{{allPrice}}</span>\n            <a :href=\"backUrl\" :class='[\"foot_left2\", enabledInsure?\"\":\"w50\"]' v-else>\n                <i class=\"iconfont icon-shouye\"></i>\u9996\u9875</a>\n            <a :href=\"'tel:'+phoneNumber\"   :class='[\"foot_center\",enabledInsure?\"\":\"w50\"]' v-if=\"flag\">\u670D\u52A1\u987E\u95EE</a>\n            <a :href=\"'tel:'+phoneNumber\" :class='[\"foot_center\",enabledInsure?\"\": \"w50\"]' v-else>\u5BA2\u670D</a>\n            <span v-if=\"enabledInsure\" @click=\"insure\" class=\"foot_right\">\u7ACB\u5373\u6295\u4FDD</span>\n        </div>\n    " +
    "\n        <div v-else class=\"zcb_bottom\" v-show=\"alias\" style=\"display: none;\">\n                   <a :href=\"backUrl\" class=\"foot_left2 w50\" v-else>\n                <i class=\"iconfont icon-shouye\"></i>\u9996\u9875</a>\n            <a :href=\"'tel:'+phoneNumber\"   class=\"foot_center w50\" v-if=\"flag\">\u670D\u52A1\u987E\u95EE</a>\n            <a :href=\"'tel:'+phoneNumber\" class=\"foot_center w50\" v-else>\u5BA2\u670D</a>\n            <span v-if=\"enabledInsure\" @click=\"insure\" class=\"foot_right w50\">\u7ACB\u5373\u6295\u4FDD</span>\n        </div>\n    ",
  props: ["flag", "showData", "insuredLink", "enabledInsure"],
  watch: {
    enabledInsure: function (newVal) {
      this.enabledInsure = newVal;
    },
    insuredLink: function (newVal) {
      this.insuredLink = newVal;
    }
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  created: function () {
    this.getPhone();
    console.log(this.phoneNumber, 3333)
  },
  mounted: function () {
    var _this = this;
    Bus.$on('totalCount', function (totalCount) {
      _this.price = totalCount;
    });
  },
  data: function () {
    return {
      flag: true,
      price: "0",
      alias: getParamName('alias'),
      showDdFlag: getParamName('pid') == '516',
      timeStart: new Date('2019/04/19 21:00:00').getTime(),
      timeEnd: new Date('2019/04/19 23:30:00').getTime(),
      timerNow: new Date().getTime(),
    };
  },
  methods: {
    insure: function () {
      var _this = this;
      console.log(_this.timeStart, _this.timerNow, _this.timeEnd);
      this.$nextTick(function () {
        setStorage({
          'createdRouter': _this.insuredLink
        });
        if (_this.timerNow < _this.timeEnd) {
          if (_this.insuredLink.indexOf('productName') != -1 || _this.insuredLink.indexOf('djbCreate') != -1) {
            Toast('为了提供更好的服务体验，大地保险所有单票投保产品，在今晚9点-11点半时间段升级，届时无法正常投保，请大家错开以上时间段进行投保操作。');
          }
        }
        setTimeout(function () {
          if (_this.timeStart < _this.timerNow && _this.timerNow < _this.timeEnd) {
            if (_this.insuredLink.indexOf('productName') != -1 || _this.insuredLink.indexOf('djbCreate') != -1) {

            } else {
              window.location.href = _this.insuredLink;
            }
          } else {
            window.location.href = _this.insuredLink;
          }
        }, 1000);
      })
    }
  }
});
// 专线保
Vue.component("zxb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [provinceCity, showData],
  data: function () {
    return {
      distance: "0",
      price: "0",
      coverageList: [],
      coverage: 0,
    };
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  created: function () {
    saveLocationInfo();
    this.getProvinceList();
    this.getCoverage();
  },
  methods: {
    countPrice: function () {
      var _this = this;
      if (this.startProvince === "未选择" || this.startCity === "未选择" || this.endProvince === "未选择" || this.endCity === "未选择") {
        this.distance = "0";
        this.price = "0";
        return;
      }
      zxbRoutePrice({
        start_province: this.startProvince,
        start_city: this.startCity,
        end_province: this.endProvince,
        end_city: this.endCity,
        coverage: this.coverage * 1
      }, function (res) {
        _this.distance = res.data.distance;
        _this.price = res.data.price;
        priceAll(showData.filters.showPrice(_this.price));
      });
    },
    getCoverage: function () {
      var _this = this;
      zxbCoverage(null, function (res) {
        if (res.err_code === 0) {
          _this.coverageList = res.rows;
          _this.coverage = _this.coverageList[0];
        } else {
          Toast(res.err_msg || '未知错误');
        }
      });
    },
    switchRadio: function (value) {
      if (value === 1500000) {
        this.coverage = 1500000;
      } else if (value === 500000) {
        this.coverage = 500000;
      }
      this.countPrice();
    }
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"zcb_count\">\n        <li class=\"title\">{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n        <li class=\"distance_price_count\">\n            <label class=\"label\">\u59CB\u53D1\u5730</label>\n            <div class=\"select_reset\">\n                <select v-model=\"startProvince\" class=\"zcb_select1\">\n                    <option v-for=\"(val,idx) in startProvinceList\" :value=\"val\">{{val}}</option>\n                </select>\n            </div>\n            <div class=\"select_reset\">\n                <select v-model=\"startCity\" class=\"zcb_select2\" @change=\"countPrice\">\n                    <option v-for=\"(val,idx) in startCityList\" :value=\"val\">{{val}}</option>\n                </select>\n            </div>\n        </li>\n        <li class=\"distance_price_count\">\n            <label class=\"label\">\u76EE\u7684\u5730</label>\n            <div class=\"select_reset\">\n                <select v-model=\"endProvince\" class=\"zcb_select1\">\n                    <option v-for=\"(val,idx) in endProvinceList\" :value=\"val\">{{val}}</option>\n                </select>\n            </div>\n            <div class=\"select_reset\">\n                <select v-model=\"endCity\" class=\"zcb_select2\" @change=\"countPrice\">\n                    <option v-for=\"(val,idx) in endCityList\" :value=\"val\">{{val}}</option>\n                </select>\n            </div>\n        </li>\n        <li>\n            <span class=\"label\">\u91CC\u7A0B</span>\n            <span class=\"red distance\">{{distance}}</span>\n            <span>\u516C\u91CC</span>\n        </li>\n        <li class=\"block\">\n            <span class=\"label\">\u8D23\u4EFB\u9650\u989D</span>\n            <span class=\"coverage\" v-for=\"item in coverageList\" :class=\"{bechose:item == coverage}\" @click=\"coverage=item;countPrice();\">{{item/10000}}\u4E07</span>\n        </li>\n        <li class=\"price_box\">\n            <span class=\"label\">\u4FDD\u8D39</span>\n            <span class=\"fr\">\n                <span class=\"price\">{{price | showPrice}}</span>\n                <span>\u5143</span>\n            </span>\n        </li>\n    </ul>\n</div>\n    "
});
// 整车保
Vue.component("zcb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [provinceCity, showData],
  data: function () {
    return {
      distance: "0",
      price: "0",
      coverage: 1500000,
    };
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  created: function () {
    saveLocationInfo();
    this.getProvinceList();
  },
  methods: {
    countPrice: function () {
      var _this = this;
      if (this.startProvince === "未选择" || this.startCity === "未选择" || this.endProvince === "未选择" || this.endCity === "未选择") {
        this.distance = "0";
        this.price = "0";
        return;
      }
      zcbOrderPrice({
        start_province: this.startProvince,
        start_city: this.startCity,
        end_province: this.endProvince,
        end_city: this.endCity,
        coverage: this.coverage * 1
      }, function (res) {
        _this.distance = res.data.distance;
        _this.price = res.data.price;
        priceAll(showData.filters.showPrice(_this.price));
      });
    },
    switchRadio: function (value) {
      if (value === 1500000) {
        this.coverage = 1500000;
      } else if (value === 500000) {
        this.coverage = 500000;
      }
      this.countPrice();
    }
  },
  template: "\n    <div class=\"trial\">\n            <ul class=\"zcb_count\">\n                <li class=\"title\">{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n                <li class=\"distance_price_count\">\n                    <label class=\"label\">\u59CB\u53D1\u5730</label>\n                    <div class=\"select_reset\">\n                        <select v-model=\"startProvince\" class=\"zcb_select1\">\n                            <option v-for=\"(val,idx) in startProvinceList\" :value=\"val\">{{val}}</option>\n                        </select>\n                    </div>\n                    <div class=\"select_reset\">\n                        <select v-model=\"startCity\" class=\"zcb_select2\" @change=\"countPrice\">\n                            <option v-for=\"(val,idx) in startCityList\" :value=\"val\">{{val}}</option>\n                        </select>\n                    </div>\n                </li>\n                <li class=\"distance_price_count\">\n                    <label class=\"label\">\u76EE\u7684\u5730</label>\n                    <div class=\"select_reset\">\n                        <select v-model=\"endProvince\" class=\"zcb_select1\">\n                            <option v-for=\"(val,idx) in endProvinceList\" :value=\"val\">{{val}}</option>\n                        </select>\n                    </div>\n                    <div class=\"select_reset\">\n                        <select v-model=\"endCity\" class=\"zcb_select2\" @change=\"countPrice\">\n                            <option v-for=\"(val,idx) in endCityList\" :value=\"val\">{{val}}</option>\n                        </select>\n                    </div>\n                </li>\n                <li>\n                    <span class=\"label\">\u91CC\u7A0B</span>\n                    <span class=\"red distance\">{{distance}}</span>\n                    <span>\u516C\u91CC</span>\n                </li>\n                <li class=\"block\">\n                    <span class=\"label\">\u8D54\u507F\u9650\u989D</span>\n                    <span class=\"coverage br\" :class=\"coverage===1500000?'bechose':''\" @click=\"switchRadio(1500000)\">150\u4E07</span>\n                    <span class=\"coverage\" :class=\"coverage===500000?'bechose':''\" @click=\"switchRadio(500000)\">50\u4E07</span>\n                </li>\n                <li class=\"price_box\">\n                    <span class=\"label\">\u4FDD\u8D39</span>\n                    <span class=\"fr\">\n                        <span class=\"price\">{{price | showPrice}}</span>\n                        <span>\u5143</span>\n                    </span>\n\n                </li>\n            </ul>\n        </div>\n    "
});
// 普货保(信达)
Vue.component("xdphb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [countPrice, showData],
  data: {
    minCoverage: 0,
    price: "0",
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function () {
      var _this = this;
      if (isNaN(this.coverage) || !this.coverage || this.coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (this.coverage * 10000 < this.minCoverage) {
        // this.price = "0";
        Toast("保险金额最低为17万元!");
        // this.coverage = 17;
        this.price = this.rate * this.minCoverage / 10000;
        priceAll(showData.filters.showPrice(_this.price))
      } else if (this.coverage * 10000 > this.maxCoverage) {
        this.price = "0";
        Toast("保险金额最高为300万元!");
        this.coverage = 300;
        this.price = this.rate * this.coverage;
      } else {
        dchybOrderPrice({
          price_id: this.priceId,
          coverage: this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this.price = res.price;
          priceAll(showData.filters.showPrice(_this.price))
        })
      }
    },
    init: function () {
      var _this = this;
      console.log(global_abbr, 11);

      var data = {
        product_alias: dchybName[global_abbr]
      };
      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 1) {
          _this.setData(res.rows[0]);
        }
      });
    },
    setData: function (priceInfo) {
      this.minPremium = priceInfo.min_premium;
      this.maxCoverage = priceInfo.max_coverage;
      this.rate = priceInfo.rate;
      this.priceId = priceInfo.id;
      this.minCoverage = Math.ceil(this.minPremium / (this.rate / 1000000));
    },
  },
  template: "\n    <div class=\"trial\">\n        <ul class=\"dchyb_count\" style=\"border-top: none;\">\n            <li class=\"title\">{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n            <li class=\"title\">\u4FDD\u9669\u8D39\u7387\n                <span class=\"fr\">{{rate ? (rate/10000)+'%' : '--'}}</span>\n            </li>\n            <li class=\"block\">\n                <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n                <input type=\"number\" :placeholder=\"'\u4FDD\u989D\u4E0D\u8D85\u8FC7'+maxCoverage/10000+'\u4E07\u5143'\" v-model=\"coverage\" @input=\"countPrice\">\n                <span class=\"fr\">\u4E07\u5143</span>\n            </li>\n            <li class=\"price_box\">\n                <span class=\"label\">\u4FDD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u8D39</span>\n                <span class=\"fr price red\">\uFFE5{{(price/100).toFixed(2)}}</span>\n            </li>\n        </ul>\n    </div>\n    "
});
// 普货保(大地)
Vue.component("ddphb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [showData],
  data: function () {
    return {
      coverage: '',
      minCoverage: 0,
      price: "0",
      basicPrice: "0",
      obj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      basicObj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      height: document.body.offsetHeight,
    }
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function (coverage, price, obj) {
      var _this = this;
      if (isNaN(coverage) || !coverage || coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (coverage * 10000 < obj.minCoverage) {
        Toast("保险金额最低为10万元!");
        // _this.coverage = 10;
        _this.price = 1300;
        _this.basicPrice = 1000;
      } else {
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
      if (coverage * 10000 > obj.maxCoverage) {
        Toast("保险金额最高为300万元!");
        _this.coverage = 300;
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
    },
    init: function () {
      var _this = this;
      var data = {
        product_alias: dchybName[global_abbr]
      };

      console.log(this);

      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 2) {
          console.log(res.rows, 123)
          res.rows.map(function (item, index) {
            if (item.name == '普货保-大地财险') {
              _this.setData(res.rows[index], _this.basicObj)
            } else {
              _this.setData(res.rows[index], _this.obj)
            }
          })

        }
      });
    },
    getPrice: function () {

      this.countPrice(this.coverage, "basicPrice", this.basicObj);
      this.countPrice(this.coverage, "price", this.obj);
    },
    setData: function (priceInfo, obj) {
      console.log(obj);

      obj.minPremium = priceInfo.min_premium;
      obj.maxCoverage = priceInfo.max_coverage;
      obj.rate = priceInfo.rate;
      obj.priceId = priceInfo.id;
      obj.minCoverage = Math.ceil((obj.minPremium / obj.rate) * 1000000);
    },
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.getPrice();
      }
    })
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"dchyb_count\" style=\"border-top: none;\">\n    <li class=\"title\"><p style=\"font-weight:700;\">普货保基础版-大地财险</p><p>完备的普通货物货运保障</p></li>\n    <li class=\"rote\"><span class=\"left\">保险费率</span><span class=\"right\"><span class=\"top\"><span>基本险</span><span>0.01%</span></span><span class=\"bottom\"><span>放弃向承运商追偿</span><span>0.013%</span></span></span></li>\n     <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 55%\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"getPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">保险费用</span><span class=\"right\"><span class=\"top\"><span>基本险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(basicPrice/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span></span></li>\n  " +
    "<li class=\"remind\"><span style=\"color:#FF7448;\">特别提醒：</span>选择<span style=\"color:#FF7448;\">增加放弃向承运商追偿</span>方案，稍加保费，即可为下游承运商、司机提供更好的保障。亦可避免贵公司找下游承运商、司机收保费，保险公司赔偿后找下游承运商、司机追偿的麻烦。</li> \n   </ul>\n    </div>\n    "
});
// 新轿云保
Vue.component("xjyb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [showData],
  data: function () {
    return {
      coverage: '',
      minCoverage: 0,
      price: "0",
      basicPrice: "0",
      obj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      basicObj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      height: document.body.offsetHeight,
    }
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function (coverage, price, obj) {
      var _this = this;
      if (isNaN(coverage) || !coverage || coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (coverage * 10000 < obj.minCoverage) {
        Toast("保险金额最低为10万元!");
        // _this.coverage = 10;
        _this.price = 2600;
        _this.basicPrice = 2000;
      } else {
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
      if (coverage * 10000 > obj.maxCoverage) {
        Toast("保险金额最高为300万元!");
        _this.coverage = 300;
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
    },
    init: function () {
      var _this = this;
      var data = {
        product_alias: 'dchyb-jyb-new'
      };

      console.log(this);

      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 2) {
          console.log(res.rows, 123)
          res.rows.map(function (item, index) {
            if (item.name == '轿运保-基本险-新车') {
              _this.setData(res.rows[index], _this.basicObj)
            } else {
              _this.setData(res.rows[index], _this.obj)
            }
          })

        }
      });
    },
    getPrice: function () {

      this.countPrice(this.coverage, "basicPrice", this.basicObj);
      this.countPrice(this.coverage, "price", this.obj);
    },
    setData: function (priceInfo, obj) {
      console.log(obj);

      obj.minPremium = priceInfo.min_premium;
      obj.maxCoverage = priceInfo.max_coverage;
      obj.rate = priceInfo.rate;
      obj.priceId = priceInfo.id;
      obj.minCoverage = Math.ceil((obj.minPremium / obj.rate) * 1000000);
    },
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.getPrice();
      }
    })
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"dchyb_count\" style=\"border-top: none;\">\n    <li class=\"title\"><p style=\"font-weight:700;\">轿运保-基本险（新车）</p><p>新轿运保</p></li>\n    <li class=\"rote\"><span class=\"left\">保险费率</span><span class=\"right\"><span class=\"top\"><span>基本险</span><span>0.02%</span></span><span class=\"bottom\"><span>放弃向承运商追偿</span><span>0.023%</span></span></span></li>\n     <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 55%\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"getPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">保险费用</span><span class=\"right\"><span class=\"top\"><span>基本险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(basicPrice/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span></span></li>\n  "
});
// 新轿运保-综合险
Vue.component("xjybzhx-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [showData],
  data: function () {
    return {
      coverage: '',
      minCoverage: 0,
      price: "0",
      basicPrice: "0",
      obj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      basicObj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      height: document.body.offsetHeight,
    }
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function (coverage, price, obj) {
      var _this = this;
      if (isNaN(coverage) || !coverage || coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (coverage * 10000 < obj.minCoverage) {
        Toast("保险金额最低为10万元!");
        // _this.coverage = 10;
        _this.price = 2800;
        _this.basicPrice = 2500;
      } else {
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
      if (coverage * 10000 > obj.maxCoverage) {
        Toast("保险金额最高为300万元!");
        _this.coverage = 300;
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
    },
    init: function () {
      var _this = this;
      var data = {
        product_alias: 'dchyb-jyb-new-zhx'
      };

      console.log(this);

      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 2) {
          console.log(res.rows, 123)
          res.rows.map(function (item, index) {
            if (item.name == '轿运保（新车）-综合险') {
              _this.setData(res.rows[index], _this.basicObj)
            } else {
              _this.setData(res.rows[index], _this.obj)
            }
          })

        }
      });
    },
    getPrice: function () {

      this.countPrice(this.coverage, "basicPrice", this.basicObj);
      this.countPrice(this.coverage, "price", this.obj);
    },
    setData: function (priceInfo, obj) {
      console.log(obj);

      obj.minPremium = priceInfo.min_premium;
      obj.maxCoverage = priceInfo.max_coverage;
      obj.rate = priceInfo.rate;
      obj.priceId = priceInfo.id;
      obj.minCoverage = Math.ceil((obj.minPremium / obj.rate) * 1000000);
    },
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.getPrice();
      }
    })
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"dchyb_count\" style=\"border-top: none;\">\n    <li class=\"title\"><p style=\"font-weight:700;\">{{dataObj.product_name}}</p><p>{{dataObj.description}}</p></li>\n    <li class=\"rote\"><span class=\"left\">保险费率</span><span class=\"right\"><span class=\"top\"><span>综合险</span><span>0.025%</span></span><span class=\"bottom\"><span>放弃向承运商追偿</span><span>0.028%</span></span></span></li>\n     <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 55%\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"getPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">保险费用</span><span class=\"right\"><span class=\"top\"><span>综合险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(basicPrice/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span></span></li>\n  "
});
// 旧轿云保
Vue.component("jjyb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [showData],
  data: function () {
    return {
      coverage: '',
      minCoverage: 0,
      price: "0",
      basicPrice: "0",
      obj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      basicObj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      height: document.body.offsetHeight,
    }
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function (coverage, price, obj) {
      var _this = this;
      if (isNaN(coverage) || !coverage || coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (coverage * 10000 < obj.minCoverage) {
        Toast("保险金额最低为12万元!");
        // _this.coverage = 12;
        _this.price = 2520;
        _this.basicPrice = 2160;
      } else {
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
      if (coverage * 10000 > obj.maxCoverage) {
        Toast("保险金额最高为300万元!");
        _this.coverage = 300;
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
    },
    init: function () {
      var _this = this;
      var data = {
        product_alias: 'dchyb-jyb-old'
      };

      console.log(this);

      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 2) {
          console.log(res.rows, 123)
          res.rows.map(function (item, index) {
            if (item.name == '轿运保-基本险-旧车') {
              _this.setData(res.rows[index], _this.basicObj)
            } else {
              _this.setData(res.rows[index], _this.obj)
            }
          })

        }
      });
    },
    getPrice: function () {

      this.countPrice(this.coverage, "basicPrice", this.basicObj);
      this.countPrice(this.coverage, "price", this.obj);
    },
    setData: function (priceInfo, obj) {
      console.log(obj);

      obj.minPremium = priceInfo.min_premium;
      obj.maxCoverage = priceInfo.max_coverage;
      obj.rate = priceInfo.rate;
      obj.priceId = priceInfo.id;
      obj.minCoverage = Math.ceil((obj.minPremium / obj.rate) * 1000000);
    },
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.getPrice();
      }
    })
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"dchyb_count\" style=\"border-top: none;\">\n    <li class=\"title\"><p style=\"font-weight:700;\">轿运保-基本险（旧车）</p><p>旧运保</p></li>\n    <li class=\"rote\"><span class=\"left\">保险费率</span><span class=\"right\"><span class=\"top\"><span>基本险</span><span>0.018%</span></span><span class=\"bottom\"><span>放弃向承运商追偿</span><span>0.021%</span></span></span></li>\n     <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 55%\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"getPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">保险费用</span><span class=\"right\"><span class=\"top\"><span>基本险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(basicPrice/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span></span></li>\n  "
});
// //预约货物万能保
// Vue.component('hyx-count',{
//     props: ["dataObj"],
//     watch: {
//         dataObj: function (newVal) {
//             this.dataObj = newVal;
//         },
//         price: function (newVal) {
//             Bus.$emit('totalCount', newVal);
//         }
//     },
//     mixins: [showData],
//     data:function() {
//         return {
//             minCoverage: 0,
//             price: "0",
//             rate:'',
//             coverage:null,
//             scheme:null,
//             rateList:[],
//         }

//     },
//     created: function () {
//         saveLocationInfo();
//         this.init();
//         // console.log(this.rateList)
//     },
//     computed: {
//         allPrice: function () {
//             return showData.filters.showPrice(this.price);
//         }
//     },
//     methods: {
//         getPriceId(){
//             console.log(this.scheme)
//             this.coverage=null;
//         },
//         getCoverage(){
//             console.log(this.coverage)
//             var that=this;
//             if(that.scheme==null){
//                 Toast("请选择投保方案");
//                 return;
//             }
//             if (isNaN(that.coverage) || !that.coverage || that.coverage * 1 === 0) { return; } 
//             if(that.coverage * 10000>that.scheme.max_coverage){
//                 Toast("保险金额最高为200万元!");
//                 that.coverage=200;
//                 return;
//             }
//             let data={};
//             data.price_id=this.scheme.price_id;
//             data.coverage=this.coverage*10000;
//             hyxOrderPrice(data,function(res){
//                 if (res.err_code !== 0) { Toast(res.err_msg || "未知错误"); return; }
//                 priceAll(showData.filters.showPrice(res.price))
//                 that.price=res.price
//             })  
//         },
//         init: function () {
//             var _this = this;
//             var data = { 'effected': true };
//             hyxUserList(data, function (res) {
//                 if (res.err_code !== 0) {
//                     Toast(res.err_msg || "未知错误");
//                     return;
//                 }else{
//                     _this.setData(res.rows)

//                 }

//             });
//         },
//         setData: function (priceInfo) {
//             this.rateList=priceInfo;
//             // this.minPremium = priceInfo.min_premium;
//             // this.maxCoverage = priceInfo.max_coverage;
//             // this.rate = priceInfo.rate;
//             // this.priceId = priceInfo.id;
//             // this.minCoverage = Math.ceil(this.minPremium / (this.rate / 1000000));
//         },
//     },
//     template: `   <div class="trial">
//     <ul class="dchyb_count" style="border-top: none;">
//     <li class="title" >{{dataObj.product_name}}-{{dataObj.description}}</li>
//     <li class="block"><span class="label">投保方案</span><select v-model="scheme" @change="getPriceId"><option v-for="(item,key) in rateList" :value="item">{{item.price_name}}</option></select></li>            
//     <li class="title">整车投保（按车牌保单程)<span class="fr">{{scheme!=null?scheme.premium_rate/10000+'%':'--'}}</span></li> 
//     <li class="title">按票投保（按运单保全程，含转运)<span class="fr">{{scheme!=null?scheme.premium_rate/10000+'%':'--'}}</span></li>
//     <li class="block"><span class="label">保险金额</span><input type="number" placeholder="保额不超过200万" @input="getCoverage" v-model="coverage"><span class="fr">万元</span></li>
//     <li class="price_box"><span class="label">整车投保保费</span><span class="fr price red">￥{{(price/100).toFixed(2)}}</span></li>
//     <li class="price_box"> <span class="label">按票投保保费</span><span class="fr price red">￥{{(price/100).toFixed(2)}}</span></li>
//     </ul></div>`

// })
// 冷链保
Vue.component("llb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [showData],
  data: function () {
    return {
      coverage: '',
      minCoverage: 0,
      price: "0",
      basicPrice: "0",
      obj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      basicObj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      height: document.body.offsetHeight,
    }
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function (coverage, price, obj) {
      var _this = this;
      if (isNaN(coverage) || !coverage || coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (coverage * 10000 < obj.minCoverage) {
        Toast("保险金额最低为12万元!");
        // _this.coverage = 12;
        _this.price = 3360;
        _this.basicPrice = 3000;
      } else {
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
      if (coverage * 10000 > obj.maxCoverage) {
        Toast("保险金额最高为300万元!");
        _this.coverage = 300;
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
    },
    init: function () {
      var _this = this;
      var data = {
        product_alias: 'dchyb-llb'
      };

      console.log(this);

      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 2) {
          console.log(res.rows, 123)
          res.rows.map(function (item, index) {
            if (item.name == '冷链保-基本险') {
              _this.setData(res.rows[index], _this.basicObj)
            } else {
              _this.setData(res.rows[index], _this.obj)
            }
          })

        }
      });
    },
    getPrice: function () {

      this.countPrice(this.coverage, "basicPrice", this.basicObj);
      this.countPrice(this.coverage, "price", this.obj);
    },
    setData: function (priceInfo, obj) {
      console.log(obj);

      obj.minPremium = priceInfo.min_premium;
      obj.maxCoverage = priceInfo.max_coverage;
      obj.rate = priceInfo.rate;
      obj.priceId = priceInfo.id;
      obj.minCoverage = Math.ceil((obj.minPremium / obj.rate) * 1000000);
    },
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.getPrice();
      }
    })
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"dchyb_count\" style=\"border-top: none;\">\n    <li class=\"title\"><p style=\"font-weight:700;\">{{dataObj.product_name}}</p><p>{{dataObj.description}}</p></li>\n    <li class=\"rote\"><span class=\"left\">保险费率</span><span class=\"right\"><span class=\"top\"><span>基本险</span><span>0.025%</span></span><span class=\"bottom\"><span>放弃向承运商追偿</span><span>0.028%</span></span></span></li>\n     <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 55%\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"getPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">保险费用</span><span class=\"right\"><span class=\"top\"><span>基本险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(basicPrice/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span></span></li>\n  "
});
// 普货保-综合险
Vue.component("phbzhx-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [showData],
  data: function () {
    return {
      coverage: '',
      minCoverage: 0,
      price: "0",
      basicPrice: "0",
      obj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      basicObj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      height: document.body.offsetHeight,
    }
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function (coverage, price, obj) {
      var _this = this;
      if (isNaN(coverage) || !coverage || coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (coverage * 10000 < obj.minCoverage) {
        Toast("保险金额最低为12万元!");
        // _this.coverage = 12;
        _this.price = 2400;
        _this.basicPrice = 2040;
      } else {
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
      if (coverage * 10000 > obj.maxCoverage) {
        Toast("保险金额最高为300万元!");
        _this.coverage = 300;
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
    },
    init: function () {
      var _this = this;
      var data = {
        product_alias: 'dchyb-ddphb-zhx'
      };

      console.log(this);

      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 2) {
          console.log(res.rows, 123)
          res.rows.map(function (item, index) {
            if (item.name == '普货保-综合险') {
              _this.setData(res.rows[index], _this.basicObj)
            } else {
              _this.setData(res.rows[index], _this.obj)
            }
          })

        }
      });
    },
    getPrice: function () {

      this.countPrice(this.coverage, "basicPrice", this.basicObj);
      this.countPrice(this.coverage, "price", this.obj);
    },
    setData: function (priceInfo, obj) {
      console.log(obj);

      obj.minPremium = priceInfo.min_premium;
      obj.maxCoverage = priceInfo.max_coverage;
      obj.rate = priceInfo.rate;
      obj.priceId = priceInfo.id;
      obj.minCoverage = Math.ceil((obj.minPremium / obj.rate) * 1000000);
    },
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.getPrice();
      }
    })
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"dchyb_count\" style=\"border-top: none;\">\n    <li class=\"title\"><p style=\"font-weight:700;\">{{dataObj.product_name}}</p><p>{{dataObj.description}}</p></li>\n    <li class=\"rote\"><span class=\"left\">保险费率</span><span class=\"right\"><span class=\"top\"><span>综合险</span><span>0.017%</span></span><span class=\"bottom\"><span>放弃向承运商追偿</span><span>0.020%</span></span></span></li>\n     <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 55%\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"getPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">保险费用</span><span class=\"right\"><span class=\"top\"><span>综合险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(basicPrice/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span></span></li>\n  "
});
// 果蔬保
Vue.component("gsb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [showData],
  data: function () {
    return {
      coverage: '',
      minCoverage: 0,
      price: "0",
      basicPrice: "0",
      obj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      basicObj: {
        minPremium: '',
        maxCoverage: '',
        rate: '',
        priceId: 0,
        minCoverage: ''
      },
      height: document.body.offsetHeight,
    }
  },
  created: function () {
    saveLocationInfo();
    this.init();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    countPrice: function (coverage, price, obj) {
      var _this = this;
      if (isNaN(coverage) || !coverage || coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return
      // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
      // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

      if (coverage * 10000 < obj.minCoverage) {
        Toast("保险金额最低为5万元!");
        // _this.coverage = 12;
        _this.price = 2150;
        _this.basicPrice = 2000;
      } else {
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
      if (coverage * 10000 > obj.maxCoverage) {
        Toast("保险金额最高为300万元!");
        _this.coverage = 300;
        dchybOrderPrice({
          price_id: obj.priceId,
          coverage: _this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this[price] = res.price;
          priceAll(showData.filters.showPrice(res.price))
        })
      }
    },
    init: function () {
      var _this = this;
      var data = {
        product_alias: 'dchyb-gsb'
      };

      console.log(this);

      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 2) {
          console.log(res.rows, 123)
          res.rows.map(function (item, index) {
            if (item.name == '果蔬保-基本险') {
              _this.setData(res.rows[index], _this.basicObj)
            } else {
              _this.setData(res.rows[index], _this.obj)
            }
          })

        }
      });
    },
    getPrice: function () {

      this.countPrice(this.coverage, "basicPrice", this.basicObj);
      this.countPrice(this.coverage, "price", this.obj);
    },
    setData: function (priceInfo, obj) {
      console.log(obj);

      obj.minPremium = priceInfo.min_premium;
      obj.maxCoverage = priceInfo.max_coverage;
      obj.rate = priceInfo.rate;
      obj.priceId = priceInfo.id;
      obj.minCoverage = Math.ceil((obj.minPremium / obj.rate) * 1000000);
    },
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.getPrice();
      }
    })
  },
  template: "\n    <div class=\"trial\">\n    <ul class=\"dchyb_count\" style=\"border-top: none;\">\n    <li class=\"title\"><p style=\"font-weight:700;\">{{dataObj.product_name}}</p><p>{{dataObj.description}}</p></li>\n    <li class=\"rote\"><span class=\"left\">保险费率</span><span class=\"right\"><span class=\"top\"><span>基本险</span><span>0.040%</span></span><span class=\"bottom\"><span>放弃向承运商追偿</span><span>0.043%</span></span></span></li>\n     <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 55%\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"getPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">保险费用</span><span class=\"right\"><span class=\"top\"><span>基本险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(basicPrice/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span></span></li>\n  "
});
//大件保
Vue.component("djb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    },
    caseIndex: function (newVal) {
      if (newVal == 0) {
        var target1 = this.oldPriceData.filter(function (item) {
          return item.name == "钢构及其他大型构铸件类";
        })
        this.price = target1[0].rate * this.coverage;
      } else if (newVal == 1) {
        var target2 = this.oldPriceData.filter(function (item) {
          return item.name == "电气设备及机车机具类货物";
        });
        this.price = target2[0].rate * this.coverage;
      }
    }
  },
  mixins: [countPrice, showData],
  data: function () {
    return {
      caseIndex: 0,
      tabIndex: 1,
      oldPriceData: [],
      priceData: [],
      minCoverage: 0,
      price: "0",
    };
  },
  created: function () {
    saveLocationInfo();
    this.getPriceData();
  },
  mounted: function () {
    var _this = this;
    window.addEventListener('resize', function () {
      if (_this.height == document.body.offsetHeight) {
        _this.countPrice();
      }
    })
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    },
    rater: function () {
      return this.priceData[this.caseIndex] && this.priceData[this.caseIndex].rate / 10000 + '%';
    }
  },
  methods: {
    compare: function (property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      }
    },
    getPriceData: function () {
      var _this = this;
      cmnProductpriceList({
        product_alias: 'dchyb-djb'
      }, function (res) {
        if (res.err_code === 0) {
          _this.oldPriceData = res.rows;
          _this.priceData = res.rows.sort(_this.compare('rate'));
          _this.maxCoverage = 3000000;
        } else {
          Toast(res.err_msg || '未知错误');
        }
      });
    },
    countPrice: function () {
      this.minCoverage = Math.ceil(this.priceData[this.caseIndex].min_premium / (this.priceData[this.caseIndex].rate / 1000000));
      console.log(this.minCoverage, 456)
      var _this = this;
      if (isNaN(this.coverage) || !this.coverage || this.coverage * 1 === 0) {
        return;
      } //为非数字或者为空，则直接return

      if (this.coverage * 10000 < this.minCoverage) {
        // this.price = "0";
        Toast("保险金额最低为" + this.minCoverage + "万元!");
        // this.coverage = this.minCoverage / 10000;
        this.price = this.priceData[this.caseIndex].min_premium * 100;
      } else if (this.coverage * 10000 > this.maxCoverage) {
        // this.price = "0";
        Toast("保险金额最高为300万元!");
        this.coverage = 300;
        this.price = this.coverage * this.priceData[this.caseIndex].rate;
      } else {
        var selectData, selectNoData, selectAddData;
        if (this.caseIndex == 0) {
          selectData = this.oldPriceData.filter(function (item) {
            return item.name == '钢构及其他大型构铸件类';
          });
        } else if (this.caseIndex == 1) {
          selectData = this.oldPriceData.filter(function (item) {
            return item.name == '电气设备及机车机具类货物';
          });
        }
        dchybOrderPrice({
          price_id: selectData[0].id,
          coverage: this.coverage * 10000 //与后台对接的单位是元，页面显示的默认单位是万元；
        }, function (res) {
          if (res.err_code !== 0) {
            Toast(res.err_msg || "未知错误");
            return;
          }
          _this.price = res.price;
          priceAll(showData.filters.showPrice(_this.price))
        })
      }
    },
    NumberToChinese: function (num) {
      return NumberToChinese(num);
    }
  },
  template: "\n  <div>\n   <ul class=\"pro_list\">\n    <li>{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n  <li class=\"case_tab\">\n   <div class=\"case_item noborder\">\u4fdd\u969c\u7c7b\u578b</div>    <div class=\"case_items\" v-for=\"(item,index) in priceData\" :class=\"caseIndex === index ? 'on': ''\" @click=\"caseIndex = index\">\u7c7b\u578b{{NumberToChinese(index+1)}}\n       </li>\n      <p v-show=\"caseIndex == 0\" class=\"msg\">钢构及其他大型构铸件类（如大型钢构、建筑混凝土部件等）</p>\n     <p v-show=\"caseIndex == 1\" class=\"msg\">电气设备及机车机具类货物（如工程挖机、中巴大巴车辆、发电机组、机床、大型印刷设备、扶式电梯等重大件货物）</p>\n     <p v-show=\"caseIndex == 2\" class=\"msg\">大型电气设备仪器类（如发电机组、机床、大型印刷设备、扶式电梯等）</p>\n     " +
    "<li class=\"rote\" v-for=\"(item,idx) in priceData\" :key=\"idx\" v-if=\"caseIndex == idx\"><span class=\"left\">费率</span><span class=\"right\"><span class=\"top\"><span>基本险</span><span>{{item.rate/10000}}%</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span>增加0.003%</span></span><span class=\"bottom\"><span>增加三个以内共同被保险人</span><span>增加0.003%</span></span></span></li>\n  " +
    "   <li class=\"block\">\n      <span class=\"label\">\u4FDD\u9669\u91D1\u989D</span>\n      <input  type=\"number\" style=\"width: 50%; padding-right: 20%;\" placeholder=\"保额不超过300万\"  v-model=\"coverage\"  @input=\"countPrice()\">\n      <span class=\"fr\">\u4E07\u5143</span>\n    </li>\n  <li class=\"rote\"><span class=\"left\">费用</span><span class=\"right\"><span class=\"top\"><span>基本险保费</span><span style=\"color:#FF7448; font-weight:700;\">{{(price/100).toFixed(2)}}</span></span><span class=\"bottom\"><span>增加放弃向承运商追偿保障</span><span>增加<span style=\"color:#FF7448; font-weight:700;\">{{(coverage*0.3).toFixed(2)}}</span></span></span><span class=\"bottom\"><span>增加三个以内共同被保险人</span><span>增加<span style=\"color:#FF7448; font-weight:700;\">{{(coverage*0.3).toFixed(2)}}</span></span></span></span></li>\n             </ul>\n        </div>\n    "
});
//定车货运年保
Vue.component("dchynb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    allPrice: function (newVal) {
      Bus.$emit('totalCount', this.priceData[this.caseIndex].price);
    }
  },
  mixins: [countPrice, showData],
  data: function () {
    return {
      caseIndex: 0,
      tabIndex: 1,
      priceData: []
    };
  },
  created: function () {
    saveLocationInfo();
    this.getPriceData();
  },
  computed: {
    hcbUrl: function () {
      var url = './hcb.html';
      return this.alias ? url + '?alias=' + this.alias + "&product_name=hcb" : url + "?product_name=hcb";
    },
    allPrice: function () {
      var allPrice = this.priceData.length > 0 ? showData.filters.showPrice(this.priceData[this.caseIndex].price) : 0;
      priceAll(allPrice);
      return allPrice;
    }
  },
  methods: {
    getPriceData: function () {
      var _this = this;
      console.log(this.dataObj);
      cmnProductpriceList({
        product_name: global_productName
      }, function (res) {
        if (res.err_code === 0) {
          _this.priceData = res.rows[0].price_level;
        } else {
          Toast(res.err_msg || '未知错误');
        }
      });
    },
    NumberToChinese: function (num) {
      return NumberToChinese(num);
    }
  },
  template: "\n    <div>\n            <ul class=\"pro_list\">\n                <li>{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n                <li class=\"case_tab\">\n                    <div class=\"case_item\" v-for=\"(item,index) in priceData\" :class=\"caseIndex === index ? 'on': ''\" @click=\"caseIndex = index\">\u65B9\u6848{{NumberToChinese(index+1)}}\n                        <br/>{{item.coverage/10000}}\u4E07</div>\n                </li>\n                <li>\u8D54\u507F\u9650\u989D\n                    <span class=\"lr\">{{priceData.length>0 ? priceData[caseIndex].coverage/10000 : 0}}\u4E07</span>\n                </li>\n                <li>\u4FDD\u8D39\n                    <span class=\"lr\">\n                        <span class=\"red\">{{allPrice}}</span> \u5143</span>\n                </li>\n            </ul>\n        </div>\n    "
});
// 员工保
Vue.component("ygb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    allPrice: function (newVal) {
      var allprice = 100 * (this.truckerNum * this.caseList[this.caseIndex].price[2] + this.driverNum * this.caseList[this.caseIndex].price[0] + this.clerkNum * this.caseList[this.caseIndex].price[1]);
      Bus.$emit('totalCount', allprice);
    }
  },
  mixins: [countPrice, showData],
  components: {
    "add-subtract": AddSubtract
  },
  data: function () {
    return {
      caseIndex: 1,
      truckerNum: 0,
      driverNum: 0,
      clerkNum: 0,
      caseList: [{
          product: '特惠版',
          data: [60, 6, 100, 13],
          price: [600, 300, 800]
        },
        {
          product: '标准版',
          data: [40, 4, 100, 13],
          price: [560, 320, 700]
        },
        {
          product: '尊享版',
          data: [60, 6, 100, 13],
          price: [840, 480, 980]
        },
        {
          product: '旗舰版',
          data: [80, 8, 100, 13],
          price: [900, 500, 1100]
        },
      ]
    };
  },
  created: function () {
    saveLocationInfo();
  },
  computed: {
    allPrice: function () {
      var allprice = 100 * (this.truckerNum * this.caseList[this.caseIndex].price[2] + this.driverNum * this.caseList[this.caseIndex].price[0] + this.clerkNum * this.caseList[this.caseIndex].price[1]);
      allprice = showData.filters.showPrice(allprice);
      priceAll(allprice);
      return allprice;
    },
  },
  methods: {
    showDetail: function () {
      console.log(this.caseIndex)
      var alias = getParamName('alias')
      if (window.parent.document.getElementsByClassName('h5_wrapper')[0]) {
        //                    window.parent.location = window.parent.location.href.substring(0,window.parent.location.href.indexOf('#'))+'#/ygbLookUp?caseIndex='+this.caseIndex;
      } else if (alias) {
        window.location.href = './ygbLookUp.html?caseIndex=' + this.caseIndex + '&alias=' + alias
      } else {
        window.location.href = './ygbLookUp.html?caseIndex=' + this.caseIndex
      }
    },
  },
  template: "\n    <div v-fro=\"dataObj\">\n            <div class=\"pro_do\">\n                <div class=\"do_title\">\n                    {{dataObj.product_name}}\u2014{{dataObj.description}}\n                </div>\n                <div class=\"do_tab\">\n                    <div class=\"do_item\" v-for=\"(item,index) in caseList\" :class=\"{active:caseIndex==index}\" @click=\"caseIndex=index\">{{item.product}}</div>\n                </div>\n                <div class=\"do_content\">\n                    <div class=\"cell red\">\n                        <div>\u6B7B\u4EA1\u4F24\u6B8B</div>\n                        <div>{{caseList[caseIndex].data[0]}}\u4E07</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u533B\u7597</div>\n                        <div>{{caseList[caseIndex].data[1]}}\u4E07</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u8BEF\u5DE5\u8D39</div>\n                        <div>{{caseList[caseIndex].data[2]}}\u5143/\u5929</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u6269\u5C55\u4FDD\u969C</div>\n                        <div>{{caseList[caseIndex].data[3]}}\u79CD</div>\n                    </div>\n                    <div class=\"cell blue\">\n                        <div class=\"h5_ygbLookUp\" :data-caseIndex=\"caseIndex\" @click=\"showDetail()\">\u67E5\u770B\u8BE6\u60C5</div>\n                    </div>\n                    <div class=\"cell\">\n                        <div class=\"cell_w\">\u53F8\u673A\u62BC\u8FD0\u4EBA\u6570</div>\n                        <add-subtract v-model=\"truckerNum\"></add-subtract>\n                        <div>{{caseList[caseIndex].price[2]}}\u5143/\u4EBA</div>\n                    </div>\n                    <div class=\"cell\">\n                        <div class=\"cell_w\">\u642C\u8FD0\u5DE5\u4EBA\u4EBA\u6570</div>\n                        <add-subtract v-model=\"driverNum\"></add-subtract>\n                        <div>{{caseList[caseIndex].price[0]}}\u5143/\u4EBA</div>\n                    </div>\n                    <div class=\"cell\">\n                        <div class=\"cell_w\">\u6587\u5458\u5185\u52E4\u4EBA\u6570</div>\n                        <add-subtract v-model=\"clerkNum\"></add-subtract>\n                        <div>{{caseList[caseIndex].price[1]}}\u5143/\u4EBA</div>\n                    </div>\n                    <div class=\"cell\">\n                        <div>\u5408\u8BA1\u4FDD\u8D39</div>\n                        <div class=\"red\">{{allPrice}}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
});
// 人保员工保
Vue.component("rbygb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    allPrice: function (newVal) {
      var allprice = 100 * (this.truckerNum * this.caseList[this.caseIndex].price[2] + this.driverNum * this.caseList[this.caseIndex].price[0] + this.clerkNum * this.caseList[this.caseIndex].price[1]);
      Bus.$emit('totalCount', allprice);
    }
  },
  mixins: [countPrice, showData],
  components: {
    "add-subtract": AddSubtract
  },
  data: function () {
    return {
      caseIndex: 0,
      truckerNum: 0,
      driverNum: 0,
      clerkNum: 0,
      caseList: [{
          product: '人保标准版',
          data: [60, 10, 100, 100],
          price: [500, 300, 700]
        },
        {
          product: '人保尊享版',
          data: [80, 10, 100, 100],
          price: [600, 400, 850]
        },
      ]
    };
  },
  created: function () {
    saveLocationInfo();
  },
  computed: {
    allPrice: function () {
      var allprice = 100 * (this.truckerNum * this.caseList[this.caseIndex].price[2] + this.driverNum * this.caseList[this.caseIndex].price[0] + this.clerkNum * this.caseList[this.caseIndex].price[1]);
      allprice = showData.filters.showPrice(allprice);
      priceAll(allprice);
      return allprice;
    },
  },
  methods: {
    showDetail: function () {
      console.log(this.caseIndex)
      var alias = getParamName('alias')
      if (window.parent.document.getElementsByClassName('h5_wrapper')[0]) {
        //                    window.parent.location = window.parent.location.href.substring(0,window.parent.location.href.indexOf('#'))+'#/ygbLookUp?caseIndex='+this.caseIndex;
      } else if (alias) {
        window.location.href = './ygbLookUp.html?caseIndex=' + this.caseIndex + '&alias=' + alias
      } else {
        window.location.href = './ygbLookUp.html?caseIndex=' + this.caseIndex
      }
    },
  },
  template: "\n    <div class=\"trial\">\n            <div class=\"pro_do\">\n                <div class=\"do_title\">\n                    {{dataObj.product_name}}\u2014{{dataObj.description}}\n                </div>\n                <div class=\"do_tab2\">\n                    <div class=\"do_item\" v-for=\"(item,index) in caseList\" :class=\"{active:caseIndex==index}\" @click=\"caseIndex=index\">{{item.product}}</div>\n                </div>\n                <div class=\"do_content\">\n                    <div class=\"cell red\">\n                        <div>\u6B7B\u4EA1\u4F24\u6B8B</div>\n                        <div>{{caseList[caseIndex].data[0]}}\u4E07</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u533B\u7597</div>\n                        <div>{{caseList[caseIndex].data[1]}}\u4E07</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u8BEF\u5DE5\u8D39</div>\n                        <div>{{caseList[caseIndex].data[2]}}\u5143/\u5929</div>\n                    </div>\n         <div class=\"cell gray\">\n                        <div>住院津贴</div>\n                        <div>{{caseList[caseIndex].data[3]}}\u5143/\u5929</div>\n                    </div>\n          <div class=\"cell\">\n                        <div class=\"cell_w\">\u53F8\u673A\u62BC\u8FD0\u4EBA\u6570</div>\n                        <add-subtract v-model=\"truckerNum\"></add-subtract>\n                        <div>{{caseList[caseIndex].price[2]}}\u5143/\u4EBA</div>\n                    </div>\n                    <div class=\"cell\">\n                        <div class=\"cell_w\">\u642C\u8FD0\u5DE5\u4EBA\u4EBA\u6570</div>\n                        <add-subtract v-model=\"driverNum\"></add-subtract>\n                        <div>{{caseList[caseIndex].price[0]}}\u5143/\u4EBA</div>\n                    </div>\n                    <div class=\"cell\">\n                        <div class=\"cell_w\">\u6587\u5458\u5185\u52E4\u4EBA\u6570</div>\n                        <add-subtract v-model=\"clerkNum\"></add-subtract>\n                        <div>{{caseList[caseIndex].price[1]}}\u5143/\u4EBA</div>\n                    </div>\n                    <div class=\"cell\">\n                        <div>\u5408\u8BA1\u4FDD\u8D39</div>\n                        <div class=\"red\">{{allPrice}}</div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    "
});
// 商铺保
Vue.component("spb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [countPrice, showData],
  data: function () {
    return {
      price: "0",
      caseIndex: 1,
      caseList: [
        [100, 20, 80, 200, 1200],
        [200, 40, 160, 200, 2200],
        [300, 60, 240, 200, 3200],
      ],
    };
  },
  computed: {
    allPrice: function () {
      var allprice = this.caseList[this.caseIndex - 1][4].toFixed(2);
      this.price = allprice * 100;
      // allPrice = showData.filters.showPrice(allprice);
      // priceAll(allprice);
      // return allprice;

      priceAll('￥' + allprice)
      return allprice;
    }
  },
  created: function () {
    saveLocationInfo();
  },
  template: "\n    <div class=\"trial\">\n            <div class=\"pro_case\">\n                <div class=\"case_title\">{{dataObj.product_name}}\u2014{{dataObj.description}}</div>\n                <div class=\"case_tab\">\n                    <div class=\"case_item\" :class=\"caseIndex === 1 ? 'on': ''\" @click=\"caseIndex = 1\">\u65B9\u6848\u4E00\n                        <br/>100\u4E07</div>\n                    <div class=\"case_item\" :class=\"caseIndex === 2 ? 'on': ''\" @click=\"caseIndex = 2\">\u65B9\u6848\u4E8C\n                        <br/>200\u4E07</div>\n                    <div class=\"case_item\" :class=\"caseIndex === 3 ? 'on': ''\" @click=\"caseIndex = 3\">\u65B9\u6848\u4E09\n                        <br/>300\u4E07</div>\n                </div>\n                <div class=\"case_content\">\n                    <div class=\"cell\">\n                        <div>\u4FDD\u9669\u91D1\u989D</div>\n                        <div>{{ caseList[caseIndex-1][0] }}\u4E07</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u56FA\u5B9A\u8D44\u4EA7</div>\n                        <div>{{ caseList[caseIndex-1][1] }}\u4E07</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u4E34\u65F6\u5B58\u8D44</div>\n                        <div>{{ caseList[caseIndex-1][2] }}\u4E07</div>\n                    </div>\n                    <div class=\"cell gray\">\n                        <div>\u79DF\u91D1\u8865\u507F</div>\n                        <div>{{ caseList[caseIndex-1][3] }}\u5143/\u5929*90</div>\n                    </div>\n                </div>\n                <div class=\"cell money\">\n                    <div>\u5408\u8BA1\u4FDD\u8D39</div>\n                    <div>\n                        <span class=\"red\">{{allPrice}}</span> \u5143</div>\n                </div>\n            </div>\n        </div>\n    "
});
// 货车重大事故保
Vue.component("hcb-count", {
  props: ["dataObj"],
  mixins: [countPrice, showData],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  data: function () {
    return {
      price: "0",
      caseIndex: 0,
      tabIndex: 1,
      priceData: [],
    };
  },
  created: function () {
    saveLocationInfo();
    this.getPriceData();
  },
  computed: {
    hcbUrl: function () {
      var url = './hcb.html';
      return this.alias ? url + '?alias=' + this.alias + "&product_name=hcb" : url + "?product_name=hcb";
    },
    allPrice: function () {
      var allPrice = this.priceData.length > 0 ? showData.filters.showPrice(this.priceData[this.caseIndex].price) : 0;
      this.price = this.priceData.length > 0 ? this.priceData[this.caseIndex].price : 0;
      priceAll(allPrice);
      return allPrice;
    }
  },
  methods: {
    getPriceData: function () {
      var _this = this;
      cmnProductpriceList({
        product_name: global_productName
      }, function (res) {
        if (res.err_code === 0) {
          _this.priceData = res.rows[0].price_level;
        } else {
          Toast(res.err_msg || '未知错误');
        }
      });
    },
    NumberToChinese: function (num) {
      return NumberToChinese(num);
    }
  },
  template: "\n    <div class=\"trial\">\n            <ul class=\"pro_list\">\n                <li>{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n                <li class=\"case_tab\">\n                    <div class=\"case_item\" v-for=\"(item,index) in priceData\" :class=\"caseIndex === index ? 'on': ''\" @click=\"caseIndex = index\">\u65B9\u6848{{NumberToChinese(index+1)}}\n                        <br/>{{item.coverage/10000}}\u4E07</div>\n                </li>\n                <li>\u8D23\u4EFB\u9650\u989D\n                    <span class=\"lr\">{{priceData.length>0 ? priceData[caseIndex].coverage/10000 : 0}}\u4E07</span>\n                </li>\n                <li>\u4FDD\u8D39\n                    <span class=\"lr\">\n                        <span class=\"red\">{{allPrice}}</span> \u5143</span>\n                </li>\n            </ul>\n        </div>\n    "
});
//冷链保
// Vue.component("llb-count", {
//     props: ["dataObj"],
//     watch: {
//         dataObj: function (newVal) {
//             this.dataObj = newVal;
//         },
//         price: function (newVal) {
//             Bus.$emit('totalCount', newVal);
//         }
//     },
//     mixins: [provinceCity, countPrice, showData],
//     data: function () {
//         return {
//             price: "0",
//             caseIndex: 0,
//             tabIndex: 1,
//             priceData: [],
//         };
//     },
//     created: function () {
//         saveLocationInfo();
//         this.getProvinceList();
//     },
//     computed: {
//         hcbUrl: function () {
//             var url = './hcb.html';
//             return this.alias ? url + '?alias=' + this.alias + "&product_name=hcb" : url + "?product_name=hcb";
//         },
//         allPrice: function () {
//             var allPrice = this.priceData.length > 0 ? showData.filters.showPrice(this.priceData[this.caseIndex].price) : 0;
//             this.price = this.priceData.length > 0 ? this.priceData[this.caseIndex].price : 0;
//             priceAll(allPrice);
//             return allPrice;
//         }
//     },
//     methods: {
//         getPriceData: function () {
//             var _this = this;
//             console.log(this.dataObj);
//             cmnProductpriceList({ product_name: global_productName }, function (res) {
//                 if (res.err_code === 0) {
//                     _this.priceData = res.rows[0].price_level;
//                 }
//                 else {
//                     Toast(res.err_msg || '未知错误');
//                 }
//             });
//         },
//         NumberToChinese: function (num) {
//             return NumberToChinese(num);
//         }
//     },
//     template: "\n    <div>\n    <ul class=\"dchyb_count\">\n    <li class=\"title\">{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n    <li class=\"distance_price_count\">\n        <label class=\"label\">\u59CB\u53D1\u5730</label>\n        <div class=\"select_reset\">\n            <select v-model=\"startProvince\" class=\"zcb_select1\">\n                <option v-for=\"(val,idx) in startProvinceList\" :value=\"val\">{{val}}</option>\n            </select>\n        </div>\n        <div class=\"select_reset\">\n            <select v-model=\"startCity\" class=\"zcb_select2\" @change=\"countPrice\">\n                <option v-for=\"(val,idx) in startCityList\"  :value=\"val\" >{{val}}</option>\n            </select>\n        </div>\n    </li>\n    <li class=\"distance_price_count\">\n        <label class=\"label\">\u76EE\u7684\u5730</label>\n        <div class=\"select_reset\">\n            <select v-model=\"endProvince\" class=\"zcb_select1\">\n                <option v-for=\"(val,idx) in endProvinceList\" :value=\"val\">{{val}}</option>\n            </select>\n        </div>\n        <div class=\"select_reset\">\n            <select v-model=\"endCity\" class=\"zcb_select2\" @change=\"countPrice\">\n                <option v-for=\"(val,idx) in endCityList\" :value=\"val\">{{val}}</option>\n            </select>\n        </div>\n    </li>\n    <li class=\"block\"><span class=\"label\">\u4FDD\u9669\u91D1\u989D</span><input type=\"text\" :placeholder=\"'\u4FDD\u989D\u4E0D\u8D85\u8FC7'+maxCoverage/10000+'\u4E07\u5143'\" v-model=\"coverage\"  @keyup=\"countPrice\"><span class=\"fr\">\u4E07\u5143</span></li>\n    <li class=\"price_box\">\n        <span class=\"label\">\u4FDD\u8D39</span>\n        <span class=\"fr\">\n        <span class=\"price\">{{(price/100).toFixed(2)}}</span><span>\u5143</span>\n      </span>\n    </li>\n</ul>\n</div>\n    "
// });
// 大宗货物保
Vue.component("hwb-count", {
  props: ["dataObj"],
  watch: {
    dataObj: function (newVal) {
      this.dataObj = newVal;
      this.init();
    },
    price: function (newVal) {
      Bus.$emit('totalCount', newVal);
    }
  },
  mixins: [provinceCity, countPrice, showData],
  data: {
    minCoverage: 0,
    price: "0",
  },
  created: function () {
    saveLocationInfo();
    this.getProvinceList();
  },
  computed: {
    allPrice: function () {
      return showData.filters.showPrice(this.price);
    }
  },
  methods: {
    init: function () {
      var _this = this;
      var data = {
        product_name: _this.dataObj.product_name
      };
      cmnProductpriceList(data, function (res) {
        if (res.err_code !== 0) {
          Toast(res.err_msg || "未知错误");
          return;
        }
        if (res.rows.length === 1) {
          _this.setData(res.rows[0]);
        }
      });
    },
    setData: function (priceInfo) {
      this.minPremium = priceInfo.min_premium;
      this.maxCoverage = priceInfo.max_coverage;
      this.rate = priceInfo.rate;
      this.priceId = priceInfo.id;
      this.minCoverage = Math.ceil(this.minPremium / (this.rate / 1000000));
    },
  },
  template: "\n    <div>\n    <ul class=\"dchyb_count\">\n        <li class=\"title\">{{dataObj.product_name}}\u2014{{dataObj.description}}</li>\n        <li class=\"distance_price_count\">\n            <label class=\"label\">\u59CB\u53D1\u5730</label>\n            <div class=\"select_reset\">\n                <select v-model=\"startProvince\" class=\"zcb_select1\">\n                    <option v-for=\"(val,idx) in startProvinceList\" :value=\"val\">{{val}}</option>\n                </select>\n            </div>\n            <div class=\"select_reset\">\n                <select v-model=\"startCity\" class=\"zcb_select2\">\n                    <option v-for=\"(val,idx) in startCityList\"  :value=\"val\" >{{val}}</option>\n                </select>\n            </div>\n        </li>\n        <li class=\"distance_price_count\">\n            <label class=\"label\">\u76EE\u7684\u5730</label>\n            <div class=\"select_reset\">\n                <select v-model=\"endProvince\" class=\"zcb_select1\">\n                    <option v-for=\"(val,idx) in endProvinceList\" :value=\"val\">{{val}}</option>\n                </select>\n            </div>\n            <div class=\"select_reset\">\n                <select v-model=\"endCity\" class=\"zcb_select2\">\n                    <option v-for=\"(val,idx) in endCityList\" :value=\"val\">{{val}}</option>\n                </select>\n            </div>\n        </li>\n        <li class=\"block\"><span class=\"label\">\u4FDD\u9669\u91D1\u989D</span><input type=\"text\" :placeholder=\"'\u4FDD\u989D\u4E0D\u8D85\u8FC7'+maxCoverage/10000+'\u4E07\u5143'\" v-model=\"coverage\"  @keyup=\"countPrice\"><span class=\"fr\">\u4E07\u5143</span></li>\n        <li class=\"price_box\">\n            <span class=\"label\">\u4FDD\u8D39</span>\n            <span class=\"fr\">\n                <span class=\"price\">{{(price/100).toFixed(2) }}</span><span>\u5143</span>\n               </span>\n        </li>\n    </ul>\n    </div>\n    "
});
