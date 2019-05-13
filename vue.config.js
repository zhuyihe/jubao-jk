const path = require('path')
//gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
}
//对一些不经常改动的库，可以通过cdn引入，webpack不对他们打包  
let externals = {
    'vue': 'Vue',
    'axios': 'axios',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'weui': 'weui',
    'muse-ui': 'MuseUI'
}
const cdn = {
    css: [
        //muse-ui css
        'https://unpkg.com/muse-ui@3.0.2/dist/muse-ui.css',
        //font
        'http://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css',
        //weui
        'https://unpkg.com/weui@2.0.0/dist/style/weui.min.css'
    ],
    js: [
        //vue
        'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
        //axios
        'http://cdn.staticfile.org/axios/0.19.0-beta.1/axios.min.js',
        //vuex
        'https://unpkg.com/vuex@3.1.0/dist/vuex.min.js',
        //vue-router
        'https://unpkg.com/vue-router@3.0.6/dist/vue-router.min.js',
        //muse-ui
        'https://unpkg.com/muse-ui@3.0.2/dist/muse-ui.js',
        //weui
        'https://unpkg.com/weui.js@1.1.4/dist/weui.min.js'
    ]
}
module.exports = {
    //基本路径
    publicPath: './',
    //文件打包输出路径
    outputDir: 'dist',
    //放置生成的静态资源
    assetsDir: 'vueStatic',
    //去除map文件
    productionSourceMap: false,
    chainWebpack: config => {
        //区分环境
        config.plugin('define').tap(args => {
            args[0]['process.env'].VUE_APP_LOGOUT_URL = JSON.stringify(process.env.VUE_APP_LOGOUT_URL)
            //定义图片上传地址
            args[0]['process.env'].VUE_APP_FILE_URL = JSON.stringify(process.env.VUE_APP_FILE_URL)
            return args;
        });
        //忽略打包
        config.externals(externals)
        config.plugin('html')
            .tap(args => {
                args[0].cdn = cdn;
                return args
            })
        //设置别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@api', resolve('src/api/api')) //接口地址
            .set('@assets', resolve('src/assets'))
    },
    configureWebpack: config => {
        //生产环境插件
        let pluginsPro = [
            // new UglifyJsPlugin({
            //     uglifyOptions: {
            //         compress: {
            //             warnings: false,
            //             drop_console: true,//console
            //             drop_debugger: false,
            //             pure_funcs: ['console.log']//移除console
            //         },
            //         sourceMap: false,
            //         parallel: true,
            //     }),
            new CompressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp(
                    '\\.(' + ['js', 'css'].join('|') +
                    ')$',
                ),
                threshold: 10240,
                minRatio: 0.8,
            }),
        ]
        if (process.env.VUE_APP_CURRENTMODE !== 'development') {
            config.plugins = [...config.plugins, ...pluginsPro]
        }
    },
    devServer: {
        port: 8888, // 端口
        open: true, // 自动开启浏览器
        compress: false, // 开启压缩
        overlay: {
            warnings: true,
            errors: true
        }
    },
    //定义scss全局变量
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/global.scss";`
            },
        }
    }
}