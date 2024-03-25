<template>
    <div id="blacklistlist">
        <van-list v-model:loading="data.loading" :finished="data.finished" @load="load" offset="100" :immediate-check="false">
            <div class="left">
                <div v-for="(x, i) in data.list" :key="i">
                    <div class="blacklistdiv" v-if="data.language != 'ar'">
                        <div @click="faceClick(x.nickName)">
                            <div class="blacklistdiv-img">
                                <!-- <img v-lazy="x.face" alt="" /> -->
                                <!-- <van-image class="van-image" :src="x.face" fit="cover"> </van-image> -->
                                <!-- <van-image :src="x.face" fit="cover">
                                <template v-slot:loading> </template>
                            </van-image> -->
                                <van-image @dragstart.prevent v-if="x.face" round fit="cover" class="van-image" :src="x.face">
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>
                                    <template v-slot:error class="">
                                        <van-image @dragstart.prevent fit="cover" :src="require('../../assets/autroimg@2x.png')" />
                                    </template>
                                </van-image>
                                <van-image @dragstart.prevent v-else round class="van-image" :src="require('../../assets/autroimg@2x.png')" />
                            </div>
                        </div>
                        <div class="headInfo">
                            <div @click="faceClick(x.nickName)" class="countryInfo">
                                <div class="blacklistdiv-s">{{ x.nickName }}</div>
                                <div class="countryinfo">
                                    <van-image @dragstart.prevent round class="country" fit="cover" v-if="x.regionFlag" :src="x.regionFlag">
                                        <template v-slot:error class="errorimg">
                                            <van-image @dragstart.prevent fit="cover" class="defaultimg" :src="require('../../assets/arealogo@2x.png')" />
                                        </template>
                                        <template v-slot:loading>
                                            <van-loading type="spinner" size="10" />
                                        </template>
                                    </van-image>
                                    <van-image @dragstart.prevent v-else round class="country" :src="require('../../assets/arealogo@2x.png')" />
                                    <span class="countrytext">{{ x.region }}</span>
                                </div>
                            </div>
                            <div class="cancleBtn" @click="unblockClick(x.toUserId,x.nickName)">
                                <div> {{ t('balckList.btnText') }}</div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="blacklistdivar">
                        <div class="headInfo">
                            <div class="cancleBtn" @click="unblockClick(x.toUserId,x.nickName)">
                                <div> {{ t('balckList.btnText') }}</div>
                            </div>
                            <div @click="faceClick(x.nickName)" class="countryInfo">
                                <div class="blacklistnickName">{{ x.nickName }}</div>
                                <div class="countryinfo countryinfoar">
                                    <van-image @dragstart.prevent round class="country" v-if="x.regionFlag" :src="x.regionFlag">
                                        <template v-slot:error class="errorimg">
                                            <van-image @dragstart.prevent class="defaultimg" :src="require('../../assets/arealogo@2x.png')" />
                                        </template>
                                        <template v-slot:loading>
                                            <van-loading type="spinner" size="10" />
                                        </template>
                                    </van-image>
                                    <van-image @dragstart.prevent v-else round class="country" :src="require('../../assets/arealogo@2x.png')" />
                                    <span class="countrytext">{{ x.region }}</span>
                                </div>
                            </div>
                        </div>
                        <div @click="faceClick(x.nickName)">
                            <div class="blacklistdi-imgvar">
                                <!-- <img v-lazy="x.face" alt="" /> -->
                                <!-- <van-image class="van-image" :src="x.face" fit="cover"> </van-image> -->
                                <!-- <van-image :src="x.face" fit="cover">
                                <template v-slot:loading> </template>
                            </van-image> -->
                                <van-image @dragstart.prevent v-if="x.face" round class="van-image" :src="x.face">
                                    <template v-slot:loading>
                                        <van-loading type="spinner" size="20" />
                                    </template>
                                    <template v-slot:error class="">
                                        <van-image @dragstart.prevent :src="require('../../assets/autroimg@2x.png')" />
                                    </template>
                                </van-image>
                                <van-image @dragstart.prevent v-else round class="van-image" :src="require('../../assets/autroimg@2x.png')" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-list>
        <div class="quest" v-show="data.quest">
            <img @dragstart.prevent src="../../assets/sighempty@2x.png" alt="" />
            <div class="blocked">{{ t('balckList.emptyTxetTitle') }}</div>
            <div class="text">{{ t('balckList.emptyTxet') }}</div>
        </div>
    </div>
</template>
<script setup>
import { networkRequest, setTitleBar, nativeEnv, removeBlacklistSuccess } from '@/api/index'
import { onBeforeMount, onMounted, reactive } from 'vue';
import { useStore } from 'vuex'
const store = useStore()
import { showToast } from 'vant';
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n()
const CallBackName = store.state.unifyCallBackName
let data = reactive({
    list: [],
    loading: false,
    finished: false,
    quest: false,
    page: 0,
    time: new Date().getTime(),
    topHeight: 52,
    tost: '',
    tost2: '',
    title: "",
    language: ""
})
onBeforeMount(() => {
    buryingpoint()
    appLanguages()
    setHeader()
    load()
})
// 语言查询
const appLanguages = () => {
    nativeEnv((res) => {
        if (res.code == 200) {
            if (['en', 'fr', 'ar', 'hi', 'pt', 'es'].includes(res.data)) {
                locale.value = res.data
                data.language = res.data
                console.log('语言', res);
                localStorage.setItem("lang", res.data);
            } else {
                locale.value = 'en'
                data.language = 'en'
                localStorage.setItem("lang", 'en');
            }
            // setHeader()
        }
    })
}
const setHeader = () => {
    data.title = t('balckList.title')
    setTitleBar(data.title, 'FFFFFFFF', 'FF1D1F29', '', () => { });
}
onMounted(() => { })
const buryingpoint = () => {
    let totalTmie = new Date().getTime()
    let obj = {
        event: "HP2000100",
        type: 'load',
        cost: data.time,
        totalCost: totalTmie,
    }
    store.dispatch("onStatistics", obj)
}

const load = () => {
    data.page += 1
    data.loading = true


    console.log(data.page);
    data.finished = true
    networkRequest("v1/ums/relation/selectBlackList", { pageNum: data.page, pageSize: 20, }, (res) => {
        console.log(res, '黑名单');
        if (res.code == 200) {

            if (res.data.list.length) {
                if (data.page == 1) {
                    data.list = res.data.list
                } else {
                    data.list = data.list.concat(res.data.list)
                }
                data.loading = false
                data.finished = false
            } else {
                data.finished = true
                if (res.data.pageNum > 1) {
                    data.quest = false
                } else {
                    data.list = res.data.list
                    // data.loading = true
                    // console.log(data.list, '2');
                    data.quest = true
                }
            }
        } else {
            data.finished = true
            data.quest = true
            showToast(res.msg);
        }
    })
}
// // 关闭当前页
// const fallback = () => {
//     close()
// }

// 点击跳转
// const onRefresh = () => {
//     setTimeout(() => {
//         count.value++;
//         page.value = 0
//         load()
//     }, 1000)
// }
// const onunblockClick = (val) => {
//     window.preReClick(unblockClick(val))
// }
// 取消拉黑
const unblockClick = (val, name) => {
    let obj = {
        event: "HE0009001",
        type: 'click',
    }
    store.dispatch("onStatistics", obj)
    networkRequest('v1/ums/relation/userUnBlacklistUser', { toUserId: val }, (res) => {
        console.log(res, '取消拉黑');
        if (res.code == 200) {
            data.untoast1 = t('balckList.unshowTost1')
            data.untoast2 = t('balckList.unshowTost2')
            showToast(`${data.untoast1} ${name}${data.untoast2}`)
            data.page = 0
            load()
            removeBlacklistSuccess(val)
        } else {
            showToast(res.msg);
        }
    })
}
// 点击头像
const faceClick = (val) => {
    data.tost = t('balckList.showTost1')
    data.tost2 = t('balckList.showTost2')
    showToast(`${data.tost} ${val}${data.tost2}`)
}
// export default {
//     data () {
//         return {
//             formData: [],
//             loading: false, // 是否在上拉
//             finished: false, // 是否有数量
//             page: 0,
//             quest: false,
//             selectBlackListUrl: '/ums/relation/selectBlackList',
//             count: 0,
//             isLoading: false
//         }
//     },
//     mounted () {
//         this.$store.dispatch('appLanguages')
//         this.$i18n.locale = this.$store.state.appLanguage
//         setTitleBar(this.$t('Block list'))
//         if (getPhoneType() == 'Android') {
//             this.load()
//         }
//         let totalTmie = new Date().getTime()
//         let obj = {
//             event: "HP2000100",
//             type: 'load',
//             cost: this.time,
//             totalCost: totalTmie,
//         }
//         this.$store.dispatch("onStatistics", obj)
//     },
//     methods: {
//         load () {
//             this.page += 1
//             this.loading = true
//             networkRequest("v1", this.selectBlackListUrl, {
//                 pageNum: this.page,
//                 pageSize: 10,
//             }).then((res) => {
//                 console.log(res)
//                 if (res.code == 200) {
//                     this.isLoading = false
//                     this.loading = false
//                     if (res.data.list.length != 0) {
//                         this.quest = false
//                         if (this.page == 1) {
//                             this.formData = res.data.list
//                         } else {
//                             this.formData = this.formData.concat(res.data.list)
//                         }
//                     } else {

//                         this.finished = true
//                         if (res.data.pageNum > 1) {
//                             this.quest = false
//                         } else {
//                             this.formData = res.data.list
//                             this.quest = true
//                         }
//                     }
//                 } else {
//                     this.finished = true
//                     this.quest = true
//                 }
//             })
//         },
//         // 点击跳转
//         blacklist (t) {
//             JumpValue('providerHome', t)
//         },
//         //下拉刷新
//         onRefresh () {
//             setTimeout(() => {
//                 // this.count++;
//                 this.page = 0
//                 this.load()
//             }, 1000)
//         },
//         // 取消拉黑
//         unblockClick (val) {
//             networkRequest('v1', "/ums/relation/userUnBlacklistUser", { toUserId: val }).then(res => {
//                 if (res.code == 200) {
//                     Toast('Unblock successfully')
//                     this.page = 0
//                     this.load()
//                     console.log(this.formData, "数据")
//                 }
//             })
//             let obj = {
//                 event: "HE0009001",
//                 type: 'click',
//             }
//             this.$store.dispatch("onStatistics", obj)
//         },
//         // 点击头像
//         faceClick (val) {
//             Toast(`${val} is currently unavailable`)
//         }
//     },
// }
</script>
  
<style lang="scss" scoped>
@import './index.scss';
</style>
