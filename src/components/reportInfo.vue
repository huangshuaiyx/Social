<template>
    <div class="report">
        <div class="reprot-bottom">
            <div class="reportbanner">
                <!-- load 加载动画 -->
                <!-- <div class="walletloading" v-show="data.isloading">
                    <div class="walletloadingimg">
                        <img src="../assets/loading@2x.png" alt="">
                    </div>
                </div> -->
                <div class="reprot-bottom-item" v-for="(x, i) in data.reprotList" :key="i" @click="reprotClick(x, i)" :title="x.dictLabel" clickable>
                    <div>{{ x.dictLabel }}</div>
                    <img @dragstart.prevent v-if="i == data.isIndex" class="isselect" src="../assets/selected@2x.png" alt="">
                    <img @dragstart.prevent v-else class="isselect" src="../assets/selectedNo@2x.png" alt="">
                </div>

                <div class="footer" :class="data.dictValue?'button':'buttons'" @click="onsubmit">
                    <div> {{ t('customerservice.btnText') }}</div>
                </div>
            </div>
        </div>
        <div class="coinsfew" v-show="data.reportShow">
            <div class="coinsfew-div">
                <img @dragstart.prevent src="../assets/success@2x.png" alt="">
                <div class="tetx">{{ t('reportInfo.success') }}</div>
                <div class="successok" @click="okOut"><span>OK</span></div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { showToast, } from "vant";
import { networkRequest, getClientBizInfo, setTitleBar, jumpnative, nativeEnv, getLoading, addBlacklistSuccess } from "@/api/index";
import { getQueryString } from "@/utils/index";
import { reactive, onBeforeMount, onMounted } from 'vue';
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()
const store = useStore()
const data = reactive({
    reportShow: false,
    reprotList: [],
    queryDictListByLanguageUrl: "/sys/dictData/queryDictListByType",
    saveUrl: "/ums/report/save",
    isIndex: -1,
    dictValue: "",
    time: new Date().getTime(),
    reportInfo: {},
    title: "",
    isloading: false,
    loadingvip: 1
})
onBeforeMount(() => {

})
onMounted(() => {
    buryingpoint()
    appLanguages()
    getqueryDictListByType()
    setHeader()
    getClientBizInfomethod()
})
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
const setHeader = () => {
    data.title = t('reportInfo.title')
    setTitleBar(data.title, 'FFFFFFFF', 'FF1D1F29', '', (res) => { });
}
const getqueryDictListByType = () => {
    // data.isloading = true
    networkRequest('v2/sys/dictData/queryListByTypeWithLanguage', { dictType: "us_report_reason" }, (res) => {
        try {
            if (res.code == 200) {
                data.reprotList = res.data;
                // data.isloading = false
            }
        } catch (error) {

        } finally {
            getLoading(false, res => { })
        }
    },)
}
// 获取客户端举报参数
const getClientBizInfomethod = () => {
    getClientBizInfo((res) => {
        console.log(res, '举报参数');
        data.reportInfo = res
    })
}
const okOut = () => {
    jumpnative(1, res => { })
}
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP1501000",
        type: 'load',
        cost: data.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}
const reprotClick = (x, i) => {
    data.dictValue = x.id
    data.isIndex = i;
}
const onsubmit = () => {
    window.preReClick(submit)
}
const submit = () => {
    if (data.isIndex == -1) return
    let obj = {
        event: "HE0006003",
        type: 'click',
        bizId: getQueryString('bizId') != undefined ? getQueryString('bizId') : ''
    }
    store.dispatch("onStatistics", obj)
    // let objparams = JSON.parse(getQueryString('bizType')) ? JSON.parse(getQueryString('bizType')) : {}
    if (!data.reportInfo) return console.log('举报参数为空', data.reportInfo);
    let params = {
        bizType: data.reportInfo.bizType ? data.reportInfo.bizType : 2,
        bizId: data.reportInfo.bizId,
        toUserId: data.reportInfo.toUserId,
        resourceUrl: data.reportInfo.resourceUrl ? data.reportInfo.resourceUrl : null,
        resourceIds: data.reportInfo.resourceIds ? data.reportInfo.resourceIds : null,
        reasonId: data.dictValue,
    }
    console.log(params.resourceIds, 'resourceIdsresourceIds');
    console.log(params, '举报cs', data.reportInfo);
    networkRequest("v1/ums/report/save", params, (res) => {
        console.log(res, '举报');
        if (res.code == 200) {
            data.reportShow = true
            addBlacklistSuccess(data.reportInfo.toUserId)
        } else {
            showToast(res.msg);
        }
    })
}
</script>
  
<style lang="scss" scoped>
.report {
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    background: #1d1f29; // background: url('../assets/meng.png') no-repeat #1d1f29;
    // background-size: contain;
    .reprot-bottom {
        width: 100%;
        height: 410px;
        overflow-y: auto;
        margin-top: 19px;
        padding: 0px 20px;
        box-sizing: border-box;
        // position: relative;
        .reprot-bottom-item {
            padding: 0px 15px;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            background: rgba(21, 22, 26, 0.85);
            height: 50px;
            font-size: 13px;
            color: #fff;
            border-bottom: solid 0.5px rgba(255, 255, 255, 0.1);
            line-height: 50px;
            margin-bottom: 10px;
            border-radius: 15px; // border: 1px solid #ccc;
            box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.5),
                inset 0px 1px 2px 0px rgba(255, 255, 255, 0.20000000298023224);
            .isselect {
                width: 25px;
                height: 25px;
            }
        }
        .reportbanner {
            height: 410px;
            background: #1d1f29 !important;
            overflow-y: auto;
            position: relative;
            .walletloading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                .walletloadingimg {
                    width: 33px;
                    height: 33px;
                    animation: rotation 1.5s linear infinite;
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
        }
    }
    .footer {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        width: 295px;
        height: 63px;
        color: #fff;
        bottom: 65px;
        font-size: 14px;
        text-align: center;
        font-weight: 700;
        background-size: 100% 100%;
        div {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .coinsfew {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center; // background: rgba($color: #000, $alpha: 0.5);
        .coinsfew-div {
            padding: 33px 28px 35px;
            background: url('../assets/reportInfosuccess@2x.png') no-repeat center;
            background-size: 100% 100%;
            position: relative;
            text-align: center;
            margin-top: -70px;
            img {
                width: 60px;
                height: 60px;
                margin: 0 auto;
                margin-top: 33px;
            }
            .tetx {
                width: 258px;
                height: 61px;
                margin: 26px auto;
                line-height: 61px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px 15px 15px 15px;
                opacity: 1;
                color: #fff;
                font-size: 12px;
            }
            .successok {
                width: 258px;
                height: 43px;
                margin: 0 auto;
                background: #ffffff;
                color: #222222;
                font-weight: 700;
                position: relative;
                border-radius: 25px 25px 25px 25px;
                opacity: 1;
                span {
                    position: absolute;
                    font-size: 14px;
                    width: 100%;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
        }
    }
}

.buttons {
    background: url('../assets/disablebutton.png') no-repeat center;
}

.button {
    background: url('../assets/reportInfo@2x.png') no-repeat center;
}
</style>
  