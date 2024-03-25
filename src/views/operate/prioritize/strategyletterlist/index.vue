<template>
    <div class="app-container">
        <el-form ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="" prop="providerUserId">
                <el-input v-model="zhuboID" placeholder="请输入策略信长ID" clearable size="small" style="width: 300px"
                     @clear="zhuboID = null" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="addhost">添加策略信</el-button>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="" prop="providerUserId">
                <el-input v-model="queryParams.parmas.userId" placeholder="请输入策略信长ID" clearable size="small"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="" prop="userCode">
                <el-input v-model="queryParams.parmas.userCode" placeholder="请输入策略信ID" clearable size="small"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item label="" prop="nickname">
                <el-input v-model="queryParams.parmas.nickname" placeholder="请输入策略信昵称" clearable size="small"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="resetQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            </el-form-item>
        </el-form> -->

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column type="index" label="序号" align="center" prop="" />
            <el-table-column label="策略信ID" align="center" prop="id" />
            <el-table-column label="语言" align="center" prop="languageCode" />
            <el-table-column label="类型" align="center" :formatter="shengxiao" />
            <el-table-column label="策略信条数" align="center" prop="contentNum" />
            <el-table-column label="添加时间" align="center" prop="updateTime" />
            <el-table-column label="操作" align="center" width="180" fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" round size="small" @click="incentivesPriceEdit(scope.row)">编辑
                    </el-button>
                    <el-button type="danger" round size="small" @click="handleCheck(scope.row)">移出列表
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getUserInfoByPageAndParams" />
        <Strategyedit v-if="propertydata.show" :property="propertydata" @propertys="property"></Strategyedit>
    </div>
</template>
<script>
import { getStrategyMessagePageList, setPriority } from '@/api/operate/prioritize/index.js'
import Strategyedit from "../../../../components/Strategyedit/index.vue"

export default {
    name: 'Manager',
    components: {
        Strategyedit
    },
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
                    name: null,
                    usable: null,
                    languageCode: null, // 语言
                    startDate: null,
                    endDate: null,
                    versionCode: null,
                    priority: 1,
                    id:null
                }
            },
            // 表单参数
            form: {},
            /**策略信ID */
            zhuboID: "",
            // 编辑
            editShow: false,
            // 传递参数
            propertydata: {
                show: false
            }
        }
    },
    created() {
        this.getUserInfoByPageAndParams()
    },
    mounted() { },
    methods: {

        /** 查询用户信息 */
        getUserInfoByPageAndParams() {
            this.loading = true
            getStrategyMessagePageList(this.queryParams).then(response => {
                if (response.code == 200) {
                    this.umsInfos = response.data.list
                    this.total = response.data.total
                    this.loading = false
                } else {
                    this.loading = false
                    this.umsInfos = []
                    this.total = 0
                }
            }
            ).catch((err) => {
                console.log(err)
                this.loading = false
                this.umsInfos = []
                this.total = 0
            })
        },
        /** 撤销策略信 */
        handleCheck(row) {
            setPriority({ id: row.id, priority: 0 }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        type: "success",
                        message: "移除成功",
                    });
                    this.getUserInfoByPageAndParams()
                } else {
                    this.$message({
                        type: "error",
                        message: res.msg,
                    });
                }
            })
        },
        /**编辑 */
        incentivesPriceEdit(row) {
            this.propertydata.show = true
            console.log({ ...this.propertydata, ...row })
            this.propertydata = { ...this.propertydata, ...row }
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
            this.queryParams.parmas.id = this.zhuboID
            this.getUserInfoByPageAndParams()
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    userCode: null,
                    nickname: null,
                    userType: 2
                }
            }
            this.resetForm('queryForm')
            this.handleQuery()
        },
        //   删除内容
        clearDel() {
            this.subsidyData.periods = []
            this.selseShow = false;
        },
        /**是否生效 */
        shengxiao(row) {
            switch (row.contentType) {
                case 'normal':
                    return <span style="color:#67c23a">普通</span>;
                case 'sex':
                    return <span style="color:#67c23a">性感</span>;
                default:
                    return "--";
            }
        },
        // 工作状态
        gongzuoState(row) {
            switch (row.workState) {
                case 0:
                    return <span style="color:#f56c6c">离线</span>;
                case 1:
                    return <span style="color:#67c23a">在线</span>;
                case 2:
                    return "goWork中";
                default:
                    return "--";
            }
        },
        // 添加策略信
        addhost() {
            console.log(this.zhuboID)
            if (this.zhuboID != "") {
                setPriority({ id: this.zhuboID, priority: 1 }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.zhuboID = ""
                        this.$message({
                        type: "success",
                        message: "添加成功",
                    });
                        this.getUserInfoByPageAndParams()
                    } else {
                        this.zhuboID = ""
                    }
                })
            } else {
                this.$message({
                    type: "error",
                    message: "请输入策略信长ID",
                });
            }
        },
        // 接受参数
        property(val) {
            this.propertydata.show = val
            console.log(this.propertydata, val, '接受的参数')
            this.getUserInfoByPageAndParams()
        }

    },
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

.el-form-item {
    margin-bottom: 15px;
}
</style>
