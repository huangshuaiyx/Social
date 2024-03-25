<template>
    <div id="review">
        <!-- 所有任务审核 -->
        <div class="all-video">
            <figure class="all-video-figure">
                <p class="all-video-p1">审查入口</p>
                <figcaption>
                    <p class="all-video-p2">所有审核任务</p>
                    <div class="all-video-div">
                        <p class="all-video-p3">主播注册审核:
                            {{ this.formData.providerRegisterCount }}</p>
                        <p class="all-video-p3">
                            质检视频审核：{{ this.formData.providerOrderVideoCount }}</p>
                        <p class="all-video-p3">主播资料审核：{{
                            this.formData.providerInformationCount
                        }}</p>
                        <p class="all-video-p3">
                            用户审核：{{ this.formData.userInformationCount }}</p>
                    </div>
                </figcaption>
                <button class="button" @click="toexamine(formData.issueAuditor)">审查</button>
            </figure>
        </div>
        <!--  BI快速链接-->
        <!-- <div class="blLink">
            <p>当前状态</p>
            <el-radio-group v-model="radio" style="display:flex" @input="receivingClick">
                <el-radio :label="1">接单</el-radio>
                <el-radio :label="0">不接单</el-radio>
            </el-radio-group>
        </div> -->

        <!-- 分任务审核 -->
        <!-- <p class="subtask-video-title" v-show="formDataList.length != 0">分任务的内容审核入口</p>
        <div class="subtask" v-show="formDataList.length != 0">
            <figure class="subtask-figure" v-for="(x, i) in formDataList">
                <figcaption class="subtask-figcaption">
                    <p class="all-video-p2">{{ x.director == -1 ? "Unknown's" : x.issueAuditorName }} review task</p>
                    <div class="all-video-div">
                        <p class="all-video-p3">主播注册审核: {{ x.providerRegisterCount }}</p>
                        <p class="all-video-p3">
                            质检视频审核：{{ x.providerOrderVideoCount }}</p>
                        <p class="all-video-p3">主播资料审核：{{
                            x.providerInformationCount
                        }}</p>
                        <p class="all-video-p3">用户审核：{{ x.userInformationCount }}
                        </p>
                    </div>
                </figcaption>
                <button class="button" @click="toexamine(x.issueAuditor)">审查</button>
            </figure>
        </div> -->
    </div>
</template>

<script>
import { getTaskStatistics, receiveTask, getNextTaskd } from "@/api/operate/anchorReview/reviewList/index";
import { getInfo } from '@/api/login'
export default {
    components: {

    },
    inject: ["reload"],
    data() {
        return {
            formData: {},
            formDataList: [],
            radio: this.$store.state.radio,
            // radio:0,
            userId: "",
            myIntervald: null,
            timer: null,
            myInterval: null,
            arr: []
        };
    },
    created() {
        this.initList()
        this.getTaskStatisticsd()
        this.getInfod()
    },
    mounted() {
        console.log(JSON.parse(localStorage.getItem('radio')) == 0, "初始", this.$store.state.radio)
        if (this.$store.state.radio == 0) {
            console.log("关闭定时器")
            this.timer = null
            this.myInterval = null
            clearInterval(this.myInterval);
        } else {
            clearInterval(this.myInterval);
            // this.initSetInterval()
        }
    },
    methods: {
        getTaskStatisticsd() {
            getTaskStatistics({}).then((res) => {
                console.log("查询任务接口")
                if (res.code == 200) {
                    let arr = res.data
                    let arr1 = []
                    arr.forEach(item => {
                        if (item.issueAuditor == null) {
                            this.formData = item
                        } else {
                            arr1.push(item)
                        }
                    });
                    this.formDataList = arr1
                }
            });
        },
        // 10s刷新
        initList() {
            this.myIntervald = setInterval(() => {
                this.getTaskStatisticsd()
            }, 10000);
            console.log(this.myIntervald)
        },
        initSetInterval() {
            this.myInterval = setInterval(() => {
                this.receiveTaskd()
            }, 9000);
            this.$store.commit('MYTNTERVAL', this.myInterval)
            console.log(this.myInterval,"124")
        },
        // 查询用户信息
        getInfod() {
            getInfo().then(res => {
                this.userId = res.user.userId
            })
        },
        /**审核(根据角色)*/
        toexamine(val) {
            location.href = `${window.location.origin}/#/operate/anchorReview/middlePage`
            localStorage.setItem("userId", `${JSON.stringify(val)}`)
        },
        receivingClick() {
            console.log(this.radio, "当前状态")
            this.$store.commit('RADIO', this.radio)
            if (this.radio == 1) {
                this.initSetInterval()
                this.receiveTaskd()
                // this.$store.dispatch('receiveTaskd', { userId: this.userId,enabled: this.radio })
            } else {
                console.log("不允许", this.$store.state.myInterId)
                clearInterval(this.$store.state.myInterId);
                this.myInterval = null
                this.reload()
            }
        },
        receiveTaskd() {
            receiveTask({
                userId: this.userId,
                enabled: this.radio
            }
            ).then(res => {
                console.log("接单", res.data, res.data == '未开启任何等级权限')
                if (res.code == 200) {
                    this.getTaskStatisticsd()
                }else{
                    this.clearfn()
                }
                //  else if (res.code == 405) {
                //     clearInterval(this.timer);
                //     this.timer = setInterval(() => {
                //         this.receiveTaskd()
                //     }, 2000);
                // }
            })
        },
        clearfn() {
            clearInterval(this.timer);
            clearInterval(this.$store.state.myInterId);
            this.myInterval = null
            this.timer = null;
        },
    },
    watch: {},
    destroyed() {
        // window.clearInterval(this.myInterval);
        // window.clearInterval(this.timer);
        console.log(this.myIntervald)
        window.clearInterval(this.myIntervald);
    },
};

</script>

<style lang="scss" scoped>
#review {
    width: 100%;
    height: 100%;

    p {
        padding: 0;
        margin: 0;
    }

    .all-video {
        width: 50%;
        height: 320px;

        .all-video-figure {
            width: 300px;
            height: auto;
            text-align: center;
            padding-top: 35px;
            margin-top: 15px;

            .all-video-p1 {
                font-size: 16px;
                font-weight: 600;
                text-align: left;
            }

            figcaption {
                width: 300px;
                height: 165px;
                background: rgba(215, 215, 215, 1);
                text-align: center;
                padding-top: 35px;
                margin-top: 15px;

                .all-video-p2 {
                    margin-bottom: 15px;
                    margin-top: -20px;
                }

                .all-video-div {
                    width: 65%;
                    margin-left: 50%;
                    transform: translateX(-50%);
                    text-align: center;

                    .all-video-p3 {
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 25px;
                    }
                }


            }
        }



        .button {
            width: 300px;
            height: 75px;
            margin-top: 15px;
            background: rgba(22, 155, 213, 1);
            color: #fff;
            border: none;
            cursor: pointer; // 手指
            border-radius: 5px;
            font-size: 20px;
        }
    }

    .blLink {
        width: 120px;
        height: auto;
        position: absolute;
        top: 100px;
        right: 350px;

        p {
            margin: 10px 0;
            color: #F59A23;
        }

        a {
            font-size: 14px;
            color: rgb(119, 118, 118);
        }
    }

    .subtask-video-title {
        font-size: 18px;
        font-weight: 600;
        margin-left: 36px;
        margin-top: 50px;
    }

    .subtask {
        width: 100%;
        height: auto;
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        margin: 0;
        flex-wrap: wrap;



        .subtask-figure {
            margin-top: 0;

            .subtask-figcaption {
                width: 300px;
                height: 165px;
                background: rgba(215, 215, 215, 1);
                text-align: center;
                padding-top: 35px;
                margin-top: 15px;

                .all-video-p2 {
                    margin-bottom: 15px;
                    margin-top: -20px;
                }

                .all-video-div {
                    width: 65%;
                    margin-left: 50%;
                    transform: translateX(-50%);
                    text-align: center;

                    .all-video-p3 {
                        font-weight: 600;
                        font-size: 18px;
                        line-height: 25px;
                    }
                }
            }

            .button {
                width: 300px;
                height: 75px;
                margin-top: 15px;
                background: rgba(22, 155, 213, 1);
                color: #fff;
                border: none;
                cursor: pointer; // 手指
                border-radius: 5px;
            }
        }
    }
}
</style>