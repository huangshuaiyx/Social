// const pipe = (x) => () => import(`../views/${x}/index.vue`);

export const index = [
  {
    path: "/index",
    name: "index",
    meta: {
      title: "首页",
      index: 0,
    },
    component: () => import(`@/views/index.vue`),
  },
];

export const pageRouter = [

  // 钻石不足充值
  {
    path: "/paymentbox",
    name: "paymentbox",
    meta: {
      title: "钻石购买",
      index: 1,
    },
    component: (resolve) =>
      require(/* webpackChunkName: "about" */[
        "../views/diamondrechargebox/index.vue",
      ], resolve),
  },
  // loading
  {
    path: "/loading",
    name: "loading",
    meta: {
      title: "loading",
      index: 1,
    },
    component: () => import(`../components/loading.vue`),
  },
  // vip
  {
    path: "/vipStore",
    name: "vipStore",
    meta: {
      title: "VIP",
      index: 1,
    },
    component: (resolve) =>
      require(/* webpackChunkName: "about" */[
        "../views/vip/index.vue",
      ], resolve),
  },
  // 渠道页
  {
    path: "/channelCountry",
    name: "channelCountry",
    meta: {
      title: "渠道页",
      index: 1,
    },
    component: (resolve) =>
      require(/* webpackChunkName: "about" */[
        "../views/channelCountry/index.vue",
      ], resolve),
  },
  // 黑名单
  {
    path: "/blacklist",
    name: "blacklist",
    meta: {
      title: "设置-黑名单",
      index: 1,
    },
    component: () => import("@/views/setup/blacklist/index.vue")
  },
  // 举报
  {
    path: "/reportList",
    name: "reportList",
    meta: {
      title: "举报中心",
      index: 1,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/report.vue"),
  },
  // 关于
  {
    path: "/regarding",
    name: "regarding",
    meta: {
      title: "设置-关于",
      index: 1,
    },
    component: () => import("@/views/setup/about/index.vue"),
    children: [],
  },
  // 用户协议
  {
    path: "/consumer",
    name: "consumer",
    meta: {
      title: "用户协议",
      index: 1,
    },
    component: (resolve) =>
      require(/* webpackChunkName: "about" */[
        "@/views/setup/about/UserAgreement.vue",
      ], resolve),
  },

  // 隐私政策
  {
    path: "/secret",
    name: "secret",
    meta: {
      title: "隐私政策",
      index: 1,
    },
    component: (resolve) =>
      require(/* webpackChunkName: "about" */[
        "@/views/setup/about/privacy.vue",
      ], resolve),
  },

  // 编辑页
  {
    path: "/information",
    name: "information",
    meta: {
      title: "用户编辑页",
      index: 1,
      keepAlive: false,
    },
    component: () => import("@/views/editData/index.vue")
  },

  // 名称编辑
  {
    path: "/nickName",
    name: "nickName",
    meta: {
      title: "名称编辑",
      index: 1,
    },
    component: () => import("@/components/nickName/index.vue")
  },
  // 个性签名编辑
  {
    path: "/introduction",
    name: "introduction",
    meta: {
      title: "个性签名编辑",
      index: 1,
    },
    component: () => import("@/components/introduction/index.vue")
  },

  // airwallex
  {
    path: "/airwallex",
    name: "airwallex",
    meta: {
      title: "airwallex",
      index: 1,
    },
    component: () => import("../components/airwallex.vue"),
  },

  // customerservice
  {
    path: "/customerservice",
    name: "customerservice",
    meta: {
      title: "customerservice",
      index: 1,
    },
    component: () => import("@/views/setup/customerservice/index.vue"),
  },

  // vipopened
  {
    path: "/vipRemove",
    name: "vipRemove",
    meta: {
      title: "vipopened",
      index: 1,
    },
    component: () => import("@/views/vipopened/index.vue"),
  },
  // avatar
  {
    path: "/avatar",
    name: "avatar",
    meta: {
      title: "avatar",
      index: 1,
    },
    component: () => import("@/views/avatar/index.vue"),
  },
  // floatingwindow
  {
    path: "/floatingwindow",
    name: "floatingwindow",
    meta: {
      title: "floatingwindow",
      index: 1,
    },
    component: () => import("@/views/floatingwindow/index.vue"),
  },
      // googleStore
      {
        path: "/googleStore",
        name: "googleStore",
        meta: {
          title: "googleStore",
          index: 1,
        },
        component: () => import("@/views/googleStore/index.vue"),
      },
];
