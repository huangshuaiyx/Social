<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" >
            <el-form-item label="主播长ID" prop="userId" label-width="80px">
                <el-input v-model="queryParams.parmas.userId" placeholder="请输入参数名称"  size="small"
                    style="width: 200px" @keyup.enter.native="handleQuery" @input="parameterInput"/>
            </el-form-item>
            <el-form-item label="主播短ID" prop="userCode" label-width="80px">
                <el-input v-model="queryParams.parmas.userCode" placeholder="请输入参数名称"  size="small"
                    style="width: 200px" @keyup.enter.native="handleQuery"  @input="parameterInputsd"/>
            </el-form-item>
            <el-form-item label="代理邀请码" prop="agents" label-width="90px">
                <el-input v-model="queryParams.parmas.agents" placeholder="请输入参数名称"  size="small"
                    style="width: 220px" @keyup.enter.native="handleQuery"  @input="parameterInputd"/>
            </el-form-item>
            <el-form-item label="类型" prop="category">
                <el-select v-model="queryParams.parmas.category" placeholder="请选择类型" clearable size="small"
                    style="width: 240px">
                    <el-option v-for="dict in typeOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="auditProviderList" border>
            <el-table-column label="注册时间" align="center" prop="registerTime" />
            <el-table-column label="主播长id" align="center" prop="userId">
                <template slot-scope="scope">
                    <p @click="anchor(scope.row.userCode)">{{ scope.row.userId }}</p>
                </template>
            </el-table-column>
            <el-table-column label="主播短ID" align="center" prop="userCode" width="100" />
            <el-table-column label="头像" align="center">
                <template slot-scope="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.face"
                            :preview-src-list="[scope.row.face]">
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="主播昵称" align="center" prop="nickName" width="120" />
            <el-table-column label="主播国籍" align="center" prop="country" />
            <el-table-column label="邀请码" align="center" prop="agents" />
            <el-table-column label="状态" align="center" :formatter="hostState" />
            <el-table-column label="账号状态" align="center" :formatter="shengxiao" />
            <el-table-column label="限级操作人" align="center" prop="createBy" />
            <el-table-column label="最后修改人" align="center" prop="updateBy" />

            <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon-color="green" @click="reviseCheck(scope.row)"
                        :class="editStuta?'editText':'editTexts'">{{editStuta?'修改':'取消'}}
                    </el-button>
                    <el-button size="mini" type="text" :disabled="editStuta"
                        :class="editStuta?'goddessTexts':'goddessText'" @click="goddessClick(1,scope.row.id)">女神主播
                    </el-button>
                    <el-button size="mini" type="text" :disabled="editStuta" @click="ordinaryClick(2,scope.row.id)">普通主播
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog title="确认弹框" :visible.sync="openGrade" width="30%" append-to-body>
            <p style="width:100%;text-align: center;font-size: 18px;">将主播限级,调整为 <span :class="{popupanchor: editTEXT == 1,popupanchord: editTEXT == 2,}">{{editTEXT == 1 ?
            "女神主播":"普通主播"}}</span> 请确认?</p>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitGrade">确 定</el-button>
                <el-button @click="openGrade = false">取 消</el-button>
            </div>
        </el-dialog>


        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="queryDataReviewList" />
    </div>
</template>
<script>
import index from "./inedx";

export default index;
</script>
    
<style lang="scss" scoped>
@import "./index.scss";
</style>