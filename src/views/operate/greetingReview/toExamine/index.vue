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
      <el-table-column label="主播短ID" align="center" prop="userCode" />
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
        width="120"
      />

      <el-table-column
        label="代理邀请码"
        align="center"
        prop="agents"
        width="120"
      />
      <el-table-column label="版本号" align="center" prop="appVersionName" width="100"/>
      <el-table-column label="IP" align="center" prop="ip" />
      <el-table-column label="IP出现次数" align="center" prop="ipCount" />
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
            icon-color="green"
            @click="handleCheck(scope.row)"
            >通过
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-check"
            style="color: red"
            @click="handleDelete(scope.row)"
            >不通过
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
import {
  queryDataReviewList,
  submitReviewResult,
} from "@/api/operate/greetingReview/toExamine/index";

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
      imgArr: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: null,
          userCode: null,
          userCode: null,
          agents: null,
          auditStatus: 1,
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 不通过的按钮操作*/
    handleDelete(row) {
      let nickNames = row.nickname ? row.nickname : "空";
      let that = this;
      this.$confirm(
        '是否确认不通过名称为"' + nickNames + '"的数据项?',
        "警告",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(function () {
          submitReviewResult({
            id: row.id,
            auditStatus: 2,
          }).then((res) => {
            if (res.code == 200) {
              that.queryDataReviewList();
              that.msgSuccess("操作成功");
            }
          });
        })
        .catch(() => {});
    },
    /** 通过的按钮操作*/
    handleCheck(row) {
      let nickNames = row.nickname ? row.nickname : "空";
      let that = this;
      this.$confirm('是否确认通过名称为"' + nickNames + '"的数据项?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(function () {
          submitReviewResult({
            id: row.id,
            auditStatus: 3,
          }).then((res) => {
            if (res.code == 200) {
              that.queryDataReviewList();
              that.msgSuccess("操作成功");
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
