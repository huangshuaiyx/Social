<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.parmas.userId"
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
      <el-table-column label="ID" align="center" prop="userId" />
      <el-table-column
        label="昵称"
        align="center"
        prop="nickname"
        width="120"
      />
      <el-table-column
        label="提交次数"
        align="center"
        prop="submitNumber"
        width="120"
      />
      <el-table-column
        label="类型"
        align="center"
        prop="type"
        width="120"
        :formatter="auditProviderListType"
      />
      <el-table-column label="审核内容" align="center">
        <!--判断是否是图片消息     -->
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1 || scope.row.type == 5">
            {{ scope.row.afterValue }}</span
          >
          <div
            class="demo-image__preview"
            v-if="scope.row.type == 2 || scope.row.type == 3"
          >
            <el-image
              style="width: 40px; height: 40px"
              :src="afterValueData[0]"
              :preview-src-list="afterValueData"
            >
            </el-image>
          </div>
          <!-- 判断是相册 -->
          <div class="demo-image__preview" v-if="scope.row.type == 6">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.afterValue[0]"
              :preview-src-list="scope.row.afterValue"
            >
            </el-image>
          </div>

          <el-popover
            trigger="hover"
            placement="top"
            prop="afterValue"
            v-if="scope.row.type == 4"
          >
            <video width="200" height="200" controls >
              <source :src="scope.row.afterValue" type="video/mp4" />
            </video>
            <div slot="reference" class="name-wrapper">
              <video width="60" height="60" controls >
                <source :src="scope.row.afterValue" type="video/mp4" />
              </video>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="修改前" align="center">
        <!--判断是否是图片消息     -->
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1 || scope.row.type == 5">
            {{ scope.row.beforeValue }}</span
          >
           <div
            class="demo-image__preview"
            v-if="scope.row.type == 2 || scope.row.type == 3"
          >
            <el-image
              style="width: 40px; height: 40px"
              :src="beforeValueData[0]"
              :preview-src-list="beforeValueData"
            >
            </el-image>
          </div>
          <!-- 判断是相册 -->
          <div class="demo-image__preview" v-if="scope.row.type == 6">
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.beforeValue[0]"
              :preview-src-list="scope.row.beforeValue"
              v-if="scope.row.beforeValue != null"
            >
            </el-image>
            <div v-else>--</div>
          </div>

          <el-popover
            trigger="hover"
            placement="top"
            v-if="scope.row.type == 4"
          >
            <video width="150" height="150" controls >
              <source :src="scope.row.beforeValue" type="video/mp4" />
            </video>
            <div slot="reference" class="name-wrapper">
              <video width="60" height="60" controls >
                <source :src="scope.row.beforeValue" type="video/mp4" />
              </video>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="注册时间"
        align="center"
        prop="registerDate"
        width="120"
      />
      <el-table-column label="提交时间" align="center" prop="submitDate" />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-check"
            @click="handleCheck(scope.row)"
            >审核
          </el-button>
        </template>
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
import { queryDataReviewList } from "@/api/operate/approvalInformation/index";

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
      beforeValueData:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userType: 1,
          userCode: "",
          type: "",
        },
      },
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
         response.data.list.map((res) => {
          if (res.type == 2 || res.type == 3) {
            this.afterValueData.push(res.afterValue);
            this.beforeValueData.push(res.beforeValue)
          }
        });
      });
    },
    // 资料类型
    auditProviderListType(row) {
      switch (row.type) {
        case 1:
          return "昵称";
        case 2:
          return "头像";
        case 3:
          return "海报";
        case 4:
          return "视频";
        case 5:
          return "自我介绍";
        case 6:
          return "相册";
        default:
          return "--";
      }
    },
    /** 跳转审核页面 */
    handleCheck(row) {
      console.log(row);
      location.href = `${window.location.origin}/#/operate/approval/userauditDetail`;
      localStorage.setItem(
        "value",
        JSON.stringify({
          auditInfoId: row.auditInfoId,
          auditType: row.type,
          auditUserId: row.userId,
        })
      );
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
      this.queryParams.pageNum = 1;
      this.queryDataReviewList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.queryParams.parmas.userType = 1;
      this.resetForm("queryForm");
      this.handleQuery();
    },
  },
};
</script>
