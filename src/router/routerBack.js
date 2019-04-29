
export const routeBack =(to,from)=> {
    //路由变化 backUrl
    let backUrl = '/';
  
    //结构介绍
    /*
    * to:当前页面路由
    * defaultBack:该页面默认返回路由
    * from:上一个页面的情况
    *       path:上一个页面的路由数组，back来自这些页面时对应的返回路由    多对一关系
    *        优先级:routePathArr.from.path > defaultBack【自定义默认返回路径】 > from.fullPath【默认返回路径】 ;
    *
    * */
    let routePathArr = [
     
    ];
  
  //优先级:routePathArr.from.path > defaultBack【自定义默认返回路径】 > from.fullPath【默认返回路径】 ;
    routePathArr.forEach((item)=>{
      if(item.to===to.path){
        backUrl = item.defaultBack?item.defaultBack:from.fullPath;
        item.from && item.from.forEach((i)=>{
          i.path.forEach((j)=>{
            if(from.path === j){
              backUrl = i.backUrl;
              return ;//终止循环
            }
          })
        })
      }
    });
  
    console.log({to:to.path,from:from,backUrl});
    return backUrl;
  };
  
  