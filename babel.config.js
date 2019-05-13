const plugins = ["@vue/babel-plugin-transform-vue-jsx","@babel/plugin-transform-runtime"]
//配置去除console插件
if(process.env.VUE_APP_CURRENTMODE=='production'){
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/app',
    '@babel/preset-env'
  ],
  plugins: plugins
}
