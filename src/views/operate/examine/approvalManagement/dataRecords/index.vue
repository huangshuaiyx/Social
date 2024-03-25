<template>
    <div class="dataRecords">
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
                <el-select size="mini" clearable v-model="formInline.type" placeholder="请选择类型">
                    <el-option v-for="item in typestatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-select size="mini" clearable v-model="formInline.reviewStatus" placeholder="请选择视频状态">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            <el-table-column prop="country" label="国家代码"></el-table-column>
            <el-table-column prop="nickName" label="昵称"></el-table-column>
            <el-table-column prop="auditTime" label="审核时间"></el-table-column>
            <el-table-column prop="submitTime" label="提交时间"></el-table-column>
            <el-table-column prop="agentCode" label="代理号"></el-table-column>
            <el-table-column prop="auditUserName" label="审核人员"></el-table-column>
            <el-table-column prop="address" label="类型">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.type | typeFilter }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="修改前" width="200">
                <!-- 判断是否是图片消息     -->
                <template slot-scope="scoped">
                    <el-popover placement="top-start" v-if="scoped.row.type == 1 || scoped.row.type == 5 || scoped.row.type == 8" :open-delay="300" width="200" trigger="hover" :content="scoped.row.beforeValue">
                        <div class="itemText" slot="reference">
                            <span>{{ scoped.row.beforeValue }}</span>
                        </div>
                    </el-popover>
                    <div class="demo-image__preview" v-if="scoped.row.type == 2 || scoped.row.type == 3">
                        <el-image style="width: 40px; height: 40px" :src="scoped.row.beforeValue" :preview-src-list="[scoped.row.beforeValue]">
                        </el-image>
                    </div>
                    <div class="demo-image__preview" v-if="scoped.row.type == 6">
                        <el-image style="width: 40px; height: 40px" :src="scoped.row.beforeValue" :preview-src-list="[scoped.row.beforeValue]">
                            <div slot="error" class="image-slot">
                                <!-- <i class="el-icon-picture-outline" style="line-height: 50px;"></i> -->
                                --
                            </div>
                        </el-image>
                    </div>
                    <div class="demo-image__preview">
                        <el-popover prop="video" v-if="scoped.row.type == 4" placement="top" trigger="hover" :close-delay="10">
                            <video :src="scoped.row.beforeValue" width="230" height="200" controls preload></video>
                            <div slot="reference" class="head">
                                <video width="100" height="100" controls :src="scoped.row.beforeValue"></video>
                            </div>
                        </el-popover>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="修改后" width="200">
                <!-- 判断是否是图片消息     -->
                <template slot-scope="scoped">
                    <el-popover placement="top-start" v-if="scoped.row.type == 1 || scoped.row.type == 5 || scoped.row.type == 8" :open-delay="300" width="200" trigger="hover" :content="scoped.row.afterValue">
                        <div class="itemText" slot="reference">
                            {{ scoped.row.afterValue }}</div>
                    </el-popover>
                    <div class="demo-image__preview" v-if="scoped.row.type == 2 || scoped.row.type == 3">
                        <el-image style="width: 40px; height: 40px" :src="scoped.row.afterValue" :preview-src-list="[scoped.row.afterValue]">
                            <div slot="error" class="image-slot">
                                --
                            </div>
                        </el-image>
                    </div>
                    <div class="demo-image__preview" v-if="scoped.row.type == 6">
                        <el-image style="width: 40px; height: 40px" :src="scoped.row.afterValue" :preview-src-list="[scoped.row.afterValue]">
                            <div slot="error" class="image-slot">
                                --
                            </div>
                        </el-image>
                    </div>
                    <div class="demo-image__preview" v-if="scoped.row.type == 4">
                        <el-popover prop="video" v-if="scoped.row.type == 4" placement="top" trigger="hover" :close-delay="10">
                            <video :src="scoped.row.afterValue" width="230" height="200" controls preload></video>
                            <div slot="reference" class="head">
                                <video width="100" height="100" controls :src="scoped.row.afterValue"></video>
                            </div>
                        </el-popover>
                        <div v-else>--</div>
                        <span style="color: #385fff;" v-if="scoped.row.reviewStatus == 2 || scoped.row.reviewStatus == null">合格</span>
                        <span style="color: #ff4949;" v-if="scoped.row.reviewStatus == 1">不合格</span>
                        <span v-if="scoped.row.reviewStatus == 0" style="color: #ccc;">待处理</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scoped" v-if="scoped.row.reviewStatus == 0 && scoped.row.type == 4">
                    <el-popconfirm title="是否将当前形象视频设置为 合格" @confirm="qualifiedNo(scoped.row,'2')">
                        <el-link style="margin-right: 10px;" slot="reference" :underline="false" type="primary">合格</el-link>
                    </el-popconfirm>
                    <el-popconfirm title="是否将当前形象视频设置为 不合格" @confirm="qualifiedNo(scoped.row,'1')">
                        <el-link slot="reference" :underline="false" type="danger">不合格</el-link>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align: right;">
            <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getselectAuditListApi, isvideoReviewApi } from '@/api/operate/approvalManagement/index'
export default {
    filters: {
        typeFilter (val) {
            if (!val) return '--'
            if (val == 1) return '昵称'
            if (val == 2) return '头像'
            if (val == 3) return '海报'
            if (val == 4) return '视频'
            if (val == 5) return '自我介绍'
            if (val == 6) return '相册'
            if (val == 7) return '主播自拍照'
            if (val == 8) return '招呼语'
        }
    },
    data () {
        return {
            tableLoading: false,
            formInline: {
                id: null,
                country: null,
                userId: null,
                userCode: null,
                type: null,
                reviewStatus: '0',
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
            ],
            typestatusList: [
                { label: "昵称", value: "1" },
                { label: "头像", value: "2" },
                { label: "海报", value: "3" },
                { label: "视频", value: "4" },
                { label: "自我介绍", value: "5" },
                { label: "相册", value: "6" },
                { label: "主播自拍", value: "7" },
                { label: "招呼语", value: "8" },

            ]
        }
    },
    created () {
        this.getDataList()
    },
    methods: {
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
            getselectAuditListApi(obj).then(res => {
                if (res.code == 200) {
                    console.log(res.data);
                    this.tableData = res.data.list
                    this.total = res.data.total
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
.dataRecords {
    padding: 20px;
    .itemText {
        overflow: hidden;
        text-overflow: ellipsis;
        // 只要超过宽度就换行，不论中文还是英文
        word-break: break-all;
        //最多展示两行
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
}
</style>