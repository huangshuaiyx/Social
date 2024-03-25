<template>
    <div class="vip_successful">
        <div class="vip_successful_top">
            <img @dragstart.prevent src="../../assets/walletcommodity/vipsuccesscrown@2x.png" alt="">
            <p>
                {{ t('vipsuccess.cuccesstext') }}: <br />
                <span>{{ data.vipEndTime }}</span>
            </p>
        </div>
        <div class="vip_successful_banner" @click="buyClick(1)">
            <!-- <div class="walletloadingimgloading" v-show="!data.iscloseloading">
                <div class="walletloadingimg">
                    <img src="../../assets/loading@2x.png" alt="">
                </div>
            </div> -->
            <!-- v-show="data.iscloseloading" -->
            <van-swipe indicator-color="white" :autoplay="3000">
                <van-swipe-item v-for="(x, i) in data.equityList" :key="i">
                    <img @dragstart.prevent :onload="closeload" :onerror="closeload" :src="x.iconActive" alt="" />
                    <div class="imgTexttop" v-if="x.bizDesc">{{ x.bizDesc.split(',')[0] }}</div>
                    <div class="imgText" v-if="x.bizDesc">{{ x.bizDesc.split(',')[1] }}</div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="vip_successful_button">
            <div @click="buyClick(1)"><span> {{ t('vipsuccess.payconis') }}</span></div>
            <div @click="buyClick(2)">{{ t('vipsuccess.payvip') }}</div>
        </div>
        <div class="vip_successful_text">
            <p>{{ t('vip.timetext') }}</p>
            <div class="copywriting tipsd" ref="divDom" v-show="!data.actionShow">
                {{ t('vip.text3') }}
            </div>
            <div class="copywriting" ref="divDom" v-show="data.actionShow">
                {{ t('vip.text4') }}
            </div>
            <div v-show="data.actionShow" class="btntipsd"><span class="btntipsduser" @click="gouser">{{ t('vip.user') }}</span> {{ t('vip.and') }} <span class="btntipsduser" @click="gopolicy">{{ t('privacyPolicy.text') }}</span> </div>
            <img @dragstart.prevent @click="actionClick" :src="data.actionShow == false ? require('../../assets/vip/unexpanded.png') : require('../../assets/vip/expand.png')" alt="">
        </div>
        <Customerservice :sourceType="'vipSuccessful'"></Customerservice>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, onBeforeMount } from "vue";
import { useStore } from 'vuex';
const store = useStore()
import Customerservice from "@/components/payment/customerservice"
import { JumpH5, networkRequest, setTitleBar, nativeEnv, getLoading } from "../../api/index"
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()
import { showToast } from 'vant';
const CallBackName = store.state.unifyCallBackName
const data = reactive({
    // iscloseloading: false,
    equityList: [],
    actionShow: false,
    vipEndTime: "",
    time: new Date().getTime(),
    loadingvip: 1,
})
const divDom = ref(null)
onBeforeMount(() => {


})
onMounted(async () => {
    buryingpoint()
    appLanguages()
    setHeader()
    getViptime()
    getCarousel()
})
const closeload = () => {
    // data.iscloseloading = true
    getLoading(false, res => { })
}
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    store.dispatch("onStatistics", {
        type: "load",
        event: "HP1402000",
        cost: data.time,
        totalCost: totalTmie,
    })
}
const nativeComplete = () => {
    if (data.loadingvip != 1) return
    data.loadingvip = 2
    getLoading(true, res => { })
}
window.nativeComplete = nativeComplete
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
const gouser = () => {
    JumpH5('vipSuccessful', '/useragreement',)
}
const gopolicy = () => {
    JumpH5('vipSuccessful', '/privacy',)
}
const setHeader = () => {
    setTitleBar("VIP", 'FFFFFFFF', 'FF12121A', '', res => { });
}
// 获取vip到期时间 用户信息
const getViptime = async () => {
    networkRequest('v1/ums/info/getUserInfo', {}, req => {
        if (req.code == 200) {
            console.log(req, 'vip时间')
            let timestamp = req.data.vipEndTimestamp
            let date = new Date(timestamp)
            let year = date.getFullYear()
            let month = date.getMonth() + 1 // 月份从0开始，所以要加1
            let day = date.getDate()
            let viptime = `${month}.${day}.${year}`
            // let endTime = req.data.vipEndTime.split(' ')[0].split('-').reverse()
            // let viptime = [endTime[1], endTime[0], endTime[2]].join('.')
            // console.log(viptime, 'endTime');
            data.vipEndTime = viptime
        } else {
            showToast(req.msg)
        }
    })
}
window.onResume = getViptime
// 获取轮播
const getCarousel = () => {
    try {
        networkRequest('v3/ums/info/umsInfoByVipPage', {}, (res) => {
            if (res.code == 200) {
                console.log(res.data, '轮播');
                if (!res.data.menuTrees || !res.data.menuTrees.lenth) {
                    closeload()
                }
                data.equityList = res.data.menuTrees
            } else {
                showToast(res.msg)
                closeload()
            }
        })
    } catch (error) {
        showToast(error.msg)
        closeload()
    }
}
const actionClick = () => {
    console.log(data.actionShow)
    if (data.actionShow == false) {
        data.actionShow = true
        divDom.value.style.height = 'auto'
    } else {
        data.actionShow = false
        divDom.value.style.height = '24px'

    }
}
// 跳转钱包
const buyClick = (val) => {
    store.dispatch("onStatistics", {
        type: "click",
        event: "HE0011001",
        remark: { type: val }
    })
    if (val == 1) {
        JumpH5('vipSuccessful', "/walletcommodity", '', '', true, 1, 1)
    } else {
        JumpH5('vipSuccessful', "/vip", '', '', true, 1, 1)
    }
}
// 客户端回调设置头
const popNext = () => {
    console.log('回调');
    setHeader()
}
window.popNext = popNext
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>