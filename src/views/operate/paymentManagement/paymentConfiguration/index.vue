<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-form-item label="" prop="appId">
                <el-input v-model="queryParams.parmas.appId" placeholder="请输入appid" clearable size="small"
                    style="width: 240px" @keyup.enter.native="getRefuseWordPageListd()" />
            </el-form-item>
            <el-form-item label="" prop="countryCode">
                <el-input v-model="queryParams.parmas.countryCode" placeholder="请输入国家code" clearable size="small"
                    style="width: 240px" @keyup.enter.native="getRefuseWordPageListd()" />
            </el-form-item>
            <el-form-item label="" prop="currency">
                <el-input v-model="queryParams.parmas.currency" placeholder="请输入币种" clearable size="small"
                    style="width: 240px" @keyup.enter.native="getRefuseWordPageListd()" />
            </el-form-item>

            <el-form-item label="" prop="payChannelId">
                <el-select v-model="queryParams.parmas.payChannelId" placeholder="请输入支付渠道id">
                    <el-option v-for="item in options" :key="item.id" :label="item.fullName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="getRefuseWordPageListd()">搜索
                </el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                <el-button type="primary" size="mini" @click="batch(1)" :disabled="opensd">批量打开
                </el-button>
                <el-button type="danger" size="mini" @click="batch(0)" :disabled="opensd">批量关闭</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="refuseList" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="appId" align="center" prop="appId" />
            <el-table-column label="国家Code" align="center" prop="countryCode" />
            <el-table-column label="币种" align="center" prop="currency" />
            <el-table-column label="支付方式" align="center" prop="payTypeFullName" />
            <el-table-column label="支付渠道" align="center" prop="payChannelFullName" :show-overflow-tooltip="true" />
            <el-table-column label="创建时间" align="center" prop="createTime" />
            <el-table-column label="更新时间" align="center" prop="updateTime" />
            <el-table-column label="更新人" align="center" prop="updateBy" />
            <el-table-column label="权重" align="center" prop="weight" />
            <el-table-column label="浏览器跳转状态" align="center" prop="payChannelId" :formatter="shengxiao" />

            <el-table-column label="是否启用" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.enable" :active-value="1" :inactive-value="0" active-color="#13ce66"
                        inactive-color="#ff4949" @change="changeSwitch(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getRefuseWordPageListd" />

    </div>
</template>
<script>
import {
    paged,
    updateEnable,
    channelList,
    updateEnableBatch
} from "@/api/operate/marketingAnchor/refuse";

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
                    appId: null,
                    countryCode: null,
                    currency: null,
                    payChannelId: null
                },
            },
            // 表单参数
            form: {},
            // 标签内容
            input: "",
            /** 是否add */
            refuseID: "add",
            /** id */
            Id: "",
            //   渠道
            options: [

            ],
            /**批量选中 */
            selectList: null,
            opensd:true
        };
    },
    created() {
        this.getRefuseWordPageListd();
        this.channelListd()
    },
    methods: {
        /**是完成 */
        shengxiao(row) {
            switch (row.browserState) {
                case 0:
                    return <span style="color:#f56c6c">内置浏览器</span>;
                case 1:
                    return <span style="color:#1890ff">外部浏览器</span>;
                default:
                    return "--";
            }
        },
        /** 查询用户信息 */
        getRefuseWordPageListd() {
            this.loading = true;
            paged(this.queryParams).then((response) => {
                this.refuseList = response.data.list;
                this.total = response.data.total;
                this.loading = false;
            });
        },
        /**查询支付渠道 */
        channelListd() {
            channelList().then(res => {
                console.log(res)
                if (res.code == 200) {
                    this.options = res.data
                }
            })
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams.pageNum = 1;
            this.queryParams.pageSize = 10;
            this.queryParams.parmas = {};
            this.resetForm("queryForm");
            this.getRefuseWordPageListd();
            this.channelListd()
        },
        // 表单重置
        reset() {
            this.resetForm("form");
        },
        /**状态按钮 */
        changeSwitch(row) {
            console.log("开关===>", row.enable, this.values);
            this.$confirm('此操作将更改支付渠道, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                updateEnable({ enable: row.enable, id: row.id }).then((res) => {
                    if (res.code == 200) {
                        this.getRefuseWordPageListd();
                        this.$message({
                            type: "success",
                            message: "修改成功",
                        });
                    }
                });
            }).catch(() => {
                this.getRefuseWordPageListd();
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });

        },
        /*批量接口*/
        batch(val) {
            if (this.selectList != null) {
                updateEnableBatch({
                    idList: this.selectList,
                    enable: val
                }
                ).then(res => {
                    if (res.code == 200) {
                        this.$message({
                            type: "success",
                            message: "操作成功",
                        });
                        this.selectList = null
                        this.getRefuseWordPageListd();
                        this.channelListd()
                    }
                })
            } else {
                this.$message({
                    type: "error",
                    message: "请选择渠道",
                });
            }

        },
        handleSelectionChange(value) {
            let arr = []
            if (value.length != 0) {
                value.map(x => {
                    arr.push(x.id)
                })
                this.selectList = arr
                console.log(this.selectList)
                this.opensd = false
            }else{
                this.opensd = true
            }

        },
    },
};
</script>

