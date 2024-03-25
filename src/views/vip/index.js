import { networkRequest, closeNative, getGoodsListSkus, close, setTitleBar, JumpH5 } from '../../api/inedx'
import Goback from "../../components/goback.vue"
import { getQueryString } from "../../utils/index";
import { Toast } from 'vant';
import SVGA from "svgaplayerweb";

export default {
    components: {
        Goback,
    },
    data() {
        return {
            vipShopList: [],
            shopId: 0,
            equityList: [
                {
                    iconActive: require('../../assets/vip/restrictions.png'),
                    text1: "Unlock chat restrictions",
                    text2: "Unlimited chatting with anybody"
                },
                {
                    iconActive: require('../../assets/vip/calls.png'),
                    text1: "Access to calls",
                    text2: "Purchase diamonds for calls"
                },
                {
                    iconActive: require('../../assets/vip/recommendation.png'),
                    text1: "Quality user recommendation",
                    text2: "Recommend you better and more enthusiastic girl"
                }, {
                    iconActive: require('../../assets/vip/information.png'),
                    text1: "Unlock all personal information",
                    text2: "Let more interesting people find you"
                }, {
                    iconActive: require('../../assets/vip/logo.png'),
                    text1: "VIP exclusive logo",
                    text2: "Can view secret albums and videos"
                }
            ],
            shopData: {}, //承载参数
            gobackShow: false,
            userInfos: {},
            vipShow: false,
            jumpType: 1,
            defaultChannelConfig: {},
            vipInfo: {},
            discounts: { rebate: '', symbol: "" },
            dsBridge: require("dsbridge"),
            imageUrl: "https://video.livecallme.com/golive/888010_0.svga",
            rechargesource: {
                source: "",
                subSource: "",
                bizId: "",
                providerId: "",
                ext: "",
                orderType: "vip",
                pcode: getQueryString("pcode"),
                closeParentActivity: getQueryString("closeParentActivity")
            },
        }
    },
    created() {
        setTitleBar("", false, true);
        this.getWallet({ itemType: 2 })
        networkRequest("v2", "/ums/info/getUmsCenter", {}).then(res => {
            if (res.code == 200) {
                this.vipShow = res.data.vipInfo.vipStatus == 1 ? true : false
                this.userInfos = res.data
            }
        })
    },
    mounted() {
        this.$store.dispatch('appLanguages')
        this.$i18n.locale = this.$store.state.appLanguage
        let that = this;
        // 重新加载
        this.rechargesource.source = getQueryString("source")
        this.rechargesource.subSource = getQueryString("subSource")
        this.rechargesource.bizId = getQueryString("bizId")
        this.rechargesource.ext = getQueryString("ext")
        this.rechargesource.providerId = getQueryString("providerId")
        networkRequest("v1", "/wallet/payOrder/source/save", this.rechargesource)
        let totalTmie = new Date().getTime()
        this.$store.dispatch("onStatistics", {
            type: "load",
            event: "HP1401000",
            cost: this.time,
            totalCost: totalTmie,
            remark: { source: getQueryString("source") },
        });
        this.$nextTick(() => {
            this.initMachineSVGA()
        })

        dsBridge.registerAsyn("jsCall", function (url, callback) {
            console.log('用户点击', url)
            //解析url，执行动作
            if (url == "/intercept") {
                that.getUmsCenter()
            } else {
                console.log("不必运行");
            }
            callback(""); //返回一个带 code 、msg、data的json
        });
    },
    methods: {
        /**退出vip */
        signout() {
            this.getUmsCenter()
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0005003",
            });

        },
        /**接收子数据 */
        property(data) {
            console.log(data);
            this.gobackShow = data;
        },
        // 选择商品
        shopClick(x, i) {
            this.shopId = i;
            this.shopData = x;
            this.discountsState(x)
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0005001",
                remark: { productId: x.productId },
            });
        },
        // 退出
        getUmsCenter() {
            console.log(this.vipShow, '22222222222')
            if (this.vipShow == true) {
                if (getQueryString("closeParentActivity") == "1") {
                    closeNative(getQueryString("pcode"));
                    setTimeout(() => {
                        close();
                    }, 20);
                } else {
                    close();
                }
            } else {
                this.gobackShow = true;
            }
        },
        // 初始商品
        getWallet(x) {
            console.log(x, "获取商品");
            networkRequest("v7", "/wallet/pay/items", x)
                .then((resd) => {
                    if (resd.code == 200) {
                        let art = [];
                        this.vipShopList = resd.data.items
                        this.shopData = resd.data.items[0]
                        this.jumpType = resd.data.jumpType
                        this.defaultChannelConfig = resd.data.defaultChannelConfig != null ? resd.data.defaultChannelConfig : {}
                        console.log(resd, "服务器数据")
                        resd.data.items.map((w, i) => {
                            let subscribe = {};
                            subscribe.sku = w.productId;
                            if (w.subscribeType == 1) {
                                subscribe.skuType = "inapp";
                            } else {
                                subscribe.skuType = "subs";
                            }
                            art.push(subscribe);
                        });
                        this.$store.dispatch("onStatistics", {
                            type: "custom",
                            event: "HC1300001",
                            remark: {
                                type: "vip",
                                commodity: art
                            },
                        });
                        console.log(art, "拼接的casserole")
                        getGoodsListSkus(art).then((res) => {
                            console.log(res, "获取谷歌商品");
                            if (res.code == 200) {
                                let googleArr = [];
                                if (res.data.length != 0) {
                                    let arr1 = res.data;
                                    let arr2 = resd.data.items;
                                    arr1.map((x) => {
                                        googleArr.push(x.productId);
                                        arr2.map((c) => {
                                            if (c.productId == x.productId) {
                                                c.currency = x.priceCurrencyCode;
                                                c.price = x.price;
                                            }
                                        });
                                    });
                                    this.$store.dispatch("onStatistics", {
                                        type: "custom",
                                        event: "HC1000001",
                                        remark: {
                                            type: "vip",
                                            commodity: googleArr
                                        },
                                    });
                                    this.DiamondList = arr2
                                    this.shopData = this.DiamondList[0]
                                    this.discountsState(this.shopData)
                                } else {
                                    this.DiamondList = resd.data.items
                                    this.shopData = this.DiamondList[0]
                                    this.discountsState(this.shopData)
                                }
                            } else {
                                this.DiamondList = resd.data.items;
                                this.shopData = this.DiamondList[0]
                                this.discountsState(this.shopData)
                                this.$store.dispatch("onStatistics", {
                                    type: "custom",
                                    event: "HC1100002",
                                    remark: {
                                        type: "vip",
                                        err: { code: res.code, body: res.msg },
                                    },
                                });
                            }
                        });
                    } else {
                        Toast(resd.msg);
                    }
                })
        },
        // 购买vip
        vipPay() {
            console.log('asdas', {
                ...this.shopData,
                ...this.defaultChannelConfig,
                ...this.rechargesource
            }, '阿瑟大')
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0005002",
            });
            if (this.shopId != -1) {
                this.payClick(
                    this.jumpType,
                    {
                        ...this.shopData,
                        ...this.defaultChannelConfig,
                        ...this.rechargesource
                    },
                    2,
                    'HP1401000'
                );
            } else {
                Toast("Please select a recharge item");
            }

        },
        //  客服
        kefu() {
            setTimeout(() => {
                JumpH5("/customerservice", 'fullTrans');
            }, 200);
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0005004",
            });
        },
        // 进入钱包
        jumpClick() {
            JumpH5("/diamondrechargebox", "fullTrans");
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0011001",
            });
        },
        // 折扣
        discountsState(x) {
            let str = x.price
            let arr = str.match(/[^\d]+/);
            this.discounts.rebate = (str.replace(/[^0-9/.]/gi, "") / x.validDate).toFixed(2)
            this.discounts.symbol = arr[0]
            console.log(this.discounts, x, arr, '22222222222222')
            return this.discounts
        },
        initMachineSVGA() {
            var mycanvas = document.getElementById("demoCanvas");
            // 修改容器大小
            mycanvas.style.width = 10.4 + "rem";
            mycanvas.style.height = 2.4 + "rem";
            let player = new SVGA.Player("#demoCanvas");
            let parser = new SVGA.Parser("#demoCanvas");
            // this.imageUrl 定义一个参数接收url
            parser.load(this.imageUrl, function (videoItem) {
                player.setVideoItem(videoItem);
                player.startAnimation();
            });
        },

        // 每一天的钱
        daymoney(val, x) {
            let asd = x.match(/[^\d]+/);
            console.log(asd, 88888888888888);
            let sdf = `${asd[0]}` + '\xa0' + (x.replace(/[^0-9/.]/gi, "") / val).toFixed(2) + "/ Day"
            return sdf

        }
    }
}