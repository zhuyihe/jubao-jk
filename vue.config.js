const path = require('path')
//去console插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
//gzip压缩插件
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
    return path.join(__dirname, dir)
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
            console.log(args[0])
            return args;
        });
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
            //             drop_debugger: true,
            //             drop_console: true,
            //         },
            //     },
            //     sourceMap: false,
            //     parallel: true,
            // }),
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