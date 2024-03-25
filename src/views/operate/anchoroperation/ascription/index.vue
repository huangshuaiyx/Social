<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-form-item label="" prop="agentCode">
                <el-input v-model="queryParams.parmas.agentCode" placeholder="请输入代理邀请码" clearable @clear="clearInput"
                    size="small" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleSearch()">搜索
                </el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>

            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="refuseList">
            <el-table-column label="序号" align="center" prop="id" />
            <el-table-column label="代理邀请码" align="center" prop="agentCode" :show-overflow-tooltip="true" />

            <el-table-column label="代理注册日期" align="center" prop="registerTime" />
            <el-table-column label="国家" align="center" prop="country" />
            <el-table-column label="运营负责人" align="center" prop="">
                <template slot-scope="scope">
                    <p v-if="scope.row.director != -1">{{ scope.row.directorName }}</p>
                    <p v-else>暂不分配</p>
                </template>
            </el-table-column>>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">

                    <el-button type="primary" v-if="scope.row.director != -1" size="small "
                        @click="handleCheck(scope.row)">修改
                    </el-button>
                    <el-button type="primary" v-else size="small " @click="handleQuery(scope.row)">添加
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="pageCode()" />

        <el-dialog title="运营负责人" :visible.sync="addDialogVisible" width="40%" append-to-body>
            <el-radio-group v-model="radio">
                <el-radio v-for="(x, i) in operateList" :key="i" :label="`${x.userId}`">{{ x.nickName }}</el-radio>
                <el-radio :label="-1">暂不分配</el-radio>
            </el-radio-group>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="OKinputadd">确 定</el-button>
                <el-button @click="addDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    pageCoded, settingDirector
} from "@/api/operate/anchoroperation/index.js";
import { allocatedUserList, listRole } from "@/api/system/role";
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
            refuseList: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    agentCode: null,
                },
            },
            /**查询运营角色 */
            queryParamsd: {
                pageNum: 1,
                pageSize: 10,
                roleId: null,
            },

            // 表单参数
            formData: null,
            // 新增/编辑弹框
            centerDialogVisible: false,
            addDialogVisible: false,
            radio: -1,
            /**运营人员 */
            operateList: []
        };
    },
    created() {
        this.pageCode();
        listRole({
            pageNum: 1,
            pageSize: 20,
        }).then(res => {
            if (res.code == 200) {
                if (res.rows.length > 0) {
                    res.rows.map(x => {
                        if (x.roleKey == "outsource") {
                            this.queryParamsd.roleId = x.roleId
                            this.allocatedUserListd(this.queryParamsd)
                        }
                    })
                }
            }

        })
    },
    methods: {
        /** 查询用户信息 */
        pageCode() {
            this.loading = true;
            pageCoded(this.queryParams).then((response) => {
                this.refuseList = response.data.list;
                this.total = response.data.total;
                this.loading = false;
            });
        },
        allocatedUserListd(val) {
            allocatedUserList(val).then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.operateList = res.rows
                }
            })
        },
        /** 修改 */
        handleCheck(val) {
            this.addDialogVisible = true;
            this.formData = val;
            this.radio = val.director
            console.log(val, this.radio)

        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        /** 添加 */
        handleQuery(val) {
            this.addDialogVisible = true;
            this.formData = val;
            this.radio = -1;
        },
        /**确认按钮 */
        OKinputadd() {
            console.log(this.formData)
            settingDirector({ director: this.radio, id: this.formData.id }).then((res) => {
                if (res.code == 200) {
                    this.addDialogVisible = false;
                    this.pageCode();
                    this.$message({
                        type: "success",
                        message: "添加成功",
                    });
                }
            });

        },
        /*搜索 */
        handleSearch() {
            this.pageCode();
        },
        /**清除内容 */
        clearInput() {
            this.queryParams.parmas.agentCode = null;
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 10;
            this.queryParams.parmas.agentCode = null
            this.resetForm("queryForm");
            this.handleSearch();
        },
    }
}
</script>

