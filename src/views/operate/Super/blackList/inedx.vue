<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
            <el-form-item label="" prop="input">
                <el-input v-model="input" placeholder="请输入长ID" clearable size="small" style="width: 240px" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery(null, 'add')">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="操作时间" align="center" prop="banOperationTime" />
            <el-table-column label="操作员" align="center" prop="createBy" />
            <el-table-column label="主播长id" align="center" prop="providerId">
                <template slot-scope="scope">
                    <p @click="anchor(scope.row.providerId)">{{ scope.row.providerId }}</p>
                </template>
            </el-table-column>
            <el-table-column label="主播识别码" align="center" prop="agentCode" />
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-popconfirm title="确定此主播移除黑名单？" @confirm="delted(scope.row)">
                        <el-button slot="reference">移除黑名单</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="selectList" />
    </div>
</template>
<script>
import {
    selectList,
    insertBan,
    deleteBan
} from "@/api/operate/anchormanagement/index";

export default {
    name: "Config",
    data() {
        return {
            // 遮罩层
            loading: false,
            // 总条数
            total: 0,
            // 参数表格数据
            umsInfos: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                parmas: {
                    banType: 3,
                },
            },
            // 标签内容
            input: null,
        };
    },
    created() {
        this.selectList();
    },
    methods: {
        /** 查询用户信息 */
        selectList() {
            this.loading = true;
            selectList(this.queryParams).then((response) => {
                this.umsInfos = response.data.list;
                this.total = response.data.total;
                this.loading = false;
            });
        },
        /** 添加 */
        handleQuery() {
            console.log(this.input)
            insertBan({ providerId: this.input, "banType": 3 }).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '成功',
                        type: 'success'
                    });
                    this.selectList()
                }
            })
        },
        /**跳转 */
        anchor(val) {
            // this.$store.dispatch("tagsView/delView", this.$route);
            location.href = `${window.location.origin}/#/operate/anchotinspection/anchotinspection`
        },

        delted(row) {
            console.log(row)
            deleteBan({
                providerId: row.providerId,
                banType: 3
            }
            ).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: '成功',
                        type: 'success'
                    });
                    this.selectList()
                }
            })
        }
    },
};
</script>


<style lang="scss" scoped>
</style>