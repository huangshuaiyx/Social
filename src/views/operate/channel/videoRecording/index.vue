<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
            <el-form-item label="主播长id" prop="providerUserId">
                <el-input v-model="queryParams.parmas.providerId" placeholder="请输入主播长ID" clearable size="mini"
                    style="width: 240px;margin-right:20px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="主播短id" prop="providerCode">
                <el-input v-model="queryParams.parmas.providerCode" placeholder="请输入主播短ID" clearable size="mini"
                    style="width: 240px;margin-right:20px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="用户id" prop="providerUserId">
                <el-input v-model="queryParams.parmas.userId" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px;margin-right:20px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="订单id" prop="providerUserId">
                <el-input v-model="queryParams.parmas.orderId" placeholder="请输入参数名称" clearable size="mini"
                    style="width: 240px;margin-right:20px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="代理号" prop="providerAgent">
                <el-input v-model="queryParams.parmas.providerAgent" placeholder="请输入代理号" clearable size="mini"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="" prop="">
                <el-date-picker size="mini" style="width: 260px;" v-model="time" type="daterange" range-separator="~" start-placeholder="开始日期"
                    end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="timeChang(time)">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Love Call" prop="">
                <el-checkbox @change="selfSupportChange" :false-label="0" :true-label="1" v-model="queryParams.parmas.onlyLoveCall">仅查看Love Call通话</el-checkbox>
            </el-form-item>
            <el-form-item>
                <div class="">
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    <el-button type="primary" icon="el-icon-download" size="mini" @click="exportData">导出</el-button>
                </div>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="用户id" align="center" prop="userId" />
            <el-table-column label="主播长id" align="center" prop="providerId" />
            <el-table-column label="主播短id" align="center" prop="providerCode" />
            <el-table-column label="昵称" align="center" prop="providerNickname" />
            <!-- <el-table-column label="邀请码" align="center" prop="providerAgent" /> -->
            <el-table-column label="订单id" align="center" prop="orderId" />
            <el-table-column label="代理号" align="center" prop="providerAgent" />
            <el-table-column label="时长(s)" align="center" prop="duration" />
            <el-table-column label="总时长(s)" align="center" prop="totalDuration" />
            <el-table-column label="录制开始时间" align="center" prop="startTime" />
            <el-table-column label="url" align="center" prop="" width="150">
                <template slot-scope="scope">
                    <p v-for="(x, i) in scope.row.files " :key="i" @click="tiaozhuan(x.fileUrl)"
                        style="cursor:pointer; color:#1890ff">{{ x.fileName }}</p>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getUserInfoByPageAndParams" />
    </div>
</template>
<script>
import { recordingPage, recordingexcel } from '@/api/operate/user/manager/manager'
import { exportExcel, parseTime } from "../../../../utils/ruoyi"
export default {
    name: 'Manager',
    data() {
        return {
            // 遮罩层
            loading: false,
            // 导出遮罩层
            exportLoading: false,
            // 显示搜索条件
            showSearch: true,
            // 总条数
            total: 0,
            // 参数表格数据
            umsInfos: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    orderId:null,
                    providerAgent:null,
                    onlyLoveCall: 0,
                    providerId: null,
                    providerCode: null,
                    startTime: null,
                    endTime: null
                }
            },
            // 表单参数
            form: {},
            userTypeOptions: [
                { value: 0, label: '正常' },
                { value: 1, label: '冻结' }
            ],
            userStatusOptions: [
                { value: 1, label: '正常' },
                { value: 2, label: '禁用' },
                { value: 3, label: '注销' }
            ],
            fileList: [],
            file: [],
            time: []
        }
    },
    created() {
        this.queryParams.parmas.providerId = this.$route.query.id ? this.$route.query.id : null
        this.getUserInfoByPageAndParams()

    },
    methods: {
        /** 查询用户信息 */
        getUserInfoByPageAndParams() {
            this.loading = true
            Object.keys(this.queryParams.parmas).forEach(item => {
            if (!this.queryParams.parmas[item] && item != 'onlyLoveCall') {
                this.queryParams.parmas[item] = null
            }
        })
            recordingPage(this.queryParams).then(response => {
                this.umsInfos = response.data.list
                this.total = response.data.total
                this.loading = false
            }
            )
        },
        // 表单重置
        reset() {
            this.resetForm('form')
        },
        selfSupportChange() {
            this.handleQuery()
        },
        /** 搜索按钮操作 */
        handleQuery() {
            console.log(this.queryParams.parmas.providerId, this.time, "阿松大")
            if (this.queryParams.parmas.providerId != "") {
                this.queryParams.pageNum = 1
                this.queryParams.pageSize = 10
                this.getUserInfoByPageAndParams()
            } else {
                this.queryParams.pageNum = 1
                this.queryParams.pageSize = 10
                this.queryParams.parmas.providerId = null
                this.getUserInfoByPageAndParams()
            }

        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    orderId: null,
                    providerAgent: null,
                    onlyLoveCall: 0,
                    providerId: null,
                    providerCode: null,
                    startTime: null,
                    endTime: null
                },
            }
            this.time = []
            this.getUserInfoByPageAndParams()
        },
        //导出
        exportData() {
            recordingexcel(this.queryParams).then(res => {
                exportExcel(res, `视频录制`);
            })
        },

        /**跳转url */
        tiaozhuan(val) {
            window.open(val)
        },
        /**时间的确定 */
        timeChang(val) {
            if (val != null) {
                this.queryParams.parmas.startTime = `${this.time[0]} 00:00:00`;
                this.queryParams.parmas.endTime = `${this.time[1]} 23:59:59`;
                this.getUserInfoByPageAndParams();
            } else {
                this.queryParams.pageNum = 1;
                this.queryParams.pageSize = 10;
                this.queryParams.parmas.startTime = null;
                this.queryParams.parmas.endTime = null;
                this.getUserInfoByPageAndParams();
            }

        },
    },
}
</script>


<style lang="scss" scoped>
.qiangxing {
    width: auto;
    display: flex;
    line-height: 36px;
    height: 36px;
    margin-left: 10px;

    .upload-demo {
        margin: 0 10px;
        height: 35px;
        line-height: 35px;

        .pan-btn {
            padding: 10px 13px;
            border-radius: 4px;
        }
    }

}
</style>