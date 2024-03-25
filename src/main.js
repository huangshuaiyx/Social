import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/lib/index.css";
import "./utils/vant";

Vue.prototype.bus = new Vue();
// Vue.prototype.pay = new Vue();
import "default-passive-events"; //添加事件管理者'passive'，来阻止'touchstart'事件，

Vue.prototype.dsBridge = require("dsbridge");
// 清除默认样式
import "../src/assets/style/index.scss";
// 引入rem依赖
import "lib-flexible";

/* 引入公共函数 */
import common from "./commin/common.js";
Vue.use(common);

// Vue.config.productionTip = false;

// 重复点击导航路由报错
import Router from "vue-router";
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// 多语言引入
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
// 多语言切换
const i18n = new VueI18n({
  locale: "", //设置浏览器默认语言 window.navigator.language
  messages: {
    en: require("../src/i18n/lang/en"),
    fr: require("../src/i18n/lang/fr"),
    ar: require("../src/i18n/lang/ar"),
    hi: require("../src/i18n/lang/hi"),
    es: require("../src/i18n/lang/es"),
    ru: require("../src/i18n/lang/ru"),
    vi: require("../src/i18n/lang/vi"),
    pt: require("../src/i18n/lang/pt"),
    ur: require("../src/i18n/lang/ur"),
    ta: require("../src/i18n/lang/ta"),
    id: require("../src/i18n/lang/id"),
  },
  silentTranslationWarn: true, // 去除警告
});

// 防重复点击
Vue.directive("preventReClick", {
  inserted(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        el.style.cursor = "not-allowed";
        setTimeout(() => {
          el.disabled = false;
          el.style.cursor = "pointer";
        }, binding.value || 1000);
      }
    });
  },
});

// 真机测试
import VConsole from "vconsole";
// Vue.use(new VConsole());
if (process.env.NODE_ENV !== "production") {
 Vue.use(new VConsole());
}

// es6
import "babel-polyfill";
import Es6Promise from "es6-promise";
require("es6-promise").polyfill();
Es6Promise.polyfill();

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
