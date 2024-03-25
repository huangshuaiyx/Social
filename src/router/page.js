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
    path: "/diamondbulletframe",
    name: "diamondbulletframe",
    meta: {
      title: "钻石弹框",
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
    path: "/member",
    name: "member",
    meta: {
      title: "member-VIP",
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
      title: "blacklist-黑名单",
      index: 1,
    },
    component: () => import("@/views/setup/blacklist/index.vue")
  },
  // 举报
  {
    path: "/tipoff",
    name: "tipoff",
    meta: {
      title: "tipoff-举报",
      index: 1,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "@/components/report.vue"),
  },
  // 关于
  {
    path: "/apropos",
    name: "apropos",
    meta: {
      title: "apropos-关于",
      index: 1,
    },
    component: () => import("@/views/setup/about/index.vue"),
    children: [],
  },
  // 用户协议
  {
    path: "/subscriberagreement",
    name: "subscriberagreement",
    meta: {
      title: "用户协议",
      index: 1,
    },
    component: () => import("@/views/setup/about/UserAgreement.vue"),
    // component: (resolve) =>
    //   require(/* webpackChunkName: "about" */[
    //     "@/views/setup/about/UserAgreement.vue",
    //   ], resolve),
  },

  // 隐私政策
  {
    path: "/concealagreement",
    name: "concealagreement",
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
      title: "information-资料",
      index: 1,
      keepAlive: false,
    },
    component: () => import("@/views/editData/index.vue")
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
      title: "customerservice-意见反馈",
      index: 1,
    },
    component: () => import("@/views/setup/customerservice/index.vue"),
  },

  // vipopened
  {
    path: "/vipopened",
    name: "vipopened",
    meta: {
      title: "vipopened",
      index: 1,
    },
    component: () => import("../views/vip/index.vue"),
  },

  {
    path: "/callback",
    name: "callback",
    meta: {
      title: "callback",
      index: 1,
    },
    component: () => import("../components/callback.vue"),
  },

];
