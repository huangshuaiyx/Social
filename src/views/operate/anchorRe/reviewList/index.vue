<template>
    <div id="review">
        <!-- 所有任务审核 -->
        <div class="all-video">
            <figure class="all-video-figure">
                <p class="all-video-p1">审查入口</p>
                <figcaption>
                    <p class="all-video-p2">所有审核任务</p>
                    <div class="all-video-div">
                        <p class="all-video-p3">{{ formData.toAuditTotal }} 审核的视频</p>
                        <p class="all-video-p4">包括 {{ formData.toAuditNewProviderTotal }} 个新主播视频</p>
                    </div>
                </figcaption>
                <button class="button" @click="toexamine(formData.director)">审查</button>
            </figure>
        </div>
        <!--  BI快速链接-->
        <div class="blLink" v-hasRole="['admin', 'common', 'test', 'operate']">
            <p>BI快速链接</p>
            <a href="">最近日期平均分</a>
        </div>

        <!-- 分任务审核 -->
        <p class="subtask-video-title">分任务的内容审核入口</p>
        <div class="subtask">
            <figure class="subtask-figure" v-for="(x, i) in formDataList">
                <figcaption class="subtask-figcaption">
                    <p class="all-video-p2">{{ x.director == -1 ? "Unknown's" : x.directorName }} review task</p>
                    <div class="all-video-div">
                        <p class="all-video-p3">{{ x.toAuditTotal }} 审核的视频</p>
                        <p class="all-video-p4">包含 {{ x.toAuditNewProviderTotal }} 个新主播视频</p>
                    </div>
                </figcaption>
                <button class="button" @click="toexamine(x.director)">审查</button>
            </figure>
        </div>
    </div>
</template>

<script>
import { auditTaskStatistics } from "@/api/operate/anchorReview/reviewList/index";

export default {
    components: {

    },
    data() {
        return {
            formData: {},
            formDataList: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    agents: null,
                    auditStatus: 2,
                },
            },
        };
    },
    created() {
        this.initList()
    },
    mounted() {
        auditTaskStatistics({}).then((res) => {
            console.log(res)
            if (res.code == 200) {
                let arr = res.data
                let arr1 = []
                arr.forEach(item => {
                    if (item.director == 0) {
                        this.formData = item
                    } else {
                        arr1.push(item)
                    }
                });
                this.formDataList = arr1
                console.log(this.formDataList)
            }
        });
    },
    methods: {
        // 10s刷新
        initList() {
            this.myInterval = setInterval(() => {
                auditTaskStatistics({}).then((res) => {
                    console.log(res)
                    if (res.code == 200) {
                        let arr = res.data
                        let arr1 = []
                        arr.forEach(item => {
                            if (item.director == 0) {
                                this.formData = item
                            } else {
                                arr1.push(item)
                            }
                        });
                        this.formDataList = arr1
                        console.log(this.formDataList)
                    }
                });
            }, 10000);
        },
        /**审核(根据角色)*/
        toexamine(val) {
            console.log(val, this.$route)
            window.location.href = `${window.location.origin}/#/operate/anchorReview/toBeReviewedvideo?director=${val}`
        },

    },
    watch: {

    },

    destroyed() {
        clearInterval(this.myInterval);
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
                font-size: 18px;
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

                .all-video-p3 {
                    margin-top: 25px;
                    font-weight: 600;
                    font-size: 20px;
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

                .all-video-p3 {
                    margin-top: 25px;
                    font-weight: 600;
                    font-size: 20px;
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