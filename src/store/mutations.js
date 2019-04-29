import { setLocalStorage } from "@assets/js/SessionStorage"
export const mutations={
    COMMIT_TOKEN(state,access_token){
        state.access_token=access_token
    },
    //记录router来去
    SETROUTER(state,{to,from,backUrl}){
        state.routerFrom = from;
        state.routerTo = to;
        state.backUrl = backUrl;
        let toData = {
          path:to.path,
          fullPath:to.fullPath,
          query:to.query,
          params:to.params,
        };
        let fromData = {
          path:from.path,
          fullPath:from.fullPath,
          query:from.query,
          params:from.params,
        };
        setLocalStorage('router',{to:toData,from:fromData,backUrl})
      },
}