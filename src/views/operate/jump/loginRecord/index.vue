<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="loginRecordList">
      <el-table-column label="登陆时间" align="center" prop="time"/>
      <el-table-column label="登录IP" align="center" prop="ip"/>
      <el-table-column label="登录设备号" align="center" prop="deviceId"/>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getLoginRecord } from '@/api/operate/jump/loginRecord'

export default {
  name: 'Config',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 参数表格数据
      loginRecordList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          userType: null,
          userId: null
        }
      },
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
  created() {

  },
  methods: {
    /** 查询审核主播列表 */
    getList() {
      this.loading = true
      getLoginRecord(this.queryParams).then(response => {
          this.loginRecordList = response.data.list
          this.total = response.data.total
          this.loading = false
        }
      )
    },
  }
}
</script>
