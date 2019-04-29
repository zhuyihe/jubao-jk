/**
 * 截取出location中最后一个？后面的字符串
 * @param location    www.baidu.com?status=1&orderId=2 / http://test.jubao56.com/m/?from=singlemessage#/zcb?alias=c057416
 * @returns {string}    status=1&orderId=2   /  alias=c057416
 */
export const handleLocation =(location)=>{
    let a = location.substring(location.indexOf("?")+1);
    if(a.indexOf("?")!==-1){
      a=handleLocation(a)
    }
    return  a
  };
  
  /**
   * @param location  www.baidu.com /  www.baidu.com?status=1  / www.baidu.com?status=1&orderId=2
   * @param Obj  {productType:"zcb"}
   * @returns {string|*}      www.baidu.com?productType=zcb /  www.baidu.com?status=1&productType=zcb   / www.baidu.com?status=1&orderId=2&productType=zcb
   */
  export const setLocationQuery=(location,Obj)=> {
    var infoString=location.indexOf("?")===-1?"?":"&";
    for(var k in Obj){
      infoString += k+"="+Obj[k]+"&"
    }
    infoString= infoString.substring(0,infoString.length-1);
    return location+infoString
  }
  /**
   *
   * @param location   www.baidu.com?status=1&orderId=2    /    http://test.jubao56.com/m/?from=singlemessage#/zcb?alias=c057416
   * @returns {{}}    {status:1,orderId:2}
   */
  export const getLocationQuery=(location)=> {
    let queryInfo = handleLocation(location);
    if(!queryInfo){return null;}
  
    let array = queryInfo.split("&");
    let query = {};
    array.forEach((val,idx)=>{
      let a = val.split("=");
      query[a[0]]=a[1]
    });
    return query
  };
  
  