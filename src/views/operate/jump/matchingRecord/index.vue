<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="记录ID" prop="id">
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
      <!--      <el-form-item label="呼叫" prop="call">
              <el-select
                v-model="queryParams.call"
                placeholder="呼叫状态"
                clearable
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="dict in callOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="挂断" prop="hangUp">
              <el-select
                v-model="queryParams.hangUp"
                placeholder="挂断状态"
                clearable
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="dict in hangUpOptions"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                />
              </el-select>
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

    <el-table v-loading="loading" :data="matchList">
      <el-table-column label="记录ID" align="center" prop="id"/>
      <el-table-column label="类型" align="center" :formatter="typeFormat"/>
      <!--      <el-table-column label="呼叫" align="center" prop="userCode"/>-->
      <!--      <el-table-column label="挂断" align="center" prop="submitNum"/>-->
      <el-table-column label="对方ID" align="center" prop="toUserId"/>
      <el-table-column label="单价" align="center" prop="price"/>
      <el-table-column label="通话时长" align="center" prop="conversationTime"/>
      <el-table-column label="消耗匹配卡" align="center" :formatter="matchCardFormat"/>
      <el-table-column label="开始时间" align="center" prop="startTime"/>
      <el-table-column label="结束时间" align="center" prop="endTime"/>
      <el-table-column label="消耗钻石" align="center" prop="consumptionDiamond"/>
      <el-table-column label="获得金币" align="center" prop="getCoins"/>
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
import { getMatchRecord } from '@/api/operate/jump/matchingRecord'

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
      matchList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          id: null,
          type: null,
          userId: null,
          userType: null
        }
      },
      // 表单参数
      form: {},
      //  类型数据
      typeOptions: [
        { value: '1', label: '普通' },
        { value: '2', label: '匹配' },
        { value: '3', label: '富有榜' }
      ],
      // 呼叫数据
      callOptions: [
        { value: '1', label: '接通' },
        { value: '2', label: '未接通' }
      ],
      hangUpOptions: [
        { value: '1', label: '我方挂断' },
        { value: '2', label: '对方挂断' },
        { value: '3', label: '超时' },
        { value: '4', label: '余额不足' },
        { value: '5', label: '监控挂断' },
        { value: '6', label: '忙线' }
      ],
      userId: null,
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
    // 类型转化
    typeFormat(row, column) {
      let str = ''
      this.typeOptions.forEach((t) => {
        if (t.value === row.type) {
          str = t.label
        }
      })
      return str
    },
    matchCardFormat(row, column) {
      return row.matchCardStatus === 0 ? '否' : '是'
    },
    /** 查询审核主播列表 */
    getList() {
      this.loading = true
      getMatchRecord(this.queryParams).then((response) => {
        this.matchList = response.data.list
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
