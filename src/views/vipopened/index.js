import { networkRequest, closeNative, getGoodsListSkus, close, setTitleBar, JumpH5 } from '../../api/inedx'
import Goback from "../../components/goback.vue"
import { getQueryString } from "../../utils/index";
import { Toast } from 'vant';
import Title from "../../components/title.vue"
import SVGA from "svgaplayerweb";


export default {
    components: {
        Goback,
        Title,
    },
    data() {
        return {
            vipShopList: [],
            shopId: 0,
            equityList: [
                {
                    img: require('../../assets/vip/Video Chat.png'),
                    text1: "Video Chat",
                    text2: "Large sexy girl"
                },
                {
                    img: require('../../assets/vip/Givegiftsto.png'),
                    text1: "Give gifts to",
                    text2: "someone you like"
                },
                {
                    img: require('../../assets/vip/GlobalMatch.png'),
                    text1: "Global Match",
                    text2: "Worldwide love"
                }
            ],
            shopData: {}, //承载参数
            gobackShow: false,
            userInfos: {},
            jumpType: 1,
            defaultChannelConfig: {},
            vipInfo: {},
            titlecen: 'VIP',
            style: {},
            discounts: '',
            imageUrl: "https://video.singleclubevents.com/singlevideo/not_vip.svga",
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
        let asd = require('../../JSON/public.json')
        this.style = asd
        this.$store.dispatch('appLanguages')
        this.$i18n.locale = this.$store.state.appLanguage
        setTitleBar("", false, false);
        this.getWallet({ itemType: 2 })
        this.rechargesource.source = getQueryString("source")
        this.rechargesource.subSource = getQueryString("subSource")
        this.rechargesource.bizId = getQueryString("bizId")
        this.rechargesource.ext = getQueryString("ext")
        this.rechargesource.providerId = getQueryString("providerId")

    },
    mounted() {
        let that = this;
        this.shopData = this.vipShopList[0]
        // 重新加载
        let totalTmie = new Date().getTime()
        this.$store.dispatch("onStatistics", {
            type: "load",
            event: "HP1401000",
            cost: this.time,
            totalCost: totalTmie,
            remark: { source: getQueryString("source") },
        });
        networkRequest("v2", "/ums/info/getUmsCenter", {}).then(res => {
            if (res.code == 200) {
                this.userInfos = res.data
                this.vipInfo = res.data.vipInfo
            }
        })
        networkRequest("v1", "/wallet/payOrder/source/save", this.rechargesource)
    },
    methods: {
        /**退出vip */
        signout() {
            close();
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
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0005001",
                remark: { productId: x.productId },
            });
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
                        this.defaultChannelConfig = resd.data.defaultChannelConfig != undefined ? resd.data.defaultChannelConfig : {}
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
                                type: "diamond",
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
                                            type: "diamond",
                                            commodity: googleArr
                                        },
                                    });
                                    this.DiamondList = arr2
                                } else {
                                    this.DiamondList = resd.data.items
                                }
                            } else {
                                this.DiamondList = resd.data.items;
                                this.$store.dispatch("onStatistics", {
                                    type: "custom",
                                    event: "HC1100002",
                                    remark: {
                                        type: "diamond",
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
                JumpH5("/customerservice", "fullTrans");
            }, 200);
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0005004",
            });
        },
        // 进入钱包
        jumpClick() {
            console.log('点击钱包')
            JumpH5("/paymentbox", "fullTrans", "", false, "", {}, getQueryString('closeParentActivity'),
                getQueryString('pcode'),
                this.rechargesource.source,
                this.rechargesource.subSource,
                this.rechargesource.bizId,
                this.rechargesource.ext,
                this.rechargesource.providerId);
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0011001",
            });
        },
        // 进入vip
        jumpvip() {
            JumpH5("/vipStore", "fullTrans", "", false, "", {}, getQueryString('closeParentActivity'),
                getQueryString('pcode'),
                this.rechargesource.source,
                this.rechargesource.subSource,
                this.rechargesource.bizId,
                this.rechargesource.ext,
                this.rechargesource.providerId);
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0011001",
            });

        },
        initMachineSVGA() {
            var mycanvas = document.getElementById("demoCanvas");
            // 修改容器大小
            // mycanvas.style.width = 550 + "px";
            mycanvas.style.height = 94 + "px";
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