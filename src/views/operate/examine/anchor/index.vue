<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="审核ID" prop="auditId">
        <el-input v-model="queryParams.auditId" placeholder="请输入内容" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="主播长ID" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入内容" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="queryParams.nickName" placeholder="请输入内容" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="代理号" prop="agentCode">
        <el-input v-model="queryParams.agentCode" placeholder="请输入内容" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="auditProviderList" class="table">
      <el-table-column label="审核ID" align="center" prop="auditId" />
      <el-table-column label="主播长ID" align="center" prop="userId" />
      <el-table-column label="主播代码" align="center" prop="userCode" width="120" />
      <el-table-column label="昵称" align="center" prop="nickName" width="120" />
      <el-table-column label="提交次数" align="center" prop="submitNum" width="120" />
      <el-table-column label="绑定平台" align="center" prop="bindPlatform" width="120" :formatter="getstatussd"/>
      <el-table-column label="注册时间" align="center" prop="registerTime" />
      <el-table-column label="提审时间" align="center" prop="submitTime" />
      <el-table-column label="国家" align="center" prop="country" width="120" />
      <el-table-column label="代理号" align="center" prop="agentCode" width="120" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-s-check" @click="handleCheck(scope.row)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="selectRegisterApplyList" />
  </div>
</template>

<script>
import { selectRegisterApplyList } from '@/api/operate/examine/anchor/anchor'

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
        agentCode: null,
        auditId: null,
        userId: null,
        nickName: null
      },
      // 表单参数
      form: {}
    }
  },
  created() {
    this.selectRegisterApplyList()
  },
  methods: {
    /** 查询审核主播列表 */
    selectRegisterApplyList() {
      this.loading = true
     try {
        selectRegisterApplyList(this.queryParams).then(response => {
        this.auditProviderList = response.data.list
        this.total = response.data.total
        this.loading = false
      }
      )
     } catch (error) {
        
     } finally{
        this.loading = false
     }
    },
    /** 跳转审核页面 */
    handleCheck(row) {
      const auditId = row.auditId
      const userId = row.userId
      location.href = `${window.location.origin}/#/operate/examine/audit?auditId=${auditId}&userId=${userId}`
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
      this.queryParams.agentCode= null,
      this.queryParams.auditId= null,
      this.queryParams.userId=null,
      this.queryParams.nickName= null 
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.selectRegisterApplyList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      this.queryParams.agentCode= null,
      this.queryParams.auditId= null,
      this.queryParams.userId=null,
      this.queryParams.nickName= null 
      this.resetForm('queryForm')
      this.handleQuery()
    },
    getstatussd(row) {
      switch (row.bindPlatform) {
        case 1:
          return "google ";
        case 2:
          return "facebook ";
        case 3:
          return "apple ";
        case 4:
          return "账号密码";
        default:
          return "--";
      }
    },
  }
}
</script>
