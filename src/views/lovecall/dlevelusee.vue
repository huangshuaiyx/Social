<template>
    <div class="dlevelusee">
        <div class="search">
            <el-input class="inp" size="mini" placeholder="请输入主播长ID或主播短ID" v-model="userCode" />
            <!-- <el-button type="primary" size="mini" @click="searchBtn">搜索</el-button> -->
            <el-button type="primary" size="mini" @click="addBtn">新增</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column prop="userCode" label="主播短ID"></el-table-column>
            <el-table-column prop="userId" label="主播长ID" width="220"></el-table-column>
            <el-table-column prop="regionCode" label="主播国家代码"></el-table-column>
            <el-table-column prop="nickName" label="主播昵称">
                <template slot-scope="scoped">
                    <span class="itemNickname" @click="goUserInfo(scoped.row)">
                        {{ scoped.row.nickName }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="agentCode" label="代理ID"></el-table-column>
            <el-table-column prop="createTime" label="操作时间"></el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scoped">
                    <el-popconfirm title="确定删除这个主播吗？" @confirm="delauthor(scoped.row)">
                        <el-link slot="reference" type="danger" :underline="false">删除</el-link>
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

import { getloveCallListApi, addLoveCallApi, removeLoveCallApi } from '@/api/anchor/index'
export default {
    data () {
        return {
            loading: false,
            tableData: [],
            userCode: '',
            formPage: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    levelCode: "D"
                }
            },
            total: 0
        }
    },

    created () {
        this.getloveCallList()
    },
    methods: {
        goUserInfo (row) {
            window.open(`${window.location.origin}/#/operate/jump/info?userId=${row.userId}&userType=2`)
        },
        getloveCallList () {
            this.loading = true
            let obj = {
                ...this.formPage,
            }
            try {
                getloveCallListApi(obj).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.list
                        this.total = res.data.total
                    } else {
                        this.$message.error(res.msg)
                    }
                }).catch(req => {
                    this.$message.error(req.msg)
                })
            } catch (error) {
                this.$message.error(error.msg)
            } finally {
                setTimeout(() => {
                    this.loading = false
                }, 500)
            }
        },
        searchBtn () {
            if (!this.userCode) return this.$message.warning('请输入主播ID！')
            this.formPage.pageNum = 1
            this.getloveCallList()
        },
        addBtn () {
            if (!this.userCode) return this.$message.warning('请输入主播ID！')
            addLoveCallApi({ userCode: this.userCode, levelCode: "D" }).then(res => {
                if (res.code == 200) {
                    this.getloveCallList()
                    this.$message.success('新增成功！')
                    this.userCode = ''
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(req => {
                this.$message.error(req.msg)
            })
        },
        delauthor (row) {
            removeLoveCallApi({ id: row.id }).then(res => {
                if (res.code == 200) {
                    this.getloveCallList()
                    this.$message.success('删除成功！')
                } else {
                    this.$message.error(res.msg)
                }
            }).catch(req => {
                this.$message.error(req.msg)
            })
        },
        // 分页
        handleSizeChange (value) {
            this.formPage.pageNum = 1
            this.formPage.pageSize = value
            this.getloveCallList()
        },
        handleCurrentChange (value) {
            this.formPage.pageNum = value
            this.getloveCallList()
        },
    }
}
</script>

<style lang="scss" scoped>
.dlevelusee {
    .search {
        display: flex;
        margin-bottom: 20px;
        .inp {
            width: 300px;
            margin-right: 20px;
        }
    }
    .itemNickname {
        color: #46a6ff;
        cursor: pointer;
    }
}
</style>