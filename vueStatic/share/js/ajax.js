var getLocationQuery=function(location){
  var queryInfo = location.substring(location.lastIndexOf("?")+1);
  if(!queryInfo){return null;}
  var array = queryInfo.split("&");
  var query = {};
  array.forEach(function(val,idx){
    var a = val.split("=");
    query[a[0]]=a[1]
  });
  return query
};
var query = getLocationQuery(window.location.href);

function Ajax(object) {
    var props = {
        type: 'GET',
        url: '',
        token: true,
        header:{},
        data:{},
        success: function () {},
        fail: function () {}
    }
    // props = Object.assign(props,object)
    for(var k in object){
        props[k] = object[k];
    }
    var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();

    if(props.type.toUpperCase() == 'GET'){
        var queryString = '?'
        for(var k in props.data){
            queryString += k+'='+props.data[k]+'&'
        }
        props.url+= queryString.substring(0,queryString.length-1);
        xhr.open(props.type,props.url,true);
        // xhr.setRequestHeader("Appkey", query && query["AppKey"] || "BpLnfgDs" )
        xhr.setRequestHeader("Appkey", apikey )
        if(props.token)xhr.setRequestHeader("Authorization", 'Bearer ' + getToken());
        for(var k in props.header){
					xhr.setRequestHeader(k,props.header[k]);
        }
        xhr.send();
    }else if(props.type.toUpperCase() == 'POST'){
        var formData = new FormData();
        for(var k in props.data){
            formData.append(k, props.data[k]);
        }
        xhr.open(props.type,props.url,true);
        xhr.setRequestHeader("Appkey", query && query["AppKey"] || "BpLnfgDs" )
			  if(props.token)xhr.setRequestHeader("Authorization", 'Bearer ' + getToken());
        xhr.send(formData);
    }
    xhr.onreadystatechange = function (){
        if(xhr.readyState==4) {
            if(xhr.status==200){
							props.success(JSON.parse(xhr.responseText));
            }else {
							props.fail(xhr.status)
						}
        }
    };
}

var apikey = "";
(function () {  
    var cmnUrl2 = "http://test.jubao56.com"; //通用
    if (location.hostname.indexOf("www") != -1  || location.hostname.indexOf("jubao56.com")==0) {
        cmnUrl2 = "https://www.jubao56.com"; //通用
    }
    if(getParamName('AppKey')) {
        apikey = getParamName('AppKey');
        setStorage({"apiKey":apikey})
        return;
    }
    ajax2({
        url: cmnUrl2 + "/v1/api/cmn/app/key",           //请求地址
        type: "get",                       //请求方式
        dataType: "json",
        data: {"appname":getParamName("appname")},
        success: function (response, xml) {
            // 此处放成功后执行的代码
            // console.log(response);
            // document.getElementById('box').innerHTML=response
            // a=response
            var obj=JSON.parse(response)
            apikey = obj.data.app_key;
            setStorage({"apiKey":obj.data.app_key})
        },
        fail: function (status) {
            // 此处放失败后执行的代码
        }
    });
})()

function ajax2(options) {
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
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, false);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, false);
        //设置表单提交时的内容类型
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
    return arr.join("&");
}

// api公用url
var isWWW = false;
var cmnUrl = "http://test.jubao56.com"; //通用
var zcbUrl = "http://test.jubao56.com"; //整车保
var spbUrl = "http://test.jubao56.com"; //商铺保
var phbUrl = "http://test.jubao56.com"; //普货保
var ygbUrl = "http://test.jubao56.com"; //员工保
var dchybUrl = "http://test.jubao56.com"; //员工保
var declareUrl = "http://test.jubao56.com"; //申报业务
var fileUrl = "http://test.jubao56.com"; //文件上传地址
var redirectUrl = "http://test.jubao56.com/pc"; //太平支付的重定向地址
var isNewjubao=location.href.indexOf("test.jubao56.com/newjubao")>-1
var isLocal=location.hostname.indexOf("test.jubao56.com")==-1

var backUrl = ""
var from=localStorage.getItem("from");
var platFormName="miniprogram";

if(isLocal){
    backUrl=location.protocol +"//" + location.hostname+"/#/home";
}else{
    if(isNewjubao){
        backUrl="http://test.jubao56.com/newjubao/#/home";
    }else{
        backUrl="http://test.jubao56.com/m/#/home";
    }
}

// var backUrl = "http://test.jubao56.com/m/#";
var pageUrl = "http://test.jubao56.com"
if (location.hostname.indexOf("www") != -1  || location.hostname.indexOf("jubao56.com")==0) {
    isWWW = true;
    cmnUrl = "https://www.jubao56.com"; //通用
    zcbUrl = "https://www.jubao56.com"; //整车保
    spbUrl = "https://www.jubao56.com"; //商铺保
    phbUrl = "https://www.jubao56.com"; //普货保
    ygbUrl = "https://www.jubao56.com"; //员工保
    dchybUrl = "https://www.jubao56.com"; //员工保
    declareUrl = "https://www.jubao56.com"; //申报业务
    fileUrl = "https://www.jubao56.com"; //文件上传地址
    redirectUrl = "https://www.jubao56.com/#/"; //太平支付的重定向地址
    // backUrl = "http://www.jubao56.com/newjubao/#";
    // if(from&&from==platFormName){
    //     backUrl = "https://www.jubao56.com/m/#/home?from="+platFormName;
    // }else{
    //     backUrl = "https://www.jubao56.com/m/#/home";
    // }
    backUrl = "https://www.jubao56.com/m/#/home";
    pageUrl = "https://www.jubao56.com"
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

function promise(url, params,success,fail,methods) {
    if (!fail)fail=function () {};
    if (!methods)methods='GET';
    return Ajax({
        type: methods,
        url: url,
        // headers: { "AppKey":storage && storage["AppKey"] || "BpLnfgDs" },
        data:params,
        success:function (resp){
            console.log('Bearer ' + getToken());
            success(resp);
        },
        fail:function (res) {
            fail(res)
            console.log(res)
        }
    });
}
