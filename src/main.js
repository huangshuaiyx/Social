
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// vant
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import { Toast } from 'vant';
import { Dialog } from 'vant';

Vue.use(Toast);
Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(Dialog);
// 全局注册淘宝相关弹窗组件
import components_tb from '@/components_tb/index.js'
Vue.use(components_tb)

//真机测试按钮
// import Vconsole from 'vconsole'
// const vConsole = new Vconsole()
// Vue.use(vConsole)


// 过滤器
import filters from "@/filters/index.js";
for (let i in filters) {
  Vue.filter(i, filters[i]);
}

import getEnv from '@/config/getEnv'
console.log('当前环境:', getEnv())

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Viewer from "v-viewer"; //图片放大
import "viewerjs/dist/viewer.css";

Vue.use(Viewer);
Viewer.setDefaults({
  inline: true,
  button: true, //右上角按钮
  navbar: true, //底部缩略图
  title: true, //当前图片标题
  toolbar: true, //底部工具栏
  tooltip: true, //显示缩放百分比
  movable: true, //是否可以移动
  zoomable: true, //是否可以缩放
  rotatable: true, //是否可旋转
  scalable: true, //是否可翻转
  transition: true, //使用 CSS3 过度
  fullscreen: true, //播放时是否全屏
  keyboard: true, //是否支持键盘
  url: "data-source",
  ready: function (e) {
    console.log(e.type, "组件以初始化");
  },
  show: function (e) {
    console.log(e.type, "图片显示开始");
  },
  shown: function (e) {
    console.log(e.type, "图片显示结束");
  },
  hide: function (e) {
    console.log(e.type, "图片隐藏完成");
  },
  hidden: function (e) {
    console.log(e.type, "图片隐藏结束");
  },
  view: function (e) {
    console.log(e.type, "视图开始");
  },
  viewed: function (e) {
    console.log(e.type, "视图结束");
    // 索引为 1 的图片旋转20度
    if (e.detail.index === 1) {
      this.viewer.rotate(20);
    }
  },
  zoom: function (e) {
    console.log(e.type, "图片缩放开始");
  },
  zoomed: function (e) {
    console.log(e.type, "图片缩放结束");
  },
});
