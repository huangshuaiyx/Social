// const path = require("path");

// function resolve(dir) {
//   return path.join(__dirname, ".", dir);
// }

module.exports = {
  // 部署应用包时的基本 URL
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",
  // 打包时生成 .map 文件
  productionSourceMap: false,
  // 打包完成后文件夹名称
  outputDir: "dist",
  // eslint-loader是否在保存的时候检查
  lintOnSave: false,

  // 兼容移动端
  css: {
    extract: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
};
