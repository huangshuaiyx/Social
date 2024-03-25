<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="联系人ID" prop="providerUserId">
        <el-input
          v-model="queryParams.parmas.providerUserId"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="类型" prop="types">
        <el-select
          v-model="queryParams.types"
          placeholder="请选择类型"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in typeOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="call">
        <el-select
          v-model="queryParams.call"
          placeholder="状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in callOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="收费状态" prop="hangUp">
        <el-select
          v-model="queryParams.hangUp"
          placeholder="收费状态"
          clearable
          size="small"
          style="width: 240px"
        >
          <el-option
            v-for="dict in hangUpOptions"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="内容" prop="providerUserId">
        <el-input
          v-model="queryParams.parmas.providerUserId"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="auditProviderList">
      <el-table-column label="时间" align="center" prop="auditId" />
      <el-table-column label="联系人ID" align="center" prop="providerUserId" />
      <el-table-column
        label="类型"
        align="center"
        prop="userCode"
        width="120"
      />
      <el-table-column
        label="状态"
        align="center"
        prop="nickName"
        width="120"
      />
      <el-table-column
        label="收费状态"
        align="center"
        prop="submitNum"
        width="120"
      />
      <el-table-column
        label="消息类型"
        align="center"
        prop="bindPlatform"
        width="120"
      />
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top" prop="registerAccount">
            <img :src="scope.row.registerAccount" alt="" />
            <div slot="reference" class="name-wrapper">
                <!--判断是否是图片消息     -->
              <span v-if="scope.row.registerAccount == 1">
                {{ scope.row.registerAccount }}</span
              >
              <img
                :src="scope.row.registerAccount"
                style="width: 40px"
                alt=""
                v-else
              />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="registerTime" />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="queryAnchorExamineListByPage"
    />
  </div>
</template>

<script>
import {  } from "@/api/operate/jump/imRecord";

export default {
  name: "Config",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 参数表格数据
      auditProviderList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          types: null, // 类型
          call: null, // 呼叫
          hangUp: null, //挂断
        },
      },
      // 表单参数
      form: {},
      //  类型数据
      typeOptions: [
        { value: "1", label: "主动" },
        { value: "2", label: "收到" },
      ],
      // 呼叫数据
      callOptions: [
        { value: "1", label: "成功" },
        { value: "2", label: "失败" },
      ],
      hangUpOptions: [
        { value: "1", label: "是" },
        { value: "2", label: "免费" },
      ],
    };
  },
  mounted() {
    // 获取地址上的参数
    let str = window.location.href
    let urls = str.split('?')
    let params = urls[1].split('&')
    this.userId = params[0].split('=')[1]
    this.userType = params[1].split('=')[1]
  },
  created() {
    this.queryAnchorExamineListByPage();
  },
  methods: {
    /** 查询审核主播列表 */
    queryAnchorExamineListByPage() {
      this.loading = true;
      getVideoRecord(this.queryParams).then((response) => {
        this.auditProviderList = response.data.list;
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
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.parmas = {};
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      this.queryAnchorExamineListByPage();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.parmas = {};
      this.resetForm("queryForm");
      this.handleQuery();
    },
  },
};
</script>
