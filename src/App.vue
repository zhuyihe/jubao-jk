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
export default {
  data() {
    return {
      transitionName: 'slide-right'
    };
  },
  methods: {},
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
      //        console.log(to.meta.level,from.meta.level);
      let toLevel = to.meta.level;
      let fromLevel = from.meta.level;

      if (toLevel > fromLevel) {
        this.transitionName = "slide-left";
      } else if (toLevel < fromLevel) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-right";
      }
    }
  }
};
</script>

<style lang="scss">
.aa {
  font-size: 40px;
}
.Router {
     position: absolute;
     width: 100%;
     transition: .3s  ease-in-out;
    //  top: 40px;
}

.slide-left-enter,
 .slide-right-leave-active {
    //  opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
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
