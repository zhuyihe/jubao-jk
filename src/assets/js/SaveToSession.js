// 保存地址栏的所有参数
export const saveLocationInfo=()=>{
    let query = getLocationQuery(location.href); //获取?后面的信息
    if(!query){return}
    setStorage({ "locationQuery":Object.assign(getStorage("locationQuery") || {},query) });
  };