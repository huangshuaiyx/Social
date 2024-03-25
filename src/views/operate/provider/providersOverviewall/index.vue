<template>
    <div class="providersOverviewall">
        <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">
            <el-form :model="queryParams" ref="queryForm" :inline="true">
                <el-form-item label="" prop="userId">
                    <el-input v-model="queryParams.userId" placeholder="主播ID" clearable size="mini" style="width: 240px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="userCode">
                    <el-input v-model="queryParams.userCode" placeholder="主播短ID" clearable size="mini" style="width: 240px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="nickName">
                    <el-input v-model="queryParams.nickName" placeholder="昵称" clearable size="mini" style="width: 260px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="agentCode">
                    <el-input v-model="queryParams.agentCode" placeholder="代理号" clearable size="mini" style="width: 260px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="status">
                    <el-select clearable size="mini" v-model="queryParams.userStatus" placeholder="请选择状态">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="status">
                    <el-select clearable size="mini" v-model="queryParams.auditStatus" placeholder="请选择审核状态">
                        <el-option v-for="item in carefulOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="status">
                    <el-select clearable size="mini" v-model="queryParams.levelCode" placeholder="请选择等级">
                        <el-option v-for="item in gradeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="status">
                    <el-select clearable size="mini" v-model="queryParams.marketStatus" placeholder="请选择营销状态">
                        <el-option v-for="item in marketeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="status">
                    <el-select clearable size="mini" v-model="queryParams.incentivesStatus" placeholder="请选择补贴状态">
                        <el-option v-for="item in subsidyOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="logoTime">
                    <el-date-picker size="mini" style="width: 240px" v-model="queryParams.logoTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="注册开始时间" end-placeholder="注册结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="search" type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    <el-button size="mini" @click="exportExl">导出数据</el-button>
                </el-form-item>
            </el-form>
            <div class="userTable">
                <el-table :data="tableData" style="width: 100%" v-loading="loading">
                    <el-table-column prop="userId" label="主播ID" width="180" align="center"> </el-table-column>
                    <el-table-column prop="userCode" label="主播短ID" width="180" align="center"> </el-table-column>
                    <el-table-column align="center" prop="nickName" label="昵称"> </el-table-column>
                    <el-table-column align="center" prop="face" label="头像">
                        <template slot-scope="scoped">
                            <el-image style="width: 100px; height:100px" :src="scoped.row.face" :preview-src-list="[scoped.row.face]">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline" size="20px"></i>
                                </div>
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="videoTotal" label="视频资料数" width="180"> </el-table-column>
                    <el-table-column align="center" prop="photoTotal" label="图片资料数" width="180"> </el-table-column>
                    <el-table-column align="center" prop="greeting" label="打招呼" width="180"> </el-table-column>
                    <el-table-column align="center" prop="selfIntroduction" label="自我介绍" width="180"> </el-table-column>
                    <el-table-column align="center" prop="regIp" label="注册IP" width="180">
                        <template slot-scope="scoped">
                            <span>{{ scoped.row.regIp }} {{ (scoped.row.regIpCountryCode) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="auditStatus" label="主播认证状态" width="180">
                        <template slot-scope="scoped">
                            <span>{{ scoped.row.auditStatus | authenticationFilter }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="agentCode" label="代理ID" width="180"> </el-table-column>
                    <el-table-column align="center" prop="agentName" label="代理名称" width="180"> </el-table-column>
                    <el-table-column align="center" prop="regTime" label="注册时间" width="180"> </el-table-column>
                    <el-table-column align="center" prop="lastLoginIp" label="最后一次登录IP" width="180">
                        <template slot-scope="scoped">
                            <span>{{ scoped.row.lastLoginIp }} {{ (scoped.row.lastIpCountryCode) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="lastLoginTime" label="最近登入时间" width="180"> </el-table-column>
                    <el-table-column align="center" prop="levelCode" label="主播等级" width="180">
                        <template slot-scope="scoped">
                            <span>{{ scoped.row.levelCode }}</span>
                            <span v-if="scoped.row.levelSource  ">({{ scoped.row.levelSource  }})</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="regCountry" label="主播国家" width="180"> </el-table-column>
                    <el-table-column align="center" prop="lastTimeZone" label="设备时区" width="180"> </el-table-column>
                    <el-table-column align="center" prop="lastLanguage" label="设备语言" width="180"> </el-table-column>
                    <el-table-column align="center" prop="appId" label="产品渠道" width="180"> </el-table-column>
                    <el-table-column align="center" prop="lastAppVersion" label="客户端版本" width="180"> </el-table-column>
                    <el-table-column align="center" prop="lastOsVersion" label="系统版本" width="180"> </el-table-column>
                    <el-table-column align="center" prop="lastModel" label="手机型号" width="180"> </el-table-column>
                </el-table>
                <div style="text-align: right;">
                    <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getprovidersDataApi, exportXlsxApi } from '@/api/operate/approvalManagement/index'
import { exportExcel } from "@/utils/ruoyi"
export default {
    filters: {
        authenticationFilter (val) {
            if (val == 1) return '认证中'
            if (val == 2) return '未认证'
            if (val == 3) return '已认证'
        }
    },
    data () {
        return {
            heights: "90px",
            queryParams: {
                userId: null,
                userCode: null,
                nickName: null,
                agentCode: null,
                userStatus: null,
                auditStatus: null,
                levelCode: null,
                marketStatus: null,
                incentivesStatus: null,
                logoTime: []
            },
            loading: false,
            tableData: [],
            formPage: {
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            statusOptions: [
                { label: '正常', value: "1" },
                { label: '封禁', value: "2" },
                { label: '冻结', value: "4" },
                { label: '禁用', value: "5" }
            ],
            carefulOptions: [
                // { value: 1, label: '审核中' },
                { value: 2, label: '审核失败' },
                { value: 3, label: '审核成功' },
            ],
            gradeOptions: [
                { value: 'S', label: "S", },
                { value: 'A', label: "A", },
                { value: 'B', label: "B", },
                { value: 'C', label: "C", },
                { value: 'D', label: "D", },
                { value: 'E', label: "E", },
                { value: 'F', label: "F", },
                { value: 'T', label: "T", },

            ],
            marketeOptions: [
                { label: '否', value: "0" },
                { label: '是', value: "1" },
            ],
            subsidyOptions: [
                { label: '否', value: "0" },
                { label: '是', value: "1" },
            ]
        }
    },
    created () {
        this.getprovidersData()
    },
    mounted () {
        let cardhtheight = document.querySelector('.box-card').clientHeight
        let height = document.querySelector('.el-form').clientHeight
        document.querySelector('.el-table__body-wrapper').style.height = cardhtheight - height - 104 + 'px'
    },
    methods: {
        getprovidersData () {
            this.loading = true
            Object.keys(this.queryParams).forEach(item => {
                if (['logoTime'].includes(item) && !this.queryParams[item]) {
                    this.queryParams[item] = []
                } else if (!this.queryParams[item] && !['logoTime'].includes(item)) {
                    this.queryParams[item] = null
                }
            })
            let obj = { ...this.formPage, parmas: { ...this.queryParams } }
            obj.parmas.startRegTime = obj.parmas.logoTime[0] ? obj.parmas.logoTime[0] : null
            obj.parmas.endRegTime = obj.parmas.logoTime[1] ? obj.parmas.logoTime[1] : null
            getprovidersDataApi(obj).then(res => {
                if (res.code == 200) {
                    let list = JSON.parse(JSON.stringify(res.data.list))
                    let arr = []
                    list.forEach(item => {
                        arr.push({ ...item, ...item.loginInfo })
                    })
                    arr.forEach(item => {
                        delete item.loginInfo
                    })
                    this.tableData = arr
                    this.total = res.data.total
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.loading = false
            })
        },
        handleQuery () {
            this.formPage.pageNum = 1
            this.getprovidersData()
        },
        resetQuery () {
            Object.keys(this.queryParams).forEach(item => {
                if (item == 'logoTime') {
                    this.queryParams[item] = []
                } else {
                    this.queryParams[item] = null
                }
            })
        },
        exportExl () {
            let obj = { ...this.formPage, parmas: { ...this.queryParams } }
            obj.parmas.startRegTime = obj.parmas.logoTime[0] ? obj.parmas.logoTime[0] : null
            obj.parmas.endRegTime = obj.parmas.logoTime[1] ? obj.parmas.logoTime[1] : null
            exportXlsxApi(obj).then(res => {
                exportExcel(res, `服务者信息总览`);
            })

        },
        handleCurrentChange (val) {
            this.formPage.pageNum = val
            this.getprovidersData()
        },
        handleSizeChange (val) {
            this.formPage.pageNum = 1
            this.formPage.pageSize = val
            this.getprovidersData()
        }
    }
}
</script>

<style scoped lang="scss">
.providersOverviewall {
    ::v-deep .el-table__body-wrapper {
        overflow: auto !important;
    }
}
</style>