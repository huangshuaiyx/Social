
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

            .species {
                margin-top: 36px;
                width: 175px;
                height: 97px;
            }

            .breatheRight {
                width: 21px;
                height: 21px;
                position: absolute;
                right: -4px;
                top: 25px;
            }
            .breatheTop {
                width: 15px;
                height: 15px;
                position: absolute;
                left: 0px;
                top: 14px;
                animation: mymove1 6s ease-in-out infinite alternate;
            }

            .breatheBottom {
                width: 19px;
                height: 19px;
                position: absolute;
                left: 5px;
                bottom: 13px;
                animation: mymove1 3s ease-in-out infinite alternate;
            }
            // }

            .text {
                color: #fff;
                width: 244px;
                height: 45px;
                margin: 42px auto;
                font-size: 14px;
                font-weight: 700;

                .num {
                    color: #f5b44b;
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
                    font-weight: 700;
                }
            }
        }
    }
}
</style>
<template>
    <div class="coinsfew" @click="closeDialog">
        <div class="coinsfewialog">
            <div class="coinsfewInfo" @click.stop="shancloseDialog">
                <div class="close">
                    <img @dragstart.prevent @click.stop="closeDialog" src="../../assets/close@2x.png" alt="">
                </div>
                <img @dragstart.prevent class="species" src="../../assets/fewspeciesmoney@2x.png" alt="">
                <div class="text">{{ t('coinsfewlang.content') }}</div>
                <div class="footer">
                    <div class="getcoins" @click.stop="ongetcoins">
                        <div>{{  t('getconis.btntext') }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

import { close, JumpH5, nativeEnv } from "@/api/index";
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()

const store = useStore()
const state = reactive({
    // count: 1500,
    time: new Date().getTime()
})
onBeforeMount(() => {
})
onMounted(() => {
    buryingpoint()
    appLanguages()
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
        event: "HP2500100",
        type: 'load',
        cost: state.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const closeDialog = () => {
    let obj = {
        event: "HE0015002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    close()
}
const shancloseDialog = () => { }
const ongetcoins = () => {
    window.preReClick(getcoins)
}
const getcoins = () => {
    let obj = {
        event: "HE0015001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    JumpH5('coinsfew', '/walletcommodity', '', '', true, 1, 1)
}
</script>
