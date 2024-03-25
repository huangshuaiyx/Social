

<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="主播ID" prop="providerId">
                <el-input v-model="queryParams.providerId" placeholder="主播长ID" clearable size="small"
                    style="width: 240px" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="refresh">刷新</el-button>
            </el-form-item>
        </el-form>
        <div class="messageCarrier" ref="messagrScoll" @scroll="divScroll" v-loading="messagrLoading">
            <div class="single" v-for="(r, t) of formData" :key="t" v-if="r.contents.length > 0">
                <p class="operationDetails" @click="jumpdetalis(r,t)">详情操作</p>
                <div v-for="(x, i) in r.contents" :key="i">
                    <div class="message-left" v-show="x.senderType == 2">
                        <p class="message-left-name"><span>{{ x.nickName }}</span><i v-show="fangjianLogo(x) == 'video'" class="el-icon-s-home"></i></p>
                        <p class="message-left-time"><span>{{ x.sendTime }}</span> <span v-show="carryGold(x) != null"><img
                                    src="../../../../assets/images/quantity.png" alt="">+{{carryGold(x)}}</span>
                        </p>
                        <div class="message-left-test" v-if="x.messageType == 'TEXT'">
                            {{messageProcessing(x)}}
                        </div>
                        <p v-if="x.messageType == 'CUSTOM'" class="message-left-test">{{messageProcessing(x)}}</p>
                        <el-image :src="messageProcessing(x)" :preview-src-list="[messageProcessing(x)]" fit="contain"
                            class="imgas" style=" width: 50px; height: 50px" v-if="x.messageType == 'PICTURE'" />
                        <!-- <video v-show="x.messageType == 'VIDEO'" :src="messageProcessing(x)"></video> -->
                    </div>
                    <div class="message-right" v-show="x.senderType == 1">
                        <p class="message-right-name"><i v-show="fangjianLogo(x) == 'video'" class="el-icon-s-home"></i><span>{{ x.nickName }}</span></p>
                        <div class="message-right-test" v-show="x.messageType == 'TEXT'">
                            {{messageProcessing(x)}}
                        </div>
                        <p v-show="x.messageType == 'CUSTOM'" class="message-right-test">{{messageProcessing(x)}}</p>
                        <el-image :src="messageProcessing(x)" :preview-src-list="[messageProcessing(x)]" fit="contain"
                            class="imgas" style=" width: 50px; height: 50px" v-show="x.messageType == 'PICTURE'" />
                            <!-- <video v-show="x.messageType == 'VIDEO'" :src="messageProcessing(x)"></video> -->
                    </div>
                </div>

            </div>
            <p v-show="noMore" class="no-more">没有数据</p>
            <p v-show="loading" class="loading"><i class="el-icon-loading"></i></p>
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