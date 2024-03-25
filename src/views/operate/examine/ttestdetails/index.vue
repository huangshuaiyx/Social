<style lang="scss" scoped>
.ttestdetails {
    .avatarimg {
        width: 60px;
        height: 60px;
    }
    .selectW {
        width: 170px;
    }
    .pickerW {
        width: 225px;
    }
    ::v-deep .el-table__body-wrapper {
        overflow-y: auto !important;
    }
    .operate {
        display: flex;
        justify-content: space-around;
    }
    .hoverlink {
        color: #45a6ff;
        border-bottom: 1px solid #45a6ff;
    }
    .ellink {
        border-bottom: 1px solid #45a6ff;
    }
    .ellinkN {
        border-bottom: 1px solid #d9001b;
    }
    ::v-deep .el-dialog__wrapper {
        height: 500px;
        overflow-y: auto !important;
    }
}
</style>
<template>
    <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">

        <div class="ttestdetails">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="formInline.userId" placeholder="Host id" clearable size="mini" @keyup.enter.native="onSearch" />
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="formInline.userCode" placeholder="请输入用户短Id" clearable size="mini" @keyup.enter.native="onSearch" />
                </el-form-item>
                <el-form-item label="">
                    <el-select class="selectW" size="mini" clearable v-model="formInline.assessStatus" placeholder="请选择入驻质检视频状态">
                        <el-option label="通过" :value="2">通过</el-option>
                        <el-option label="不通过" :value="3">不通过</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select class="selectW" size="mini" clearable v-model="formInline.reviewStatus" placeholder="请选择主播复审状态">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker class="pickerW" clearable size="mini" v-model="formInline.logonTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="测试开始时间" end-placeholder="测试结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker class="pickerW" clearable size="mini" v-model="formInline.registerTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="复审开始时间" end-placeholder="复审结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="onSearch">Search</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'Testtimes', order: 'descending'}" v-loading="loading">
                <el-table-column prop="userId" label="Hosts code" width="220"></el-table-column>
                <el-table-column prop="userCode" label="Hosts ID" width="100"></el-table-column>
                <el-table-column prop="nickName" label="Nickname" width="100">
                    <template slot-scope="scoped">
                        <span class="hoverlink" @click="goUserInfo(scoped.row)">{{ scoped.row.nickName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="assessStartTs" label="Testtimes" sortable width="160"></el-table-column>
                <el-table-column prop="assessCount" label="Number of matchs" width="140"></el-table-column>
                <el-table-column prop="face" label="Avatar" width="100">
                    <template slot-scope="scoped">
                        <el-image class="avatarimg" :src="scoped.row.face" :preview-src-list="[scoped.row.face]"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="assessStatus" label="Host status" width="220">
                    <template slot-scope="scoped">
                        <div>
                            <span v-if="scoped.row.assessStatus">{{ scoped.row.assessStatus | assessStatusFliter}}</span>
                            <span v-if="scoped.row.assessStatus == 3">{{ scoped.row.remark }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="Operate" label="Operate" width="120">
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.reviewStatus || scoped.row.reviewStatus == 0">
                            <div v-if="scoped.row.reviewStatus == 0">
                                <template>
                                    <div class="operate">
                                        <el-popconfirm @confirm="passclick(scoped.row)" title="确定将该主播设置为通过吗">
                                            <el-link class="ellink" :underline="false" slot="reference" type="primary">Pass</el-link>
                                        </el-popconfirm>

                                        <el-popconfirm style="margin-left: 5px;" @confirm="failedclick(scoped.row)" title="确定将该主播设置为不通过吗">
                                            <el-link class="ellinkN" :underline="false" style="color: #d9001b;" slot="reference" type="primary">Failed</el-link>
                                        </el-popconfirm>
                                    </div>

                                </template>
                            </div>
                            <div v-if="scoped.row.reviewStatus == 1" style="color: #d9001b;">N</div>
                            <div v-if="scoped.row.reviewStatus == 2" style="color: #46a6ff;">Y</div>
                        </div>
                        <div v-else>无需操作</div>
                    </template>
                </el-table-column>
                <el-table-column prop="reviewTime" label="Operating time" width="220"></el-table-column>
                <el-table-column prop="name" label="More">
                    <template slot-scope="scoped">
                        <span class="hoverlink" @click="govediorecord(scoped.row)">Video Record</span>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: right;">
                <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
            <!-- more 上传的视频 -->
            <el-dialog title="视频记录" :visible="dialogVisible" width="90%" :before-close="handleClose">
                <div>
                    <div v-for="(it,index) in vedioList.list" :key="index">
                        <div v-for="(x, i) in it.files " style="cursor:pointer; color:#1890ff; margin-bottom: 20px;">
                            <div :key="x.id">
                                <video width="100%" height="230" controls :src="x.fileUrl"></video>
                            </div>
                        </div>
                    </div>

                </div>
            </el-dialog>

        </div>
    </el-card>
</template>

<script>
import { getListForReviewApi, submitReviewApi } from '@/api/operate/examine/anchor/anchor'
import { recordingPage, } from '@/api/operate/user/manager/manager'
export default {
    filters: {
        assessStatusFliter (value) {
            if (value == 2) return 'Test passed:考核通过'
            if (value == 3) return 'Test failed:考核失败'
        }
    },
    data () {
        return {
            dialogVisible: false,
            loading: false,
            heights: '86px',
            formPage: {
                pageSize: 10,
                pageNum: 1,
            },
            total: 0,
            vedioList: {},
            formInline: {
                reviewStatus: 0,
                assessStatus: null,
                userId: null,
                userCode: null,
                logonTime: [],
                registerTime: [],
            },
            tableData: [],
            statusList: [
                { label: "待复审", value: 0 },
                { label: "通过", value: 2 },
                { label: "不通过", value: 1 },
            ]
        }
    },
    watch: {
        formInline: {
            handler (newV, oldV) {
                if (!newV.logonTime) {
                    newV.logonTime = []
                }
                if (!newV.registerTime) {
                    newV.registerTime = []
                }
            },
            deep: true
        }
    },
    created () {
        this.getDataList()
    },
    mounted () {
        let cardhtheight = document.querySelector('.box-card').clientHeight
        let height = document.querySelector('.demo-form-inline').clientHeight
        document.querySelector('.el-table__body-wrapper').style.height = cardhtheight - height - 102 + 'px'
    },
    methods: {
        getDataList () {
            this.loading = true
            try {
                let obj = {
                    ...this.formPage,
                    parmas: {
                        ...this.formInline
                    }
                }
                Object.keys(obj.parmas).forEach(item => {
                    if ('reviewStatus' == item && obj.parmas['reviewStatus'] === '') {
                        obj.parmas['reviewStatus'] = null
                    } else if (['assessStatus', 'userId', 'userCode'].includes(item) && !obj.parmas[item]) {
                        obj.parmas[item] = null
                    } else if (['logonTime', 'registerTime'].includes(item) && !obj.parmas[item].length) {
                        obj.parmas[item] = []
                    }
                })
                obj.parmas.assessStartTimeGe = obj.parmas.logonTime[0] ? obj.parmas.logonTime[0] : null
                obj.parmas.assessStartTimeLe = obj.parmas.logonTime[1] ? obj.parmas.logonTime[1] : null
                obj.parmas.reviewTimeGe = obj.parmas.registerTime[0] ? obj.parmas.registerTime[0] : null
                obj.parmas.reviewTimeLe = obj.parmas.registerTime[1] ? obj.parmas.registerTime[1] : null
                getListForReviewApi(obj).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.list
                        this.total = res.data.total
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            } catch (error) {
                this.$message.error(error.msg);
            } finally {
                this.loading = false
            }
        },
        handleClose () {
            this.dialogVisible = false
        },
        onSearch () {
            this.formPage.pageNum = 1
            this.getDataList()
        },
        goUserInfo (row) {
            window.open(`${window.location.origin}/#/operate/jump/info?userId=${row.userId}&userType=2`)
        },
        failedclick (row) {
            let obj = {
                id: row.id,
                reviewStatus: 1
            }
            submitReviewApi(obj).then(res => {
                if (res.code == 200) {
                    this.$message.success('提交成功')
                    this.getDataList()
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        passclick (row) {
            let obj = {
                id: row.id,
                reviewStatus: 2
            }
            submitReviewApi(obj).then(res => {
                if (res.code == 200) {
                    this.$message.success('提交成功')
                    this.getDataList()
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        govediorecord (row) {
            // var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            // // 判断是否为手机  
            // if (/Mobi/i.test(userAgent)) {
               
            // } else {
            //     document.querySelector('.el-dialog__wrapper').style.height = '800px'
            // }
            var system = {};
            system.pingtai = /(Win32|Win16|WinCE|Mac68K|MacIntel|MacIntel|MacPPC|Linux mips64)/i.test(navigator.platform);
            if (system.pingtai) {
                //电脑
                document.querySelector('.el-dialog__wrapper').style.height = '800px'
            }
            let obj = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    providerId: row.userId,
                    orderId: null,
                    providerAgent: null,
                    userId: null,
                    providerCode: null,
                    startTime: null,
                    endTime: null,
                    onlyLoveCall: 0,
                }
            }
            recordingPage(obj).then(res => {
                if (res.code == 200) {
                    this.vedioList = res.data
                    console.log(this.vedioList);
                    this.dialogVisible = true
                } else {
                    this.$message.error(res.msg);
                }
            })
            // this.$router.push({
            //     path: "/operate/channel/videoRecording",
            //     query: {
            //         id: row.userId
            //     }
            // })
        },
        // 分页
        handleSizeChange (value) {
            this.formPage.pageNum = 1
            this.formPage.pageSize = value
            this.getDataList()
        },
        handleCurrentChange (value) {
            this.formPage.pageNum = value
            this.getDataList()
        },
    }
}
</script>

