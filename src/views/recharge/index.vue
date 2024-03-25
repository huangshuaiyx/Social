
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
            background: url('../../assets/rechargebgc@2x.png') no-repeat center;
            background-size: 100% 100%;

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

            .titleNum {
                color: #fff;
                font-size: 40px;
                font-weight: 600;
                padding: 32px 0px 4px 0px;
                // width: ;
                height: 46px;
            }

            .speciesImg {
                position: relative;

                img {
                    width: 175px;
                    height: 97px;
                    margin: 0 auto;
                }

                .speciesTetx {
                    position: absolute;
                    top: -10px;
                    right: 40px;
                    word-wrap: break-word;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 62px;
                    height: 62px;
                    color: #fff;
                    text-align: center;
                    border-radius: 50%;
                    font-size: 16px;
                    font-weight: 600;
                    background: linear-gradient(180deg, #ff749c 0%, #e0285b 100%);
                    box-sizing: border-box;
                    transform: rotate(30deg);
                }
            }

            .moneyNum {
                position: relative;
                width: fit-content;
                height: 35px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                background: rgba(0, 0, 0, 0.15);
                border-radius: 12px;
                margin: 28px auto 25px auto;

                .numLeft {
                    color: #f7dd61;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 12px;
                    padding: 10px 18px;
                }

                .numRight {
                    color: #a9b8ec;
                    padding: 10px 22px;
                }
                .errorImg {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    top: 6px;
                    right: 24px;
                }
            }

            .footer {
                padding-bottom: 15px;
            }

            .getcoins {
                margin: 0 auto;
                width: 190px;
                height: 63px;
                line-height: 63px;
                color: #fff;
                font-weight: 600;
                background: url('../../assets/bugvip@2x.png') no-repeat center;
                background-size: 100% 100%;
                position: relative;
                div {
                    width: 100%;
                    position: absolute;
                    font-size: 14px;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
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
                <div class="close">
                    <img @dragstart.prevent @click.stop="closeDialog" src="../../assets/close@2x.png" alt="">
                </div>
                <div class="titleNum">{{ state.shopdata?state.shopdata.name:0 }}</div>
                <div class="speciesImg">
                    <img @dragstart.prevent src="../../assets/reahargeMoney@2x.png" alt="">
                    <div class="speciesTetx" v-show="state.shopdata.tagUrl">
                        <div>{{ state.shopdata.tagUrl}}</div>
                    </div>
                </div>
                <div class="moneyNum">
                    <div class="numLeft">{{ state.shopdata?state.shopdata.price:'' }}</div>
                    <div class="numRight">{{ state.shopdata?state.shopdata.discountPrice:'' }}</div>
                    <img @dragstart.prevent class="errorImg" src="../../assets/X@2x.png" alt="">
                </div>
                <div class="footer">
                    <div class="getcoins" @click.stop="ongetcoins">
                        <div>{{ t('getconis.btntext') }}</div>
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
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { getPhoneType, googleappPaycoins, iphoneappPaycoins } from "@/utils/index"
import { showToast } from 'vant';
import { close, networkRequest, JumpH5, nativeEnv, getLoading, getGoodsListSkus } from "@/api/index";
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()
const store = useStore()
const state = reactive({
    // percentageTxt: 'OFF',
    actualPrice: 0,
    time: new Date().getTime(),
    shopdata: '',
})
onBeforeMount(() => {
    buryingpoint()
    appLanguages()
    getdiscountItem()
})
onMounted(() => { })
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
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP2700100",
        type: 'load',
        cost: state.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const getdiscountItem = () => {
    networkRequest('v1/wallet/item/matchItem', {}, (res) => {
        console.log(res, '匹配充值游湖');
        if (res.code == 200) {
            state.shopdata = res.data
            if (getPhoneType() == "Android") {
                let skuStr = res.data.allSku
                getGoodsListSkus(skuStr, response => {
                    console.log(response, 'response');
                    if (response.code == 200) {
                        response.data.map((c) => {
                            if (c.productId == res.data.productId) {
                                state.shopdata.currency = c.price_currency_code;
                                state.shopdata.price = c.price;
                            }
                        })
                    }
                })
            } else {
                getGoodsListSkus(res.data.productId, response => {
                    console.log(response, 'response');
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
const closeDialog = () => {
    let obj = {
        event: "HE0017002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    close()
}
const homePaySuccess = () => {
    let obj = {
        event: "HE0017002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    close()
}
window.homePaySuccess = homePaySuccess
const openLoading = (value) => {
    getLoading(value, res => { })
}
const commodityclick = () => { }
const loadingclick = () => { }
const ongetcoins = () => {
    window.preReClick(getcoins)
}
const getcoins = () => {
    let obj = {
        event: "HE0017001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    // store.commit('GETPAYOVER', true)
    openLoading(true)
    let buryInfo = {
        Pcode: 'HP2700100',
        type: "recharge",
        isclose: state.shopdata.jumpType
    }
    let params = {
        itemId: state.shopdata.productId,
        tradeChannel: state.shopdata.jumpType,
        currency: state.shopdata.currency,
        microTradeAmount: '',
    }

    if (getPhoneType() == "Android") {
        if (state.shopdata.jumpType == 1) {
            googleappPaycoins(params, buryInfo);
        } else {
            console.log(state.shopdata)
            // store.commit('GETPAYOVER', false)
            openLoading(false)
            JumpH5('recharge', "/paychannelcountry", "", JSON.stringify({ ...state.shopdata, type: 'coins' }), true);
        }
    } else {
        if (state.shopdata.jumpType == 2) {
            iphoneappPaycoins(params, buryInfo)
        } else {
            console.log(state.shopdata)
            // store.commit('GETPAYOVER', false)
            openLoading(false)
            JumpH5('recharge', "/paychannelcountry", "", JSON.stringify({ ...state.shopdata, type: 'coins' }), true);
        }

    }

}
</script>
