import { Toast } from "vant";
import {
    close,
    outerBrowser,
    networkRequest,
    closeNative,
    setTitleBars
} from "../../api/inedx";
import { getQueryString } from "../../utils/index";
import { redirectToCheckout, loadAirwallex } from "airwallex-payment-elements";
import getEnv from "../../config/getEnv";
import { getProductlayout } from "../../api/paymenrt.js"
let env = "demo";
if (getEnv() == "production") {
    env = "prod";
} else {
    env = "demo";
}
console.log(getEnv());
loadAirwallex({
    env: env, // Can choose other production environments, 'staging | 'demo' | 'prod'
});
export default {
    components: {},
    data() {
        return {
            /**渠道列表展示*/
            selestShowData: true,
            /**渠道列表*/
            payList: [],
            /**渠道选中 */
            payRadio: -1,
            /**国家选中id */
            regionSelectionIndex: 0,
            /**选中商品 */
            priceInfo: {},
            /**选中的渠道数据 */
            channelData: {},
            unifiedorderUrl: "/wallet/rechargeorder/unifiedorder",
            loading: false,
            time: null,
            paymentSuccessful: false, // 支付成功弹框
            formData: {}
        };
    },
   async created() {
        await this.$store.dispatch("appLanguages");
        // console.log(params, '语言');params.language
        this.$i18n.locale = this.$store.state.appLanguage
        this.priceInfo =
            getQueryString("params") != undefined
                ? JSON.parse(decodeURIComponent(getQueryString("params")))
                : {};
        this.time = new Date().getTime();
        setTitleBars(this.$t('channelCountry.Payment'), false, false); 
        this.channelList();
    },
    mounted() {
        let totalTmie = new Date().getTime()
        this.$store.dispatch("onStatistics", {
            type: "load",
            event: "HP1801000",
            cost: this.time,
            totalCost: totalTmie,
            remark: this.priceInfo.Pcode
        });
    },
    methods: {
        /**获取渠道 */
        channelList() {
            // 获取支付渠道
            networkRequest("v7", "/wallet/pay/channelList", {}).then((res) => {
                console.log(res.configList, '支付渠道');
                this.$store.dispatch("onStatistics", {
                    type: "custom",
                    event: "HC1400001",
                });
                this.payList = res.configList;
                console.log(this.payList)
                if (this.payList.length == 0) {
                    this.selestShowData = true;
                } else {
                    this.selestShowData = false;
                }
                this.channelData = this.payList[0];
                this.payRadio = 0;
            });
        },
        /**返回 */
        goBack() {
            close();
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0008003",
            });
        },
        // 选择支付渠道
        pays(x, i) {
            this.payRadio = i;
            this.giveDiamonds = x.rewardDesc;
            this.channelData = x;
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0008001",
                remark: { payChannelCode: x.payChannelCode },
            });
        },
        /**去支付 */
        Gopay() {
            this.$store.dispatch("onStatistics", {
                type: "click",
                event: "HE0008002",
                params: {
                    id: this.priceInfo.productId,
                    payTypeId: this.channelData.payTypeId,
                },
            });
            let asd = String(this.priceInfo.name);
            let formData = {
                itemId: this.priceInfo.productId, //商品id
                platformCoins: asd.replace(/[^0-9]/gi, ""), // 金币数量
                payAmountTitle: this.priceInfo.name, // 标题
                payChannelConfigId: this.channelData.payChannelConfigId,
                currency: this.priceInfo.currency, // 币种
                browserState: this.channelData.browserState,
                payChannelCode: this.channelData.payChannelCode, // 支付渠道code
                skuId: this.priceInfo.productId, // 商品id
            };

            if (this.channelData.payChannelCode == "GOOGLE_PAY") {
                if (this.priceInfo.itemType == 1) {
                    this.getPhoneType(this.priceInfo);
                } else {
                    this.googleappPayVip({ ...this.priceInfo, ...this.channelData });
                }
            } else if (this.channelData.payChannelCode == "AIRWALLEX_PAY") {
                this.init(formData);
            } else {
                if (this.priceInfo.itemType == 1) {
                    this.placeOrder(formData);
                } else {
                    this.placeOrderVip(formData);
                }
            }
        },


        // 下单
        placeOrder(val) {
            this.loading = true;
            networkRequest(
                "v3", "/wallet/rechargeorder/thirdPayUnifiedOrderByItemAmount",
                val
            ).then((res) => {
                console.log(res, "下单");
                if (typeof (res.code) != 'number') {
                    this.$store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1400006",
                        remark: {
                            code: 200,
                        },
                    });
                    this.loading = false;
                    outerBrowser(res.outPaymentUrl);
                    close()
                } else {
                    Toast(res.msg);
                    this.loading = false;
                    this.$store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1400003",
                        remark: {
                            code: res.code,
                        },
                    });
                }
            });
        },
        // 下单Vip
        placeOrderVip(val) {
            this.loading = true;
            networkRequest("v2", "/up/vipOrder/buyVipItem", val).then((res) => {
                console.log(res, res.code, typeof (res.code) == 'number', "下单");
                if (typeof (res.code) != 'number') {
                    this.$store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1400005",
                    });
                    this.loading = false;
                    outerBrowser(res.body);
                } else {
                    Toast(res.msg);
                    this.loading = false;
                    this.$store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1400002",
                        remark: {
                            code: res.code,
                        },
                    });
                }
            });
        },
        init(val) {
            this.loading = true;
            networkRequest(
                "v3",
                "/wallet/rechargeorder/thirdPayUnifiedOrderByItemAmount",
                val
            ).then((res) => {
                console.log(res);
                if (res.code == 200) {
                    this.$store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1400007",
                    });
                    this.loading = false;
                    redirectToCheckout({
                        env: env,
                        mode: "payment",
                        currency: res.data.currency,
                        intent_id: res.data.outTradeNo, // Required, must provide intent details
                        client_secret: res.data.airwallexClientSecret, // Required
                        successUrl: `${window.location.origin}#/callback?source=1`, // Must be HTTPS sites
                        // failUrl: window.location.origin, // Must be HTTPS sites
                        // recurringOptions: {
                        //   card: {
                        //     next_triggered_by: "merchant",
                        //     merchant_trigger_reason: "scheduled",
                        //     currency: "USD",
                        //   },
                        // },
                    });
                } else {
                    this.$store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1400004",
                        remark: {
                            code: res.code,
                        },
                    });
                }
            });
        },
        // 点击关闭页面
        starClick() {
            closeNative('channelCountry,vipMember,wallet,diamondrechargebox,P1201000')
        }
    },
    watch: {
        "$store.state.productConfig"(newnew, oldold) {
            console.log("productConfig", newnew, oldold);
            newnew.map((x) => {
                if (x.dictKey == "successful") {
                    this.formData = JSON.parse(x.dictValue);
                }
            });
        },
    },
};
