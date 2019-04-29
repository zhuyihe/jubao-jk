<template>
    <div class="home_tab">
        <router-link to="/home" :class="$route.path == '/home'?'active':''" class="home" tag="span" >
            <!--<i class="iconfont icon-shouye"></i>-->
            <p>首页</p>
        </router-link>
        <!--<router-link to="/article" :class="$route.path == '/article'?'active':''" tag="span" v-touchFeel="{color:'#f2f2f2'}">-->
            <!--<i class="iconfont icon-pindao"></i>-->
            <!--<p>保险频道</p>-->
        <!--</router-link>-->
        <!-- <router-link to="/dashboard" :class="$route.path == '/dashboard'?'active':''" tag="span" v-touchFeel="{color:'#f2f2f2'}"> -->
        <router-link to="/dashboard" :class="$route.path == '/dashboard'?'active':''" tag="span" >
            <!-- <i class="iconfont icon-wo"></i> -->
            <p>我的保单</p>
        </router-link>
    </div>
</template>

<script>
    export default {
    }

</script>

<style lang="scss" scoped>
  .home_tab{
    height: 100px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed !important;
    width: 100%;
    bottom: 0;
    z-index: 1000;
    @include border-1px("top");
    .home{
      @include border-1px("right")
    }
    span{
      flex: 1;
      display: block;
      text-align: center;
      font-size: 28px;
      color: #000;
      i{
        font-size:40px;
        display: block;
        height: 50px;
      }
    }
    span.active{
      color: #06acf9;
    }
  }
</style>
