
<style lang="scss" scoped>
.coinsfew {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: none;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    .walletloading {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        .walletloadingimg {
            position: absolute;
            top: 50%;
            left: 43%;
            width: 50px;
            height: 50px;
            transform: translate(-50%, -50%);
            // transform: rotate(45deg);
            animation: rotation 3s linear infinite;

            img {
                width: 100%;
                height: 100%;
                display: block;
            }
        }

        @keyframes rotation {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }
    }
    .coinsfewialog {
        width: 100%;
        padding: 0px 38px;
        position: absolute;
        box-sizing: border-box;
        text-align: center;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .coinsfewInfo {
            box-sizing: border-box;
            width: 100%;
            position: relative;
            height: 100%;
            background: url('../../assets/homepagesku@2x.png') no-repeat center;
            background-size: 100% 100%;

            .speciesdialog {
                padding-bottom: 32px;
                .speciesTetx {
                    position: absolute;
                    top: 100px;
                    right: 40px;
                    word-wrap: break-word;
                    width: 62px;
                    height: 62px;
                    color: #fff;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 18px;
                    font-weight: 600;
                    background: linear-gradient(180deg, #ff749c 0%, #e0285b 100%);
                    padding: 10px;
                    box-sizing: border-box;
                    transform: rotate(30deg);
                }
                .close {
                    width: 23px;
                    height: 23px;
                    position: absolute;
                    top: 12px;
                    right: 12px;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .species {
                    width: 140px;
                    height: 140px;
                    margin-top: 17px;
                    margin-bottom: 21px;
                }
                .free {
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                    font-weight: 700;
                    position: absolute;
                    top: 92px;
                    right: 58px;
                    color: #fff;
                    font-size: 18px;
                    transform: rotate(45deg);
                    border-radius: 50%;
                    background: linear-gradient(180deg, #f1c068 0%, #e5783e 100%);
                    span {
                        position: absolute;
                        font-size: 14px;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                }

                .walletBannerright {
                    flex: 1;

                    .vipconis {
                        font-size: 18px;
                        width: 100px;
                        color: #fff;
                        font-weight: 600;
                        margin: 0 auto;
                        padding-top: 37px;
                        padding-bottom: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;

                        img {
                            width: 22px;
                            height: 22px;
                            display: block;
                            margin: 0 5px;
                        }
                    }

                    .text {
                        font-size: 14px;
                        margin: 0 auto;
                        color: #fff;
                    }
                }
            }

            .getcoins {
                width: 270px;
                height: 43px;
                background: #ffffff;
                border-radius: 25px;
                margin: 0 auto;
                font-size: 14px;
                color: #000;
                font-weight: 600;

                position: relative;
                .money {
                    position: absolute;
                    font-size: 14px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .discountPrice {
                    text-decoration: line-through;
                }
            }
        }
    }
}
</style>
<template>
    <div class="coinsfew" @click="closeDialog">
        <div class="coinsfewialog">
            <div class="coinsfewInfo" @click.stop="commodityclick">
                <div class="speciesdialog">
                    <div class="close">
                        <img @dragstart.prevent @click.stop="closeDialog" src="../../assets/close@2x.png" alt="">
                    </div>
                    <!-- <div class="num" v-show="amount">{{ amount }}</div>
                    <div class="num" v-show="!amount">0</div> -->
                    <div class="walletBannerright">
                        <div class="vipconis">
                            VIP <span style="margin: 0 0px 0 5px;">+</span> <img @dragstart.prevent src="@/assets/coinsmoney@2x.png" alt="" />{{state.shopdata.giveRechargeAmount}}
                        </div>
                        <div class="text">
                            {{ t('coins.title1') }} <span>{{ state.shopdata.giveRechargeAmount }}</span> {{ t('coins.title2') }}
                        </div>
                    </div>
                    <div class="speciesTetx">
                        <div v-show="state.shopdata.tagUrl">{{ state.shopdata.tagUrl }}</div>
                        <!-- <div>{{ state.percentageTxt }}</div> -->
                    </div>
                    <div>
                        <img @dragstart.prevent class="species" src="../../assets/vipsuccess@2x.png" alt="">
                    </div>
                    <div @click="getcoins" class="getcoins">
                        <div class="money"><span>{{ state.shopdata.price }}</span> <span class="discountPrice ">{{ state.shopdata.discountPrice }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- load 加载动画 -->
        <!-- <div class="walletloading" v-show="store.state.ispayloading" @click.stop="loadingclick">
            <div class="walletloadingimg">
                <img src="../../assets/loading@2x.png" alt="">
            </div>
        </div> -->
    </div>
</template>

<script setup>
import { reactive, onBeforeMount, onMounted } from 'vue'
import { getPhoneType, iphoneappPay, googleappPay } from "@/utils/index"
import { close, networkRequest, JumpH5, nativeEnv, getLoading, getGoodsListSkus } from "@/api/index";
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
import { showToast } from 'vant';
const { locale, t } = useI18n()
const store = useStore()
const state = reactive({
    time: new Date().getTime(),
    shopdata: {},
    defaultChannelConfig: {}
})
onBeforeMount(async () => {
    buryingpoint()
    appLanguages()
    getvipIteminfo()
})
onMounted(() => {

})
// 语言查询
const appLanguages = () => {
    nativeEnv((res) => {
        if (res.code == 200) {
            if (['en', 'fr', 'ar', 'hi', 'pt', 'es'].includes(res.data)) {
                locale.value = res.data
                console.log('语言', res);
                localStorage.setItem("lang", res.data);
            } else {
                locale.value = 'en'
                localStorage.setItem("lang", 'en');
            }
        }
    })
}
const getvipIteminfo = () => {
    networkRequest('v1/wallet/item/vipItem', {}, (res) => {
        console.log(res, '商品余额');
        if (res.code == 200) {
            state.shopdata = res.data.item
            state.shopdata.jumpType = res.data.jumpType
            state.defaultChannelConfig = res.data.defaultChannelConfig
            let skuStr = res.data.allSku
            if (getPhoneType() == "Android") {
                getGoodsListSkus(skuStr, response => {
                    console.log('response', response);
                    if (response.code == 200) {
                        response.data.map((c) => {
                            if (c.productId == res.data.item.productId) {
                                state.shopdata.currency = c.price_currency_code;
                                state.shopdata.price = c.price;
                            }
                        })
                    }
                })
            } else {
                getGoodsListSkus(res.data.item.productId, response => {
                    console.log('response', response);
                    if (response.code == 200) {
                        state.shopdata.currency = response.data[0].price_currency_code;
                        state.shopdata.price = response.data[0].price;
                    }
                })
            }

        } else {
            showToast(res.msg);
        }
    })
}
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP2800100",
        type: 'load',
        cost: state.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const closeDialog = async () => {
    let obj = {
        event: "HE0018001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    close()
}
const openLoading = (value) => {
    getLoading(value, res => { })
}
const homePaySuccess = () => {
    close()
}
window.homePaySuccess = homePaySuccess
const commodityclick = () => { }
const loadingclick = () => { }
const getcoins = async () => {
    let obj = {
        event: "HE0018002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    // store.commit('GETPAYOVER', true)
    openLoading(true)
    const params = {
        payChannelCode: state.defaultChannelConfig ? state.defaultChannelConfig.payChannelCode : '',
        payChannelConfigId: state.defaultChannelConfig ? state.defaultChannelConfig.payChannelConfigId : '',
        skuId: state.shopdata.productId,
        priceAmountMicros: "",
        currency: state.shopdata.currency,
        price: state.shopdata.price.match(/\d+(\.\d+)?/)[0]
    }
    let buryInfo = {
        isclose: state.shopdata.jumpType
    }
    if (getPhoneType() == "Android") {
        console.log('安卓支付', state.shopdata.jumpType);
        if (state.shopdata.jumpType == 1) {
            googleappPay(params, buryInfo);
        } else {
            // store.commit('GETPAYOVER', false)
            openLoading(false)
            JumpH5('homepageindulgence', "/paychannelcountry", "", JSON.stringify({ ...state.shopdata, type: 'vip' }), true);
        }
    } else {
        if (state.shopdata.jumpType == 2) {
            iphoneappPay(params, buryInfo);
        } else {
            // store.commit('GETPAYOVER', false)
            openLoading(false)
            JumpH5('homepageindulgence', "/paychannelcountry", "", JSON.stringify({ ...state.shopdata, type: 'vip' }), true);
        }

    }
}

</script>
