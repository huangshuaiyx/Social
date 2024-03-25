
<style lang="scss" scoped>
.stateList {
    padding: 20px;
    .search {
        display: flex;
        margin-bottom: 20px;
        .inp {
            width: 220px;
            margin-right: 10px;
        }
        .codeinp {
            width: 150px;
            margin-right: 10px;
        }
        .selectleve {
            width: 150px !important;
            margin-right: 10px;
        }
    }
    .userImg {
        width: 100px;
        height: 100px;
    }
    .nickName {
        border-bottom: 1px solid #1890ff;
        cursor: pointer;
        color: #1890ff;
    }
}
</style>
<template>
    <div class="stateList">
        <div class="search">
            <el-input class="inp" clearable size="mini" placeholder="主播长ID" v-model="formPage.parmas.providerId" />
            <el-input class="codeinp" clearable size="mini" placeholder="主播短ID" v-model="formPage.parmas.userCode" />
            <el-input class="codeinp" clearable size="mini" placeholder="代理号" v-model="formPage.parmas.agents" />
            <el-input class="codeinp" clearable size="mini" placeholder="国家" v-model="formPage.parmas.regionCode" />

            <el-select clearable style="width: 220px" size="mini" v-model="formPage.parmas.scoreLevelCode" placeholder="请选择主播最新评分等级">
                <el-option v-for="item in scoreLevelCodeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <!-- <el-input class="inp" size="mini" placeholder="在线状态" v-model="formPage.parmas.onlineState" /> -->
            <el-select class="selectleve" clearable style="width: 120px" size="mini" v-model="formPage.parmas.onlineState" placeholder="请选择在线状态">
                <el-option v-for="item in onlineStateList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-select class="selectleve" clearable style="width: 120px" size="mini" v-model="formPage.parmas.bizId" placeholder="请选择在线阶段">
                <el-option v-for="item in subsidyList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="searchBtn">搜索</el-button>
            <!-- <el-button type="primary" size="mini" @click="search">搜索</el-button> -->
        </div>
        <el-table :data="tableData" style="width: 100%" v-loading="loading">
            <el-table-column align="center" prop="providerId" label="主播长ID" width="220"></el-table-column>
            <el-table-column align="center" prop="userCode" label="主播短ID" width="100"></el-table-column>
            <el-table-column align="center" prop="nickName" label="主播昵称">
                <template slot-scope="scoped">
                    <span class="nickName" @click="goUserInfo( scoped.row)">{{ scoped.row.nickName }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="regionCode" label="主播国家" width="80"></el-table-column>
            <el-table-column align="center" prop="bizId" label="在线状态" :formatter='statusType'></el-table-column>
            <el-table-column align="center" prop="face" label="主播头像">
                <template slot-scope="scoped">
                    <el-image class="userImg" :src="scoped.row.face" :preview-src-list="authorImgList"></el-image>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="levelCode" label="主播等级" width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.levelCode }}</span>
                    <span v-if="scope.row.levelSource  ">({{ scope.row.levelSource  }})</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="agents" label="代理号" width="80"></el-table-column>
            <el-table-column align="center" prop="scoreLevelCode" label="主播最新评分等级"></el-table-column>
            <el-table-column align="center" prop="lastOnlineTime" label="最后在线时间" width="220"></el-table-column>
            <!-- <el-table-column prop="agentCode" label="代理ID"></el-table-column> -->
        </el-table>
        <div style="text-align: right;">
            <el-pagination v-show="tableData.length > 0" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formPage.pageNum" :page-sizes="[10, 20, 30, 50]" :page-size="formPage.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
import { getQueryString } from "../../../../utils/index"
import { getStateListForOperateApi } from '@/api/operate/user/manager/manager'
export default {
    data () {
        return {
            loading: false,
            tableData: [],
            authorImgList:[], // 表格图片集合
            userCode: '',
            formPage: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    providerId: null,
                    userCode: null,
                    bizId: null,
                    levelCode: null,
                    scoreLevelCode: null,
                    onlineState: null,
                    agents: null,
                },
            },
            total: 0,
            subsidyList: [
                { label: '绿1', value: "green1" },
                { label: '绿2', value: "green2" },
                { label: '绿3', value: "green3" },
                { label: '黄1', value: "yellow1" },
                { label: '黄2', value: "yellow2" },
                { label: '黄3', value: "yellow3" },
                { label: '红1', value: "red1" },
                { label: '红2', value: "red2" },
                { label: '红3', value: "red3" },
                { label: '红4', value: "red4" },
            ],
            onlineStateList: [
                { label: '在线', value: "online" },
                { label: '离线', value: "offline" },
            ],
            scoreLevelCodeList: [
                { label: 'A', value: "A" },
                { label: 'B', value: "B" },
                { label: 'C', value: "C" },
                { label: 'D', value: "D" },
                { label: 'E', value: "E" },
                { label: 'F', value: "F" },
            ],
        }
    },

    created () {
        this.formPage.parmas.onlineState = getQueryString('onlineState') ? getQueryString('onlineState') : null
        this.formPage.parmas.scoreLevelCode = getQueryString('scoreLevelCode') ? getQueryString('scoreLevelCode') : null
        this.getloveCallList()
    },
    methods: {
        goUserInfo (row) {
            window.open(`${window.location.origin}/#/operate/jump/info?userId=${row.providerId}&userType=2`)
        },
        // 状态转文字
        statusType (val) {
            switch (val.bizId) {
                case 'green1':
                    return <span style="color:green">绿1</span>;
                case 'green2':
                    return <span style="color:green">绿2</span>;
                case 'green3':
                    return <span style="color:green">绿3</span>;
                case 'yellow1':
                    return <span style="color:#b5b500">黄1</span>;
                case 'yellow2':
                    return <span style="color:#b5b500">黄2</span>;
                case 'yellow3':
                    return <span style="color:#b5b500">黄3</span>;
                case 'red1':
                    return <span style="color:red">红1</span>;
                case 'red2':
                    return <span style="color:red">红2</span>;
                case 'red3':
                    return <span style="color:red">红3</span>;
                case 'red4':
                    return <span style="color:red">红4</span>;
                default:
                    return "--";
            }

        },
        getloveCallList () {
            this.loading = true
            let obj = {
                ...this.formPage,
            }
            Object.keys(obj.parmas).forEach(item => {
                if (!obj.parmas[item]) {
                    obj.parmas[item] = null
                }
            })
            try {
                getStateListForOperateApi(obj).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.list
                        this.authorImgList = []
                        res.data.list.forEach(item => {
                            this.authorImgList.push(item.face)
                        })
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
            this.formPage.pageNum = 1
            this.getloveCallList()
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
