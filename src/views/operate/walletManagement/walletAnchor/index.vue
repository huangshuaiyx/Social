<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="providerUserId">
        <el-input v-model="queryParams.userId" placeholder="请输入参数名称" clearable size="small" style="width: 240px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <div class="qiangxing">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <el-upload class="upload-demo" ref="upload" action="#" :format="['xls', 'xlsx']" accept=".xls,.xlsx"
            :auto-upload="false" :file-list="fileList" :on-change="handleChange" multiple :show-file-list="false">
            <el-button class="pan-btn yellow-btn ">主播金额结算</el-button>
          </el-upload>

        </div>

      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos">
      <el-table-column label="钱包ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="主播总余额
" align="center" prop="providerBalance" />
      <el-table-column label="主播可提现余额

" align="center" prop="providerUsableBalance" />
      <el-table-column label="主播冻结余额

" align="center" prop="providerFrozenBalance" />
      <el-table-column label="钱包状态
" align="center" prop="userFirstChargeStatus" :formatter="userTypeFormat" style="width: 140px" />
      <el-table-column label="操作" align="center" width="600">
        <template slot-scope="scope">
          <el-button type="primary" round size="small" @click=" /**运营分禁用 */
          addJinbi(scope.row, 'add')">增加金币
          </el-button>
          <el-button type="primary" round size="small" @click=" /**运营分禁用 */
          addJinbi(scope.row, 'duce')">减少金币
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" />

    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getUserInfoByPageAndParams" />

    <el-dialog title="增加金币" :visible.sync="operationDisabled" width="40%" center>
       <p>标题</p>
      <el-input v-model="operationText" type="text" placeholder="请输入标题" :maxlength="256"></el-input>
      <p>金额</p>
      <el-input v-model="operationInput" type="number" placeholder="请输入金额"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="operationDisabled = false">取 消</el-button>
        <el-button type="primary" @click="operationUpdate">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="减少金币" :visible.sync="operationJian" width="40%" center>
     <p>标题</p>
      <el-input v-model="operationText" type="text" placeholder="请输入标题" :maxlength="256"></el-input>
      <p>金额</p>
      <el-input v-model="operationInput" type="number" placeholder="请输入金额"></el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="operationJian = false">取 消</el-button>
        <el-button type="primary" @click="operationn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { selectWalletListByPage, importAddMoney, addProviderBalance } from '@/api/operate/user/manager/manager'

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
        userType: 2,
        userId: null,
        productId: 2001,
      },
      // 表单参数
      form: {},
      userTypeOptions: [
        { value: 0, label: '正常' },
        { value: 1, label: '冻结' }
      ],
      userStatusOptions: [
        { value: 1, label: '正常' },
        { value: 2, label: '禁用' },
        { value: 3, label: '注销' }
      ],
      fileList: [],
      file: [],
      /**加金币 */
      operationDisabled: false,
      /**减金币 */
      operationJian: false,
      operationInput: null,
      userIdIn: "",
      operationText:null
    }
  },
  created() {
    this.getUserInfoByPageAndParams()
  },
  methods: {
    userTypeFormat(row) {
      let str = ''
      this.userTypeOptions.forEach((t) => {
        if (t.value === row.userFirstChargeStatus) {
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
        userType: 2,
        productId: 2001,
      }
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /**金币增加减少 */
    addJinbi(val, acv) {
      this.userIdIn = val.userId;
      this.operationInput = null;
      this.operationText = null;
      if (acv == "duce") {
        this.operationJian = true
      } else {
        this.operationDisabled = true;
      }
    },
    handleChange(file, fileList) {
      console.log(file.raw, fileList)
      this.faceloading = true;
      let data = new FormData();
      data.append("file", file.raw);
      importAddMoney(data).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "成功",
          });
        }
      })
    },
    // 增加金币
    operationUpdate() {
      if (this.operationInput != null  && this.operationText != null) {
        addProviderBalance({
          title: this.operationText,
          tradeAmount: `+${this.operationInput}`,
          userId: this.userIdIn,
        }).then((res) => {
          console.log(res)
          if (res.code == 200) {
            this.operationDisabled = false;
            this.getUserInfoByPageAndParams();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请输入金币/标题",
        });
      }

    },
    // 减少金币
    operationn() {
      if (this.operationInput != null && this.operationText != null) {
        addProviderBalance({
          title: this.operationText,
          tradeAmount: `-${this.operationInput}`,
          userId: this.userIdIn,
        }).then((res) => {
          if (res.code == 200) {
            this.operationJian = false;
            this.getUserInfoByPageAndParams();
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请输入金币/标题",
        });
      }

    },

  }
}
</script>


<style lang="scss" scoped>
.qiangxing {
  width: auto;
  display: flex;
  line-height: 36px;
  height: 36px;
  margin-left: 10px;

  .upload-demo {
    margin: 0 10px;
    height: 35px;
    line-height: 35px;

    .pan-btn {
      padding: 10px 13px;
      border-radius: 4px;
    }
  }

}
</style>