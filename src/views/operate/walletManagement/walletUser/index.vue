<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="providerUserId">
        <el-input v-model="queryParams.userId" placeholder="请输入参数名称" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos">
      <el-table-column label="钱包ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="用户总余额" align="center" prop="userBalance" />
      <el-table-column label="用户可用余额
" align="center" prop="userUsableBalance" />
      <el-table-column label="用户冻结金额
" align="center" prop="userFrozenBalance" />
      <el-table-column label="用户首充状态
" align="center" prop="userFirstChargeStatus" />
      <el-table-column label="用户充值归属地区

" align="center" prop="userRechargeRegionCode" />

    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getUserInfoByPageAndParams" />
  </div>
</template>
<script>
import { selectWalletListByPage } from '@/api/operate/user/manager/manager'

export default {
  name: 'Manager',
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
        userType: 1,
        userId: null,
        productId: 1001,
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
    this.getUserInfoByPageAndParams()
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
    getUserInfoByPageAndParams() {
      this.loading = true
      selectWalletListByPage(this.queryParams).then(response => {
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
        case 'COIN_BILL':
          str = 'goldCoinBill'
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
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      this.getUserInfoByPageAndParams()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        userType: 1,
        productId: 1001,
      }
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
