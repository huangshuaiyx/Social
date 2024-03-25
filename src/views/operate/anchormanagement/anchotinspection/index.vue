<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true">
            <el-form-item label="主播短ID" prop="providerCode">
                <el-input v-model="queryParams.parmas.providerCode" placeholder="请输入主播短ID" clearable size="mini" style="width: 200px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="审核员ID" prop="auditUserName">
                <el-input v-model="queryParams.parmas.auditUserName" placeholder="请输入审核员ID" clearable size="mini" style="width: 200px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="订单ID" prop="orderId">
                <el-input v-model="queryParams.parmas.orderId" placeholder="请输入订单ID" clearable size="mini" style="width: 200px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <!-- @change="changeSelese(queryParams.parmas.auditStatus)" -->
            <el-form-item label="质检状态" prop="auditStatus">
                <el-select v-model="queryParams.parmas.auditStatus" placeholder="请选择类型" size="mini" style="width: 150px">
                    <el-option v-for="dict in typeOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <!-- @change="changeSelese(queryParams.parmas.auditStatus)" -->
            <el-form-item label="违规内容" prop="violationOption">
                <el-select v-model="queryParams.parmas.violationOption" placeholder="请选择违规内容" size="mini" style="width: 150px" clearable>
                    <el-option v-for="dict in violationList" :key="dict.key" :label="dict.name" :value="dict.key" />
                </el-select>
            </el-form-item>
            <el-form-item label="录制时间" prop="statTime">
                <el-date-picker clearable style="width: 240px" size="mini" v-model="queryParams.parmas.statTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="录制开始时间" end-placeholder="录制结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="审核时间" prop="logTime">
                <el-date-picker clearable size="mini" style="width: 240px" v-model="queryParams.parmas.logTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="审核开始时间" end-placeholder="审核结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <div class="anchorvideo"  v-loading="loading">
            <div class="each" v-for="(x, i) in auditProviderList" :key="i">
                <p style="text-align: center;">主播头像</p>
                <img v-if="x.providerInfo != null" :src="x.providerInfo.face" alt="">
                <p v-if="x.providerInfo != null">主播昵称： {{ x.providerInfo.nickName }}</p>
                <p v-if="x.providerInfo != null">主播短ID： {{ x.providerInfo.providerCode }}</p>
                <p>订单ID： {{ x.orderId }}</p>
                <p style="text-align: center;">
                    服务视频
                </p>
                <video v-if="x.videoFileUrl" controls="true" :src="x.videoFileUrl"></video>
                <img v-else src="@/assets/404_images/true.jpg" alt="">
                <div style="display: flex;" v-for="(x, i) in x.subjectiveOptions" :key="i">
                    <p class="p">{{ ergcf(x.topicCode) }}
                    </p>
                    <!-- <p class="p" v-for="(c, q) in arrsdf" :key="q">{{ x.topicCode == c.topicCode ? `${c.topicName}` : ''
                    }}
                    </p> -->
                    <p :class="x.options == 'tag_audit_subjective1_2' ? 'zhong' : x.options == 'tag_audit_subjective1_1' ? 'hao' : 'cha'">
                        {{ ruans(x.options) }}</p>
                </div>
                <div v-if="x.unfitReason">{{ x.unfitReason }}</div>
                <div>违规内容：</div>
                <div class="violationcontent">
                    <div class="item" v-for="(item ,index) in x.violationList" :key="index">{{ item }}</div>
                </div>
                <div v-if="x.violationList.length == 0" style="text-align: center;">无</div>
                <p v-if="x.providerInfo != null">总时长 (s)：{{ x.totalDuration }}</p>
                <p v-if="x.providerInfo != null">主播等级：{{ x.providerInfo.totalScoreLevelCode }} <span v-if="x.providerInfo.levelSource">({{ x.providerInfo.levelSource }})</span></p>
                <p v-if="x.providerInfo != null">主播积分：{{ x.providerInfo.totalScore }}</p>
                <p v-if="x.providerInfo != null">主播总订单: {{ x.providerInfo.totalOrders }}</p>
                <p v-if="x.providerInfo != null">审核时间： {{ x.auditTime }}</p>
                <p v-if="x.providerInfo != null">操作员： {{ x.auditorName }} </p>
                <p style="margin-bottom: 60px;" v-if="x.providerInfo != null">主播状态：{{ auditProviderListType(x.providerInfo.userStatus) }}</p>
                <div class="setdg">
                    <div class="but" @click="liShi(x)">
                        <div style="display: flex;">历史封禁记录<div v-if="x.providerInfo != null">({{ x.providerInfo.banCount ? x.providerInfo.banCount : 0 }})</div></div>
                        <!-- <p v-if="x.providerInfo != null">({{ x.providerInfo.banCount ? x.providerInfo.banCount : 0 }})
                        </p> -->
                    </div>
                    <div class="zhij" @click="edit(x)" v-show="queryParams.parmas.auditStatus != 0">质检修改</div>
                </div>

            </div>
        </div>

        <el-dialog title="历史封禁记录" :visible.sync="banReasonShow" width="40%" append-to-body>
            <div class="infinite-list">
                <div v-for="(x, i) in lishiList" :key="i" style="padding-top:5px">
                    <span style="margin-right:15px">{{ x.banOperationTime }}</span>|
                    操作: <span style="margin-right:15px">{{ banDone(x.banType) }}</span> |
                    原因: <span style="margin-right:15px">{{ x.banReason }}</span> |
                    操作人: <span>{{ x.createBy }}</span>
                </div>
            </div>
        </el-dialog>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="pageList" :page-sizes="[6]" />

        <!-- <el-pagination v-show="total > 0" background layout="total, sizes, prev, pager, next, jumper" :current-page="queryParams.pageNum"
            :page-size="6" :total="total" :page-sizes="[6]"
            @current-change="handlePageChange" /> -->

    </div>
</template>
<script>
import index from "./index.js";

export default index;
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>