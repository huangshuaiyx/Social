<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="流水号" prop="id">
        <el-input
          v-model="queryParams.parmas.id"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="类型" prop="rechargeChannel">
        <el-select
          v-model="queryParams.parmas.type"
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

      <!--      <el-form-item label="对方ID" prop="providerUserId">
              <el-input
                v-model="queryParams.parmas.providerUserId"
                placeholder="请输入参数名称"
                clearable
                size="small"
                style="width: 240px"
                @keyup.enter.native="handleQuery"
              />
            </el-form-item>-->

      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
        >搜索
        </el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
        >重置
        </el-button
        >
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="rechargeRecordList">
      <el-table-column label="流水号" align="center" prop="id"/>
      <el-table-column label="充值金额" align="center" prop="money"/>
      <el-table-column label="充值渠道" align="center" :formatter="rechargeChannelFormat"/>
      <el-table-column label="购买钻石" align="center" prop="buyDiamond"/>
      <el-table-column label="赠送钻石" align="center" prop="giveDiamond"/>
      <el-table-column label="创建时间" align="center" prop="createDateTime"/>
      <el-table-column label="支付时间" align="center" prop="paymentDateTime"/>
      <el-table-column label="状态" align="center" :formatter="paymentStatusFormat"/>
      <el-table-column label="备注" align="center" prop="remark"/>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getRechargeRecord } from '@/api/operate/jump/rechargeRecord'

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
      rechargeRecordList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          id: null, // 流水号
          type: null, // 类型
          userType: null,
          userId: null
        }
      },
      // 表单参数
      form: {},
      //  类型数据
      typeOptions: [
        { value: 1, label: 'Google pay' },
        { value: 2, label: 'Apple pay' }
      ],
      // 订单状态
      paymentStatusOptions: [
        { value: 1, label: '交易创建' },
        { value: 2, label: '支付关闭' },
        { value: 3, label: '支付成功' },
        { value: 4, label: '支付失败' },
        { value: 5, label: '交易结束' }
      ],
      // 用户id
      userId: null,
      // 用户类型
      userType: null
    }
  },
  mounted() {
    // 获取地址上的参数
    let str = window.location.href
    let urls = str.split('?')
    let params = urls[1].split('&')
    this.userId = params[0].split('=')[1]
    this.userType = params[1].split('=')[1]
    this.queryParams.parmas = {
      userId: this.userId,
      userType: this.userType
    }
    this.getList()
  },
  methods: {
    rechargeChannelFormat(row, column) {
      let str = ''
      this.typeOptions.forEach((t) => {
        if (t.value === row.rechargeChannel) {
          str = t.label
        }
      })
      return str
    },
    paymentStatusFormat(row, column) {
      let str = ''
      this.paymentStatusOptions.forEach((t) => {
        if (t.value === row.paymentStatus) {
          str = t.label
        }
      })
      return str
    },
    /** 查询审核主播列表 */
    getList() {
      this.loading = true
      getRechargeRecord(this.queryParams).then((response) => {
        this.rechargeRecordList = response.data.list
        this.total = response.data.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: this.userId,
          userType: this.userType
        }
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.queryParams.pageSize = 10
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userId: this.userId,
          userType: this.userType
        }
      }
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
