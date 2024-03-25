
<style lang="scss" scoped>
.coinsfew {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: none;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);

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
            background: url('../../assets/coinsfew@2x.png') no-repeat center;
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
            .speciesdialog {
                padding-bottom: 15px;
                .num {
                    color: #fff;
                    padding-top: 26px;
                    font-size: 40px;
                    font-weight: 700;
                }
                .species {
                    width: 175px;
                    height: 96px;
                    margin-top: 50px;
                    margin-bottom: 50px;
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
                    font-size: 15px;
                    transform: rotate(45deg);
                    border-radius: 50%;
                    background: linear-gradient(180deg, #f1c068 0%, #e5783e 100%);
                }
            }

            .getcoins {
                margin: 0 auto;
                width: 190px;
                height: 63px;
                line-height: 63px;
                font-size: 14px;
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
                <div class="speciesdialog">
                    <div class="num" v-show="state.amount">{{ state.amount }}</div>
                    <div class="num" v-show="!state.amount">0</div>
                    <div class="free"><span>{{ t('coins.free') }}</span></div>
                    <div>
                        <img @dragstart.prevent class="species" src="../../assets/specieshomepage@2x.png" alt="" />
                    </div>
                    <div @click="getcoins" class="getcoins">
                        <div>{{ t('getconis.btntext') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onBeforeMount, onMounted } from 'vue'

import { close, networkRequest, JumpH5, nativeEnv } from "@/api/index";
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
import { showToast } from 'vant';
const { locale, t } = useI18n()
const store = useStore()
const state = reactive({
    amount: 0,
    time: new Date().getTime()
})
onBeforeMount(() => {

})
onMounted(async () => {
    buryingpoint()
    appLanguages()
    getselectCoinTaskInfo()
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
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP3000100",
        type: 'load',
        cost: state.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const getselectCoinTaskInfo = () => {
    networkRequest('v1/up/coins/item/selectCoinTask', {}, (res) => {
        console.log(res, '商品余额');
        if (res.code == 200) {
            state.amount = res.data ? res.data.amount : 0
        } else {
            showToast(res.msg);
        }
    })
}
const commodityclick = () => { }
const closeDialog = () => {
    let obj = {
        event: "HE0020001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    close()
}
const getcoins = async () => {
    let obj = {
        event: "HE0020002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    JumpH5('homepagefree', '/walletcommodity', '', '', true, 1, 1)
}

</script>
