<template>
    <div id="blacklist">

        <van-list v-model="loading" :finished="finished" @load="load" :offset="100" error-text="Load Fail..." loading-text="Loading...">
            <div class="right" v-if="$i18n.locale == 'ar' || $i18n.locale == 'ur'">
                <div class="blacklistdiv" v-for="(x, i) in formData" :key="i">
                    <div class="blacklistdiv-button" v-preventReClick @click="onunblockClick(x.toUserId)">
                        <div class="main_in">{{ $t('blackList.btnText') }}</div>
                    </div>
                    <div style="display: flex; align-items: center;">
                        <div>
                            <p>
                                <span class="blacklistdiv-s" style="color: #fff;">{{ x.nickName }}</span>
                            </p>
                            <!-- <p>
                            <span>{{ x.region }}</span>
                            <van-image class="van-image" v-show="x.regionFlag" :src="x.regionFlag" fit="scale-down">
                            </van-image>
                        </p> -->
                        </div>
                        <div class="blacklistdiv-img" @click="faceClick(x.nickName)">
                            <van-image :src="x.face" fit="cover" :error-icon="require('../../../assets/blacklist/defaultavatar.png')" :loading-icon="require('../../../assets/blacklist/defaultavatar.png')">
                                <template v-slot:loading> </template>
                            </van-image>
                            <!-- <div :class="x.online == 1 ? 'blacklistdiv_online' : 'blacklistdiv_offline'">Online</div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="left" v-else>
                <div class="blacklistdiv" v-for="(x, i) in formData" :key="i">
                    <div class="blacklistdiv-img" @click="faceClick(x.nickName)">
                        <!-- <img src="x.face" alt="" /> -->
                        <!-- <van-image class="van-image" :src="x.face" fit="cover"> </van-image> -->
                        <van-image :src="x.face" fit="cover" :error-icon="require('../../../assets/blacklist/defaultavatar.png')" :loading-icon="require('../../../assets/blacklist/defaultavatar.png')">
                            <template v-slot:loading> </template>
                        </van-image>
                        <!-- <div :class="x.online == 1 ? 'blacklistdiv_online' : 'blacklistdiv_offline'">Online</div> -->
                    </div>
                    <div class="blacklistdiv_div">
                        <p>
                            <span class="blacklistdiv-s">{{ x.nickName }}</span>
                        </p>
                        <!-- <p>
                            <van-image class="van-image" v-show="x.regionFlag" :src="x.regionFlag" fit="scale-down">
                            </van-image>
                            <span>{{ x.region }}</span>
                        </p> -->
                    </div>
                    <div class="blacklistdiv-button" @click="onunblockClick(x.toUserId)">
                        <div class="main_in">Unblock</div>
                    </div>
                </div>
            </div>
        </van-list>
        <div class="quest" v-show="quest">
            <img src="../../../assets/queshengtu.png" alt="" />
        </div>

    </div>
</template>
<script>
import { JumpValue, networkRequest, setTitleBars, close } from '../../../api/inedx'
import { List, Loading, Image, PullRefresh, Toast } from 'vant'
import { getPhoneType } from '../../../utils/index'
export default {
    components: {
        [List.name]: List,
        [Loading.name]: Loading,
        [Image.name]: Image,
        [PullRefresh.name]: PullRefresh,
    },
    name: 'doddess',
    data () {
        return {
            formData: [],
            loading: false, // 是否在上拉
            finished: false, // 是否有数量
            page: 0,
            quest: false,
            selectBlackListUrl: '/ums/relation/selectBlackList',
            count: 0,
            time: null,
            toUserId: '',
        }
    },
    async created () {
        await this.$store.dispatch('appLanguages')
        this.$i18n.locale = this.$store.state.appLanguage
        setTitleBars(this.$t('blackList.title'), false, false)
        this.time = new Date().getTime()
        // if (getPhoneType() == 'Android') {
        //     this.load()
        // }
    },
    mounted () {
        this.page = 0
        this.load()


        let totalTmie = new Date().getTime()
        let obj = {
            event: "HP2000100",
            type: 'load',
            cost: this.time,
            totalCost: totalTmie,
        }
        this.$store.dispatch("onStatistics", obj)
    },
    methods: {
        load () {
            this.page += 1
            this.loading = true
            this.finished = true
            networkRequest("v1", this.selectBlackListUrl, {
                pageNum: this.page,
                pageSize: 10,
            }).then((res) => {
                console.log(res, "啊实打实打算")
                if (typeof (res.code) != undefined) {
                    this.loading = false
                    this.finished = false
                    if (res.list.length != 0) {
                        this.quest = false
                        if (this.page == 1) {
                            this.formData = res.list
                        } else {
                            this.formData = this.formData.concat(res.list)
                        }
                    } else {
                        this.finished = true
                        if (res.pageNum > 1) {
                            this.quest = false
                        } else {
                            console.log('数据为空');
                            this.formData = res.list
                            this.quest = true
                        }
                    }
                } else {
                    this.finished = true
                    this.quest = true
                }
            })
        },
        // 点击跳转
        blacklist (t) {
            JumpValue('providerHome', t)

        },
        //下拉刷新
        onRefresh () {
            setTimeout(() => {
                // this.count++;
                this.page = 0
                this.load()
            }, 1000)
        },
        onunblockClick (val) {
            this.toUserId = val
            window.preReClick(this.unblockClick, 300)
        },
        // 取消拉黑
        unblockClick () {
            console.log(this.toUserId, ' this.toUserId');
            networkRequest('v1', "/ums/relation/userUnBlacklistUser", { toUserId: this.toUserId }).then(res => {
                if (typeof (res) != undefined) {
                    Toast('Unblock successfully')
                    this.page = 0
                    this.load()
                    console.log(this.formData, "数据")
                }
            })
            let obj = {
                event: "HE0009001",
                type: 'click',
            }
            this.$store.dispatch("onStatistics", obj)
        },
        // 点击头像
        faceClick (val) {
            Toast(`${val} is currently unavailable`)
        },
        goBacks () {
            close()
        }
    },
}
</script>
  
<style lang="scss" scoped>
@import './index.scss';
</style>
