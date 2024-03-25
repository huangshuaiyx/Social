const pipe = x => () => import(`@/views/${x}`)

export const errPage = [
    {
        path: '/404',
        name: 'err404',
        component: pipe('errPage/index.vue')
    },
]

export const pageRouter = [
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: pipe('commons/HelloWorld.vue'),
        children: [
            // 我的
            {
                path: '/may',
                name: 'may',
                meta: {
                    keepHome: true,
                    isBack: false
                },
                component: pipe('commons/may.vue'),
            },
            {
                path: '/first',
                name: 'first',
                component: pipe('home/first.vue'),
            },
            // 首页
            {
                path: '/homepage',
                name: 'homepage',
                meta: {
                    keepHome: true
                },
                component: pipe('home/index.vue'),
                beforeEnter: (to, from, next) => {
                    if (sessionStorage.getItem('initialize')) {
                        next()
                    } else {
                        sessionStorage.setItem('initialize', new Date().getTime()),
                            next({
                                path: '/guide'
                            })
                    }
                },

            },
            //榜单
            {
                path: '/rankinglist',
                name: 'rankinglist',
                meta: {
                    keepHome: true,
                    isBack: false
                },
                component: pipe('rankingList/rankinglist.vue')
            },
            //吱吱
            {
                path: '/zhizhi',
                name: 'zhizhi',
                meta: {
                    keepHome: true,
                    isBack: false
                },
                component: pipe('zhizhi/index.vue')
            },

            //赚赚
            {
                path: '/zhuanzhuan',
                name: 'zhuanzhuan',
                meta: {
                    keepHome: true,
                    isBack: false
                },
                component: pipe('zhuanzhuan/index.vue')
            }
        ]
    },
    //收藏
    {
        path: '/collection',
        name: 'collection',
        component: pipe('collection/collection.vue')
    },
    // 团长中心
    {
        path: '/teamLeader',
        name: 'teamLeader',
        component: pipe('teamLeader/index.vue'),
    },
    // 我的团员
    {
        path: '/MyLeague',
        name: 'MyLeague',
        component: pipe('teamLeader/MyLeague.vue'),
    },
    // 分享邀请
    {
        path: '/Sharinginvitation',
        name: 'Sharinginvitation',
        component: pipe('teamLeader/Sharinginvitation.vue'),
    },
    // 团员明细
    {
        path: '/Leaguemembers',
        name: 'Leaguemembers',
        component: pipe('teamLeader/Leaguemembers.vue'),
    },
    // 商学院.营销素材..
    {
        path: '/college',
        name: 'college',
        component: pipe('zhuanzhuan/college.vue'),
        children: [
            //米橙学堂
            {
                path: '/BusinessSchool',
                name: 'BusinessSchool',
                component: pipe('zhuanzhuan/BusinessSchool.vue')
            },
            //营销爆款
            {
                path: '/Marketingboom',
                name: 'Marketingboom',
                component: pipe('zhuanzhuan/Marketingboom.vue')
            },
            //营销素材
            {
                path: '/Marketingmaterials',
                name: 'Marketingmaterials',
                component: pipe('zhuanzhuan/Marketingmaterials.vue')
            }
        ]
    },
    //营销素材
    {
        path: '/schoolList',
        name: 'schoolList',
        component: pipe('zhuanzhuan/schoolList.vue')
    },
    // 修改信息
    {
        path: '/mine',
        name: 'mine',
        component: pipe('mine/index.vue'),
    },
    //修改昵称
    {
        path: '/name',
        name: 'name',
        component: pipe('mine/name.vue'),
    },
    // 登陆
    {
        path: '/register',
        name: 'register',
        component: pipe('commons/register.vue')
    },
    //注册
    {
        path: '/logon',
        name: 'logon',

        component: pipe('commons/logon.vue')
    },
    //设置
    {
        path: '/setup',
        name: 'setup',
        component: pipe('setup/index.vue')
    },
    //意见反馈
    {
        path: '/feedback',
        name: 'feedback',
        component: pipe('setup/feedback.vue')
    },
    //关于
    {
        path: '/about',
        name: 'about',
        component: pipe('setup/about.vue')
    },

    // 搜索
    {
        path: '/seach',
        name: 'seach',
        component: pipe('search/seach.vue')
    },
    {
        path: '/shop',
        name: 'shop',
        meta: {
            keepHome: true,
            isBack: false
        },
        component: pipe('search/shop.vue'),
        children: [
            // 淘宝 拼多多 
            {
                path: '/taobao',
                name: 'taobao',
                component: pipe('search/taobao.vue'),
            },
            {
                path: '/jilu',
                name: 'jilu',
                component: pipe('search/jilu.vue'),
            },
            {
                path: '/kong',
                name: 'kong',
                meta: {
                    keepHome: true,
                    isBack: false
                },
                component: pipe('search/kong.vue'),
            },
            {
                path: '/kongTwo',
                name: 'kongTwo',
                component: pipe('search/kongTwo.vue'),
            },
            {
                path: '/kongThree',
                name: 'kongThree',

                component: pipe('search/kongThree.vue'),
            },

        ]
    },
    // 我的订单
    {
        path: '/ordersAll',
        name: 'ordersAll',
        component: pipe('orders/ordersAll.vue'),
    },
    {
        path: '/orderDetails',
        name: 'orderDetails',
        component: pipe('orders/orderDetails.vue'),
    },
    // 提现
    {
        path: '/earnings',
        name: 'earnings',
        component: pipe('tixian/earnings.vue'),
    },
    {
        path: '/tixian',
        name: 'tixian',
        component: pipe('tixian/tixian.vue'),
    },
    {
        path: '/zhifubao',
        name: 'zhifubao',
        component: pipe('tixian/zhifubao.vue'),
    },
    {
        path: '/modify',
        name: 'modify',
        component: pipe('tixian/modify.vue'),
    },
    {
        path: '/withdrawn',
        name: 'withdrawn',
        component: pipe('tixian/withdrawn.vue'),
    },
    {
        path: '/applyok',
        name: 'applyok',
        component: pipe('tixian/applyok.vue'),
    },
    // 新人福利
    {
        path: '/fuli',
        name: 'fuli',
        component: pipe('commons/fuli.vue')
    },
    // 消息中心
    {
        path: '/news',
        name: 'news',
        component: pipe('home/news.vue')
    },
    //消息详情
    {
        path: '/newsdetails',
        name: 'newsdetails',
        component: pipe('home/newsdetails.vue'),
    },
    // 隐私政策
    {
        path: '/privacy',
        name: 'privacy',
        component: pipe('commons/privacy.vue')
    },
    // 省钱攻略
    {
        path: '/strategy',
        name: 'strategy',
        component: pipe('commons/strategy.vue')
    },
    //帮助中心
    {
        path: '/help',
        name: 'help',
        component: pipe('commons/help.vue')
    },
    //京东,淘宝,拼多多
    {
        path: '/exclusive',
        name: 'exclusive',
        component: pipe('commons/exclusive.vue'),
    },
    {
        path: '/shopList',
        name: 'shopList',
        component: pipe('commons/shopList.vue')
    },
    //二级分类
    {
        path: '/classification',
        name: 'classification',
        meta: {
            keepHome: true,
            isBack: false
        },
        component: pipe('classification/classification.vue')
    },
    {
        path: '/commodity',
        name: 'commodity',
        meta: {
            keepHome: true,
            isBack: false
        },
        component: pipe('classification/commodity.vue')
    },
    //详情页
    {
        path: '/details',
        name: 'details',
        component: pipe('details/index.vue')
    },
    {
        path: '/blank',
        name: 'blank',
        component: pipe('details/blank.vue')
    },
    //引导页
    {
        path: '/guide',
        name: 'guide',
        component: pipe('commons/guide.vue')
    },
    //我的收益
    {
        path: '/myProfit',
        name: 'myProfit',
        component: pipe('myProfit/index.vue')
    },
    //收益日报
    {
        path: '/earningsdaily',
        name: 'earningsdaily',
        component: pipe('myProfit/earningsdaily.vue')
    },
    //订单明细
    {
        path: '/orderdetailss',
        name: 'orderdetailss',
        component: pipe('myProfit/orderdetailss.vue')
    },
    //video 视屏
    {
        path: '/video',
        name: 'video',
        component: pipe('teamLeader/video.vue')
    },
    //签到有礼
    {
        path: '/signin',
        name: 'signin',
        component: pipe('signin/index.vue')
    },

    //官方导师
    {
        path: '/Officialtutor',
        name: 'Officialtutor',
        component: pipe('zhuanzhuan/Officialtutor.vue')
    },
    //客服中心
    {
        path: '/Customerservicecenter',
        name: 'Customerservicecenter',
        component: pipe('commons/Customerservicecenter.vue')
    },
    //新人列表
    {
        path: '/newPeoples',
        name: 'newPeoples',
        component: pipe('home/newPeoples.vue')
    },
]
