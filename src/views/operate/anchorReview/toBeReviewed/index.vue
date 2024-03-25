<template>

    <div id="toBeReviewed" v-loading="loading">
        <div id="toBeReviewed-top">
            <div class="toBeReviewed-top-left">
                <div class="toBeReviewed-img">
                    <div class="item">头像</div>
                    <el-image :src="userIbfo.face" :preview-src-list="[userIbfo.face]" fit="contain" class="imgas" style="margin-left: 10px; width: 50px;" />
                </div>
                <div class="toBeReviewed-img">
                    <div class="item">真人认证</div>
                    <el-image :src="userIbfo.realShot" :preview-src-list="[userIbfo.realShot]" fit="contain" class="imgas" style="margin-left: 10px; width: 50px;">
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                    </el-image>
                </div>
                <div class="userInfo">
                    <div class="">主播资料:</div>
                    <div class="topInfo">
                        <div>主播长ID: {{ userIbfo.providerId }}</div>
                        <div class="item">主播短ID： {{ userIbfo.providerCode }}</div>
                    </div>
                    <div>总订单数: {{ userIbfo.totalOrders }}</div>
                    <div class="item">最近30单平均时长： {{ userIbfo.last30AvgDuration }}</div>
                </div>

            </div>
            <div class="toBeReviewed-top-right">
                <div class="gradeT" v-if="userIbfo.totalScoreLevelCode == 'T'">
                    <img src="../../../../assets/images/smile.jpg" alt="">
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
                <!-- <p>History removed, restricted record</p> -->
                <!-- <div class="infinite-list">
                    <div v-for="(x, i) in historyList" :key="i">
                        <span style="margin-right:15px">{{ x.banOperationTime }}</span> |
                        operation: <span style="margin-right:15px">{{ banDone(x.banType) }}</span> |
                        Reason: <span style="margin-right:15px">{{ x.banReason }}</span> |
                        Operator: <span>{{ x.createBy }}</span>
                    </div>
                </div> -->
                <!-- <img @click="collect(1)" v-if="collectShow == 0" src="../../../../assets/images/shouc.png" alt="">
                <img @click="collect(0)" v-else src="../../../../assets/images/shoucang.png" alt="" />
                <p v-if="collectShow == 0">点击加入为优秀视频</p>
                <p v-else>已收藏为优秀视频</p> -->
            </div>
            <div class="toBeReviewed-top-right">
                <div>视频标签:</div>
                <div class="selectActive" @click="frequency(0)" v-if="frequencyShow == 0">黑频</div>
                <div class="p" @click="frequency(1)" v-else>黑频</div>
            </div>
            <div class="toBeReviewed-top-right">
                <div>国家:</div>
                <div>{{ userIbfo.country }}</div>
            </div>
        </div>
        <div id="toBeReviewed-center">
            <div class="toBeReviewed-center-div1">
                <video v-if="addData.videoFileUrl" controls="true" autoplay loop width="370" height="590" class="fill" :src="addData.videoFileUrl"></video>
                <img v-else style="width:370px; height:590px" src="../../../../assets/404_images/true.jpg" alt="">
                <div v-show="offSwitch" class="mengceng"></div>
                <!-- <button @click="openMatching = true" :disabled="providerInfo.userStatus == 2">{{ providerInfo.userStatus
                        == 2 ? 'Remove' : 'Remove'
                }}</button>
                <button @click="banReasonShow = true" :disabled="providerInfo.userStatus == 4">{{
                        providerInfo.userStatus == 4 ? `Restricted: ${providerInfo.banPeriod}`
                            : 'Restricted'
                }}</button> -->
                <el-switch v-model="offSwitch" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </div>
            <div class="toBeReviewed-center-div2">
                <div class="div2-options">
                    <div class="cancleBn" @click="deselectAll">取消全部选中</div>
                    <!-- 主观项 -->
                    <!-- <figure>
                        <p class="div2-options-p" style="font-weight: 600;">*主观项（必填）</p>
                        <figcaption>
                            <div v-for="(x, i) in hardpower" :key="i">
                                <p class="p1">{{ x.topicName }}</p>
                                <p :class="q.type ? 'selectActive' : 'p'" v-for="(q, w) in x.optionsItem" :key="w"
                                    @click="selectItem(x, q, i, w)">{{ q.name }}</p>
                            </div>
                        </figcaption>
                    </figure> -->
                    <!-- 客观项（必填） -->
                    <figure style="margin: 5px 0px;">
                        <div class="div2-options-p" style="font-weight: 600;">*客观项（必填）</div>
                        <figcaption>
                            <div v-for="(x, i) in softpower" :key="i">
                                <div class="p1">{{ x.topicName }}</div>
                                <div :class="q.type ? 'selectActive' : 'p'" v-for="(q, w) in x.optionsItem" :key="w" @click="softselect(x, q, i, w)">{{ q.name }}</div>
                            </div>
                        </figcaption>
                    </figure>
                    <!-- 一般违规： -->
                    <figure style="margin: 5px 0px;">
                        <div class="div2-options-p" style="font-weight: 600;">一般违规(选填)：</div>
                        <figcaption>
                            <div v-for="(x, i) in violation" :key="i">
                                <div class="p1">{{ x.topicName }}</div>
                                <div :class="q.type ? 'selectActive' : 'p'" v-for="(q, w) in x.optionsItem" :key="w" @click="violationClick(x, q, i, w)">{{ q.name }}</div>
                            </div>
                        </figcaption>
                    </figure>
                    <!-- 严重违规： -->
                    <figure style="margin: 5px 0px;">
                        <div class="div2-options-p" style="font-weight: 600;">严重违规(选填)：</div>
                        <figcaption>
                            <div v-for="(x, i) in serious" :key="i">
                                <div class="p1">{{ x.topicName }}</div>
                                <div :class="q.type ? 'selectActive' : 'p'" v-for="(q, w) in x.optionsItem" :key="w" @click="seriousClick(x, q, i, w)">{{ q.name }}</div>
                            </div>
                        </figcaption>
                    </figure>
                    <!-- <figure>
                        <p class="div2-options-p" style="font-weight: 600;">Violated label in sample：</p>
                        <figcaption>

                            <div>
                                <el-checkbox-group v-model="checkboxGroup" @change="handleCheckedCitiesChange"
                                    style="display: inline;">
                                    <el-checkbox-button v-for="city in cities" :label="city" :key="city"
                                        style="margin-right: 20px;margin-top:10px">{{ city }}
                                    </el-checkbox-button>
                                </el-checkbox-group>
                            </div>
                        </figcaption>
                    </figure> -->
                </div>
                <div class="rightBtn">
                    <div class="rightBtn-button">
                        <div @click="nextClick()" style="margin-bottom: 10px;">
                            下一个
                        </div>
                        <div style="background-color: skyblue;" @click="nextClick('over')">
                            审核结束
                        </div>
                        <p v-for="(x, i) in InconformityData" :key="i" @click="unsuited(x)">不适合审核：{{ x }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 封禁 -->
        <!-- <el-dialog title="Forever removed operation" :visible.sync="openMatching" width="20%" append-to-body>
            <el-radio-group v-model="goliveStatus">
                <el-radio style="width:100%;margin-top:20px" :label="x.dictValue" v-for="(x, i) in banData" :key="i">
                    {{ x.dictLabel }}</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitMatching">Confirm</el-button>
                <el-button @click="openMatching = false">Cancel</el-button>
            </div>
        </el-dialog> -->
        <!-- 冻结 -->
        <!-- <el-dialog title="Restricted operation" :visible.sync="banReasonShow" width="20%" append-to-body>
            <el-radio-group v-model="banReasonTime">
                <p>Frozen period</p>
                <el-radio style="width:100%;margin-top:20px" :label="x.dictLabel" v-for="(x, i) in frozenTimeData"
                    :key="i" @change="banRadio(x)">
                    {{ x.dictLabel }}</el-radio>
            </el-radio-group>
            <hr />
            <p>Restricted Reason</p>
            <el-radio-group v-model="banReason">
                <el-radio style="width:100%;margin-top:20px" :label="x.dictValue" v-for="(x, i) in frozenData" :key="i">
                    {{ x.dictLabel }}</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="reasonMatching">Confirm</el-button>
                <el-button @click="banReasonShow = false">Cancel</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import index from "./index.js";

export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>