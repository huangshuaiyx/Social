<template>
    <div class="app-container">
        <div class="title_div">
            <div :class="titleIndex == i ? 'title_div_divsele' : 'title_div_div'" v-for="(x, i) in titleData" :key="i"
                @click="titleClick(x, i)">{{ x.label }}</div>
        </div>
        <el-form ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="" prop="providerUserId">
                <el-input v-model="zhuboID" placeholder="请输入参数名称" clearable size="small" style="width: 300px"
                    @keyup.enter.native="handleQuery" @clear="zhuboID = null" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="addhost">添加主播</el-button>
            </el-form-item>
        </el-form>
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="" prop="providerUserId">
                <el-input v-model="queryParams.parmas.userId" placeholder="请输入主播长ID" clearable size="small"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="queryParams.parmas.userId = null" />
            </el-form-item>
            <el-form-item label="" prop="userCode">
                <el-input v-model="queryParams.parmas.userCode" placeholder="请输入主播ID" clearable size="small"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="queryParams.parmas.userCode = null" />
            </el-form-item>
            <el-form-item label="" prop="nickName">
                <el-input v-model="queryParams.parmas.nickName" placeholder="请输入主播昵称" clearable size="small"
                    style="width: 240px" @keyup.enter.native="handleQuery" @clear="queryParams.parmas.nickName = null" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <!-- <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button> -->
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column type="index" label="序号" align="center" prop="userId" />
            <el-table-column label="主播长ID" align="center" prop="providerId" width="210px" />
            <el-table-column label="主播短ID" align="center" prop="userCode" width="150px" />
            <el-table-column label="主播类型" align="center" :formatter="shengxiao" width="120px" />
            <el-table-column label="昵称" align="center" prop="nickName" />
            <el-table-column label="主播头像" align="center" prop="face" width="95px">
                <template slot-scope="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.face"
                            :preview-src-list="[scope.row.face]">
                            <div slot="error" class="image-slot" style="margin-top: 10px;">
                                --
                            </div>
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="私密相册" align="center" prop="selfPhotoTotal" width="105px">
                <template slot-scope="scope">
                    <p>{{ scope.row.selfPhotoTotal != null ? scope.row.selfPhotoTotal : 0 }}</p>
                </template>
            </el-table-column>
            <el-table-column label="私密视频" align="center" prop="selfVideoTotal" width="105px">
                <template slot-scope="scope">
                    <p>{{ scope.row.selfVideoTotal != null ? scope.row.selfVideoTotal : 0 }}</p>
                </template>
            </el-table-column>
            <el-table-column label="A类营销视频" align="center" prop="marketVideoTotal" width="105px">
                <template slot-scope="scope">
                    <p>{{ scope.row.marketVideoTotal != null ? scope.row.marketVideoTotal : 0 }}</p>
                </template>
            </el-table-column>
            <el-table-column label="B类营销视频" align="center" prop="marketVideoTypeBTotal" width="105px">
                <template slot-scope="scope">
                    <p>{{ scope.row.marketVideoTypeBTotal != null ? scope.row.marketVideoTypeBTotal : 0 }}</p>
                </template>
            </el-table-column>
            <el-table-column label="添加时间" align="center" prop="createTime" width="150px" />
            <el-table-column label="操作" align="center" width="200" fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" round size="small" @click="incentivesPriceEdit(scope.row)">编辑
                    </el-button>
                    <el-button type="danger" round size="small" @click="handleCheck(scope.row)">移出列表
                    </el-button>
                </template>
            </el-table-column>
        </el-table>


        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
            @pagination="getUserInfoByPageAndParams" :page-sizes="[8, 10, 15]" />
    </div>
</template>
<script>
import { getProdsave, getProdpage, getProdremove } from '@/api/operate/prioritize/index.js'

export default {
    name: 'Manager',
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
                pageSize: 8,
                parmas: {
                    userId: null,
                    userCode: null,
                    nickName: null,
                    regionCode: 'EN'
                }
            },
            // 表单参数
            form: {},
            /**主播ID */
            zhuboID: "",
            // 头部列表数据
            titleData: [
                {
                    value: "EN",
                    label: "英语列表",
                },

                {
                    value: "IN",
                    label: "印度列表",
                },
                {
                    value: "BR",
                    label: "巴西列表",
                },
                {
                    value: "AR",
                    label: "中东列表",
                },
                {
                    value: "ID",
                    label: "印尼列表",
                },
            ],
            titleIndex: 0,
            labelVale:"EN"
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
            getProdpage(this.queryParams).then(response => {
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
        /** 撤销主播 */
        handleCheck(row) {
            getProdremove({ providerId: row.providerId,regionCode:this.labelVale }).then(res => {
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
            console.log(row)
            this.$router.push({
                path: "/operate/jump/info",
                query: {
                    userId: row.providerId,
                    userType: 2,
                    skipStatus: false,
                    videoB: true
                }
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
            this.queryParams.pageSize = 8
            this.getUserInfoByPageAndParams()
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 8,
                parmas: {
                    userId: null,
                    userCode: null,
                    nickName: null,
                    userType: 2,
                    regionCode: 'EN'
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
            switch (row.regSource) {
                case 'market':
                    return <span style="color:#f56c6c">1类</span>;
                case 'self':
                    return <span style="color:#67c23a">2类</span>;
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
        // 添加主播
        addhost() {
            console.log(this.zhuboID)
            if (this.zhuboID != "") {
                getProdsave({ providerId: this.zhuboID,regionCode:this.labelVale }).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.zhuboID = ""
                        this.getUserInfoByPageAndParams()
                    } else {
                        this.zhuboID = ""
                    }
                })
            } else {
                this.$message({
                    type: "error",
                    message: "请输入主播长ID",
                });
            }
        },
        // 选择title标签
        titleClick(val, i) {
            console.log(val)
            this.titleIndex = i
            this.labelVale = val.value
            this.queryParams.pageNum = 1
            this.queryParams.pageSize = 8
            this.queryParams.parmas.regionCode = val.value
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
    margin-bottom: 5px;
}

.title_div {
    width: 100%;
    height: 60px;
    border-bottom: solid 1px #c2c5c573;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;

    .title_div_div {
        width: 110px;
        height: 40px;
        border: solid 1px #c2c5c573;
        text-align: center;
        line-height: 40px;
        color: #131212;
        font-size: 16px;
        margin: auto 5px;
        border-radius: 5px;
    }

    .title_div_divsele {
        width: 110px;
        height: 40px;
        border: solid 1px #1890ff;
        text-align: center;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        margin: auto 5px;
        background: #1890ff;
        border-radius: 5px;
    }
}
</style>
