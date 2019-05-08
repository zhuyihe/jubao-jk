var cmnProvinceList = function (success, fail) {
    return promise(cmnUrl + '/v1/cmn/province/list', {}, success, fail)
}
var cmnCityList = function (province, success, fail) {
    return promise(cmnUrl + "/v1/cmn/city/list", { province: province }, success, fail)
}
var zcbOrderPrice = function (params, success, fail) {
    return promise(zcbUrl + "/v1/zcb/order/price/customer", params, success, fail)
}
var cmnBizGetChannelInfo = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/biz/get/channel/info", params, success, fail)
}

var cmnServiceConfig = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/service/config", params, success, fail)
}
//common.html 产品详情公用api接口
var cmnBizGetProductInfo = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/service/product/info", params, success, fail)
}

// 产品问答
var cmnProductFaqList = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/service/product/faq/list", params, success, fail)
}
// 产品问答列表详情
var cmnProductFaqDetail = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/service/product/faq/info", params, success, fail)
}

var cmnProductpriceList = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/productprice/list", params, success, fail)
}
var dchybOrderPrice = function (params, success, fail) {
    return promise(ygbUrl + "/v1/dchyb/order/price", params, success, fail)
}
var cmnProductList = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/product/list", params, success, fail)
}

var serviceProductList = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/service/product/list", params, success, fail)
}

var zxbCoverage = function (params, success, fail) {
    return promise(cmnUrl + "/v1/zxb/coverage/list", params, success, fail)
}
var zxbRoutePrice = function (params, success, fail) {
    return promise(zcbUrl + "/v1/zxb/route/price", params, success, fail)
}
var hyxUserList = function (data,success, fail) {
    return promise(zcbUrl + "/v1/hyx/user/list", data, success, fail)
}
//货运险保费试算
var hyxOrderPrice = function (data,success, fail) {
    return promise(zcbUrl + "/v1/hyx/order/price", data, success, fail)
}
//问答
var askAndAnswer = function (params, success, fail) {
    return promise(cmnUrl + "/v1/cmn/service/product/faq/list", params, success, fail)
}
var priceIos = function (str) {  //用于给安卓和ios调用
    console.log(str);
};
var isH5 = window.parent.document.getElementsByClassName('share_price')[0];
var isAndroid = window.JSBridge;

var dchybName = {
    hwb: "大宗货物保",
    llb: "冷链保",
    xdphb: "普货保",
    ddphb: '普货保基础版-大地财险'
};

//各种价格，费率的显示filters
var showData = {
    filters: {
        showPrice: function (val) {  //价格；分====》元
            if (!isNaN(val)) {
                return "￥" + (val / 100).toFixed(2)
            } else {
                return "0"
            }
        },
        showCoverage: function (val) { //保险限额；元====》万元
            if (!isNaN(val)) {
                return (val / 10000) + "万"
            }
        },
        showRate: function (val) { //费率；分====》 %
            if (!isNaN(val)) {
                return (val / 10000) + "%"
            }
        },
        showYuan: function (val) {  //价格；分====》元
            if (!isNaN(val)) {
                return (val / 100).toFixed(2) + "元"
            }
        },
    },
};

var priceAll = function (str) {
    // console.log(price,11)
    if (isH5) {
        isH5.innerHTML = str;
    } else if (isAndroid) {
        window.JSBridge.priceIos(str);
    } else {
        window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.priceIos && window.webkit.messageHandlers.priceIos.postMessage(str);
        priceIos(str)
    }
}
//省市联动
var provinceCity = {
    data: function () {
        return {
            startProvince: "未选择",  //出发省份
            endProvince: "未选择",  //到达省份
            startCity: "未选择",  //出发城市
            endCity: "未选择",  //到达城市
            startProvinceList: ["未选择"],  //出发省份列表
            endProvinceList: ["未选择"],  //到达省份列表
            startCityList: ["未选择"],  //出发城市列表
            endCityList: ["未选择"],  //到达城市列表
        }
    },
    methods: {
        getProvinceList: function () {
            var _this = this;
            cmnProvinceList(function (res) {
                if (res.err_code !== 0) {
                    Toast(res.err_msg || "未知错误");
                    return;
                }
                _this.startProvinceList = _this.startProvinceList.concat(res.data);
                _this.endProvinceList = _this.endProvinceList.concat(res.data);
                console.log(_this.startProvinceList)
            })
        }
    },
    watch: {
        startProvince: function (val, oldVal) {
            var _this = this;
            if (val === "未选择") {
                _this.startCityList = ["未选择"];
                _this.startCity = "未选择";
                return;
            }
            cmnCityList(val, function (res) {
                if (res.err_code !== 0) { Toast(res.err_msg); return; }
                var list = ["未选择"];
                res.data.forEach(function (val, idx) {
                    list.push(val.city);
                });
                if (oldVal !== "未选择") {
                    _this.startCity = "未选择";
                } //强制性给默认值赋值；在默认值为旧值时不赋值
                _this.startCityList = list;
                // this.countPrice() //不同的产品，计算方式不一样；
            })
        },
        endProvince: function (val, oldVal) {
            var _this = this;
            if (val === "未选择") {
                _this.endCityList = ["未选择"];
                _this.endCity = "未选择";
                return;
            }
            cmnCityList(val, function (res) {
                if (res.err_code !== 0) {
                    Toast(res.err_msg);
                    return;
                }
                var list = ["未选择"];
                res.data.forEach(function (val, idx) {
                    list.push(val.city);
                });
                if (oldVal !== "未选择") {
                    _this.endCity = "未选择";
                }
                _this.endCityList = list;
                // this.countPrice()
            })
        }
    },
}

var countPrice = {
    data: function () {
        return {
            price: "0",
            rate: "0", //费率
            minPremium: "",  //最低保费
            minCoverage:"",
            coverage: "",      //保险金额
            priceId: "",       //价格方案的id
            maxCoverage: "",   //最高保费
        }
    },
    methods: {
        countPrice: function () {
            var _this = this;
            if (isNaN(this.coverage) || !this.coverage || this.coverage * 1 === 0) { return; } //为非数字或者为空，则直接return
            // this.coverage.toString().substring(this.coverage.toString().indexOf('.')+1)
            // if(!this.checkDecimal(this.coverage,2)){Toast("保额不能小于两位小数");return ;}

            if (this.coverage * 10000 > this.maxCoverage || this.coverage * 10000 < this.minCoverage) {
                this.price = "0";
                Toast("请在保额范围内投保!")
                priceAll(showData.filters.showPrice(_this.price))
            } else {
                dchybOrderPrice({
                    price_id: this.priceId,
                    coverage: this.coverage * 10000  //与后台对接的单位是元，页面显示的默认单位是万元；
                }, function (res) {
                    if (res.err_code !== 0) { Toast(res.err_msg || "未知错误"); return; }
                    _this.price = res.price;
                    priceAll(showData.filters.showPrice(_this.price))
                })
            }
        },
        checkDecimal: function (val, num) {
            var str = val + '';
            if (str.indexOf('.') !== -1) {
                var length = str.substring(str.indexOf('.') + 1).length;
                if (length > num) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }//功能：低于N位小数，则返回false;否则返回true
    }
};

//专线保
var zxbCountPrice = {
    mixins: [provinceCity, showData],
    data: function () {
        return {
            distance: "0",
            price: "0",
            coverageList: [],
            coverage: 0,
        }
    },
    computed: {
        allPrice: function () {
            return showData.filters.showPrice(this.price);
        }
    },
    created: function () {
        saveLocationInfo()
        // this.getPhone();
        this.getProvinceList();
        this.getCoverage();
    },
    methods: {
        countPrice: function () {
            var _this = this;
            if (this.startProvince === "未选择" || this.startCity === "未选择" || this.endProvince === "未选择" || this.endCity === "未选择") {
                this.distance = "0"; this.price = "0"; return;
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
                priceAll(showData.filters.showPrice(_this.price))
            })
        },
        getCoverage: function () {
            var _this = this;
            zxbCoverage(null, function (res) {
                if (res.err_code === 0) {
                    _this.coverageList = res.rows;
                    _this.coverage = _this.coverageList[0]
                } else {
                    Toast(res.err_msg || '未知错误')
                }
            })
        },
        switchRadio: function (value) {
            if (value === 1500000) {
                this.coverage = 1500000
            } else if (value === 500000) {
                this.coverage = 500000
            }
            this.countPrice()
        }
    }
};

//整车保
var zcbCountPrice = {
    mixins: [provinceCity, showData],
    data: function () {
        return {
            distance: "0",
            price: "0",
            coverage: 1500000,
        }
    },
    computed: {
        allPrice: function () {
            return showData.filters.showPrice(this.price);
        }
    },
    created: function () {
        saveLocationInfo()
        // this.getPhone();
        this.getProvinceList();
    },
    methods: {
        countPrice: function () {
            var _this = this;
            if (this.startProvince === "未选择" || this.startCity === "未选择" || this.endProvince === "未选择" || this.endCity === "未选择") {
                this.distance = "0"; this.price = "0"; return;
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
                priceAll(showData.filters.showPrice(_this.price))
            })
        },
        switchRadio: function (value) {
            if (value === 1500000) {
                this.coverage = 1500000
            } else if (value === 500000) {
                this.coverage = 500000
            }
            this.countPrice()
        }
    }
};

//普货保 普货保-大地 单次货运保 
var dchybDetail = {
    mixins: [countPrice, showData],
    data: {
        productType: getParamName("type") == "phbase" ? "ddphb" : 'xdphb',
        productName: '普货保',
        minCoverage:0
    },
    created: function () {
        saveLocationInfo()
        // this.getPhone();
        this.init();
    },
    computed: {
        allPrice: function () {
            return showData.filters.showPrice(this.price);
        }
    },
    methods: {
        init: function () {
            var _this = this;
            var data = { product_name: dchybName[this.productType] };
            cmnProductpriceList(data, function (res) {
                if (res.err_code !== 0) { Toast(res.err_msg || "未知错误"); return; }
                if (res.rows.length === 1) {
                    _this.setData(res.rows[0])
                }
            })
        },
        setData: function (priceInfo) {
            this.minPremium = priceInfo.min_premium;
            this.maxCoverage = priceInfo.max_coverage;
            this.rate = priceInfo.rate;
            this.priceId = priceInfo.id;
            this.minCoverage = Math.ceil(this.minPremium / (this.rate / 1000000));
        },
    }

};

//货运年保产品 货车重大事故保险
var hynbPrice = {
    data: function () {
        return {
            caseIndex: 0,
            tabIndex: 1, // 控制tab选中状态
            priceData: [],
        }
    },
    created: function () {
        saveLocationInfo()
        // this.getPhone();
        this.getPriceData();
    },
    computed: {
        hcbUrl: function () {
            var url = './hcb.html';
            return this.alias ? url + '?alias=' + this.alias + "&product_name=hcb" : url + "?product_name=hcb";
        },
        allPrice: function () {
            var allPrice = this.priceData.length > 0 ? showData.filters.showPrice(this.priceData[this.caseIndex].price) : 0;
            priceAll(allPrice)
            return allPrice;
        }
    },
    methods: {
        getPriceData: function () {
            var _this = this;
            console.log(_this.productName);

            cmnProductpriceList({ product_name: _this.productName }, function (res) {
                if (res.err_code === 0) {
                    _this.priceData = res.rows[0].price_level;
                } else {
                    Toast(res.err_msg || '未知错误')
                }
            })
        },
        methods: {
            NumberToChinese: function (num) {
                return NumberToChinese(num);
            }
        }
    }
}

// 员工保
var ygbPrice = {
    data: function () {
        return {
            caseIndex: 1,
            truckerNum: 0,
            driverNum: 0, //现场操作人数
            clerkNum: 0, //非现场操作人数
            caseList: [
                { product: '特惠版', data: [60, 6, 100, 13], price: [600, 300, 800] },
                { product: '标准版', data: [40, 4, 100, 13], price: [560, 320, 700] },
                { product: '尊享版', data: [60, 6, 100, 13], price: [840, 480, 980] },
            ]
        }
    },
    computed: {
        allPrice: function () {
            var allprice = 100 * (this.truckerNum * this.caseList[this.caseIndex].price[2] + this.driverNum * this.caseList[this.caseIndex].price[0] + this.clerkNum * this.caseList[this.caseIndex].price[1]);
            allprice = showData.filters.showPrice(allprice);
            priceAll(allprice)
            return allprice;
        },
    },
}

// 商铺保险
var spbPrice = {
    data: function () {
        return {
            caseIndex: 1, // 控制方案tab选中状态
            caseList: [  // 方案详细信息
                [100, 20, 80, 200, 1200],
                [200, 40, 160, 200, 2200],
                [300, 60, 240, 200, 3200],
            ],
        }
    },
    computed: {
        allPrice: function () {
            var allprice = this.caseList[this.caseIndex - 1][4].toFixed(2);
            priceAll('￥' + allprice)
            return '￥' + allprice;
        }
    },
    created: function () {
        saveLocationInfo();
        // this.getPhone();
    },
}

//安享一生癌症医疗险
var axysPrice = {
    data: function () {
        return {
            relation: 1,
            birth: "",
            price: 5000,
            qi: true,
            allPrice: 0
        }
    },
    created: function () {
        this.getPhone();
    },
    mounted: function () {
        console.log("rili init.......");

        if (document.getElementsByClassName("icon-rili")[0]) {
            var calendar = new LCalendar();
            var date = new Date(new Date().getTime() - 28 * 24 * 60 * 60 * 1000);
            calendar.init({
                'opener': '.icon-rili',
                'trigger': '#rili',
                'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
                'minDate': (new Date().getFullYear() - 70) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(), //最小日期
                'maxDate': date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() //最大日期
            });
        }
    },
    watch: {
        birth: function (val) {
            this.getPrice();
            this.qi = false;
        }
    },
    methods: {
        jkxOrderPrice: function (params, success, fail) {
            return promise(zcbUrl + "/v1/jkx/order/price", params, success, fail)
        },
        getPrice: function () {
            var _this = this;
            this.jkxOrderPrice({ product_name: _this.productName, birth: this.birth }, function (res) {
                if (res.err_code === 0) {
                    _this.price = res.data;
                    _this.allPrice = '￥' + (_this.price / 100 | 0);
                    priceAll('￥' + (_this.price / 100 | 0));
                } else {
                    Toast(res.err_msg || '未知错误');
                }
            })
        }
    }
}




//代理人电话
var mobile = {
    data: function () {
        return {
            phoneNumber: '',
        }
    },
    methods: {
        getPhone: function () {
            var _this = this;
            if (this.alias && this.alias != "null" && this.alias != undefined && this.alias != "undefined") {
                cmnBizGetChannelInfo({ alias: this.alias }, function (res) {
                    if (res.err_code === 0) {
                        if(res.data.mobile) {
                            console.log('code等于0有电话')
                            _this.phoneNumber = res.data.mobile;
                        }else{
                            console.log('code等于0没电话')
                            cmnServiceConfig({os_type:8},function(res) {
                                if(res.err_code === 0 ) {
                                    _this.phoneNumber = res.data.phone;
                                }
                            })
                        }
                    }else{
                        console.log('code不为0')
                        cmnServiceConfig({os_type:8},function(res) {
                            if(res.err_code === 0 ) {
                                _this.phoneNumber = res.data.phone;
                            }
                        })
                    }
                })
            } else{
                cmnServiceConfig({os_type:8},function(res) {
                    if(res.err_code === 0 ) {
                        _this.phoneNumber = res.data.phone;
                        console.log(res.data.phone,"phone")
                    }
                })
                // _this.servicePhone = getStorage("cmnServiceConfig").data.phone
            }
            if(getParamName&&getParamName("AppKey")){
                cmnServiceConfig({os_type:8},function(res) {
                    if(res.err_code === 0 ) {
                        sessionStorage.setItem("cmnServiceConfig", typeof(res)=="object"?JSON.stringify(res):res)
                    }
                })
            }
        }
    }
};

//跳转至金牌理赔
var goldClaims = {
    methods: {
        toGoldClaims: function () {
            if (window.parent.document.getElementsByClassName('h5_wrapper')[0]) {
                // window.parent.location = window.parent.location.href.substring(0,window.parent.location.href.indexOf('#'))+'#/goldClaims';
            } else if (this.alias) {
                window.location.href = './goldClaims.html?alias=' + this.alias
            } else {
                window.location.href = './goldClaims.html'
            }
        },
    }
}


//视屏相关
var videoLogic = {
    data: {
        poster: "https://www.jubao56.com/res/2017/12/27/10/2850411/整车保2.jpg",
    },
    methods: {
        _getData: function () {
            var _this = this;
            Ajax({
                url: cmnUrl + '/v1/cmn/biz/media/list',
                type: 'GET',
                data: { media_type: 8, title: _this.productName },
                success: function (res) {
                    console.log(res, 111);
                    if (res.err_code == 0 && res.rows[0]) {
                        _this.videoSrc = res.rows[0].media_url;
                        _this.poster = res.rows[0].cover_image_url;
                        _this.videoTitle = res.rows[0].title;
                    }
                },
                fail: function (err) {
                    console.log(err)
                }
            });
        },
        videoPlay: function () {
            if (this.$refs.video.error) {
                console.log(this.$refs.video.error)
                Toast('视频有误！');
                return
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
            }
        },
    }
};

//高度bug
var iframeHeight = {
    watch: {
        tabIndex: function (val) {
            if (window.parent.document.getElementsByClassName('h5_wrapper')[0]) {
                this.$nextTick(function () {
                    window.parent.document.getElementsByTagName('iframe')[0].height = window.document.body.offsetHeight
                    // alert(window.document.body.offsetHeight)
                })
            }
        }
    },
}

var faqList = {
    data: function () {
        return {
            list: [],
            question: "",
            answer: "",
            pageSize: 8,
            total: 0,
            isShowLoading: true
        }
    },
    methods: {
        getFaqList: function (isIndexPage, productId, page, done) {
            var _this = this;
            page = page || 1;
            cmnProductFaqList({ product_id: productId, page: page,faq_type:1, rows: _this.pageSize }, function (res) {
                var rows = res.rows
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
            })
        }
    }
}

var faqDetail = {
    data: function () {
        return {
            question: "",
            answer: ""
        }
    },
    methods: {
        getFaqDetail: function () {
            var _this = this;

            cmnProductFaqDetail({ id: getParamName("id") }, function (res) {
                console.log(res);
                if (res.err_code === 0 && res.data) {
                    _this.question = res.data.question;
                    _this.answer = res.data.answer;
                }
            })
        }
    }
}