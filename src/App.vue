<template>
  <div id="app">
    <!-- <transition
      :name="transitionName"
    >
      <router-view class="router"></router-view>
    </transition>-->
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
  </div>
</template>
<script>
import { routeBack } from "@/router/routerBack";
import { setStorage, getStorage } from "@assets/js/SessionStorage";
import { cmnServiceProductList } from "@api";
import { setTimeout } from "timers";
export default {
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  created() {
    if (!getStorage("productList")) {
      this.getProductList();
    }
  },
  mounted() {
    // setTimeout(() => {
    //   let inptArr = document.getElementsByTagName("input");
    //   console.log(inptArr.length);
    //   for (let item of inptArr) {
    //     item.addEventListener("blur", () => {
    //       this.scroll();
    //     });
    //   }
    // }, 500);
  },
  methods: {
    async getProductList() {
      // //获取聚保的所有产品
      let ress = await cmnServiceProductList({ app_id: 1 });
      setStorage({ cmnServiceProductList: ress });
    },
    scroll() {
      // console.log(document.documentElement.scrollTop)
      // console.log(document.documentElement.clientHeight)
      // if(document.documentElement.scrollTop>0){
      //    ;
      // }
      //  window.scroll(0,0) //失焦后强制让页面归位
    }
  },
  watch: {
    $route: function(to, from) {
      //history添加记录
      if (process.env.NODE_ENV === "production") pushHistory();
      function pushHistory() {
        var state = {
          title: "title",
          url: "#"
        };
        if (to.path !== "/home")
          window.history.pushState(state, "title", "#" + to.fullPath);
      }
      // 自动回到顶部
      document.body.scrollTop = "0";
      document.documentElement.scrollTop = 0;
      // 记录路由来源和去向以及backUrl
      if (from.path !== "/") {
        this.$store.commit("SETROUTER", {
          to,
          from,
          backUrl: routeBack(to, from)
        });
      }

      //路由动画
      let toLevel = to.meta.level;
      let fromLevel = from.meta.level;
      if (toLevel > fromLevel) {
        this.transitionName = "slide-left";
      } else if (toLevel < fromLevel) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    }
  }
};
</script>

<style lang="scss">
.Router {
  position: absolute;
  width: 100%;
  transition: 0.3s ease-in-out;
  //  top: 40px;
}

@keyframes slideInLeft {
  from {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-left-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInLeft 0.3s ease-in-out forwards;
}
.slide-left-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideInRight 0.3s ease-in-out forwards;
}
/*向右滑动*/
@keyframes slideOutLeft {
  from {
    transform: translate3d(-100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
@keyframes slideOutRight {
  from {
    transform: translate3d(0%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
  to {
    transform: translate3d(100%, 0, 0);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
  }
}
.slide-right-enter-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutLeft 0.3s ease-in-out forwards;
}
.slide-right-leave-active {
  position: fixed;
  top: 0;
  left: 0%;
  width: 100vw;
  height: 100vh;
  animation: slideOutRight 0.3s ease-in-out forwards;
}
.router {
  position: absolute;
  overflow-y: scroll;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
