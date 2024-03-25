<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px"
            label-position="left">
            <el-form-item label="主播ID" prop="userId" label-width="150">
                <el-input @clear="clearnchange('userId')" v-model="queryParams.parmas.userId" placeholder="请输入参数名称"
                    clearable size="mini" style="width: 210px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="主播短ID" prop="userCode" label-width="150">
                <el-input @clear="clearnchange('userCode')" v-model="queryParams.parmas.userCode" placeholder="请输入参数名称"
                    clearable size="mini" style="width: 150px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickName" label-width="150">
                <el-input @clear="clearnchange('nickName')" v-model="queryParams.parmas.nickName" placeholder="请输入参数名称"
                    clearable size="mini" style="width: 150px" @keyup.enter.native="handleQuery" />
            </el-form-item>
            <!-- <el-form-item label="状态" prop="userStatus" label-width="150">
               <el-select clearable  style="width: 150px"  size="mini" v-model="queryParams.parmas.userStatus" placeholder="请选择状态">
                 <el-option
                   v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            </el-form-item> -->
            <el-form-item label="等级" prop="levelCode" label-width="150">
                <el-select @clear="clearnchange('levelCode')" clearable style="width: 150px" size="mini"
                    v-model="queryParams.parmas.levelCode" placeholder="请选择等级状态">
                    <el-option v-for="item in gradeList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="营销状态" prop="marketStatus" label-width="150">
                <el-select @clear="clearnchange('marketStatus')" clearable style="width: 150px" size="mini"
                    v-model="queryParams.parmas.marketStatus" placeholder="请选择营销状态">
                    <el-option v-for="item in marketList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="补贴状态" prop="incentivesStatus" label-width="150">
                <el-select clearable @clear="clearnchange('incentivesStatus')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.incentivesStatus" placeholder="请选择补贴状态">
                    <el-option v-for="item in subsidyList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="私密照片数量下限" prop="selfPhotoTotalMin" label-width="150">
                <el-input @clear="clearnchange('selfPhotoTotalMin')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.selfPhotoTotalMin" placeholder="私密照片数量下限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="私密照片数量上限" prop="selfPhotoTotalMax" label-width="150">
                <el-input @clear="clearnchange('selfPhotoTotalMax')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.selfPhotoTotalMax" placeholder="私密照片数量上限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="A类营销视频数量下限" prop="marketVideoTotalMin" label-width="150">
                <el-input @clear="clearnchange('marketVideoTotalMin')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.marketVideoTotalMin" placeholder="营销视频数量下限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="A类营销视频数量上限" prop="marketVideoTotalMax" label-width="150">
                <el-input @clear="clearnchange('marketVideoTotalMax')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.marketVideoTotalMax" placeholder="营销视频数量上限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="B类营销视频数量下限" prop="marketVideoBTypeTotalMin" label-width="150">
                <el-input @clear="clearnchange('marketVideoBTypeTotalMin')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.marketVideoBTypeTotalMin" placeholder="营销视频数量下限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="B类营销视频数量上限" prop="marketVideoBTypeTotalMax" label-width="150">
                <el-input @clear="clearnchange('marketVideoBTypeTotalMax')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.marketVideoBTypeTotalMax" placeholder="营销视频数量上限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="私密视频数量下限" prop="selfVideoTotalMin" label-width="150">
                <el-input @clear="clearnchange('selfVideoTotalMin')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.selfVideoTotalMin" placeholder="营销视频数量下限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="私密视频数量上限" prop="selfVideoTotalMax" label-width="150">
                <el-input @clear="clearnchange('selfVideoTotalMax')" style="width: 150px" size="mini"
                    v-model="queryParams.parmas.selfVideoTotalMax" placeholder="营销视频数量上限" clearable
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="注册时间">
                <el-date-picker @change="clearnchange('logonTime')" style="width: 240px" size="mini"
                    v-model="queryParams.parmas.logonTime" value-format='yyyy-MM-dd HH:mm:ss'
                    :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <!-- <el-button type="primary" icon="el-icon-edit-outline" size="mini" @click="addTo">添加</el-button> -->
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="主播ID" align="center" prop="userId">
                <template slot-scope="scope">
                    <p @click="anchor(scope.row.userId)">{{ scope.row.userId }}</p>
                </template>
            </el-table-column>
            <el-table-column label="主播短ID" align="center" prop="userCode" />
            <el-table-column label="昵称" align="center" prop="nickName" />
            <el-table-column label="状态" align="status" prop="userStatus">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.userStatus | onlystatusfilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="等级" align="center" prop="levelCode">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.levelCode }}</span>
                    <span v-if="scoped.row.levelSource  ">({{  scoped.row.levelSource   }})</span>
                </template>
            </el-table-column>
            <el-table-column label="补贴状态" align="center" prop="incentivesStatus">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.incentivesStatus | statusfilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="营销状态" align="center" prop="marketStatus">
                <template slot-scope="scoped">
                    <span>{{ scoped.row.marketStatus | statusfilter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="注册时间" align="center" prop="regTime" />
            <el-table-column label="私密相册" align="center" prop="selfPhotoTotal" />
            <el-table-column label="A营销视频" align="center" prop="marketVideoTotal" />
            <el-table-column label="B营销视频" align="center" prop="marketVideoTypeBTotal" />
            <el-table-column label="私密视频" align="center" prop="selfVideoTotal" />
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="primary" size="small " @click="detele(scope.row)">移除
                    </el-button> -->
                    <el-button size="mini " @click="editInfo(scope.row)">编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- <el-dialog title="添加" :visible.sync="centerDialogButie" width="90%" center>
            <div id="guige" v-loading="loadingHost">
                <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
                    <el-form-item label="主播长id" prop="providerUserId">

                        <el-input v-model="hostParams.parmas.userId" placeholder="请输入内容" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="seace">查询</el-button>
                    </el-form-item>

                </el-form>

                <div class="guisd" id="butie">

                    <el-table :data="hostList" v-show="hostList.length > 0">
                        <el-table-column label="用户长ID" align="center" prop="userId" />
                        <el-table-column label="用户短ID" align="center" prop="userCode" />
                        <el-table-column label="昵称" align="center" prop="nickName" />

                    </el-table>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogButie = false">取 消</el-button>
                <el-button type="primary" @click="butieOk">确 定</el-button>
            </span>
        </el-dialog> -->

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="pagesd" />
    </div>
</template>
<script>
import { pageTowL, getListForOperateB, saveadd, cancelDete } from '@/api/operate/user/manager/manager'

export default {
    filters: {
        onlystatusfilter(val) {
            if (val == 1) return '正常'
            if (val == 2) return '封禁'
            if (val == 4) return '冻结'
            if (val == 5) return '未通过能力检测'
        },
        statusfilter(val) {
            if (val == 1) {
                return '是'
            }
            return '否'
        }
    },
    name: 'Manager',
    data() {
        return {
            subsidyList: [
                { value: 1, label: '是' },
                { value: 0, label: '否' },
            ],
            marketList: [
                { value: 1, label: '是' },
                { value: 0, label: '否' },
            ],
            gradeList: [
                { value: 'S', label: 'S' },
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' },
                { value: 'E', label: 'E' },
                { value: 'T', label: 'T' },
                { value: 'F', label: 'F' },
            ],
            statusList: [
                { value: 1, label: '正常' },
                { value: 2, label: '封禁' },
                { value: 4, label: '冻结' },
                { value: 5, label: '未通过能力检测' },
            ],
            // 遮罩层
            loading: false,
            loadingHost: false,
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
                    marketVideoTotalMax: null,
                    marketVideoTotalMin: null,
                    selfPhotoTotalMin: null,
                    selfPhotoTotalMax: null,
                    logonTime: null,
                    levelCode: null,
                    marketStatus: null,
                    incentivesStatus: null,
                    userStatus: null,
                    userId: null,
                    userCode: null,
                    nickName: null,
                    auditStatus: 3,
                    regSource: "self",
                    marketVideoBTypeTotalMin: null,
                    marketVideoBTypeTotalMax: null,
                    selfVideoTotalMin: null,
                    selfVideoTotalMax: null
                }
            },
            // 查询主播id
            hostParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    nickName: null,
                    userType: 2
                }
            },
            // 表单参数
            form: {},
            centerDialogButie: false,
            hostList: []

        }
    },
    created() {
        let obj = JSON.parse(window.localStorage.getItem('queryParams'))
        if (obj instanceof Object) {
            this.queryParams.parmas = obj
        }
        this.pagesd()
    },
    mounted() {
    },
    methods: {

        /** 查询用户信息 */
        pagesd() {
            this.loading = true
            let obj = {
                ...this.queryParams
            }
            obj.parmas.startRegTime = this.queryParams.parmas.logonTime ? this.queryParams.parmas.logonTime[0] : null
            obj.parmas.endRegTime = this.queryParams.parmas.logonTime ? this.queryParams.parmas.logonTime[1] : null
            getListForOperateB(obj).then(response => {
                if (response.code == 200) {
                    this.umsInfos = response.data.list
                    this.total = response.data.total
                    this.loading = false
                }
            }
            ).catch((err) => {
                console.log(err)
                this.loading = false
                this.umsInfos = []
                this.total = 0

            })
        },

        // 取消按钮
        cancel() {
            this.open = false
            this.reset()
        },
        // 表单重置
        reset() {
            this.resetForm('form')
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1
            this.queryParams.pageSize = 10
            this.pagesd()
        },
        clearnchange(val) {
            let obj = JSON.parse(window.localStorage.getItem('queryParams'))
            obj[val] = null
            window.localStorage.setItem('queryParams', JSON.stringify(obj))
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    marketVideoTotalMax: null,
                    marketVideoTotalMin: null,
                    selfPhotoTotalMin: null,
                    selfPhotoTotalMax: null,
                    logonTime: null,
                    levelCode: null,
                    marketStatus: null,
                    incentivesStatus: null,
                    userStatus: null,
                    userId: null,
                    userCode: null,
                    nickName: null,
                    auditStatus: 3,
                    regSource: "self"
                }
            }
            this.resetForm('queryForm')
            this.handleQuery()
        },


        /**添加主播 */
        addTo() {
            this.hostParams.parmas.userId = null,
                this.hostList = []
            this.centerDialogButie = true;
        },
        /**确定 */
        butieOk() {
            console.log(this.hostList)
            this.centerDialogButie = false;
            saveadd({ userId: this.hostList[0].userId }).then(res => {
                if (res.code == 200) {
                    this.pagesd()
                    this.$message({
                        type: "success",
                        message: "成功",
                    });
                }
            })
        },


        // 查询主播
        seace() {
            console.log(this.hostParams)
            if (this.hostParams.parmas.userId != null && this.hostParams.parmas.userId != '') {
                this.loadingHost = true
                getProviderInfoByPageAndParams(this.hostParams).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.loadingHost = false
                        if (res.data.list.length > 0) {
                            this.hostList = res.data.list
                        } else {
                            this.$message({
                                type: "error",
                                message: "没有找到此主播",
                            });
                        }

                    }
                })
            } else {
                this.$message({
                    type: "error",
                    message: "主播ID不能为空",
                });
            }
        },

        /**跳转 */
        anchor(val) {
            console.log(val)
            // this.$store.dispatch("tagsView/delView", this.$route);
            location.href = `${window.location.origin}/#/operate/jump/info?userId=${val}&userType=2`
        },
        // 移除
        detele(val) {
            console.log(val)
            cancelDete({ userId: val.userId }).then(res => {
                if (res.code == 200) {
                    this.pagesd()
                    this.$message({
                        type: "success",
                        message: "成功",
                    });
                }
            })
        },
        // 编辑
        editInfo(row) {
            console.log(row);
            window.localStorage.setItem('queryParams', JSON.stringify(this.queryParams.parmas))
            // return
            this.$router.push({
                path: "/operate/jump/info",
                query: {
                    userId: row.userId,
                    userType: 2,
                    skipStatus: false,
                    videoB: true
                }
            })
        },

    },
    //     watch: {
    //     zhuboID: function (newQuestion) {
    //       if (newQuestion.length != 0) {
    //         this.selseShow = true;
    //       } else {
    //         this.selseShow = false;
    //       }
    //     },
    //   },
}
</script>

<style lang="scss" scoped>
#guige {
    width: 100%;
    height: 100%;
    padding: 0 0 100px;
    overflow: hidden;

    H2 {
        width: 100%;
        text-align: center;
    }

    .addButton {
        position: absolute;
        top: 10px;
        right: 100px;
    }

    .guisd {
        display: flex;
        justify-content: flex-start;
        width: 90%;
        height: 80%;
        margin: 5px auto 0;
        background: #f8f8f9;

        div {
            margin: 5px 20px;

            p {
                text-align: center;
            }
        }

        .el-input-number--medium {
            width: 90px;
        }

        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
            width: 200px;
        }
    }

    .guigeSelse {
        margin: 10px 0;
        box-shadow: 0 0 10px 5px rgb(223, 221, 221);
        border-radius: 5px;

        p {
            margin: 0;
            padding: 0 5px;
            border-bottom: solid 1px #f8f8f9;
        }

        p:hover {
            background: #f8f8f9;
        }
    }
}
</style>
