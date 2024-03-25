<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="帐单流水" prop="id">
        <el-input
          v-model="queryParams.parmas.id"
          placeholder="请输入参数名称"
          clearable
          size="small"
          style="width: 240px"
        />
      </el-form-item>

      <el-form-item label="类型" prop="type">
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

    <el-table v-loading="loading" :data="coinRecordList">
      <el-table-column label="账单流水号" align="center" prop="id"/>
      <el-table-column label="类型" align="center" :formatter="typeFormat"/>
      <el-table-column label="金币数" align="center" prop="coins"/>
      <el-table-column label="剩余余额" align="center" prop="countCoin"/>
      <el-table-column label="时间" align="center" prop="time"/>
      <!--      <el-table-column label="对方ID" align="center" prop=""/>-->
      <el-table-column label="关联订单号" align="center" prop="orderId"/>
      <el-table-column label="备注" align="center" prop="remark"/>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getCoinBill"
    />
  </div>
</template>

<script>
import { getCoinBill } from '@/api/operate/jump/goldCoinBill'

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
      coinRecordList: [],
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
      //  交易类型
      typeOptions: [
        { value: 1, label: 'IM收入' },
        // { value: 2, label: '视频-匹配' },
        { value: 3, label: '视频' },
        { value: 4, label: '礼物' },
        { value: 5, label: '提现' }
      ],
      videoOptions: [
        { value: 1, label: '普通' },
        { value: 2, label: '匹配' },
        { value: 3, label: '富豪榜' }
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
    this.getCoinBill()
  },
  methods: {
    // 类型转化
    typeFormat(row) {
      let str = ''
      this.typeOptions.forEach((t) => {
        if (t.value === row.type) {
          str = t.label
          if (row.type === 3) {
            this.videoOptions.forEach(v => {
              if (v.value === row.videoType) {
                str = str + '-' + v.label
              }
            })
          }
        }
      })
      return str
    },
    /** 查询金币记录 */
    getCoinBill() {
      this.loading = true
      getCoinBill(this.queryParams).then((response) => {
        this.coinRecordList = response.data.list
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
      this.getCoinBill()
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
