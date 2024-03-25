import Vue from 'vue'
import Router from 'vue-router'
import { pageRouter, errPage } from './page.js'
import { scrollToTop } from '@/utils/index.js'
//浏览器进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "@/store/index.js"
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/homepage'
    },
    ...pageRouter,
    ...errPage,
    // 不存在的路由跳转到首页
    // {
    //   path: "*",
    //   redirect: "/one"
    // }
   
  ]
})
router.beforeEach((to, _from, next) => {
  // if(store.getters.leimuList.length == 0){
  //   getPddGoodsCat().then(res=>{
  //     store.commit('CHANGE_LEIMULIST',res.data.data.catTree)
  //   })
  // }
  // 如果跳转目标不存则进入404
  if(to.matched.length == 0) {
    next({path: '/404'})
  } else {
    next()
  }
    // NProgress.start();
    // next()
  
 
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  // 切换路由让滚动条到顶部
  // scrollToTop()
  // NProgress.done()
})


// NProgress.configure({
//   easing: 'ease',  // 动画方式
//   speed: 500,  // 递增进度条的速度
//   showSpinner: false, // 是否显示加载ico
//   trickleSpeed: 200, // 自动递增间隔
//   minimum: 0.2 // 初始化时的最小百分比
// })
export default router;