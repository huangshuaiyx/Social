<template>
    <div id="walletcommodity">
        <div class="bannerwallt">
            <div class="walletBanner" @click="viPbuy" v-if="data.vipCommodity">
                <div class="walletBannerleft">
                    <img src="../../assets/walletcommodity/crownbanner@2x.png" alt="">
                </div>
                <div class="walletBannerright">
                    <div class="vipconis">
                        VIP <span style="margin: 0 3px 0 3px;">+</span> <img style="margin-right: 2px;" src="@/assets/coinsmoney@2x.png" alt="" />{{data.vipCommodity.giveRechargeAmount}}
                    </div>
                    <div class="text">
                        {{ t('coins.title1') }} <span>{{ data.vipCommodity.giveRechargeAmount }}</span> {{ t('coins.title2') }}
                    </div>
                </div>
                <div v-show="data.vipCommodity.lable" class="viplabel">{{ data.vipCommodity.lable }}</div>
            </div>
            <!-- 占位 -->
            <div v-if="data.vipCommodity" style="height: 14px;"></div>
            <div class="walletCommodity">
                <div class="freeinfo" v-if="data.coinsGold&&data.coinsGold.coins">
                    <div class="freeinfohead">
                        <div class="freelable">{{ t('coins.freetext') }}</div>
                        <img src="@/assets/walletcommodity/coin1.png" alt="" />
                        <div class="freeNum" v-show="data.coinsGold">{{ data.coinsGold.coins }}</div>
                    </div>
                    <div class="free" @click="cointask">
                        {{ t('coins.freetext') }}
                    </div>
                </div>
                <div class="walletCommodity-div1" v-for="(x, i) in data.moneyList" :key="i" @click="onchoice(x, i)" v-show="data.datauploading">
                    <div class="coinslable" v-show="x.lable && x.discountStatus == 1">{{ x.lable }}</div>
                    <div class="discountcoinslable" v-show="x.lable && x.discountStatus != 1">{{ x.lable }}</div>
                    <div class="nocoinslable" v-show="!x.lable"></div>
                    <img class="walletCommodity-img2" src="@/assets/walletcommodity/coin2.png" alt="" v-show="[0,1].includes(i)" />
                    <img class="walletCommodity-img2" src="@/assets/walletcommodity/coin5@2x.png" alt="" v-show="i < data.moneyList.length - 1 && i >= 2 && i<4" />
                    <img class="walletCommodity-img2" src="@/assets/walletcommodity/coin6@2x.png" alt="" v-show="i == data.moneyList.length - 1 && ![1].includes(i)" />
                    <img class="walletCommodity-img2" src="@/assets/walletcommodity/coin3.png" alt="" v-show="i < data.moneyList.length - 1 && i >= 4 && i<5 " />
                    <img class="walletCommodity-img2" src="@/assets/walletcommodity/coin7@2x.png" alt="" v-show="i < data.moneyList.length - 1 && i >= 5" />
                    <!-- <img class="walletCommodity-img3" v-show="x.tabUrl != null" src="@/assets/walletcommodity/walletBannerTop.png" alt=""> -->
                    <p class="walletCommodity-p1">{{ x.name }}</p>
                    <!-- <p class="walletCommodity-p3">{{ x.name }}</p> -->

                    <p class="walletCommodity-p2">
                    <div>
                        <div>
                            <span>{{ x.price }}</span>
                        </div>
                        <span class="discountPrice" v-show="x.discountStatus == 1">{{ x.discountPrice }}</span>
                    </div>
                    </p>

                </div>
            </div>
        </div>
        <div class="shopload" v-show="data.shopload">
            <SvgaComponent :src="data.imageUrl" class-name="svga-icon"></SvgaComponent>
            <div id="demoCanvas" ref="demoCanvas"></div>
        </div>
        <Customerservice></Customerservice>
        <!-- 支付成功弹框 -->
        <div class="coinsfew" v-show="data.paymentSuccessful">
            <div class="coinsfewialog">
                <!-- 金币成功 -->
                <div class="coinsfewInfo" v-if="data.isvip == 'coins'">
                    <div class="close" @click.stop="data.paymentSuccessful = false">
                        <img src="../../assets/close@2x.png" alt="">
                    </div>
                    <div class="speciesbgc"></div>
                    <div class="speciesimg">
                        <img class="species" src="../../assets/fewspecies@2x.png" alt="">
                        <img class="breatheRight" src="../../assets/breathe@2x.png" alt="">
                        <img class="breatheTop" src="../../assets/breatheTop@2x.png" alt="">
                        <img class="breatheBottom" src="../../assets/breatheBottom@2x.png" alt="">
                    </div>
                    <div class="meorynum">
                        {{ t('coins.success1') }} <span>{{ data.conisOrvipNum }}<br /></span> {{ t('coins.success2') }}
                    </div>
                    <div class="footer">
                        <div class="getcoins" @click.stop="data.paymentSuccessful = false"><span>Ok</span></div>
                    </div>
                </div>
                <!-- vip成功 -->
                <div class="coinsfewInfovip" v-if="data.isvip == 'vip'">
                    <div class="close" @click.stop="data.paymentSuccessful = false">
                        <img src="../../assets/close@2x.png" alt="">
                    </div>
                    <div class="speciesimg">
                        <img class="species" src="../../assets/vipsuccess@2x.png" alt="">
                    </div>
                    <div class="meorynum">
                        You purchased <span>{{ data.conisOrvipNum }}</span> month vip successfully
                    </div>
                    <div class="footer">
                        <div class="getcoins" @click.stop="data.paymentSuccessful = false"><span>Ok</span></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 挽留弹框 -->
        <!-- <Fallbackbox v-show="data.gobackShow == true" @increase="property" :faces="faces"></Fallbackbox> -->
        <!-- load 加载动画 -->
        <div class="walletloading" v-show="store.state.ispayloading">
            <div class="walletloadingimg">
                <SvgaComponent :src="data.imageUrl" class-name="svga-icon"></SvgaComponent>
                <div id="demoCanvasloading" ref="demoCanvasloading"></div>
            </div>
        </div>
    </div>
</template>

<script setup>

import {
    onMounted,
    reactive,
} from "vue";
import { JumpH5 } from '@/api/index'
import { networkRequest, getGoodsListSkus, onGetFreeCoinSuccess, setTitleBar, goupdateCoin, nativeEnv } from "@/api/index"
import Customerservice from "@/components/payment/customerservice"
import { getPhoneType, iphoneappPaycoins, googleappPaycoins, googleappPay, iphoneappPay } from "@/utils/index"
import { useStore } from 'vuex';
const store = useStore()
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()
const CallBackName = store.state.unifyCallBackName
import SVGA from "svgaplayerweb";
onMounted(() => {
    buryingpoint()
    appLanguages()
    setHeader()
    getWalletIos()
    initMachineSVGA('demoCanvasloading')
    initMachineSVGA('demoCanvas')
});
const data = reactive({
    imageUrl: "https://s3.hibella.mobi/socialus/9000/9001/ums/2023/08/loading.svga",
    moneyList: [],
    conisOrvipNum: '3', // vip数量
    /**头部banner */
    walletImg: "asdsadas",
    //vip优惠商品
    vipCommodity: null,
    // 领取金币
    coinsGold: {},
    // 定时器
    myIntervald: null,
    shopData: {},
    gobackShow: false,
    paymentSuccessful: false,
    time: new Date().getTime(),
    isvip: '',
    conisOrvipNum: 0,
    shopload: true,
    defaultChannelConfig: {},
    datauploading: true, //重新更新dom
    shopItem: {}, //单个商品,
    title: "",
    discountIndex: -1
})
// 动画
const initMachineSVGA = (value) => {
    var mycanvas = document.getElementById(value);
    // 修改容器大小
    mycanvas.style.width = 35 + "px";
    mycanvas.style.height = 35 + "px";
    let player = new SVGA.Player('#' + value);
    let parser = new SVGA.Parser('#' + value);
    // imageUrl 定义一个参数接收url
    parser.load(data.imageUrl, function (videoItem) {
        player.setVideoItem(videoItem);
        player.startAnimation();
    });
}
// 语言查询
const appLanguages = () => {
    nativeEnv((res) => {
        if (res.code == 200) {
            locale.value = res.data
            console.log('语言', res);
            localStorage.setItem("lang", res.data);
        }
    })
}
const setHeader = () => {
    data.title = t('coins.toptitle')
    setTitleBar(data.title, 'FFFFFFFF', 'FF12121A', '10', res => { }, '1');
}
const buryingpoint = async () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP1001000",
        type: 'load',
        cost: data.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const opencoins = (val) => {
    console.log('回调成功');
    let res = window.localStorage.getItem('conisOrvipNum')
    data.conisOrvipNum = res
    data.isvip = val ? val : 'coins'
    data.paymentSuccessful = true
    getconisNum()
    if (data.shopItem.discountStatus == 1) {
        data.moneyList.splice(data.discountIndex, 1)
    }
}
window.opencoins = opencoins
const cointask = () => {
    console.log("领取金币")
    store.commit('GETPAYOVER', true)
    networkRequest("v1/up/coins/item/coinsReceive", { coinsReceiveId: data.coinsGold.coinsReceiveId, }, (res) => {
        console.log(res, '钱包领取金币');
        if (res.code == 200) {
            data.coinsGold.coins = null
            getFreeCoinSuccess()
            store.commit('GETPAYOVER', false)

        }
    })
}
// 回调客户端方法
const getFreeCoinSuccess = () => {
    onGetFreeCoinSuccess(res => { })
    getconisNum()
}
// 获取金币余额
const getconisNum = () => {
    networkRequest('v1/wallet/info/getUserBalance', {}, (res) => {
        updateCoins(res.data.userBalance + "",)
    })
}
// 更新客户端头部金币
const updateCoins = (num) => {
    goupdateCoin(num, (res) => { })
}
// 获取商品
const getWalletIos = () => {
    store.dispatch("onStatistics", {
        type: "custom",
        event: "HC1300001",
    })
    networkRequest("v1/wallet/item/coinsItems", {}, (resd) => {
        console.log(resd, "钱包服务器商品");
        // return

        if (resd.code == 200) {
            if (resd.data.vipItem && resd.data.vipItem.item) {
                data.vipCommodity = resd.data.vipItem.item;
                data.vipCommodity.jumpType = resd.data.vipItem.jumpType;
            }
            if (resd.data.vipItem && resd.data.vipItem.defaultChannelConfig) {
                data.defaultChannelConfig = resd.data.vipItem.defaultChannelConfig;
            }
            data.moneyList = resd.data.coinsItems;
            data.coinsGold = resd.data.coinsReceive;

            let art = [];
            data.moneyList.forEach((w) => {
                art.push(w.productId);
            });
            getGoodsListSkus(art.join(','), (res) => {
                console.log(res, "谷歌商品");
                if (res.code == 200) {
                    data.datauploading = false
                    let arr1 = res.data;
                    let arr2 = resd.data.coinsItems;
                    if (arr1.length != 0) {

                        arr2.map(item => {
                            arr1.map((c) => {
                                if (c.productId == item.productId) {
                                    item.currency = c.price_currency_code;
                                    item.price = c.price;
                                }
                            });
                        })

                        console.log(arr2, ' data.moneyList');
                        data.moneyList = arr2
                    } else {
                        data.moneyList = resd.data.coinsItems;
                    }
                    data.datauploading = true
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1000001",
                    })
                } else {
                    data.moneyList = resd.data.coinsItems;
                    store.dispatch("onStatistics", {
                        type: "custom",
                        event: "HC1100002",
                    })
                }
            })
            data.shopload = false
        }
    })
}
// 点击商品
const onchoice = (x, i) => {
    data.shopItem = x
    if (x.discountStatus == 1) {
        data.discountIndex = i
    }
    window.preReClick(choice)
}
const choice = () => {
    store.commit('GETPAYOVER', true)
    let x = data.shopItem
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001003",
        remark: { productId: x.productId },
    })
    console.log("点击商品")

    data.shopData = JSON.parse(JSON.stringify(x))

    let params = {
        itemId: x.productId,
        tradeChannel: x.jumpType,
        currency: x.currency,
        microTradeAmount: '',
    }
    let buryInfo = {
        Pcode: 'HE0001003',
        type: "walletcommodity",
        isclose: x.jumpType
    }
    window.localStorage.setItem('conisOrvipNum', x.name)
    if (getPhoneType() == "Android") {
        if (x.jumpType == 1) {
            googleappPaycoins(params, buryInfo);
        } else {
            console.log(data.shopData)
            store.commit('GETPAYOVER', false)
            JumpH5("/paychannelcountry", "", JSON.stringify({ ...data.shopData, type: 'coins' }));
        }
    } else {
        if (x.jumpType == 2) {
            iphoneappPaycoins(params, buryInfo)
        } else {
            console.log(data.shopData)
            store.commit('GETPAYOVER', false)
            JumpH5("/paychannelcountry", "", JSON.stringify({ ...data.shopData, type: 'coins' }));
        }
    }
}



// 购买优惠
const viPbuy = () => {
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001006",
    })
    store.commit('GETPAYOVER', true)
    let buryInfo = {
        Pcode: 'HE0001006',
        type: "walletcommodity",
        isclose: data.vipCommodity.jumpType
    }
    let params = {
        payChannelCode: data.defaultChannelConfig ? data.defaultChannelConfig.payChannelCode : '',
        payChannelConfigId: data.defaultChannelConfig ? data.defaultChannelConfig.payChannelConfigId : '',
        skuId: data.vipCommodity.productId,
        priceAmountMicros: "",
        currency: data.vipCommodity.currency,
        price: data.vipCommodity.price.match(/\d+(\.\d+)?/)[0]
    }
    if (getPhoneType() == "Android") {
        if (data.vipCommodity.jumpType == 1) {
            googleappPay(params, buryInfo);
        } else {
            store.commit('GETPAYOVER', false)
            JumpH5("/paychannelcountry", "", JSON.stringify({ ...data.vipCommodity, type: 'vip' }));
        }

    } else {
        if (data.vipCommodity.jumpType == 2) {
            iphoneappPay(params, buryInfo)
        } else {
            store.commit('GETPAYOVER', false)
            JumpH5("/paychannelcountry", "", JSON.stringify({ ...data.vipCommodity, type: 'vip' }));
        }

    }
}

// 退出
const signOut = () => {
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0001005",
    })
    data.gobackShow = true;
}
window.signOut = signOut
/**接收子数据 */
const property = (val) => {
    console.log(val, typeof (data.gobackShow), data.gobackShow)
    data.gobackShow = val;

}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>