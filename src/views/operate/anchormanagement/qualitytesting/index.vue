<template>
    <div id="toBeReviewed">
        <div id="toBeReviewed-top">
            <div class="toBeReviewed-top-left">
                <div class="toBeReviewed-img">
                    <p>主播头像</p>
                    <el-image :src="userIbfo.face" :preview-src-list="[userIbfo.face]" fit="contain" class="imgas"
                        style="margin-left: 10px; width: 150px; height: 200px" />
                </div>
                <div class="toBeReviewed-img">
                    <p>真人认证</p>
                    <el-image :src="userIbfo.realShot" :preview-src-list="[userIbfo.realShot]" fit="contain"
                        class="imgas" style="margin-left: 10px; width: 150px; height: 200px" />
                </div>
                <div>
                    <p>主播资料：</p>
                    <p>主播长ID： {{ providerInfod.providerId }}</p>
                    <p>主播短ID： {{ providerInfod.providerCode }}</p>
                    <p>总订单数： {{ userIbfo.totalOrders }}</p>
                    <p>最近30单平均时长： {{ userIbfo.last30AvgDuration }}</p>
                </div>

            </div>
            <div class="toBeReviewed-top-right">
                <div class="gradeT" v-if="userIbfo.totalScoreLevelCode == 'T'">
                    <img src="../../../../assets/images/smile.jpg" alt="" >
                    主播等级：T
                    <span v-if="userIbfo.levelSource">({{ userIbfo.levelSource  }})</span>
                </div>
                <div class="orthdergrade" v-else>
                    <div class="gradelabel">
                        <div class="lable">{{ userIbfo.totalScoreLevelCode }}</div>
                    </div>
                    <div>主播等级：{{ userIbfo.totalScoreLevelCode }}
                        <span v-if="userIbfo.levelSource">({{ userIbfo.levelSource  }})</span>
                    </div>
                </div>
                <!-- <p>历史封禁、冻结记录</p>
                <div class="infinite-list">
                    <div v-for="(x, i) in historyList" :key="i">
                        <span style="margin-right:15px">{{ x.banOperationTime }}</span> |
                        操作: <span style="margin-right:15px">{{ banDone(x.banType) }}</span> |
                        原因: <span style="margin-right:15px">{{ x.banReason }}</span> |
                        操作人: <span>{{ x.createBy }}</span>
                    </div>
                </div> -->

                <!-- <img @click="collect(1)" v-if="collectShow == 0" src="../../../../assets/images/shouc.png" alt="">
                <img @click="collect(0)" v-else src="../../../../assets/images/shoucang.png" alt="" />
                <p v-if="collectShow == 0">点击加入为优秀视频</p>
                <p v-else>已收藏为优秀视频</p> -->
            </div>
            <div class="toBeReviewed-top-right">
                <p>视频标签:</p>
                <p class="selectActive" @click="frequency(0)" v-if="frequencyShow == 0">黑频</p>
                <p class="p" @click="frequency(1)" v-else>黑频</p>
            </div>
            <div class="toBeReviewed-top-right">
                <div>国家:</div>
                <div>{{ userIbfo.country }}</div>
            </div>
        </div>
        <div id="toBeReviewed-center">
            <div class="toBeReviewed-center-div1">
                <video v-if="providerInfod.videoFileUrl" controls="true" autoplay loop width="370" height="590"
                    class="fill" :src="providerInfod.videoFileUrl"></video>
                <img v-else style="width:370px; height:590px" src="../../../../assets/404_images/true.jpg" alt="">
                <div v-show="offSwitch" class="mengceng"></div>
                <!-- <button disabled>{{ userIbfo.userStatus == 2 ? '已封禁' : '封禁' }}</button> -->
                <!-- <button disabled>{{ userIbfo.userStatus == 4 ? `已冻结: ${userIbfo.banPeriod}` : '冻结' -->
                <!-- }}</button> -->
                <el-switch v-model="offSwitch" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>

            </div>
            <div class="toBeReviewed-center-div2">
                <div class="div2-options">
                    <!-- 主观项 -->
                    <!-- <figure>
                        <p class="div2-options-p" style="font-weight: 600;">*主观项（必填）</p>
                        <figcaption>
                            <div v-for="(x, i) in hardpower" :key="i">
                                <p class="p1">{{ x.topicName }}</p>
                                <p :class="q.type == true ? 'selectActive': q.status == true ? 'selectAc' : 'p'"
                                    v-for="(q, w) in x.optionsItem" :key="w" @click="selectItem(x, q, i, w)">{{ q.name
                                    }}</p>
                            </div>
                        </figcaption>
                    </figure> -->
                    <!-- 客观项（必填） -->
                    <figure style="margin: 10px 0px;">
                        <p class="div2-options-p" style="font-weight: 600;">*客观项（必填）</p>
                        <figcaption>
                            <div v-for="(x, i) in softpower" :key="i">
                                <p class="p1">{{ x.topicName }}</p>
                                <p :class="q.type == true ? 'selectActive': q.status == true ? 'selectAc' : 'p'"
                                    v-for="(q, w) in x.optionsItem" :key="w" @click="softselect(x, q, i, w)">{{ q.name
                                    }}</p>
                            </div>
                        </figcaption>
                    </figure>
                    <!-- 一般违规： -->
                    <figure style="margin: 10px 0px;">
                        <p class="div2-options-p" style="font-weight: 600;">一般违规：</p>
                        <figcaption>
                            <div v-for="(x, i) in violation" :key="i">
                                <p class="p1">{{ x.topicName }}</p>
                                <p :class="q.type ? 'selectActive' : 'p'" v-for="(q, w) in x.optionsItem" :key="w"
                                    @click="violationClick(x, q, i, w)">{{ q.name }}</p>
                            </div>
                        </figcaption>
                    </figure>
                    <!-- 严重违规： -->
                    <figure style="margin: 10px 0px;">
                        <p class="div2-options-p" style="font-weight: 600;">严重违规：</p>
                        <figcaption>
                            <div v-for="(x, i) in serious" :key="i">
                                <p class="p1">{{ x.topicName }}</p>
                                <p :class="q.type ? 'selectActive' : 'p'" v-for="(q, w) in x.optionsItem" :key="w"
                                    @click="seriousClick(x, q, i, w)">{{ q.name }}</p>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div class="div2-buttonsubmit">
                    <div @click="nextClick()">
                        确认修改
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import index from "./index.js";

export default index;
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>