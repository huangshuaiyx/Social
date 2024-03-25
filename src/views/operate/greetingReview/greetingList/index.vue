<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="主播长ID" prop="userId">
        <el-input
          v-model="queryParams.parmas.userId"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="主播短ID" prop="userCode">
        <el-input
          v-model="queryParams.parmas.userCode"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 200px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="代理邀请码" prop="agents" label-width="90px">
        <el-input
          v-model="queryParams.parmas.agents"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 220px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="类型" prop="auditStatus">
        <el-select
          v-model="queryParams.parmas.auditStatus"
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

    <el-table v-loading="loading" :data="auditProviderList" border>
      <el-table-column label="主播长ID" align="center" prop="userId" />
      <el-table-column label="主播短ID" align="center" prop="userCode" width="100"/>
      <el-table-column
        label="昵称"
        align="center"
        prop="nickname"
        width="120"
      />
      <el-table-column label="招呼相册" align="center">
        <template slot-scope="scope">
          <div class="demo-image__preview">
             <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.image"
              :preview-src-list="imgArr != null ? imgArr : []"
              v-if="imgArr != null"
            >
            </el-image>
            <div v-else>--</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="审核内容"
        align="center"
        prop="content"
      >
        <!-- <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            prop="afterValue"
          >
            <p>{{ scope.row.afterValue }}</p>
            <div slot="reference" class="name-wrapper">
              <p>{{ scope.row.afterValue }}</p>
            </div>
          </el-popover>
        </template> -->
      </el-table-column>
      <el-table-column
        label="提交时间"
        align="center"
        prop="submitTime"
      />

      <el-table-column
        label="代理邀请码"
        align="center"
        prop="agents"
        width="120"
      />
      <el-table-column label="版本号" align="center" prop="appVersionName" width="100"/>
      <el-table-column label="审核状态" align="center" prop="auditStatus" :formatter="auditStatusType" width="100"/>
      <el-table-column label="审核人" align="center" prop="auditUserId" width="100">
        <template slot-scope="scope"
          ><span style="color: red">{{ scope.row.auditUserId }}</span></template
        >
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="queryDataReviewList"
    />
  </div>
</template>

<script>
import { queryDataReviewList } from "@/api/operate/greetingReview/greetingList/index";

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
      afterValueData: [],
      beforeValueData: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: null,
          userCode: null,
          agents:null,
          auditStatus: 2,
        },
      },
      /**类型 */
      typeOptions: [
        { value: 3, label: "通过" },
        { value: 2, label: "不通过" },
      ],
      // 表单参数
      form: {},
    };
  },
  created() {
    this.queryDataReviewList();
  },
  methods: {
    /** 查询审核主播列表 */
    queryDataReviewList() {
      this.loading = true;
      queryDataReviewList(this.queryParams).then((response) => {
        this.auditProviderList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
         let arr = [];
        response.data.list.map((res) => {
          arr.push(res.image);
        });
        this.imgArr = arr;
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
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      console.log(this.queryParams)
      this.queryDataReviewList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /**审核状态 */
    auditStatusType(row){
      switch (row.auditStatus) {
        case 1:
          return "审核中";
        case 2:
          return <span style="color:red">审核失败</span>;
        case 3:
          return <span style="color:green">审核成功</span>;
        default:
          return "--";
      }
    }
    
  },
};
</script>
