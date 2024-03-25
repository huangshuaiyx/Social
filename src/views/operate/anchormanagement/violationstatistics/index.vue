<style scoped lang="scss">
.violationstatistics {
    overflow: auto !important;
    ::v-deep .el-table__body-wrapper {
        overflow: auto !important;
    }
    .userCode {
        color: #1890ff;
    }
    .violationContentclass {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.infinite-list {
    height: 600px;
    overflow: auto;
}
</style>
<template>
    <div class="violationstatistics">
        <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">
            <el-form :model="queryParams" ref="queryForm" :inline="true">
                <el-form-item label="" prop="providerId">
                    <el-input v-model="queryParams.providerId" placeholder="主播长ID" clearable size="mini" style="width: 200px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="providerCode">
                    <el-input v-model="queryParams.providerCode" placeholder="主播短ID" clearable size="mini" style="width: 200px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="" prop="agentCode">
                    <el-input v-model="queryParams.agentCode" placeholder="代理ID" clearable size="mini" style="width: 200px" @keyup.enter.native="handleQuery" />
                </el-form-item>
                <el-form-item label="违规项" prop="violationType">
                    <el-select clearable style="width: 200px" size="mini" v-model="queryParams.violationType" placeholder="请选择状态">
                        <el-option v-for="item in auditStatusList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="违规内容" prop="violationOption">
                    <el-select clearable style="width: 200px" size="mini" v-model="queryParams.violationOption" placeholder="请选择状态">
                        <el-option v-for="item in auditStatusContentList" :key="item.key" :label="item.name" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="处理结果" prop="penaltyResult">
                    <el-select clearable style="width: 200px" size="mini" v-model="queryParams.penaltyResult" placeholder="请选择状态">
                        <el-option v-for="item in handleList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期" prop="time">
                    <el-date-picker size="mini" style="width: 240px;" v-model="queryParams.time" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="search" type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                    <!-- <el-button size="mini" @click="exportExl">导出数据</el-button> -->
                </el-form-item>
            </el-form>
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading" class="el-form">
                <el-table-column prop="providerId" label="主播长ID" width="220"> </el-table-column>
                <el-table-column prop="providerCode" label="主播短ID" width="100">
                    <template slot-scope="scoped">
                        <div @click="golink(scoped.row.providerCode,'providerCode')" class="userCode">{{ scoped.row.providerCode }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="nickName" label="昵称" width="150"></el-table-column>
                <el-table-column prop="agentCode" label="代理号"></el-table-column>
                <el-table-column prop="orderId" label="违规订单号" width="220">
                    <template slot-scope="scoped">
                        <div @click="golink(scoped.row.orderId,'orderId')" class="userCode">{{ scoped.row.orderId }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="auditTime" label="订单审核时间" width="160"></el-table-column>
                <el-table-column prop="violationType" label="违规项">
                </el-table-column>
                <el-table-column prop="violationContent" label="违规内容" width="200">
                    <template slot-scope="scoped">
                        <el-tooltip class="item" effect="dark" :content="scoped.row.violationContent" :open-delay="300" placement="top-start">
                            <div class="violationContentclass">{{ scoped.row.violationContent }}</div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="violationTotal" label="累计违规次数" width="100" align="center">
                    <template slot-scope="scoped">
                        <div>{{ scoped.row.violationTotal }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="penaltyResult" label="处理结果" align="center">
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.penaltyResult == 'freeze'">冻结</div>
                        <div v-if="scoped.row.penaltyResult == 'forbidden'">封禁</div>
                    </template>
                </el-table-column>
                <el-table-column prop="penaltyResult" label="历史封禁记录" width="120" align="center">
                    <template slot-scope="scoped">
                        <div @click="openViolationdialog(scoped.row)" class="userCode">查看</div>

                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: right;" v-if="total">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-card>
        <el-dialog title="历史封禁记录" :visible.sync="Violationdialog" width="40%" append-to-body>
            <div class="infinite-list">
                <div v-for="(x, i) in lishiList" :key="i" style="padding-top:5px">
                    <span style="margin-right:15px">{{ x.banOperationTime }}</span>|
                    操作: <span style="margin-right:15px">{{ banDone(x.banType) }}</span> |
                    原因: <span style="margin-right:15px">{{ x.banReason }}</span> |
                    操作人: <span>{{ x.createBy }}</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { selectLogList } from "@/api/operate/anchormanagement/index";
import { gettableListApi, exportXlsxApi, getOptionsConfigData } from "@/api/operate/anchorReview/reviewList/index";

import { exportExcel } from "@/utils/ruoyi"
export default {
    name: "Violationstatistics",
    data () {
        return {
            loading: false,
            Violationdialog: false,
            lishiList: [],
            heights: "84px",
            queryParams: {
                providerId: null,
                providerCode: null,
                agentCode: null,
                violationType: null,
                violationOption: null,
                penaltyResult: null,
                time: [],
            },
            formPage: {
                pageNum: 1,
                pageSize: 10,
            },
            total: 0,
            tableData: [{}],
            auditStatusList: [
                { label: '一般违规', value: 'general_violation' },
                { label: '严重违规', value: 'serious_violation' }
            ],
            auditStatusContentList: [],
            handleList: [
                { label: '冻结', value: 'freeze' },
                { label: '封禁', value: 'forbidden' }
            ]
        }
    },
    async mounted () {
        let cardhtheight = document.querySelector('.box-card').clientHeight
        let height = document.querySelector('.el-form').clientHeight
        setTimeout(async () => {
            let heightS = document.querySelector('.el-table__header-wrapper').clientHeight
            document.querySelector('.el-table__body-wrapper').style.height = cardhtheight - height - heightS - 104 + 'px'
            await getOptionsConfigData({}).then(res => {
                if (res.code == 200) {
                    let arr = []
                    res.data.generalViolationOptions.forEach(item => {
                        item.optionsItem.forEach(it => {
                            arr.push(it)
                        })
                    })
                    let arr1 = []
                    res.data.seriousViolationOptions.map(item => {
                        item.optionsItem.forEach(it => {
                            arr1.push(it)
                        })
                    })
                    this.auditStatusContentList = [...arr, ...arr1]
                }
            })
        }, 0)
        this.gettableList()
    },
    methods: {
        // 历史违规记录
        openViolationdialog (x) {
            this.Violationdialog = true
            selectLogList({
                providerUserId: x.providerId, banTypes: [1, 2]
            }).then(res => {
                this.loading = true
                if (res.code == 200) {
                    this.loading = false
                    this.lishiList = res.data
                }
            })
        },
        // 封禁冻结状态
        banDone (row) {
            switch (row) {
                case 1:
                    return "封禁";
                case 2:
                    return "冻结";
                case 3:
                    return "解封禁";
                case 4:
                    return "解冻结";

                default:
                    return "--";
            }
        },
        golink (value, type) {
            if (type == 'providerCode') {
                this.$router.push({
                    path: "/operate/provider/manager",
                    query: {
                        userCode: value
                    }
                })
            } else {
                this.$router.push({
                    path: "/operate/anchotinspection/anchotinspection",
                    query: {
                        orderId: value
                    }
                })
            }

        },
        gettableList () {
            this.loading = true
            let obj = JSON.parse(JSON.stringify({
                ...this.formPage,
                parmas: {
                    ...this.queryParams
                }
            }))
            
            Object.keys(obj.parmas).forEach(item => {
                if (!obj.parmas[item] && item != 'time') {
                    obj.parmas[item] = null
                } else if (item == 'time' && !obj.parmas[item]) {
                    obj.parmas[item] = []
                }
            })
            obj.parmas.startAuditTime = obj.parmas.time[0] ? obj.parmas.time[0] : null
            obj.parmas.endAuditTime = obj.parmas.time[1] ? obj.parmas.time[1] : null
            delete  obj.parmas.time
            gettableListApi(obj).then(res => {
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
        handleQuery () {
            this.formPage.pageNum = 1
            this.gettableList()
        },
        resetQuery () {
            this.queryParams = {
                providerId: null,
                providerCode: null,
                violationType: null,
                agentCode: null,
                violationOption: null,
                penaltyResult: null,
                time: []
            }
            this.formPage = {
                pageNum: 1,
                pageSize: 10,
            }
        },
        exportExl () {
            let obj = { ...this.formPage, parmas: { ...this.queryParams } }
            exportXlsxApi(obj).then(res => {
                exportExcel(res, `违规统计`);
            })

        },
        handleCurrentChange (val) {
            this.formPage.pageNum = val
            this.gettableList()
        },
        handleSizeChange (val) {
            this.formPage.pageNum = 1
            this.formPage.pageSize = val
            this.gettableList()
        }
    }
}
</script>
