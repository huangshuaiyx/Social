import { createApp } from 'vue'
import App from './App.vue'
import router from './router/indedx'
import store from './store/index'


let callbacks = {};
let callbackIndex = 1;
window.flutterReq = {
    call: (name, params, callback) => {
        let message = {
            id: callback ? '[' + (callbackIndex++) + ']' : undefined,
            action: name,
            data: params
        };
        if (callback) {
            callbacks[message.id] = callback;
        }
        window.Flutter.postMessage(JSON.stringify(message));
    },
    onComplete: function (id, data) {
        let callback = callbacks[id];
        if (typeof callback === 'function') {
            callback(data);
            delete callbacks[id];
        }
    }
};
window.flutterEvent = function (e) {
    let message = JSON.parse(e);
    let result = {};
    try {
        if (message.id != undefined) {
            if (message.id == "id") {
                jsCall();
            } else {
                window.flutterReq.onComplete(message.id, message.data);
            }
        }
    } catch (e) {
        result = {
            message: 'error',
            data: e.message
        };
    }
}
// 防抖
let timerID = null
// app.config.globalProperties.preReClick = preReClick
const preReClick = function (fn, code = 500) {
    if (timerID) {
        clearTimeout(timerID)
    }
    timerID = setTimeout(() => {
        fn()
    }, code)

}
window.preReClick = preReClick

// rem
import 'amfe-flexible'

// vant
import Vant from 'vant';
import 'vant/lib/index.css';

// es6
import "babel-polyfill";
import Es6Promise from "es6-promise";
require("es6-promise").polyfill();
Es6Promise.polyfill();
// 真机测试
import VConsole from "vconsole";
if (process.env.NODE_ENV !== "production") {
    createApp(App).use(new VConsole());
}

// 多语言
import i18n from './lang/index'
// 清除默认样式
import "../src/assets/style/index.scss";

createApp(App).use(router).use(Vant).use(store).use(i18n).mount('#app')




