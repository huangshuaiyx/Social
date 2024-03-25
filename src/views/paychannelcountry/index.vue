<template>
    <div id="paychannelcountry">
        <div class="chaChanAmountwallet">
            <div class="topitem">
                <div class="name">Product</div>
                <div class="product" v-if="data.priceInfo.type == 'vip'">
                    {{ data.priceInfo.itemValue }} {{ data.priceInfo.itemUnit }}
                    <span>VIP</span>
                </div>
                <div class="product" v-if="data.priceInfo.type == 'coins'">
                    <div style="display: flex; justify-content: center; align-items: center;">
                        {{ data.priceInfo.name }}
                        <img @dragstart.prevent style="width: 16px; height: 16px; display: block; margin-left: 5px;" src="../../assets/coinsmoney@2x.png" alt="">
                    </div>
                </div>
            </div>
            <div class="topitem">
                <div class="name">Price</div>
                <div class="price">{{ data.priceInfo.price }}</div>
            </div>
        </div>
        <div class="chaChanTitle">
            <div class="payment">Payment</div>
        </div>

        <!-- 渠道列表 -->
        <div class="chaChanList">
            <!-- 支付渠道 -->
            <van-loading type="spinner" color="#FF63C6" v-show="data.payList.length < 0" />

            <div class="payListitem" @click="pays(x, i)" v-for="(x, i) in data.payList" :key="i">
                <div class="itemLeft">
                    <div class="payListimg">
                        <img @dragstart.prevent :src="x.payTypeLogo" alt="" />
                        <!-- <van-image round class="country" v-if="x.payTypeLogo" :src="x.payTypeLogo">
                            <template v-slot:loading>
                                <van-loading type="spinner" size="10" />
                            </template>
                        </van-image> -->
                    </div>
                    <div class="payList-name">
                        {{ x.payTypeFullName }}
                    </div>
                </div>
                <div class="payList-p4">
                    <img @dragstart.prevent v-if="data.payRadio == i" src="../../assets/paychannelcountry/Unselected.png" alt="" />
                    <img @dragstart.prevent v-else src="../../assets/paychannelcountry/Selected.png" alt="" />
                </div>
            </div>
        </div>

        <!-- 支付 -->
        <div class="paysbtn">
            <div @click="ongopay" :class="data.payRadio == -1 ? 'buttons' : 'button'">
                <div>
                    Confirm
                </div>
            </div>
        </div>

        <!-- 遮罩蒙层 -->
        <!-- <div class="markbox" v-show="loading">
            <div class="sun-loading">
                <div class="img"></div>
            </div>
        </div> -->

        <!-- 支付成功弹框 -->
        <!-- <div v-show="data.paymentSuccessful" class="successfu-markbox">
            <div class="successfu">
                <p>Wow!</p>
                <p>Successful!Gochatwith beauty!</p>
                <button @click="starClick">Go Now</button>
            </div>
        </div> -->
    </div>
</template>
  
<script setup>
import { showToast, } from "vant";
import { reactive, onMounted } from "vue"
import { getQueryString, googleappPay, iphoneappPay, googleappPaycoins, iphoneappPaycoins } from "@/utils/index"
import { networkRequest, close, outerBrowser, setTitleBar } from "@/api/index"
import { useStore } from 'vuex'
const store = useStore()
const CallBackName = store.state.unifyCallBackName
const data = reactive({
    /**渠道列表展示*/
    selestShowData: true,
    /**渠道列表*/
    // { payChannelCode: 'GOOGLE_PAY' }, {}, {}, {}, {}
    payList: [],
    /**渠道选中 */
    payRadio: -1,
    /**选中商品 */
    priceInfo: {},
    /**选中的渠道数据 */
    channelData: {},
    loading: false,
    time: new Date().getTime(),
    loading: false,
    paymentSuccessful: false,
    jumpType: null
})

onMounted(() => {
    buryingpoint()
    setHeader()
    channelList()
    data.priceInfo = JSON.parse(getQueryString("params"));
    console.log(data.priceInfo, 'priceInfo');
})
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP1801000",
        type: 'load',
        cost: data.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const setHeader = () => {
    setTitleBar("Payment", 'FFFFFFFF', 'FF1D1F29', '', res => { });
}
/**返回 */
const goBack = async () => {
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0008003",
    })
    close();
}
// 选择支付渠道
const pays = (x, i) => {
    data.payRadio = i;
    // data.giveDiamonds = x.rewardDesc;
    data.channelData = x;
    data.jumpType = x.jumpType
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0008001",
        remark: { payChannelCode: x.payChannelCode },
    })
}
/**获取渠道 */
const channelList = () => {
    networkRequest("v7/wallet/pay/channelList", {}, (res) => {
        console.log(res, 'data.payList');
        if (res.code == 200) {
            store.dispatch("onStatistics", {
                type: "custom",
                event: "HC1400001",
            })
            data.payList = res.data.configList;
            data.channelData = data.payList[0];
            data.payRadio = 0;
            data.jumpType = data.payList[0].jumpType

        } else {
            showToast(res.msg);
        }
    })
}

// 点击关闭页面
const starClick = () => {
    close()
    // closeNative('paychannelcountry,vip,wallet,diamondrechargebox,P1201000')
}

// 支付
const ongopay = () => {
    window.preReClick(Gopay)
}
const Gopay = () => {
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0008002",
        remark: { payChannelCode: data.channelData.payChannelCode },
    })
    console.log(data.priceInfo, data.channelData,)

    if (data.priceInfo.type == 'vip') {
        let buryInfo = {
            Pcode: 'HP1001000',
            type: "walletcommodity",
            isclose: data.priceInfo.jumpType
        }
        const params = {
            payChannelCode: data.channelData.payChannelCode,
            payChannelConfigId: data.channelData.payChannelConfigId,
            skuId: data.priceInfo.productId,
            priceAmountMicros: "",
            currency: data.priceInfo.currency,
            price: data.priceInfo.price.match(/\d+(\.\d+)?/)[0]
        }
        if (data.channelData.payChannelCode == 'GOOGLE_PAY') {
            googleappPay(params, buryInfo)
            // close();
        } else if (data.channelData.payChannelCode == 'APPLE_PAY') {
            iphoneappPay(params, buryInfo)
        } else {
            networkRequest("v2/up/vipOrder/buyVipItem", params, (res) => {
                console.log(res, '三方支付');
                if (res.code == 200) {
                    outerBrowser(res.data.body, true, res => { })
                } else {
                    showToast(res.msg);
                }
            })
        }
    } else {
        if (data.channelData.payChannelCode == 'GOOGLE_PAY') {
            let buryInfo = {
                Pcode: 'HP1401000',
                type: "vip",
                isclose: data.priceInfo.jumpType
            }
            let params = {
                itemId: data.priceInfo.productId,
                tradeChannel: 1,
                currency: data.priceInfo.currency,
                microTradeAmount: '',
            }
            googleappPaycoins(params, buryInfo)
            // close();
        } else if (data.channelData.payChannelCode == 'APPLE_PAY') {
            let buryInfo = {
                Pcode: 'HP1401000',
                type: "vip",
                isclose: data.priceInfo.jumpType
            }
            let params = {
                itemId: data.priceInfo.productId,
                tradeChannel: 2,
                currency: data.priceInfo.currency,
                microTradeAmount: '',
            }
            iphoneappPaycoins(params, buryInfo)
        }
        else {
            let params = {
                payAmountTitle: data.priceInfo.name,
                platformCoins: data.priceInfo.price.match(/\d+(\.\d+)?/)[0],
                itemId: data.priceInfo.productId,
                payChannelConfigId: data.channelData.payChannelConfigId,
                currency: data.priceInfo.currency,
            }
            networkRequest('v1/wallet/rechargeorder/thirdPayUnifiedOrderByItemAmount', params, (res) => {
                console.log(res, '三方支付');
                if (res.code == 200) {
                    outerBrowser(res.data.outPaymentUrl, true)
                } else {
                    showToast(res.msg);
                }
            })
        }

    }
}
</script>
  
<style lang="scss" scoped>
@import './index.scss';
</style>
  