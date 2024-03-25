const webpack = require('webpack')

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  // 打包时生成 .map 文件
  productionSourceMap: true,
  // 打包完成后文件夹名称
  outputDir: "dist",
  //jquery
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },
  chainWebpack: config => {
    config
        .entry('index')
        .add('babel-polyfill')
  }
};
