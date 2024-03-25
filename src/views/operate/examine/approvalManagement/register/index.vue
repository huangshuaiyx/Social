<template>
    <el-card class="box-card" :style="{height:`calc(100vh - ${heights})`}">
        <div class="registerbanner">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                    <el-input v-model="formInline.id" placeholder="记录ID" clearable size="mini" @keyup.enter.native="onSearch" />
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="formInline.userId" placeholder="主播ID" clearable size="mini" @keyup.enter.native="onSearch" />
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="formInline.userCode" placeholder="主播代码" clearable size="mini" @keyup.enter.native="onSearch" />
                </el-form-item>
                <el-form-item label="">
                    <el-select size="mini" clearable v-model="formInline.reviewStatus" placeholder="请选择状态">
                        <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select size="mini" clearable v-model="formInline.auditStatus" placeholder="请选一审结果">
                        <el-option label="一审通过" :value="3">一审通过</el-option>
                        <el-option label="一审不通过" :value="2">一审不通过</el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker size="mini" style="width: 240px" v-model="formInline.logonTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="审核开始时间" end-placeholder="审核结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="">
                    <el-date-picker size="mini" style="width: 240px" v-model="formInline.registerTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="注册开始时间" end-placeholder="注册结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="formInline.country" size="mini" placeholder="请输入国家代码" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="onSearch">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width: 100%" v-loading="tableLoading">
                <el-table-column prop="id" label="记录ID"> </el-table-column>
                <el-table-column prop="userId" label="主播长ID"></el-table-column>
                <el-table-column prop="userCode" label="主播代码"></el-table-column>
                <el-table-column prop="nickName" label="昵称"></el-table-column>
                <el-table-column prop="submitCount" label="提交次数"></el-table-column>
                <el-table-column prop="auditTime" label="审核时间"></el-table-column>
                <el-table-column prop="registerTime" label="注册时间"></el-table-column>
                <el-table-column prop="country" label="国家"></el-table-column>
                <el-table-column prop="agentCode" label="代理号"></el-table-column>
                <el-table-column prop="auditUserName" label="审核人员"></el-table-column>
                <el-table-column prop="face" label="头像">
                    <template slot-scope="scoped">
                        <el-image style="width: 40px; height: 40px" :src="scoped.row.face" :preview-src-list="[scoped.row.face]">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline" size="20px"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="realShot" label="自拍">
                    <template slot-scope="scoped">
                        <el-image style="width: 40px; height: 40px" :src="scoped.row.realShot" :preview-src-list="[scoped.row.realShot]">
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline" size="20px"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="greeting" label="招呼语" width="200">
                    <template slot-scope="scoped" v-if="scoped.row.greeting">
                        <span v-if="scoped.row.greeting.text">{{ scoped.row.greeting.text }}</span>
                        <div class="imgorvedio">
                            <div v-for="(item,index) in scoped.row.greeting.imageList" :key="index">
                                <el-image style="width: 40px; height: 40px" :src="item.url" :preview-src-list="[item.url]">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline" size="20px"></i>
                                    </div>
                                </el-image>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="selfIntroduction" label="关于我"></el-table-column>
                <el-table-column prop="albumList" label="相册" width="300px">
                    <template slot-scope="scoped">
                        <div class="imgorvedio imgorvediopohto">
                            <div v-for="(item,index) in scoped.row.albumList" :key="index" class="photoItem">
                                <div v-if="item.aiAuditStatus == 2" class="photoicon"><i class="el-icon-warning"></i></div>
                                <div v-if="item.auditStatus == 2 && item.aiAuditStatus !=2" class="photoiconred"><i class="el-icon-warning"></i></div>
                                <el-image style="width: 40px; height: 40px" :src="item.url" :preview-src-list="scoped.row.srcalbumList">
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline" size="20px"></i>
                                    </div>
                                </el-image>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="videoList" label="形象视频" width="200px">
                    <template slot-scope="scoped">
                        <div class="imgorvedio">
                            <div v-for="(item,index) in scoped.row.videoList" :key="index" class="photoItem">
                                <!-- <div v-if="false" class="photoicon"><i class="el-icon-warning"></i></div>
                            <div v-if="true" class="photoiconred"><i class="el-icon-warning"></i></div> -->
                                <el-popover v-if="item.url" prop="video" placement="top" trigger="hover" :close-delay="10">
                                    <video :src="item.url" width="230" height="200" controls preload></video>
                                    <div slot="reference" class="head">
                                        <video width="100" height="100" controls :src="item.url"></video>
                                    </div>
                                </el-popover>
                                <div v-if="scoped.row.auditStatus == 3">
                                    <span style="color: #385fff;" v-if="scoped.row.reviewStatus == 2  || scoped.row.reviewStatus == null">合格</span>
                                    <span style="color: #ff4949;" v-if="scoped.row.reviewStatus == 1">不合格</span>
                                    <span v-if="scoped.row.reviewStatus == 0" style="color: #ccc;">待处理</span>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="操作" width="100">
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.reviewStatus == 0">
                            <el-popconfirm title="是否将当前形象视频设置为 合格" @confirm="qualifiedNo(scoped.row,'2')">
                                <el-link v-if="scoped.row.auditStatus != 2" style="margin-right: 10px;" slot="reference" :underline="false" type="primary">合格</el-link>
                            </el-popconfirm>
                            <el-popconfirm title="是否将当前形象视频设置为 不合格" @confirm="qualifiedNo(scoped.row,'1')">
                                <el-link v-if="scoped.row.auditStatus != 2" slot="reference" :underline="false" type="danger">不合格</el-link>
                            </el-popconfirm>
                        </div>
                        <div v-if="scoped.row.aiAuditStatus != 2">
                            <el-button v-if="scoped.row.auditStatus == 3 || scoped.row.auditStatus == 2" type="primary" plain size="mini" @click="goexamineauditInfo(scoped.row)">一审详情</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="selfIntroduction" label="一审结果" width="180">
                    <template slot-scope="scoped">
                        <div v-if="scoped.row.aiAuditStatus != 2">
                            <span v-if="scoped.row.auditStatus == 3">通过</span>
                            <span v-if="scoped.row.auditStatus == 2">不通过</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div style="text-align: right;">
                <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </el-card>
</template>

<script>
import { getselectRegisterAuditListApi, isvideoReviewApi } from '@/api/operate/approvalManagement/index'
export default {
    data () {
        return {
            heights: '90px',
            tableLoading: false,
            formInline: {
                id: null,
                userId: null,
                userCode: null,
                country: null,
                reviewStatus: '0',
                auditStatus: null,
                logonTime: [],
                registerTime: []
            },
            formPage: {
                pageNum: 1,
                pageSize: 10
            },
            total: 0,
            tableData: [],
            statusList: [
                { label: "待处理", value: "0" },
                { label: "合格", value: "2" },
                { label: "不合格", value: "1" },
            ]
        }
    },
    created () {
        this.getDataList()
    },
    mounted () {
        let cardhtheight = document.querySelector('.box-card').clientHeight
        let height = document.querySelector('.demo-form-inline').clientHeight
        document.querySelector('.el-table__body-wrapper').style.height = cardhtheight - height - 99 + 'px'
    },
    methods: {
        goexamineauditInfo (row) {
            this.$router.push(
                {
                    path: "/operate/examine/auditlook",
                    query: {
                        auditId: row.id,
                        userId: row.userId,
                    }
                }
            )
        },
        onSearch () {
            this.formPage.pageNum = 1
            this.getDataList()

        },
        getDataList () {
            Object.keys(this.formInline).forEach(item => {
                if (['logonTime', 'registerTime'].includes(item) && !this.formInline[item]) {
                    this.formInline[item] = []
                } else if (!this.formInline[item] && !['logonTime', 'registerTime'].includes(item)) {
                    this.formInline[item] = null
                }
            })
            this.tableLoading = true
            let obj = JSON.parse(JSON.stringify({
                ...this.formPage,
                parmas: this.formInline
            }))
            obj.parmas.startAuditTime = obj.parmas.logonTime[0] ? obj.parmas.logonTime[0] : null
            obj.parmas.endAuditTime = obj.parmas.logonTime[1] ? obj.parmas.logonTime[1] : null
            obj.parmas.startRegisterTime = obj.parmas.registerTime[0] ? obj.parmas.registerTime[0] : null
            obj.parmas.endRegisterTime = obj.parmas.registerTime[1] ? obj.parmas.registerTime[1] : null
            delete obj.parmas.logonTime
            delete obj.parmas.registerTime
            getselectRegisterAuditListApi(obj).then(res => {
                if (res.code == 200) {
                    this.total = res.data.total
                    res.data.list.forEach(item => {
                        item.srcalbumList = []
                        if (item.albumList instanceof Array && item.albumList.length) {
                            item.albumList.forEach(it => {
                                item.srcalbumList.push(it.url)
                            })
                        }
                    })
                    this.tableData = res.data.list
                    console.log(this.tableData);
                }
            }).catch(req => {
                console.log(req);
            }).finally(() => {
                this.tableLoading = false
            })
        },
        // 操作
        qualifiedNo (row, value) {
            let obj = {
                id: row.id,
                reviewStatus: value
            }
            isvideoReviewApi(obj).then(res => {
                if (res.code == 200) {
                    this.getDataList()
                }
            }).catch(req => {
                console.log(req);
            })
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

<style lang="scss" scoped>
.registerbanner {
    ::v-deep .el-table__body-wrapper {
        overflow: auto !important;
    }
    .imgorvediopohto {
        align-items: end;
    }
    .imgorvedio {
        display: flex;
        position: relative;
        // overflow: auto;
        flex-wrap: wrap;
        .photoItem {
            position: relative;
        }
        .photoicon {
            ::v-deep .el-icon-warning:before {
                color: #95f204;
                position: absolute;
                z-index: 99;
                font-size: 20px;
                top: 50%;
                left: 50%;
                transform: translateX(-50%);
            }
        }
        .photoiconred {
            ::v-deep .el-icon-warning:before {
                color: red;
                position: absolute;
                z-index: 99;
                font-size: 20px;
                top: 50%;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
}
</style>