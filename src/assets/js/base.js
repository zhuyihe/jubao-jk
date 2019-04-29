//判断是否为数组
export const isArray =(arg)=> {
    if (typeof arg === 'object') {
      return Object.prototype.toString.call(arg) === '[object Array]';
    }else{
      console.log("%c "+ arg +" type is not Array","color:red;")
    }
    return false;
  };
  //判断是否为对象
  export const isObject =(arg)=> {
    if(typeof arg === 'object'){
      return Object.prototype.toString.call(arg) === '[object Object]';
    }else{
      console.log("%c "+ arg +" type is not Object","color:red;")
    }
  };
  