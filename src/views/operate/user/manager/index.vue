<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px" >
      <el-form-item label="用户ID" prop="providerUserId">
        <el-input v-model="queryParams.parmas.userId" placeholder="请输入参数名称" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="用户代码" prop="userCode">
        <el-input v-model="queryParams.parmas.userCode" placeholder="请输入参数名称" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" @clear="clearClick"/>
      </el-form-item>
      <!-- <el-form-item label="昵称" prop="nickName">
        <el-input
          v-model="queryParams.parmas.nickName"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 240px"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos" empty-text="仅支持查询数据">
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="昵称" align="center" prop="nickName" width="120" />
      <el-table-column label="用户代码" align="center" prop="userCode" width="120" />
      <!--（1-用户 2-服务者） -->
      <el-table-column label="类型" align="center" :formatter="userTypeFormat" />
      <!-- （1-正常 2-禁用 3-注销） -->
      <el-table-column label="状态" align="center" :formatter="userStatusFormat" />
      <el-table-column label="注册时间" align="center" prop="regTime" />
      <el-table-column label="钻石余额" align="center" prop="diamondBalance" width="120" />
      <el-table-column label="操作" align="center" width="700">
        <template slot-scope="scope">
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'BASE_INFO')">基本资料
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'DIAMOND_BILL')">钻石账单
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'RECHARGE_RECORD')">充值记录
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'VIDEO_RECORD')">视频记录
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'MATCH_RECORD')">匹配记录
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'LOG_RECORD')">登陆记录
          </el-button>
          <!--          <el-button
                      type="primary"
                      round
                      size="small"
                      @click="handleCheck(scope.row,'IM_RECORD')"
                    >IM记录
                    </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total= "total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getProviderInfoByPageAndParams" />
  </div>
</template>
<script>
import { getProviderInfoByPageAndParams } from '@/api/operate/user/manager/manager'

export default {
  name: 'Config',
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
      // 参数表格数据
      umsInfos: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: null,
          userCode: null,
          nickName: null,
          userType: 1
        }
      },
      // 表单参数
      form: {},
      userTypeOptions: [
        { value: 1, label: '用户' },
        { value: 2, label: '服务者' }
      ],
      userStatusOptions: [
        { value: 1, label: '正常' },
        { value: 2, label: '禁用' },
        { value: 3, label: '注销' }
      ]
    }
  },
  created() {
    // this.getProviderInfoByPageAndParams()
  },
  methods: {
    userTypeFormat(row) {
      let str = ''
      this.userTypeOptions.forEach((t) => {
        if (t.value === row.userType) {
          str = t.label
        }
      })
      return str
    },
    userStatusFormat(row) {
      let str = ''
      this.userStatusOptions.forEach((t) => {
        if (t.value === row.userStatus) {
          str = t.label
        }
      })
      return str
    },
    /** 查询用户信息 */
    getProviderInfoByPageAndParams() {
      this.loading = true
      getProviderInfoByPageAndParams(this.queryParams).then(response => {
        this.umsInfos = response.data.list
        this.total = response.data.total
        this.loading = false
      }
      )
    },
    /** 跳转审核页面 */
    handleCheck(row, type) {
      let userId = row.userId
      let userType = row.userType

      let str = ''
      // 根据Type路由页面
      switch (type) {
        case 'BASE_INFO':
          str = 'info'
          break
        case 'DIAMOND_BILL':
          str = 'diamondBill'
          break
        case 'RECHARGE_RECORD':
          str = 'rechargeRecord'
          break
        case 'VIDEO_RECORD':
          str = 'videoRecording'
          break
        case 'MATCH_RECORD':
          str = 'matchingRecord'
          break
        case 'LOG_RECORD':
          str = 'loginRecord'
          break
        case 'IM_RECORD':
          str = 'imRecord'
          break
        default:
          str = 'info'
          break
      }
      location.href = `${window.location.origin}/#/operate/jump/${str}?userId=${userId}&userType=${userType}`
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      // this.resetForm('form')

    },
    /** 搜索按钮操作 */
    handleQuery() {
      console.log(this.queryParams.parmas.userCode)
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      if (this.queryParams.parmas.userId || this.queryParams.parmas.userCode) {
        this.getProviderInfoByPageAndParams()
      } else {
        this.$message({
          message: '请输入内容',
          type: 'error'
        });
      }
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: null,
          userCode: null,
          nickName: null,
          userType: 1
        }
      }
      this.umsInfos = []
      // this.resetForm('queryForm')
      // this.handleQuery()
    },
    clearClick(){
      this.queryParams.parmas.userCode = null
      this.umsInfos = []
    }
  }
}
</script>
