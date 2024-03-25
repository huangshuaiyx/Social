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
                    <div class="cell">昵称</div>
                  </td>
                  <td>
                    <div class="cell">
                      {{ dataInfo.nickname }}
                    </div>
                  </td>
                  <td id="title">
                    <div class="cell">ID</div>
                  </td>
                  <td>
                    <div class="cell" v-if="dataInfo.userCode">
                      {{ dataInfo.userCode }}
                    </div>
                  </td>
                  <td id="title">
                    <div class="cell">角色</div>
                  </td>
                  <td>
                    <div class="cell" v-if="auditFormData.auditInfoType">
                      {{ dataInfo.userTypeStr }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td id="title">
                    <div class="cell">注册账号</div>
                  </td>
                  <td>
                    <div class="cell" v-if="dataInfo.userCode">
                      {{ dataInfo.userCode }}
                    </div>
                  </td>
                  <td id="title">
                    <div class="cell">注册时间</div>
                  </td>
                  <td>
                    <div class="cell" v-if="dataInfo.regTime">
                      {{ dataInfo.regTime }}
                    </div>
                  </td>
                  <td id="title">
                    <div class="cell">注册渠道</div>
                  </td>
                  <td>
                    <div class="cell" v-if="dataInfo.platform">
                      {{ dataInfo.platform }}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td id="title">
                    <div class="cell">用户状态</div>
                  </td>
                  <td>
                    <div class="cell" v-if="dataInfo.userStatus">
                      {{ asd(dataInfo.userStatus) }}
                      <!-- <el-button
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        @click="handleUpdate(dataInfo.userStatus)"
                        >修改
                      </el-button> -->
                    </div>
                  </td>
                  <td id="title">
                    <div class="cell">代理人</div>
                  </td>
                  <td>
                    <div class="cell" v-if="dataInfo.agents">
                      {{ dataInfo.agents }}
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
          <div slot="header"><span>修改资料信息</span></div>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%; align: center">
              <tbody>
                <tr>
                  <td>修改内容</td>
                  <td>修改后</td>
                  <td>修改前</td>
                </tr>
                <tr>
                  <td>{{ typf }}</td>
                  <td>
                    <template>
                      <span v-if="
                        auditFormData.auditInfoType == 1 ||
                        auditFormData.auditInfoType == 5
                      ">
                        {{ dataInfo.afterValue }}</span>
                      <el-popover trigger="hover" placement="top" prop="afterValue" v-if="
                        auditFormData.auditInfoType == 2 ||
                        auditFormData.auditInfoType == 3
                      ">
                        <img :src="dataInfo.afterValue" alt="" style="width: 200px" />
                        <div slot="reference" class="name-wrapper">
                          <img :src="dataInfo.afterValue" style="width: 40px" alt="" />
                        </div>
                      </el-popover>
                      <!-- 判断是相册 -->
                      <div class="demo-image__preview" v-if="auditFormData.auditInfoType == 6">

                        <div v-for="(item, i) in dataInfo.afterValue" :key="i">
                          <el-image style="width: 40px; height: 40px" :src="
                            item
                          " :preview-src-list="
                            dataInfo.afterValue != null
                          ? dataInfo.afterValue
                          : []">
                            <div slot="error" class="image-slot">
                              <i class="el-icon-picture-outline" size="20px"></i>
                            </div>
                          </el-image>
                        </div>

                      </div>

                      <el-popover trigger="hover" placement="top" prop="afterValue"
                        v-if="auditFormData.auditInfoType == 4">
                        <video width="150" height="150" controls>
                          <source :src="dataInfo.afterValue" type="video/mp4" />
                        </video>
                        <div slot="reference" class="name-wrapper">
                          <video width="60" height="60" controls>
                            <source :src="dataInfo.afterValue" type="video/mp4" />
                          </video>
                        </div>
                      </el-popover>
                    </template>
                  </td>
                  <td>
                    <template>
                      <span v-if="
                        auditFormData.auditInfoType == 1 ||
                        auditFormData.auditInfoType == 5
                      ">
                        {{ dataInfo.beforeValue }}</span>
                      <el-popover trigger="hover" placement="top" prop="beforeValue" v-if="
                        auditFormData.auditInfoType == 2 ||
                        auditFormData.auditInfoType == 3
                      ">
                        <img :src="dataInfo.beforeValue" alt="" style="width: 200px" />
                        <div slot="reference" class="name-wrapper">
                          <img :src="dataInfo.beforeValue" style="width: 40px" alt="" />
                        </div>
                      </el-popover>
                      <!-- 判断是相册 -->
                      <div class="demo-image__preview" v-if="auditFormData.auditInfoType == 6">
                        <el-image style="width: 40px; height: 40px" :src="
                          dataInfo.beforeValue != null
                            ? dataInfo.beforeValue[0]
                            : ''
                        " :preview-src-list="
                          dataInfo.beforeValue != null
                            ? dataInfo.beforeValue
                            : []
                        ">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline" size="20px"></i>
                          </div>
                        </el-image>
                      </div>

                      <el-popover trigger="hover" placement="top" prop="beforeValue"
                        v-if="auditFormData.auditInfoType == 4">
                        <video width="200" height="200" controls>
                          <source :src="dataInfo.beforeValue" type="video/mp4" />
                        </video>
                        <div slot="reference" class="name-wrapper">
                          <video width="60" height="60" controls>
                            <source :src="dataInfo.beforeValue" type="video/mp4" />
                          </video>
                        </div>
                      </el-popover>
                    </template>
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
                    <el-radio v-model="auditFormData.auditStatus" label="1">审核中</el-radio>
                    <el-radio v-model="auditFormData.auditStatus" label="2">审核失败</el-radio>
                    <el-radio v-model="auditFormData.auditStatus" label="3">审核成功</el-radio>
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellspacing="0" style="width: 100%" id="table-min">
              <tbody>
                <tr>
                  <td>
                    <div class="cell" id="title">审核备注</div>
                  </td>
                  <td>
                    <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="auditFormData.auditRemark">
                    </el-input>
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellspacing="0" style="width: 20%; margin-top: 15px">
              <tbody>
                <tr align="center">
                  <el-button type="primary" @click="submit">提交审核</el-button>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>
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
} from "@/api/operate/auditDetail/index.js";

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
        auditStatus: "1",
        // 资料类型
        auditInfoType: "",
        //被审核用户的id
        auditInfoUserId: "",
        //被审核用户的类型
        auditInfoUserType: 2,
        // 这条审核记录的Id
        auditInfoId: "",
      },
      typf: "",
    };
  },
  mounted() {
    this.getDataReview();
  },
  methods: {
    /** 查询审核用户信息 */
    getDataReview() {
      this.loading = true;
      let data = JSON.parse(localStorage.getItem("value"));
      this.typf = this.typesd(data.auditType);
      this.auditFormData.auditInfoType = JSON.parse(
        localStorage.getItem("value")
      ).auditType;
      this.auditFormData.auditInfoId = JSON.parse(
        localStorage.getItem("value")
      ).auditInfoId;
      this.auditFormData.auditInfoUserId = JSON.parse(
        localStorage.getItem("value")
      ).auditUserId;
      getDataReview(data).then((response) => {
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
    submit() {
      if (this.auditFormData.auditStatus != 1) {
        console.log(this.auditFormData);
        submitAuditResult(this.auditFormData).then((res) => {
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
          message: "默认是审核中",
          type: "warning",
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
</style>
