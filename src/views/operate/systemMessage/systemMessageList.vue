<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item>
                <!-- <el-button type="primary" size="mini" @click="handleCheck()" style="width: 100px">添加
                </el-button> -->
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="文本" align="center" prop="name" />
            <el-table-column label="图片" align="center">
                <template slot-scope="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.face"
                            :preview-src-list="[scope.row.face]">
                            <div slot="error" class="image-slot">
                                <img src="../../../assets/images/moren.png" style="width: 100%" alt="" />
                            </div>
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="链接" align="center" prop="">
                <template slot-scope="scope">
                    <p v-for="(x, i) in scope.row.files " :key="i" @click="tiaozhuan(x.fileUrl)"
                        style="cursor:pointer; color:#1890ff">{{ x.fileName }}</p>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getStrategyMessagePageList" />

    </div>
</template>
<script>
import {
    getStrategyMessagePageList,
} from "@/api/operate/strategy/index";

export default {
    name: "Config",
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
            // 表格数据
            umsInfos: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    name: null,
                    usable: null,
                    startDate: null,
                    endDate: null,
                    xiaoxiType: null,
                },
            },
            // 系统消息
            language: [
                {
                    value: "1",
                    label: "文本",
                },
                {
                    value: "2",
                    label: "图片",
                },
                {
                    value: "3",
                    label: "文本+链接",
                },
                {
                    value: "4",
                    label: "图片+链接",
                },
                {
                    value: "5",
                    label: "文本+图片+链接",
                }
            ],
            addData: false,
            /**头像遮罩 */
            faceloading: false,
            formData: {
                textarea: null, // 文本
                input: null, // 链接
                xiaoxiType: null,  // 类型
                picture: null // 图片
            }
        };
    },
    created() {
        this.getStrategyMessagePageList();
    },
    methods: {
        /** 查询用户信息 */
        getStrategyMessagePageList() {
            this.loading = true;
            getStrategyMessagePageList(this.queryParams).then((response) => {
                this.umsInfos = response.data.list;
                this.total = response.data.total;
                this.loading = false;
            });
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.resetForm("form");
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 10;
            this.getStrategyMessagePageList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    userId: null,
                    usable: null,
                    name: null,
                    usable: null,
                    startDate: null,
                    endDate: null,
                },
            };
            this.time = [];
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /**时间的确定 */
        timeChang() {
            this.queryParams.parmas.startDate = `${this.time[0]} 00:00:00`;
            this.queryParams.parmas.endDate = `${this.time[1]} 23:59:59`;
            this.getStrategyMessagePageList();
        },
    },
};
</script>

<style lang="scss" scoped>
.strategy-text {
    width: 100%;
    border-bottom: solid 1px;
    font-size: 20px;
}

.quite {
    padding: 5px 10px;
    position: relative;
    margin: 10px 30px;

    .tyle {
        margin: 10px 0;

        div {
            display: flex;
            justify-content: flex-start;

            span {
                line-height: 50px;
                margin-right: 50px;
            }

            p {
                display: flex;
                justify-content: flex-start;
            }
        }
    }

    .cesdf {
        display: flex;
        justify-content: flex-start
    }

    .yanchi {
        width: 490px;
        display: flex;
        justify-content: flex-start;

        span {
            margin: 9px 10px;
        }
    }

    .but {
        position: absolute;
        top: 10px;
        right: 20px;

    }

    .avatar-uploader {
        height: 100px;
        width: 100px;
        border: solid 1px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        margin: 0 8px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

}
</style>
