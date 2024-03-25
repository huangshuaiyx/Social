
<style scoped lang="scss">
.coinshistory {
    ::v-deep .el-table__body-wrapper {
        overflow: auto !important;
    }
    .userCode {
        color: #1890ff;
    }
}
</style>
<template>
    <div class="coinshistory">
        <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">
            <el-form :model="queryParams" ref="queryForm" :inline="true">
                <el-form-item label="" prop="walletId">
                    <el-input v-model="queryParams.parmas.walletId" placeholder="钱包ID" clearable size="mini" style="width: 240px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="userCode">
                    <el-input v-model="queryParams.parmas.userCode" placeholder="主播短ID" clearable size="mini" style="width: 240px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="operatorUserName">
                    <el-input v-model="queryParams.parmas.operatorUserName" placeholder="请输入操作人账号" clearable size="mini" style="width: 240px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="userCode">
                    <el-select placeholder="请选择金币增减" size="mini" v-model="queryParams.parmas.flowFlag" clearable>
                        <el-option label="金币增加" value="1"></el-option>
                        <el-option label="金币减少" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作创建时间" prop="logoTime">
                    <el-date-picker size="mini" style="width: 240px" v-model="queryParams.parmas.logoTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="起始时间" end-placeholder="结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <div class="btn">
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                        <!-- <el-button size="mini" @click="exportExl">导出</el-button> -->
                    </div>
                </el-form-item>
            </el-form>
            <el-table v-loading="loading" :data="tableData">
                <el-table-column label="钱包ID" align="center" prop="walletId" />
                <el-table-column label="主播短ID" align="center" prop="userCode">
                    <template slot-scope="scoped">
                        <div @click="golink(scoped.row.userCode)" class="userCode">{{ scoped.row.userCode }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="主播昵称" align="center" prop="nickName" />
                <el-table-column label="操作创建时间" align="center" width="200px" prop="tradeTime" />
                <el-table-column label="操作人" align="center" prop="operatorUserName" />
                <el-table-column label="备注" align="center" prop="title" width="200" />
                <el-table-column label="变动数量" align="center" prop="tradeAmount" >
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.flowFlag == 1">+{{ scoped.row.tradeAmount }}</div>
                        <div v-if="scoped.row.flowFlag == 2">-{{ scoped.row.tradeAmount }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作前的总余额" align="center" prop="walletPreBalance" />
                <el-table-column label="操作后的总余额" align="center" prop="walletBalance" />
            </el-table>
            <div style="text-align: right;">
                <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
import { providerBillListListApi, exportXlsxApi } from '@/api/operate/user/manager/manager'
import { exportExcel } from "@/utils/ruoyi" 

export default {
    name: "Coinshistory",
    data () {
        return {
            heights: '84px',
            loading: false,
            tableData: [],
            total: 0,
            formPage: {
                pageNum: 1,
                pageSize: 10,
            },
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userCode: null,
                    walletId: null,
                    operatorUserName: null,
                    flowFlag: null,
                    logoTime: []

                }
            },
        }
    },
    created () {
        this.gethistoryList()
    },
    mounted () {
        let cardhtheight = document.querySelector('.box-card').clientHeight
        let height = document.querySelector('.el-form').clientHeight
        document.querySelector('.el-table__body-wrapper').style.height = cardhtheight - height - 99 + 'px'
    },
    methods: {
        golink (value) {
            this.$router.push({
                path: "/operate/provider/manager",
                query: {
                    userCode: value
                }
            })
        },
        handleQuery () {
            this.formPage.pageNum = 1
            this.gethistoryList()
        },
        gethistoryList () {
            this.loading = true
            Object.keys(this.queryParams.parmas).forEach(item => {
                if (['logoTime',].includes(item) && !this.queryParams.parmas[item]) {
                    this.queryParams.parmas[item] = []
                } else if (!this.queryParams.parmas[item] && !['logoTime',].includes(item)) {
                    this.queryParams.parmas[item] = null
                }
            })
            let obj = {
                ...this.queryParams,
                ...this.formPage
            }
            obj.parmas.tradeStartTime = obj.parmas.logoTime[0] ? obj.parmas.logoTime[0] : null
            obj.parmas.tradeEndTime = obj.parmas.logoTime[1] ? obj.parmas.logoTime[1] : null
            providerBillListListApi(obj).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.list
                    this.total = res.data.total
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.loading = false
            })
        },
        resetQuery () {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userCode: null,
                    walletId: null,
                    operatorUserName: null,
                    flowFlag: null,
                    logoTime: []

                }
            }
            this.gethistoryList()
        },
        exportExl () {
            let obj = { ...this.formPage, ...this.queryParams }
            obj.parmas.startRegTime = obj.parmas.logoTime[0] ? obj.parmas.logoTime[0] : null
            obj.parmas.endRegTime = obj.parmas.logoTime[1] ? obj.parmas.logoTime[1] : null
            exportXlsxApi(obj).then(res => {
                exportExcel(res, `金币操作历史`);
            })

        },
        handleCurrentChange (val) {
            this.formPage.pageNum = val
            this.gethistoryList()
        },
        handleSizeChange (val) {
            this.formPage.pageNum = 1
            this.formPage.pageSize = val
            this.gethistoryList()
        }
    }
}
</script>
