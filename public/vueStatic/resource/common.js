/**
 * Created by pc-20170420 on 2017/9/29.
 */
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
                Toast('网络异常，请求数据失败,请手动刷新页面,详情请咨询客服热线！')
            }
        }
    }

    function getBearerToken() {
        var token = null;
        var name = "jubao_user";
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
        if (arr = document.cookie.match(reg)) {
            token = unescape(arr[2]);
        }
        return "Bearer "+token;
    }
    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.setRequestHeader("Authorization", getBearerToken());
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Authorization",getBearerToken());
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    // arr.push(("v=" + Math.random()).replace(".",""));
    return arr.join("&");
}

// api公用url
var cmnUrl = "http://test.jubao56.com"; //通用
var zcbUrl = "http://test.jubao56.com"; //整车保
var spbUrl = "http://test.jubao56.com"; //商铺保
var phbUrl = "http://test.jubao56.com"; //普货保
var ygbUrl = "http://test.jubao56.com"; //员工保
var dchybUrl = "http://test.jubao56.com"; //员工保
var declareUrl = "http://test.jubao56.com"; //申报业务
var fileUrl = "http://test.jubao56.com"; //文件上传地址
var redirectUrl = "http://test.jubao56.com/pc"; //太平支付的重定向地址
if (location.hostname.indexOf("www") != -1  || location.hostname.indexOf("jubao56.com")==0) {
    cmnUrl = "https://www.jubao56.com"; //通用
    zcbUrl = "https://www.jubao56.com"; //整车保
    spbUrl = "https://www.jubao56.com"; //商铺保
    phbUrl = "https://www.jubao56.com"; //普货保
    ygbUrl = "https://www.jubao56.com"; //员工保
    dchybUrl = "https://www.jubao56.com"; //员工保
    declareUrl = "https://www.jubao56.com"; //申报业务
    fileUrl = "https://www.jubao56.com"; //文件上传地址
    redirectUrl = "http://www.jubao56.com/#/"; //太平支付的重定向地址
}
function getToken() {
    var token = null;
    var name = "jubao_user";
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        token = unescape(arr[2]);
    }
    return token;
}
function promise(url, params,success,fail) {
        if(!fail)fail=function () {};
  jQuery.support.cors = true; //
        return $.ajax({
					url:url,
					type:'GET',
					data:params,
					success:function (resp) {
						success(resp)
					},
					error:function (res) {
						fail(res)
						console.log(res,url)
					}
				})
       // return ajax({
       //      method: "GET",
       //      url: url,
       //      headers: { 'Authorization': 'Bearer ' + getToken() },
       //      data:params,
       //      success:function (resp){
       //         success(resp);
       //      },
       //      fail:function (res) {
       //         fail(res)
       //         console.log(res)
       //      }
       //  });
}
// 获取整车保电子保单
var zcbOrderPolicy = function(orderId,success,fail){
   return promise(zcbUrl + "/v1/zcb/order/policy",{ order_id: orderId*1 },success,fail);
}
// 获取整车保承保确认单
var zcbOrderConfirmation = function(params,success,fail) {
    return promise(zcbUrl + "/v1/zcb/order/confirmation", params,success,fail);
}
// 根据订单id查询整车保订单详情(正式)
var zcbOrderPolicyInfo = function(id,success,fail) {
    return promise(zcbUrl + "/v1/zcb/order/policy_info", { id: id },success,fail);
}
// 根据订单id查询整车保订单详情(试用)
var zcbOrderTryInfo = function(id,success,fail) {
    promise(zcbUrl + "/v1/zcb/order/try/info", { id: id },success,fail);
}

// 获取专线保电子保单
var zxbOrderPolicy = function(orderId,success,fail){
  return promise(zcbUrl + "/v1/zxb/order/policy",{ id: orderId*1 },success,fail);
}
// 获取整车保承保确认单
var zxbOrderConfirmation = function(params,success,fail) {
  return promise(zcbUrl + "/v1/zxb/order/confirmation", {id:params.order_id},success,fail);
}
// 根据订单id查询专线保订单详情(正式)
var zxbOrderPolicyInfo = function(id,success,fail) {
	return promise(zcbUrl + "/v1/zxb/order/policy_info", { id: id },success,fail);
}

// 获取单次货运保电子保单
var DchybOrderPolicy = function(orderId,success,fail){
  return promise(dchybUrl + "/v1/dchyb/order/policy",{ order_id: orderId*1 },success,fail);
}
// 获取信达电子保单
var DchybOrderPolicyCinda = function(orderId,success,fail){
	return promise(dchybUrl + "/v1/dchyb/order/policy/cinda",{ order_id: orderId*1 },success,fail);
}
// 获取单次货运保承保确认单
var DchybOrderConfirmation = function(params,success,fail) {
  return promise(dchybUrl + "/v1/dchyb/order/confirmation", params,success,fail);
}
// 根据订单id查询单次货运订单详情
var DchybOrderPolicyInfo = function(id,success,fail) {
  return promise(dchybUrl + "/v1/dchyb/order/policy_info", { id: id },success,fail);
}

var cmnProductList = function (params, success, fail) {
  return promise(cmnUrl + "/v1/cmn/product/list", params, success, fail)
}



//提示框
function Toast(tip,timeout) {
  timeout = timeout || 2000;
  var oBody = document.getElementsByTagName('body')[0];
  var oStyle = document.createElement('style');
  oStyle.innerHTML = '.toast{font-size:16px; z-index:10000000000;animation: toast 1s linear; -webkit-animation: toast 1s linear; max-width: 200px;padding: 5px 10px;border-radius: .07rem;background: rgba(0,0,0,.7);color: #fff;position: fixed;text-align: center;top:50%;left: 50%;transform: translate3d(-50%,-50%,0); -webkit-transform: translate3d(-50%,-50%,0); }\n' +
    '        @keyframes toast { 0%{opacity: 0;} 50%{ opacity: .75; } 100%{ opacity: 1; }}\n' +
    '        @-webkit-keyframes toast { 0%{ opacity: 0;} 50%{ opacity: .75; }100%{ opacity: 1; }}'
  oBody.appendChild(oStyle);

  var oToast = document.createElement('p');
  oToast.className = 'toast';
  oToast.innerHTML = '<span>'+tip+'</span>';
  oBody.appendChild(oToast);
  setTimeout(function () {
    oToast.remove();
  },timeout)
}
//获取query参数
function getParamName(name) {
	var url = location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest[name]
}
//获取ext参数 {orderId:397,productType:phb}
function getInExt(ext,name) {
  return JSON.parse(ext)[name]
}

function format(date,fmt) { //author: zhengsh 2016-9-5
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
