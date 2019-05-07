Vue.component('loading',{
  template:'<div>\n' +
          '    <div class="loading" v-show="loadFlag || !cicle_show">\n' +
          '      <span class="cicle" v-if="cicle_show"></span>\n' +
          '      <div class="reload" v-else>\n' +
          '        <i class="iconfont icon-wifi"></i><br>\n' +
          '        网络不给力，请重新加载<br>\n' +
          '        <div onclick="window.location.reload()">重新加载</div>\n' +
          '      </div>\n' +
          '    </div>\n' +
	        '    <slot v-show="!loadFlag && cicle_show"></slot>\n' +
          '  </div>',
  props:{
		timeout:{
		  type:Number,
      default:10000
    }
  },
  data:function () {
    return{
			loadFlag:true,
			cicle_show:true,
			timer:null
    }
	},
  created:function(){
    var _this = this;
    this.timer = setTimeout(function () {
      _this.cicle_show = false;
    },this.timeout)
  },
  methods:{
    close:function () {
      clearTimeout(this.timer);
      this.loadFlag = false;
		}
  }
});
