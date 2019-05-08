//兼容性js  start----------------------------------------------
/**
 * 获取元素的属性
 * @param el
 * @param attr
 * @returns {*}
 */
function getStyle(el,attr) {
    if(window.getComputedStyle){
        return window.getComputedStyle(el)[attr]
    }else{
        return el.currentStyle[attr];
    }
}
//阻止浏览器的默认事件
function defaultEvent(e) {
    e.preventDefault()
}
//全屏 el -- document.documentElement;
function makeVideoFull(el) {
    var docElm = el;
    //W3C
    if(docElm.requestFullscreen){
        docElm.requestFullscreen();
    }//FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }//Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }//IE11
    else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
    }
}
//退出全屏
function exitVideoFull() {
    //退出全屏
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
//兼容性js  end-------------------------------------------------

//小方法 start------------------------------------------------------
/**(
 * 将 "39px" 转化为39 的形式
 * @param val
 * @param isPlus  时候取绝对值
 * @returns {number}
 */
function pxToNum(val,isPlus) {
    if(typeof val=="string"){
        if(!isPlus){
            return val.substring(0,val.lastIndexOf("px"))*1
        }else{
            return Math.abs(val.substring(0,val.lastIndexOf("px"))*1)
        }
    }
}

//将9变成09 的形式
function numToTwo(num) {
    if(typeof num == "number"){
        return num=num<10?("0"+num):num;
    }
}
/**
 * 将 秒 转化为01:19:28 这种形式
 * @param allTime
 * @returns {string}
 */
function changeTimeFormat(allTime) {
    var hours =numToTwo(Math.floor(allTime/(60*60)));   var hourOvermuch=allTime%(60*60); //时
    var minute = numToTwo(Math.floor(hourOvermuch/60));      var minuteOvermuch = hourOvermuch%60; //分
    var second = numToTwo(Math.floor(minuteOvermuch));
    // return hours+":"+minute+":"+second;
    return minute+":"+second;
}
/**
 * 快速阻止事件冒泡
 * @param elArr  这里是多个元素所组成的数组集合
 */
function preventBubble(elArr) {
    if(isArray(elArr)){
        for(var i=0;i<elArr.length;i++){
            elArr[i].onclick=function (e) {
                window.event? window.event.cancelBubble = true : e.stopPropagation();
            }
        }
    }
}
//小方法 end------------------------------------------------------


//给对象自定义方法
/**
 * 设立事件监听
 * @param type
 * @param fn
 * @param boolean
 */
Object.prototype.addListener=function (type, fn, boolean) {
    boolean=boolean?boolean:"false";
    if (typeof window.addEventListener != "undefined") {
        videoStart.addEventListener(type,fn,boolean)
    }else{
        videoStart.attachEvent(type,fn)
    }
};

//数组的自定义方法
function isArray(arg) {
    if (typeof arg === 'object') {
        return Object.prototype.toString.call(arg) === '[object Array]';
    }
    return false;
}


//二级封装 start------------------------------------------------------------

//二级封装 end--------------------------------------------------------------