/*
目前sessionStorage中的存储字段名有:
provinceList:["湖北省"，"北京市"]
* 
*/
import {isObject} from "./base";


//以对象的形式储存信息
export const setStorage = (L) =>{
  if(!isObject(L)){return ;}
  if(!window.sessionStorage){return ;}
  for(let key in L){
    window.sessionStorage.setItem(key,JSON.stringify(L[key]));
  }
};

//若不存在对应的value 则返回null
export const getStorage = (key) =>{
  // debugger
  if(!window.sessionStorage){return ;}
  return JSON.parse(window.sessionStorage.getItem(key));
};

export const removeStorage = (key) => {
  if(!window.sessionStorage){return ;}
  sessionStorage.removeItem(key)
};

export const setLocalStorage = (key, value) => {
  if(!window.localStorage)return;
  let data = JSON.stringify(value);
  window.localStorage.setItem(key, data);
};
export const getLocalStorage = key => {
  if(!window.localStorage)return;
  try{
    return JSON.parse(window.localStorage.getItem(key))
  }catch(err){
    removeLocalStorage(key)
  }
};

export const removeLocalStorage = key =>{
	if(!window.localStorage)return;
	window.localStorage.removeItem(key);
}

export const replaceLocalStorage = (key, options) => {
  if (typeof options !== "object") throw 'options must be a Object!';
  let data = getLocalStorage(key);
  if (!data) throw 'the key has not be found in the localStorage!';
  for (let k in data) {
    for (let e in options) {
      if (e == k) {
        data[k] = options[e]
      }
    }
  }
  setLocalStorage(key, data)
};