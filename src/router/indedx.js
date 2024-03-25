import { createRouter, createWebHashHistory } from "vue-router"

// 创建路由实例
const routes = [
    { path: "/", redirect: '/hello' },
    {
        path: '/hello',
        name: 'HelloWorld',
        component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue')
    },
    // 举报页面
    {
        path: "/reportInfo",
        name: "reportInfo",
        meta: {
            title: "举报中心",
            index: 1,
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "@/components/reportInfo.vue"),
    },
    {
        path: "/blacklistlist",
        name: "blacklistlist",
        meta: {
            title: "设置-黑名单",
            index: 1,
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "@/views/blacklistlist/blacklistlist.vue"),
    },
    {
        path: "/setclearlaccount",
        name: "setclearlaccount",
        meta: {
            title: "设置-注销",
            index: 1,
        },
        component: () =>
            import(/* webpackChunkName: "about" */ "@/components/setclearlaccount.vue"),
    },
    {
        path: "/contactcustomerservice",
        name: "contactcustomerservice",
        meta: {
            title: "意见反馈",
            index: 1,
        },
        component: () => import('@/views/contactcustomerservice/index.vue'),
        children: [],
    },
    {
        path: "/aboutme",
        name: "aboutme",
        meta: {
            title: "关于",
            index: 1,
        },
        component: () => import('@/views/aboutme/index.vue'),
    },
    // {
    //     path: '/sessionInfo',
    //     name: 'sessionInfo',
    //     meta: {
    //         title: "会话详情",
    //         index: 1,
    //     },
    //     component: () => import(/* webpackChunkName: "about" */ '../views/sessionInfo/index.vue')
    // },
    {
        path: '/balance',
        name: 'balance',
        meta: {
            title: "余额",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/balance/index.vue')
    },
    {
        path: '/coinsfew',
        name: 'coinsfew',
        meta: {
            title: "金币不足",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/coinsfew/index.vue')
    },
    {
        path: '/receive',
        name: 'receive',
        meta: {
            title: "领取金币",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/receive/index.vue')
    },
    {
        path: '/recharge',
        name: 'recharge',
        meta: {
            title: "匹配充值优惠",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/recharge/index.vue')
    },
    {
        path: '/walletcommodity',
        name: 'walletcommodity',
        meta: {
            title: "钱包",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/walletcommodity/index.vue')
    },
    {
        path: '/vip',
        name: 'vip',
        meta: {
            title: "vip",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/vip/index.vue')
    },
    {
        path: '/paychannelcountry',
        name: 'paychannelcountry',
        meta: {
            title: "渠道页",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/paychannelcountry/index.vue')
    },
    {
        path: '/vipSuccessful',
        name: 'vipSuccessful',
        meta: {
            title: "vip成功页",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/vipSuccessful/index.vue')
    },
    {
        path: '/homepagefirst',
        name: 'homepagefirst',
        meta: {
            title: "首次弹窗",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/homepagefirst/index.vue')
    },
    {
        path: '/homepageindulgence',
        name: 'homepageindulgence',
        meta: {
            title: "首次弹窗特惠商品",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/homepageindulgence/index.vue')
    },
    {
        path: '/homepagefree',
        name: 'homepagefree',
        meta: {
            title: "首页弹窗免费金币",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/homepagefree/index.vue')
    },
    {
        path: '/homepagerecharge',
        name: 'homepagerecharge',
        meta: {
            title: "首页弹窗优惠",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/homepagerecharge/index.vue')
    },
    {
        path: '/useragreement',
        name: 'useragreement',
        meta: {
            title: "用户协议",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/useragreement/index.vue')
    },
    {
        path: '/privacy',
        name: 'privacy',
        meta: {
            title: "隐私协议",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/privacy/index.vue')
    },
    {
        path: '/entireAgreement',
        name: 'entireAgreement',
        meta: {
            title: "用户手册",
            index: 1,
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/entireAgreement/index.vue')
    }
];


const router = createRouter({
    routes,
    history: createWebHashHistory(),
});


export default router