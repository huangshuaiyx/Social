<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="记录ID" prop="id">
        <el-input v-model="queryParams.parmas.id" placeholder="请输入参数名称" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="类型" prop="type">
        <el-select v-model="queryParams.parmas.type" placeholder="请选择类型" clearable size="small" style="width: 240px">
          <el-option v-for="dict in typeOptions" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="发起状态" prop="inviteStatus">
        <el-select v-model="queryParams.parmas.inviteStatus" placeholder="请选择发起类型" clearable size="small"
          style="width: 240px">
          <el-option v-for="dict in typeInitiate" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="处理状态" prop="receivedStatus">
        <el-select v-model="queryParams.parmas.receivedStatus" placeholder="请选择处理类型" clearable size="small"
          style="width: 240px">
          <el-option v-for="dict in typeHandle" :key="dict.value" :label="dict.label" :value="dict.value" />
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
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="videoList">
      <el-table-column label="记录ID" align="center" prop="id" />
      <el-table-column label="类型" align="center" :formatter="typeFormat" />
      <el-table-column label="发起状态" align="center" :formatter="callFormat" />
      <el-table-column label="处理状态" align="center" :formatter="callreceive" />
      <el-table-column label="来源" align="center" prop="type" :formatter="sourcetype" />
      <el-table-column label="呼叫方" align="center" prop="callerRole" :formatter="callRelationtype" />
      <el-table-column label="对方ID" align="center" prop="toUserId" />
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="优惠时长" align="center" prop="freeTime" />
      <el-table-column label="通话时长" align="center" prop="conversationTime" />
      <el-table-column label="开始时间" align="center" prop="startTime" />
      <el-table-column label="结束时间" align="center" prop="endTime" />
      <el-table-column label="消耗钻石" align="center" prop="consumptionDiamond" />
      <el-table-column label="获得金币" align="center" prop="getCoins" />
      <el-table-column label="在线状态" align="center" prop="onlineState" :formatter='statusType' />
      <el-table-column label="gowork状态" align="center" prop="workState" />
      <el-table-column label="superwork状态" align="center" prop="buffState" />
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getVideoRecordList" />
  </div>
</template>

<script>
import { getVideoRecord } from '@/api/operate/jump/videoRecording'

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
      videoList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          id: null,
          type: null,
          userId: null,
          userType: null,
          receivedStatus: null,
          inviteStatus: null
        }
      },
      // 表单参数
      form: {},
      //  类型数据
      typeOptions: [
        { value: '1', label: '1v1视频' },
        { value: '2', label: '匹配' },
        { value: '5', label: '转接' }
      ],
      typeInitiate: [
        { value: 'invite', label: '主叫' },
        { value: 'cancel', label: '邀请机制' },
        { value: 'timeoutCancel', label: '超时取消' },
        { value: 'unknown', label: '未知' }
      ],
      typeHandle: [
        { value: 'accept', label: '接受' },
        { value: 'reject', label: '拒绝' },
        { value: 'timeoutReject', label: '超时拒绝' },
        { value: 'RejectWhenInvite', label: '主叫时拒绝' },
        { value: 'RejectWhenInviteReceived', label: '被叫时拒绝' },
        { value: 'RejectWhenCalling', label: '通话中拒绝' },
        { value: 'unknown', label: '未知' },
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
    this.getVideoRecordList()
  },
  methods: {
    callFormat(row) {
      let str = ''
      this.typeInitiate.forEach((t) => {
        if (t.value === row.inviteStatus) {
          str = t.label
        }
      })
      return str
    },
    // 类型转化
    typeFormat(row) {
      let str = ''
      this.typeOptions.forEach((t) => {
        if (t.value === row.type) {
          str = t.label
        }
      })
      return str
    },
    // 类型转化
    callreceive(row) {
      let str = ''
      this.typeHandle.forEach((t) => {
        if (t.value === row.receivedStatus) {
          str = t.label
        }
      })
      return str
    },
    /** 查询审核主播列表 */
    getVideoRecordList() {
      this.loading = true
      getVideoRecord(this.queryParams).then((response) => {
        this.videoList = response.data.list
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
      this.getVideoRecordList()
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
    },
    statusType(val) {
      switch (val.onlineState) {
        case 'green1':
          return <span style="color:green">绿1</span>;
        case 'green2':
          return <span style="color:green">绿2</span>;
        case 'green3':
          return <span style="color:green">绿3</span>;
        case 'yellow1':
          return <span style="color:#b5b500">黄1</span>;
        case 'yellow2':
          return <span style="color:#b5b500">黄2</span>;
        case 'yellow3':
          return <span style="color:#b5b500">黄3</span>;
        case 'red1':
          return <span style="color:red">红1</span>;
        case 'red2':
          return <span style="color:red">红2</span>;
        case 'red3':
          return <span style="color:red">红3</span>;
        case 'red4':
          return <span style="color:red">红4</span>;
        default:
          return "--";
      }
    },
    sourcetype(val) {
      switch (val.source) {
        case 'popular':
          return '欢迎页';
        case 'discover':
          return '匹配 ';
        case 'personal':
          return '主播个人页';
        case 'imConversation':
          return 'IM会话页';
        case 'video':
          return '短视频页';
        case 'callHistoryAll':
          return 'call all页面';
        case 'callHistoryMissed':
          return 'call missed页面';
        case 'callHistoryMatches':
          return 'call matches页面';
        case 'myfansTopfans':
          return 'myfans topfans页面';
        case 'myfansFollower':
          return 'myfans follower页面';
        case 'myfansFollowing':
          return 'myfans following页面';
        case 'imConversation':
          return 'IM会话详情页面';
        case 'homePopupMissedCall':
          return '首页未接来电弹窗页面';
        default:
          return val.source;
      }
    },
    callRelationtype(val) {
      switch (val.callerRole) {
        case '1':
          return '用户';
        case '2':
          return '主播';
        default:
          return "--";
      }
    }

  }
} 
</script>
