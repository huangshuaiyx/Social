
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
            .amountNum {
                font-size: 40px;
                color: #fff;
                padding-top: 32px;
                font-weight: 700;
            }
            .species {
                width: 175px;
                height: 96px;
                margin-top: 30px;
                margin-bottom: 62px;
            }

            .meorynum {
                width: fit-content;
                height: 35px;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 12px 12px 12px 12px;
                opacity: 1;
                padding: 0px 30px;
                display: flex;
                color: #fff;
                font-size: 18px;
                justify-content: center;
                align-items: center;
                margin: 0 auto;
                margin-bottom: 15px;

                img {
                    width: 30px;
                    height: 30px;
                    margin-right: 7px;
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
                <div class="amountNum">{{ state.amount }}</div>
                <img @dragstart.prevent class="species" src="../../assets/fewspeciesmoney@2x.png" alt="">
                <div class="footer">
                    <div class="getcoins" @click.stop="ongetcoins">
                        <div>{{ t('coins.free') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

import { close, networkRequest, JumpH5, nativeEnv } from "@/api/index";
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()
const store = useStore()
const state = reactive({
    amount: 0,
    time: new Date().getTime()
})
onBeforeMount(() => {
    buryingpoint()
    appLanguages()
    getselectCoinTask()
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
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP2600100",
        type: 'load',
        cost: state.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const getselectCoinTask = () => {
    networkRequest('v1/up/coins/item/selectCoinTask', {}, (res) => {
        console.log(res, '领取金币');
        if (res.code == 200) {
            state.amount = res.data ? res.data.amount : 0
        }
    })
}
const closeDialog = () => {
    let obj = {
        event: "HE0016002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    close()
}
const ongetcoins = () => {
    window.preReClick(getcoins)
}
const commodityclick = () => { }
const getcoins = () => {
    let obj = {
        event: "HE0016001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    JumpH5('receive', '/walletcommodity', '', '', true, 1, 1)
}
</script>
