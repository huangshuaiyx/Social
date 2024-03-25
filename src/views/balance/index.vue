
<style lang="scss" scoped>
.balance {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: none;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);

    .balanceialog {
        width: 100%;
        padding: 0px 38px;
        position: absolute;
        box-sizing: border-box;
        text-align: center;

        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .balanceInfo {
            padding-top: 18px;
            box-sizing: border-box;
            width: 100%;
            position: relative;
            height: 100%;
            background: url('../../assets/balance@2x.png') no-repeat center;
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
            .balancehead {
                background: url('../../assets/balancehead.png') no-repeat center;
                background-size: 100% 100%;
                width: 150px;
                height: 100px;
                position: absolute;
                top: 12px;
                left: 76px;
            }

            .autho {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                display: block;
                margin: 0 auto;
            }

            .name {
                margin-top: 16px;
                color: #fff;
                font-size: 14px;
                font-weight: 400;
            }

            .species {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-top: 10px;
                margin-bottom: 23px;

                span {
                    color: #ffaf4d;
                    font-size: 14px;
                }

                img {
                    margin-left: 7px;
                    width: 22px;
                    height: 22px;
                }
            }

            .text {
                color: #666666;
                width: 276px;
                height: 40px;
                font-size: 14px;
                margin: 0 auto;
            }

            .footer {
                padding-bottom: 15px;
            }

            .getcoins {
                margin: 0 auto;
                width: 190px;
                height: 63px;
                font-size: 14px;
                color: #fff;
                font-weight: 600;
                background: url('../../assets/bugvip@2x.png') no-repeat center;
                background-size: 100% 100%;
                position: relative;
                div {
                    width: 100%;
                    position: absolute;
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
    <div class="balance" @click="closeDialog">
        <div class="balanceialog">
            <div class="balanceInfo" @click.stop="balanceInfo">
                <div class="close" @click.stop="closeDialog">
                    <img @dragstart.prevent src="../../assets/close@2x.png" alt="">
                </div>
                <div class="balancehead"></div>
                <div class="autho" v-if="!state.imgSrc"></div>
                <img @dragstart.prevent v-else class="autho" :src="state.imgSrc" alt="">
                <div class="name">{{ t('balanceinfo.title') }}</div>
                <div class="species">
                    <span>{{ state.count }}</span>
                    <img @dragstart.prevent src="../../assets/coinsmoney@2x.png" alt="">
                </div>
                <div class="text">{{ t('balanceinfo.content') }}</div>
                <div class="footer">
                    <div class="getcoins" @click.stop="getcoins">
                        <div>{{ t('getconis.btntext') }}</div>
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
import { showToast } from 'vant';

const { locale, t } = useI18n()
const store = useStore()
const state = reactive({
    count: 0,
    imgSrc: '',
    time: new Date().getTime(),
})
onBeforeMount(() => {

})

onMounted(() => {
    buryingpoint()
    appLanguages()
    getblalance()
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
        event: "HP2400100",
        type: 'load',
        cost: state.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const getblalance = () => {
    const num = ''
    const url = ''
    networkRequest('v2/ums/info/getUmsCenter', {}, (res) => {
        console.log(res, '余额');
        if (res.code == 200) {
            state.count = res.data.userBalance
            state.imgSrc = res.data.face
        } else {
            showToast(res.msg);
        }
    })
}
const closeDialog = () => {
    let obj = {
        event: "HE0014002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    close()
}
const balanceInfo = () => { }
const getcoins = () => {
    let obj = {
        event: "HE0014001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    JumpH5('balance', '/walletcommodity', '', '', true, 1, 1)
}
</script>
