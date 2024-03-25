<template>
    <div class="app-container">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
        <el-form-item label="审核ID" prop="auditId">
          <el-input v-model="queryParams.auditId" placeholder="请输入内容" clearable size="small"
            style="width: 240px" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item label="用户长ID" prop="userId">
          <el-input v-model="queryParams.userId" placeholder="请输入内容" clearable size="small"
            style="width: 240px" @keyup.enter.native="handleQuery" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
  
      <el-table v-loading="loading" :data="auditProviderList" class="table">
        <el-table-column label="审核ID" align="center" prop="auditId" />
        <el-table-column label="用户ID" align="center" prop="userId" />
        <el-table-column label="用户短ID" align="center" prop="userCode" />
        <el-table-column label="邮箱" align="center" prop="email" />
        <el-table-column label="提审时间" align="center" prop="applyTime" />
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button size="mini" type="text" icon="el-icon-s-check" @click="handleCheck(scope.row)">审核
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="applylist" />
    </div>
  </template>
  
  <script>
  import { applylist } from '@/api/operate/examine/anchor/anchor'
  
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
          auditId: null,
          userId:null
        },
        // 表单参数
        form: {}
      }
    },
    created() {
      this.applylist()
    },
    methods: {
      /** 查询审核主播列表 */
      applylist() {
        this.loading = true
        applylist(this.queryParams).then(response => {
          this.auditProviderList = response.data.list
          this.total = response.data.total
          this.loading = false
        }
        )
      },
      /** 跳转审核页面 */
      handleCheck(row) {
        location.href = `${window.location.origin}/#/operate/examine/deletedetails?auditId=${row.auditId}`
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
        this.queryParams.parmas = {}
        this.resetForm('form')
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.pageNum = 1
        this.applylist()
      },
      /** 重置按钮操作 */
      resetQuery() {
        this.queryParams.pageNum = 1
        this.queryParams.pageSize = 10
        this.queryParams.parmas = {}
        this.resetForm('queryForm')
        this.handleQuery()
      }
    }
  }
  </script>
  