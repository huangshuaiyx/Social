<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="78px">
      <el-form-item label="主播ID" prop="providerUserId">
        <el-input size="mini" v-model="queryParams.parmas.userId" placeholder="请输入主播ID" clearable style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="主播短ID" prop="userCode">
        <el-input size="mini" v-model="queryParams.parmas.userCode" placeholder="请输入主播短ID" clearable style="width: 120px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input size="mini" v-model="queryParams.parmas.nickName" placeholder="请输入昵称" clearable style="width: 120px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="代理号" prop="agentCode">
        <el-input size="mini" v-model="queryParams.parmas.agentCode" placeholder="请输入代理号" clearable style="width: 120px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="审核状态" prop="userStatus">
        <el-select clearable style="width: 120px" size="mini" v-model="queryParams.parmas.auditStatus"
          placeholder="请选择状态">
          <el-option v-for="item in auditStatusList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="等级" prop="levelCode">
        <el-select clearable style="width: 120px" size="mini" v-model="queryParams.parmas.levelCode"
          placeholder="请选择等级状态">
          <el-option v-for="item in gradeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营销状态" prop="marketStatus">
        <el-select clearable style="width: 120px" size="mini" v-model="queryParams.parmas.marketStatus"
          placeholder="请选择营销状态">
          <el-option v-for="item in marketList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="补贴状态" prop="incentivesStatus">
        <el-select clearable style="width: 120px" size="mini" v-model="queryParams.parmas.incentivesStatus"
          placeholder="请选择补贴状态">
          <el-option v-for="item in subsidyList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="主播标签" prop="providerTag">
        <el-select v-model="queryParams.parmas.providerTag" multiple placeholder="请选择主播标签">
          <el-option v-for="item in anchorlbelList" :key="item.id" :label="`${item.sortCode} ${item.text}`"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="注册时间">
        <el-date-picker size="mini" style="width: 240px" v-model="queryParams.parmas.logonTime"
          value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-"
          start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos" >
      <el-table-column label="主播ID" align="center" prop="userId" width="220" />
      <el-table-column label="昵称" align="center" prop="nickName" width="100" />
      <el-table-column label="代理号" align="center" prop="agentCode" width="100" />
      <el-table-column label="主播短ID" align="center" prop="userCode" width="120" />
      <!--（1-用户 2-服务者） -->
      <!-- <el-table-column label="类型" align="center" :formatter="userTypeFormat" /> -->
      <!-- （1-正常 2-禁用 3-注销） -->
      <el-table-column label="状态" align="center" :formatter="userStatusFormat" width="60"/>
      <el-table-column label="审核状态" align="center" prop="auditStatus" width="90">
        <template slot-scope="scoped">
          <span>{{ scoped.row.auditStatus | auditStatusFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="等级" align="center" prop="levelCode" width="100">
        <template slot-scope="scoped">
            <span>{{ scoped.row.levelCode }}</span>
            <span v-if="scoped.row.levelSource  ">({{ scoped.row.levelSource  }})</span>
        </template>
      </el-table-column>
      <el-table-column label="营销状态" align="center" prop="marketStatus" width="80">
        <template slot-scope="scoped">
          <span>{{ scoped.row.marketStatus | statusfilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补贴状态" align="center" prop="incentivesStatus"  width="80">
        <template slot-scope="scoped">
          <span>{{ scoped.row.incentivesStatus | statusfilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主播标签" align="center" prop="providerTags" width="200px">
        <template slot-scope="scoped">
          <div style="display: flex;">
            <p style="display: flex;justify-content:flex-start;flex-wrap: wrap;">
              <span style="display: block;width: auto;margin-left: 5px;"
                v-for="(x, i) in scoped.row.providerTags != null ? scoped.row.providerTags : []">{{ x.startColor }}{{
                  x.text }},</span>
            </p>
            <el-button style="margin-left: 5px;" type="text" @click="editAnchorlbel(scoped.row)">修改</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="注册时间" align="center" prop="regTime" width="150" />
      <el-table-column label="金币余额" align="center" prop="coinBalance" width="100" />
      <el-table-column label="操作" align="center" width="500" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'BASE_INFO')">基本资料
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'COIN_BILL')">金币账单
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'VIDEO_RECORD')">视频记录
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'MATCH_RECORD')">匹配记录
          </el-button>
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'LOG_RECORD')">登陆记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="主播标签" :visible.sync="anchorlbeldialogVisible" width="30%" :before-close="anchorlbelcancle" :center="true" top="30vh !important">
      <div class="anchorlbelcontent">
        <div class="item" v-for="(item, index) in anchorlbelList" :key="index">
          <el-checkbox-group v-model="anchorlbelcheckList" @change="handleCheckedCitiesChange">
            <el-checkbox :label="item.id">{{ item.sortCode }}-{{ item.text }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="anchorlbelcancle">取 消</el-button>
        <el-button size="mini" type="primary" @click="anchorlbelsubmit">确 定</el-button>
      </span>
    </el-dialog>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getUserInfoByPageAndParams" />
  </div>
</template>
<script>
import { getListForOperateApi, editanchorlbelApi, getProviderTags, updateProviderTag } from '@/api/operate/user/manager/manager'

export default {
  filters: {
    statusfilter(val) {
      if (val == 1) {
        return '是'
      }
      return '否'
    },
    auditStatusFilter(val) {
      if (val == 1) return '审核中'
      if (val == 2) return '审核失败'
      if (val == 3) return '审核成功'
      if (val == 4) return '编辑中'
      if (val == 0) return '未填写信息'
    },
  },
  name: 'Manager',
  data() {
    return {
      subsidyList: [
        { value: 1, label: '是' },
        { value: 0, label: '否' },
      ],
      anchorlbelcheckList: [],
      anchorlbeldialogVisible: false,
      anchorlbelList: [
      ],
      marketList: [
        { value: 1, label: '是' },
        { value: 0, label: '否' },
      ],
      gradeList: [
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
        { value: 'E', label: 'E' },
        { value: 'T', label: 'T' },
        { value: 'F', label: 'F' },
      ],
      statusList: [
        { value: 1, label: '正常' },
        { value: 2, label: '封禁' },
        { value: 4, label: '冻结' },
        { value: 5, label: '未通过能力检测' },
      ],
      auditStatusList: [
        { value: 1, label: '审核中' },
        { value: 2, label: '审核失败' },
        { value: 3, label: '审核成功' },
        { value: 4, label: '编辑中' },
        { value: 0, label: '未填写信息' },
      ],
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
          logonTime: [],
          levelCode: null,
          marketStatus: null,
          incentivesStatus: null,
          anchorlbel: null,
          userStatus: null,
          userId: null,
          userCode: null,
          nickName: null,
          agentCode: null,
          auditStatus: null
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
        { value: 3, label: '注销' },
        { value: 4, label: '冻结' },
        { value: 5, label: '未通过能力检测' },
      ],
      userId: '',
      anchorlList: []
    }
  },
  created() {
    console.log(this.$route.query.userCode);
    this.queryParams.parmas.userCode = this.$route.query.userCode ? this.$route.query.userCode : null
    this.getUserInfoByPageAndParams()
    this.getProviderTagsd()
  },
  methods: {
    // 遍历
    providerTagsArr(val) {
      if (val != null) {
        val.map(x => {
          console.log(x)
          return <p>{x.sortCode}edede </p>
        })
      }

    },
    // 选择多谢
    handleCheckedCitiesChange(val) {
      let ert = [...new Set(val)]
      let asd = []
      console.log(ert, '111111111111111111111111')
      ert.map(x => {
        console.log(x)
        let ssd = { "tagId": x, "userId": this.userId }
        asd.push(ssd)
      })
      this.anchorlList = asd
    },
    // 查询主播标签
    getProviderTagsd() {
      getProviderTags({ "bizType": 8 }).then(res => {
        if (res.code == 200) {
          this.anchorlbelList = res.data
          console.log(this.anchorlbelList)
        }
      })
    },
    // 修改标签
    editAnchorlbel(vcal) {
      this.anchorlbeldialogVisible = true
      this.userId = vcal.userId
      let asd = []

      if (vcal.providerTags.length > 0) {
        const arrs = vcal.providerTags.filter((item, index) =>
          vcal.providerTags.findIndex(i => i.id === item.id) === index);
        console.log(arrs, '点击修改666666666666666666')
        arrs.map(x => {
          let obj = { "tagId": "", "userId": vcal.userId }
          this.anchorlbelcheckList.push(x.id)
          obj.tagId = x.id
          asd.push(obj)
        })
      }

      this.anchorlList = asd
      console.log(asd, this.anchorlList, '55555555555555')
    },
    anchorlbelcancle() {
      this.anchorlbeldialogVisible = false
      this.anchorlbelcheckList = []
    },
    anchorlbelsubmit() {
      let arr = [...new Set(this.anchorlList)]
      console.log(arr, this.anchorlList, '确定3333333333333333333')
      if (arr.length == 0) {
        arr.push({ userId: this.userId })
      }
      try {
        updateProviderTag(arr).then(res => {
          if (res.code == 200) {
            this.anchorlbeldialogVisible = false
            this.anchorlbelcheckList = []
            this.anchorlList = []
            this.$message.success('修改成功!')
            this.getUserInfoByPageAndParams()
          }
        })
      } catch (error) {
        console.log('1');
        this.$message.error(error.msg)
      }
    },
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
      let obj = {
        ...this.queryParams
      }
      obj.parmas.startRegTime = this.queryParams.parmas.logonTime ? this.queryParams.parmas.logonTime[0] : null
      obj.parmas.endRegTime = this.queryParams.parmas.logonTime ? this.queryParams.parmas.logonTime[1] : null
      obj.parmas.userId = obj.parmas.userId ? obj.parmas.userId : null
      Object.keys(obj.parmas).forEach(item => {
        if (!obj.parmas[item] && obj.parmas[item] !== 0) {
          obj.parmas[item] = null
        }
      })
      try {
        getListForOperateApi(obj).then(response => {
          this.umsInfos = response.data.list
          this.total = response.data.total
          this.loading = false
        }
        )
      } catch (error) {

      } finally {
        this.loading = false
      }
    },
    /** 跳转审核页面 */
    handleCheck(row, type) {
      let userId = row.userId
      // let userType = row.userType
      let userType = 2

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
    //   location.href = `${window.location.origin}/#/operate/jump/${str}?userId=${userId}&userType=${userType}`
      window.open(`${window.location.origin}/#/operate/jump/${str}?userId=${userId}&userType=${userType}`)
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
        parmas: {
          logonTime: [],
          levelCode: null,
          marketStatus: null,
          incentivesStatus: null,
          anchorlbel: null,
          userStatus: null,
          userId: null,
          userCode: null,
          nickName: null,
          agentCode: null,
          auditStatus: null
        }
      }
      this.resetForm('queryForm')
      this.handleQuery()
    }
  }
}
</script>
<style scoped lang="scss">
.app-container {
  .anchorlbelcontent {
    display: flex;
    flex-wrap: wrap;

    .item {
      margin: 0px 10px 10px 0px;
    }
  }
}
</style>
