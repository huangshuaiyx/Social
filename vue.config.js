const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 部署应用包时的基本 URL
  publicPath: "./",
  // 打包时生成 .map 文件
  productionSourceMap: false,
  // 打包完成后文件夹名称
  outputDir: "dist",
  // 解决i18n警告
  chainWebpack:config => {
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  },
  lintOnSave: false, //关闭eslint检查
//   configureWebpack: {
//     plugins: [
//       ComponentsPlugin({
//         resolvers: [VantResolver()],
//       }),
//     ],
//   },
    devServer: {
        client: {
          overlay: false
        }
    },
})
