<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header"><span>基本信息</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%" id="table-min">
              <tbody>
                <tr>
                  <td id="title">
                    <div class="cell">昵称：</div>
                  </td>
                  <td>
                    <div class="cell">
                      {{ dataInfo.nickName }}
                    </div>
                  </td>
                  <td id="title">
                    <div class="cell">用户长ID：</div>
                  </td>
                  <td>
                    <div class="cell">
                      {{ dataInfo.userId }}
                    </div>
                  </td>
                  <td id="title">
                    <div class="cell">用户短ID： </div>
                  </td>
                  <td>
                    <div class="cell">
                      {{ dataInfo.userCode }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box">
        <el-card>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%; align: center">
              <tbody>
                <tr>
                  <td>删除类型</td>
                  <td>邮箱</td>
                </tr>
                <tr>
                  <td>删除账号</td>
                  <td>
                    {{dataInfo.email}}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="24" class="card-box">
        <el-card>
          <div slot="header"><span>审核结果</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 50%" id="table-min">
              <tbody>
                <tr>
                  <td>
                    <div class="cell" id="title">审核状态</div>
                  </td>
                  <td>
                    <el-radio-group v-model="auditFormData.auditStatus">
                      <el-radio :label="3">通过</el-radio>
                      <el-radio :label="2">不通过</el-radio>
                    </el-radio-group>

                  </td>
                </tr>
              </tbody>
            </table>
            <table cellspacing="0" style="width: 100%" id="table-min">
              <tbody>
                <tr>
                  <td style="width:150px">
                    <div class="cell" id="title">审核备注</div>
                  </td>
                  <td>
                    <el-input style="width:30%" type="textarea" :rows="2" placeholder="请输入内容" maxlength="200"
                      v-model="auditFormData.auditRemark">
                    </el-input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
      <el-button type="danger" @click="SubmitClick">提交审核结果</el-button>
    </el-row>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog title="修改状态" :visible.sync="open" width="400px" append-to-body>
      <el-radio-group v-model="radio">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">封禁</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import {
  submitAuditResult,
  getDataReview,
  applydetails,
  applyAudit
} from "@/api/operate/auditDetail/index.js";
import { getQueryString } from "../../../../utils/index";
export default {
  name: "Server",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 审核Id
      auditInfoId: null,
      // 用户类型
      auditType: null,
      // 资料类型
      auditUserId: null,
      // 资料信息
      dataInfo: {},
      open: false,
      radio: "1",
      // 审核资料
      auditFormData: {
        //    审核备注
        auditRemark: "",
        // 审核结果
        auditStatus: 1,
        //这条审核记录的Id
        auditId: getQueryString("auditId"),
      },
      typf: "",
      auditInfoId: getQueryString("auditId")
    };
  },
  mounted() {
    this.getDataReview();
  },
  methods: {
    /** 查询审核用户信息 */
    getDataReview() {
      this.loading = true;
      applydetails({ auditId: this.auditInfoId }).then((response) => {
        if (response.code == 200) {
          console.log(response.data, "数据");
          this.dataInfo = response.data;
        }
      });
    },
    // 修改状态
    handleUpdate(n) {
      this.open = true;
      this.radio = n;
      console.log(n);
    },
    // 状态确定
    submitForm() {
      console.log();
      this.open = false;
      updateUserStatus({
        userType: this.userType,
        userId: this.userId,
        userStatus: this.radio,
      }).then((res) => {
        if (res.code === 200) {
          this.getDataReview();
        }
      });
    },
    // 状态取消
    cancel() {
      this.open = false;
    },
    // 状态转文字
    asd(val) {
      switch (val) {
        case 1:
          return "正常";
        case 2:
          return "禁用";
        case 3:
          return "注销";
        case 4:
          return "冻结";
        case 5:
          return '未通过能力检测';
        default:
          return "--";
      }
    },
    // 状态转文字
    typesd(val) {
      switch (val) {
        case 1:
          return "昵称";
        case 2:
          return "头像";
        case 3:
          return "海报";
        case 4:
          return "视频";
        case 5:
          return "自我介绍";
        case 6:
          return "相册";
        default:
          return "--";
      }
    },
    //提交审核
    SubmitClick() {
      if (this.auditFormData.auditStatus != 1) {
        console.log(this.auditFormData);
        applyAudit(this.auditFormData).then((res) => {
          if (res.code == 200) {
            localStorage.clear("value");
            this.$message({
              message: "修改成功",
              type: "success",
            });
            window.history.go(-1);
          }
        });
      } else {
        this.$message({
          message: "请选择审核状态",
          type: "error",
        });
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
.demo-image__preview {
  display: flex;
  justify-content: flex-start;

  div {
    margin: 0 5px;
  }

}

.el-button {
  width: 300px;
  height: 90px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
  font-size: 18px;
}
#title{
  width: 100px;
}
</style>
  