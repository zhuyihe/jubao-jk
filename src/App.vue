<template>
  <div id="app">
    <transition
      :name="transitionName"
      @before-leave="beforeLeave"
      @after-leave="afterLeave"
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
    >
      <router-view class="router"></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: ""
    };
  },
  methods: {
    beforeLeave(el) {
      var bg = document.createElement("div");
      bg.className = "router_bg";
      el.appendChild(bg);
    },
    afterLeave(el) {},
    beforeEnter(el) {},
    afterEnter(el) {}
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
      //        console.log(to.meta.level,from.meta.level);
      let toLevel = to.meta.level;
      let fromLevel = from.meta.level;

      if (toLevel > fromLevel) {
        this.transitionName = "slide-left";
      } else if (toLevel < fromLevel) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "default";
      }
    }
  }
};
</script>

<style lang="scss">
.aa{
  font-size: 40px
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
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active {
  transition: transform 0.3s;
  -webkit-transition: -webkit-transform 0.3s;
}
.slide-left-leave-active {
  transition: transform 0.3s 0.1s;
  -webkit-transition: -webkit-transform 0.3s 0.1s;
}
.slide-left-enter,
.slide-right-leave-active {
  z-index: 1000000;
  //box-shadow: rgba(0,0,0,.3) pxToRem(-10) 0 pxToRem(5);
}
.slide-left-enter-to,
.slide-left-leave-to {
  z-index: inherit;
}

.slide-right-enter {
  transform: translate(-50%, 0);
}
.slide-right-enter-to {
  transform: translate(0, 0);
}
.slide-right-leave {
  transform: translate(0, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}

.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-enter-to {
  transform: translate(0, 0);
}
.slide-left-leave {
  transform: translate(0, 0);
}
.slide-left-leave-to {
  transform: translate(-50%, 0);
}
</style>
