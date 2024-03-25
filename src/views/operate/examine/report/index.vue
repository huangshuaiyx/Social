<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="108px">
      <el-form-item label="审核ID" prop="auditId">
        <el-input v-model="queryParams.auditId" placeholder="请输入内容" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="用户长ID" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入内容" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="被举报人长ID" prop="toUserId">
        <el-input v-model="queryParams.toUserId" placeholder="请输入内容" clearable size="small" style="width: 260px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="auditProviderList" class="table">
      <el-table-column label="审核ID" align="center" prop="auditId" />
      <el-table-column label="用户ID/主播ID" align="center" prop="userId" />
      <el-table-column label="用户类型" align="center" :formatter="customerType" />
      <el-table-column label="被举报人ID" align="center" prop="toUserId" />
      <el-table-column label="被举报人用户类型" align="center" :formatter="customType" />
      <el-table-column label="举报类型" align="center" :formatter="auditProviderListType" />
      <el-table-column label="原因描述" align="center" prop="reason" />
      <el-table-column label="被举报的资源" align="center" prop="reportResource">  
        <template slot-scope="scope">
          <!-- 判断是相册 -->
          <div class="demo-image__preview" v-if="scope.row.bizType !== 1 || scope.row.bizType !== 2">
            <el-image style="width: 40px; height: 40px" :src="scope.row.reportResource" :preview-src-list="
  [scope.row.reportResource]
">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" size="20px"></i>
              </div>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="提审时间" align="center" prop="submitTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-s-check" @click="handleCheck(scope.row)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="reportlist"  />
  </div>
</template>
  
<script>
import { reportlist } from '@/api/operate/examine/anchor/anchor'

export default {
  name: 'Config',
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
        auditId:null,
        userId:null,
        toUserId:null
      },
      // 表单参数
      form: {}
    }
  },
  created() {
    this.reportlist()
  },
  methods: {
    /** 查询审核主播列表 */
    reportlist() {
      this.loading = true
      reportlist(this.queryParams).then(response => {
        this.auditProviderList = response.data.list
        this.total = response.data.total
        this.loading = false
      }
      )
    },
    /** 跳转审核页面 */
    handleCheck(row) {
      location.href = `${window.location.origin}/#/operate/examine/reportdetails?auditId=${row.auditId}`
      localStorage.setItem(
        "value",
        JSON.stringify({
          auditInfoId: row.auditInfoId,
          auditType: row.type,
          auditUserId: row.userId,
          userCode: row.userCode
        })
      );
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      this.queryParams.toUserId = null
      this.queryParams.auditId = null
      this.queryParams.userId = null
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.reportlist()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      this.queryParams.toUserId = null
      this.queryParams.auditId = null
      this.queryParams.userId = null
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 资料类型
    auditProviderListType(row) {
      switch (row.bizType) {
        case 1:
          return "动态 ";
        case 2:
          return "用户";
        case 3:
          return "视频头像 ";
        case 4:
          return "头像";
        case 5:
          return "相册";
        case 6:
          return "海报";
        default:
          return "--";
      }
    },
    customerType(row) {
      switch (row.userType) {
        case "1":
          return "用户";
        case "2":
          return "主播";
        default:
          return "--";
      }
    },
    customType(row) {
      switch (row.toUserType) {
        case 1:
          return "用户";
        case 2:
          return "主播";
        default:
          return "--";
      }
    }
  }
}
</script>
  