
<template>
  <div class="weui-cell" ref="upload">
    <div class="weui-cell__bd">
      <div class="weui-uploader">
        <div class="weui-uploader__hd" v-show="title">
          <p class="weui-uploader__title">{{title}}</p>
        </div>
        <div class="weui-uploader__bd">
          <ul class="weui-uploader__files weui-uploader-box" ref="ul" @click="show">
            <template v-for="(img,index) in initList">
              <li class="weui-uploader__file" :key="index" :style='background(typeof img==="string"?img:img.file_url)'></li>
            </template>
          </ul>
          <div class="weui-uploader__input-box" v-show="inputShow">
            <input class="weui-uploader__input" type="file" :accept="accept" :multiple="multi" @click="uploadImg">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import "./jquery-1.9.1.min"
//  const weui = ()=>import("weui.js")
  export default {
    props: {
      url: {type: String, required: true},//上传地址 必传
      value: {type: Array, required: true},//上传成功的图片数组 必传
      onlyOne: {type: Boolean, default: false},//可选，默认false，传true时，表示只能显示一张图片，一般用于营业执照上传
      title: {type: String, default: ''},//上传的标题 可选
      fileName: {type: String, default: 'fileVal'},//上传文件的字段名，公司上传api要求为fileVal 可选
      multiple: {type: Boolean, default: true},//是否允许一次多张上传，默认允许  可选
      accept: {type: String, default: 'image/*'},//上传文件格式要求 可选
      fileType: {type: String, default: ''}, //上传文件请求头相关， 可选，公司api没做要求可以不管
      maxLimit:{type:Number,default:10},    //限制最大上传张数，默认为5张
      onceLimit:{type:Number,default:10},      //限制一次性上传的张数，默认为3张
    },
    data() {
      return {
        initList: [],
        resList: [],
        inputShow: true,  //单张上传时如果有图片则不显示上传按钮
				gallery:null
      }
    },
    computed: {
      multi() {
        if (this.onlyOne) {
          return false
        } else {
          return this.multiple
        }
      }
    },
    created() {
      this._reload();
    },
    watch: {
      value: {
        handler(val) {
          //如果传进来的数据和我导出去的数据不一样，则证明是外部异步导进来的数据,那就重新初始化
          if (val !== this.resList) {
            this.$refs.ul.innerHTML = '';//清空图片
            this._reload();
          }
        },
        deep: true
      },
      resList: {
        handler(val) {
          this.$emit('input', val)
        },
        deep: true
      }
    },
    methods: {
      _reload() {
        if (this.onlyOne && this.value.length > 1) throw 'onlyOne模式默认只能有一张图片！';
        if (this.onlyOne && this.value.length >0) {this.inputShow = false;}
        if(typeof this.value[0]==="object"){
          this.value.forEach((item) => {
            this.initList.push(item.file_url);
            this.resList.push(item.file_url)
          })
        }else{
          this.value.forEach((item) => {
            this.initList.push(item);
            this.resList.push(item)
          })
        }

      },
      uploadImg() {
        let vm = this;
        weui.uploader(this.$refs.upload, {
          url: vm.url,
          auto: true,
          type: 'file',
          fileVal: vm.fileName,
          compress: {
            width: 1600,
            height: 1600,
            quality: .8
          },
          onBeforeQueued: function (files) {
            if (this.size > 10 * 1024 * 1024) {
              weui.alert('请上传不超过10M的图片');
              return false;
            }
            if (files.length > vm.onceLimit) { // 防止一下子选择过多文件
              weui.alert('一次最多只能上传'+ vm.onceLimit+'张图片，请重新选择');
              return false;
            }

            if (vm.$refs.ul.children.length >= vm.maxLimit) {
              weui.alert('最多只能上传'+ vm.maxLimit+'张图片');
              return false;
            }
            if (vm.onlyOne) {   //如果是onlyOne模式则只保留一张图片
              if ( vm.resList.length > 0) { vm.$refs.ul.removeChild(vm.$refs.ul.children[0])};
              vm.resList = [];
              vm.initList = [];
              vm.inputShow = false;
            }
          },
          onBeforeSend: function (data, headers) {
            $.extend(data, {"product_name": "spb", "file_name": this.name, "file_type": vm.fileType});
          },
          onSuccess: function (ret) {
            vm.resList.push(ret.data);
          },
        });
      },
      show(e) {
        let index = $(e.target).index();
        if (e.target.className === 'weui-uploader__file') {
          let url = e.target.style.backgroundImage.replace('"', '').replace('"', '');
          url = this._changeUrl(url.slice(4, url.length - 1));
          let gallery = weui.gallery(url, {
            className: 'file',
            onDelete: () => {
              weui.confirm(
                '确定删除该图片？',
                () => {
                  this._deleteImg(index)
                });
              gallery.hide();
							this.gallery = null;
            }
          });
					let closeIcon = document.createElement('div');
					closeIcon.className = 'p_closeIcon';
					closeIcon.innerHTML =  `<i class="iconfont icon-cancel"></i>`;
					gallery.appendChild(closeIcon);
					let oldDom = $(gallery).find('.weui-gallery__img');
					let newDom = $(gallery).find('.weui-gallery__img').clone();
					oldDom.remove();
					gallery.appendChild(newDom[0]);
					closeIcon.onclick = ()=>{
						gallery.hide();
						this.gallery = null;
					};
					this.gallery = gallery;
        }
      },
      _deleteImg(index) {
//        if(index<this.initList.length)this.$delete(this.initList, index);
        this.$delete(this.resList, index);
        this.$refs.ul.removeChild(this.$refs.ul.children[index]);
        if(this.onlyOne && this.resList.length === 0) this.inputShow = true;
      },
      background(url) {

        return {
          backgroundImage: 'url("' + this._changeUrl(url) + '")',
        }
      },
      _changeUrl: function (url) {
        return url.replace(/\\/g, "/").replace(/\s/g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29")
      },
    },
		beforeDestroy(){
			this.gallery && this.gallery.hide();
		}
  }
</script>
<style type="text/scss" lang="scss">
/*.weui-uploader-box{*/
  /*display: flex;flex-wrap: wrap;justify-content: space-between;*/
/*}*/
.p_closeIcon{
  position: absolute;
  top: pxToRem(-80);
  right:pxToRem(-80);
  width: pxToRem(160);
  height: pxToRem(160);
  border-radius: 50%;
  box-shadow:-2px 2px pxToRem(11) #333333;
  font-size: pxToRem(30);
  background: #fff;
  z-index: 100;
  i{
    position: absolute;
    top:50%;
    right:57%;
    font-size: pxToRem(36);
    color: #000;
  }
}
</style>
