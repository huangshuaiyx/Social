<template>
    <div class="setclearlaccount" @click="downkeyboard">
        <div id="logoutaccount">
            <p class="p1">
                {{ t('clearlaccount.textTop1') }}
            </p>
            <h4> {{ t('clearlaccount.textTop2') }}</h4>
            <p class="p2">{{ t('clearlaccount.textTop3') }}</p>
            <h4>{{ t('clearlaccount.textTop4') }}</h4>
            <p class="p3">
                {{ t('clearlaccount.textTop5') }}
            </p>
            <p class="p4">
                {{ t('clearlaccount.textTop6') }}
            </p>

            <div class="inputs">
                <input @focus="inpfocus" ref='mianscroll' class="input" type="email" :value="text" @input="inputs" maxlength="30" placeholder="Email" />
            </div>

            <p class="p5">
                {{ t('clearlaccount.textTop7') }}
            </p>

            <div class="button" @click.stop="logoutClick">
                <div class="textbtn">{{ t('clearlaccount.textTop8') }}</div>
            </div>

            <div class="vipbuy" @click.stop="guan" v-show="confirmShow">
                <div class="vipbuy-div">
                    .
                    <img @dragstart.prevent class="vip-img" src="../assets/close@2x.png" alt="" @click.stop="guan" />
                    <p>{{ t('clearlaccount.btntext1') }}</p>
                    <div class="vip-button">
                        <button class="vip-button1" @click.stop="onbecome()">{{ t('clearlaccount.btntext2') }}</button>
                        <button class="vip-button2" @click.stop="guan">{{ t('clearlaccount.btntext3') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { networkRequest, setTitleBar, close, JumpH5, nativeEnv, hidekeyboard, jumpnative } from "@/api/index";
import { ref, onBeforeMount, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
const { locale } = useI18n()
const { t } = useI18n()
const store = useStore()
const CallBackName = store.state.unifyCallBackName
import {
    showToast,
} from "vant";
let text = ref('')
let title = ref('')
let emailtext = ref('')
const mianscroll = ref()
let confirmShow = ref(false)
let time = new Date().getTime()
const inputs = (e) => {
    text.value = e.target.value;
}
const inpfocus = () => {
    let obj = {
        event: "HE0012002",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    const child = document.querySelector(`#logoutaccount`) // 需要滚动的元素
    console.log(child.scrollHeight, 'child');
    setTimeout(() => {
        window.scrollTo({
            top: child.scrollHeight,
            behavior: "auto" //auto 缓慢执行smooth
        })
    }, 500)
}
onBeforeMount(() => {

})
onMounted(() => {
    buryingpoint()
    appLanguages()
    setHeader()
})
const downkeyboard = () => {
    hidekeyboard()
}
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
const setHeader = () => {
    title = t('clearlaccount.toptitle')
    setTitleBar(title, 'FFFFFFFF', 'FF1D1F29', '', res => { });
}
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP2200100",
        type: 'load',
        cost: time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const logoutClick = () => {
    let obj = {
        event: "HE0012001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    if (text.value) {
        if (
            /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
                text.value
            ) == false
        ) {
            emailtext = t('clearlaccount.emailtext')
            showToast(emailtext);
        } else {
            confirmShow.value = true;
        }
    } else {
        confirmShow.value = true;
    }
}
const onbecome = () => {
    window.preReClick(become)
}
const become = () => {
    let params = { email: text.value }
    networkRequest('v1/ums/account/destroy', params, (res) => {
        if (res.code == 200) {
            confirmShow.value = false;
            text.value = "";
            showToast(res.msg);
            jumpnative(2, res => { })
        }
    })
}
const guan = () => {
    confirmShow.value = false;
}
</script>
  
<style lang="scss" scoped>
.setclearlaccount {
    width: 100%;
    height: 100%;
    background: #1d1f29;
}
#logoutaccount {
    overflow: hidden;
    overflow-y: auto;
    background: #1d1f29;
    padding-top: 38px;
    h4 {
        width: 85%;
        height: auto;
        margin: 10px auto 0;
        font-size: (30px/2);
        color: #fff;
    }

    p {
        color: #666666;
    }

    .p1 {
        width: 85%;
        height: auto;
        margin: 0 auto;
        font-size: (28px/2);
        line-height: (40px/2);
        font-family: 'Gen Jyuu Gothic P-Bold, Gen Jyuu Gothic P';
    }

    .p2 {
        width: 85%;
        height: auto;
        margin: 8px auto 0;
        font-size: (28px/2);
        line-height: (40px/2);
        font-family: 'Gen Jyuu Gothic P-Bold, Gen Jyuu Gothic P';
    }

    .p3 {
        width: 85%;
        height: auto;
        margin: 8px auto 0;
        font-size: (28px/2);
        line-height: (40px/2);
        font-family: 'Gen Jyuu Gothic P-Bold, Gen Jyuu Gothic P';
    }

    .p4 {
        width: 85%;
        height: auto;
        margin: 35px auto 0;
        font-size: (28px/2);
        color: #fff;
        text-align: center;
        line-height: (60px/2);
        font-family: 'Gen Jyuu Gothic P-Bold, Gen Jyuu Gothic P';
    }

    .p5 {
        width: 85%;
        height: auto;
        margin: 10px auto 0;
        font-size: (28px/2);
        text-align: center;
        line-height: (60px/2);
        font-family: 'Gen Jyuu Gothic P-Bold, Gen Jyuu Gothic P';
    }

    .inputs {
        .input {
            width: (666px/2);
            height: 50px;
            background: #1d1f29;
            border-radius: 10px;
            border: 2px solid #4b4d55;
            -webkit-user-select: text !important;
            margin: (47px/2) (32px/2) 0;
            padding-left: 10px;
            font-size: 15px;
            color: #fff;
        }
    }

    .button {
        width: 295px;
        height: 63px;
        text-align: center;
        background: url('@/assets/reportInfo@2x.png') no-repeat center;
        background-size: 100% 100%;
        margin: 0 auto;
        color: #fff;
        margin-top: 10px;
        position: relative;
        .textbtn {
            width: 100%;
            position: absolute;
            font-size: (32px/2);
            top: 50%;
            font-weight: 700;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .vipbuy {
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0.7);
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;

        .vipbuy-div {
            width: (580px/2);
            // height: (358px/2);
            background: #fff;
            position: relative;
            background: url('@/assets/logoutsubmit@2x.png') no-repeat center;
            background-size: 100% 100%;
            padding-bottom: 15px;

            p {
                width: 90%;
                text-align: center;
                font-size: 14px;
                font-family: Arial-Bold, Arial;
                margin: (75px/2) auto 27px;
                color: #fff;
            }

            .vip-img {
                width: (46px/2);
                height: (46px/2);
                position: absolute;
                top: 12px;
                right: 15px;
            }

            .vip-button {
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-around;

                .vip-button1 {
                    width: 130px;
                    height: 63px;
                    background: url('../assets/clearlaccountNo@2x.png') no-repeat center;
                    background-size: 100% 100%;
                    border: 0px;
                    color: #fff;
                    font-weight: 700;
                    font-size: (28px/2);
                }

                .vip-button2 {
                    width: 130px;
                    font-weight: 700;
                    height: 63px;
                    // background: linear-gradient(90deg, #ff2a91, #ff912e);
                    background: url('../assets/clearlaccountYes@2x.png') no-repeat center;
                    background-size: 100% 100%;
                    border: 0px;
                    color: #fff;
                    font-size: (28px/2);
                }
            }
        }
    }
}
</style>
  