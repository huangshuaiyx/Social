<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="88px">
      <el-form-item label="记录ID：" prop="id">
        <el-input size="mini" placeholder="请输入内容" clearable v-model="queryParams.parmas.id" class="input-with-select">
        </el-input>
      </el-form-item>
      <el-form-item label="主播短ID：" prop="userCode">
        <el-input size="mini" placeholder="请输入内容" clearable v-model="queryParams.parmas.userCode" class="input-with-select">
        </el-input>
      </el-form-item>
      <el-form-item label="昵称：" prop="nickName">
        <el-input size="mini" placeholder="请输入内容" clearable v-model="queryParams.parmas.nickName" class="input-with-select">
        </el-input>
      </el-form-item>
      <el-form-item label="等级" prop="levelCode">
        <el-select size="mini" clearable  v-model="queryParams.parmas.levelCode" placeholder="请选择等级">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最后登入时间" prop="logoTime" label-width="100"> 
        <el-date-picker size="mini" style="width: 240px" v-model="queryParams.parmas.logoTime" value-format='yyyy-MM-dd HH:mm:ss' :default-time="['00:00:00', '23:59:59']" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <!-- <el-button type="primary" size="mini" @click="handleCheck(null, 'add')" style="width: 100px">添加</el-button> -->
        <el-button @click="handleQuery" size="mini" type="primary"
          style="background-color: #1890ff; color: #fff;width: 100px">搜索
        </el-button>
        <el-button type="primary" size="mini" @click="resetQuery" style="width: 100px">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="umsInfos">
      <el-table-column label="记录ID" align="center" prop="id" width="220" />
      <el-table-column label="主播长ID" align="center" prop="userId" width="250" />
      <el-table-column label="主播代码" align="center" prop="userCode" width="120" />
      <el-table-column label="昵称" align="center" prop="nickName" />
      <el-table-column label="等级" align="center" prop="addTime" width="250">
        <template slot-scope="scoped">
            <span>{{ scoped.row.levelCode | statusFilter }}</span>
            <span v-if="scoped.row.levelSource  ">({{ scoped.row.levelSource  }})</span>
        </template>
      </el-table-column>
      <el-table-column label="当前视频" align="center" prop="url" width="120">
        <template slot-scope="scope">
          <video width="100px" height="100px" controls="true"  :src="scope.row.url"></video>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="250" />
      <el-table-column label="最后登入时间" align="center" prop="lastLoginTime" width="250" />

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" round size="small" @click="handleCheck(scope.row, 'edit')">更新
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getVideoList" />

    <!-- 添加资料 -->
    <el-dialog title="" :visible.sync="addData" width="90%" center :close-on-press-escape="false"
      :close-on-click-modal="false">
      <div>
        <el-col :span="24" class="card-box">
          <el-card>
            <div slot="header"><span>基本信息</span>
            </div>
            <div class="el-table el-table--enable-row-hover el-table--medium">
              <table cellspacing="0" style="width: 100%" id="table-min">
                <tbody>
                  <tr>
                    <td>
                      <div class="cell">昵称:</div>
                    </td>
                    <td>
                      <div class="cell">
                        {{ providerInfo.nickName }}
                      </div>
                    </td>
                    <td>
                      <div class="cell">主播长ID:</div>
                    </td>
                    <td>
                      <div class="cell">
                        {{ providerInfo.userId }}
                      </div>
                    </td>
                    <td>
                      <div class="cell">主播短ID:</div>
                    </td>
                    <td>
                      <div class="cell">
                        {{ providerInfo.userCode }}
                      </div>
                    </td>
                    <td>
                      <div class="cell">自拍/头像:</div>
                    </td>
                    <td>
                      <div class="cell">
                        <el-image style="width: 100px; height: 100px" :src="providerInfo.face"
                          :preview-src-list="[providerInfo.face]" fit="cover">
                          <div slot="error" class="image-slot" style="line-height:100px">
                            <!-- <i class="el-icon-picture-outline" style="line-height: 50px;"></i> -->
                            --
                          </div>
                        </el-image>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-card>
        </el-col>
      </div>
      <div class="video">
        <div>
          <p>原审核视频</p>
          <video width="200px" height="178px" :src="originalUrl" controls="controls" autoplay
            v-if="originalUrl != null"></video>
          <p v-else style="margin-top: 100px;">--</p>
          <!-- <p
            @click="daonload(originalUrl, 'test_video')" v-if="originalUrl != null">
            下载</p> -->
        </div>
        <div>
          <p>当前视频</p>
          <video width="300px" height="178px" :src="lastUrl" controls="controls" autoplay
            v-if="lastUrl != null"></video>
          <p v-else style="margin-top: 100px;">--</p>
          <!-- <p
            @click="daonload(lastUrl, 'test_video')" v-if="lastUrl != null">
            下载</p> -->
        </div>
        <div>
          <p>*更新视频（必选）</p>
          <!-- <el-upload accept="video/mp4" :limit="1" ref="videoUpload" :action="url"
            list-type="picture-card" :on-success="videoSuccess" :on-remove="removeUpload">
            <i class="el-icon-plus"></i>

          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <video id="upvideo" autoplay :src="formData.url" controls></video>
          </el-dialog> -->
          <el-upload class="avatar-uploader" accept="video/mp4" :action="url" v-bind:on-progress="uploadVideoProcess"
            v-bind:on-success="videoSuccess" v-bind:show-file-list="false">
            <video v-if="formData.url != null && !dialogVisible" :src="formData.url" class="avatar video-avatar"
              controls="controls">
              您的浏览器不支持视频播放
            </video>
            <i v-else-if="formData.url == null && !dialogVisible" class="el-icon-plus avatar-uploader-icon"></i>
            <el-progress v-if="dialogVisible == true" type="circle" v-bind:percentage="videoUploadPercent"
              style="margin-top: 7px"></el-progress>
          </el-upload>
        </div>
        <div>
          <p>*更新封面1（必选）</p>
          <el-upload class="avatar-uploader" :action="url" :auto-upload="false" :show-file-list="false"
            :on-change="handleAvatarChangeIconZ" v-loading="imageloading" accept=".jpg,.jpeg,.png">
            <img v-if="formData.coverUrl" :src="formData.coverUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div>
        <div slot="header"><span>历史更新信息</span></div>
        <el-table v-loading="loading" :data="operationHistory" height="150px">
          <el-table-column label="更新时间" align="center" prop="operationTime" />
          <el-table-column label="审核人" align="center" prop="operator" />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button :disabled="disabledType || photoDisabledType" type="primary" style="width: 250px;height: 70px;font-size: 25px;"
          @click="determineOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  saveStrategyMessageFullContent,
  increaseStrategyMessageTemplate,
} from "@/api/operate/strategy/index";

import { upbaseUrl } from "../../../../config/index"

import {
  uploadImg,
} from "@/api/operate/marketingAnchor/anchorList/index";

import {
  getVideoList,
  updateVideo,
  getVideoDetails
} from "@/api/operate/examine/audit/audit";

import { getQueryString } from "../../../../utils/index"

export default {
    filters:{
        statusFilter(val){
            if(val == 'S') return 'S'
            if(val == 'A') return 'A'
            if(val == 'B') return 'B'
            if(val == 'C') return 'C'
            if(val == 'D') return 'D'
            if(val == 'E') return 'E'
            if(val == 'F') return 'F'
            if(val == 'T') return 'T'
            if(val == 'F') return 'F'
        }
    },
  name: "Config",
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
      // 表格数据
      umsInfos: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          id: null,
          userCode: null,
          nickName: null,
          levelCode: null,
          logoTime: [],
          status: 1,
        },
      },

      // 表单参数
      formData: {
        id: null,
        url: null,
        coverUrl: null,
      },
      options: [
        { value: 'S',label: "S",},
        { value: 'A',label: "A",},
        { value: 'B',label: "B",},
        { value: 'C',label: "C",},
        { value: 'D',label: "D",},
        { value: 'E',label: "E",},
        { value: 'F',label: "F",},
        { value: 'T',label: "T",},
      ],
      values: "1",
      /**资料弹框 */
      addData: false,
      imageloading: false,
      dialogImageUrl: "",
      pathUrl: "",
      url: `${upbaseUrl}/third/resource/uploadAndGetFileInformation`,
      // objData:{}
      dialogVisible: false,
      //进度条的进度，
      isShowUploadVideo: false,
      //是否显示进度条
      videoUploadPercent: "",
      videoForm: {
        showVideoPath: "",  //回显的变量
      },
      operationHistory: [],
      providerInfo: {},
      // 原视频
      originalUrl: "",
      // 当前视频
      lastUrl: "",
      disabledType: true,
      photoDisabledType: true
    };
  },
  created() {
    this.getVideoList();
  },
  methods: {
    /** 查询用户信息 */
    getVideoList() {
        Object.keys(this.queryParams.parmas).forEach(item => {
            if (['logoTime'].includes(item) && !this.queryParams.parmas[item]) {
                this.queryParams.parmas[item] = []
            } else if (!this.queryParams.parmas[item] && !['logonTime'].includes(item) && item != 'status') {
                this.queryParams.parmas[item] = null
            }
        })
        let obj = { ...this.queryParams}
        obj.parmas.startLastLoginTime = obj.parmas.logoTime[0] ? obj.parmas.logoTime[0] : null
        obj.parmas.endLastLoginTime = obj.parmas.logoTime[1] ? obj.parmas.logoTime[1] : null
        getVideoList(obj).then((response) => {
            this.umsInfos = response.data.list;
            this.total = response.data.total;
            this.loading = false;
        });
    },
    /** 添加/修改 */
    handleCheck(row, type) {
      console.log(row, type);
      this.addData = true;
      // this.objData = row
      this.formData.id = row.id
      getVideoDetails({ id: row.id }).then(res => {
        if (res.code == 200) {
          this.providerInfo = res.data.providerInfo
          this.operationHistory = res.data.operationHistory
          this.originalUrl = res.data.originalUrl
          this.lastUrl = res.data.lastUrl
          this.formData.coverUrl = null
          this.formData.url = null
        }
      })

    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 10;
      this.getVideoList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        parmas: {
          id: null,
          userCode: null,
          nickName: null,
          levelCode: null,
          logoTime: [],
          status: 1,
        },
      };
      this.time = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },

    /** 弹框确定 */
    determineOk() {
      updateVideo(this.formData).then((res) => {
        if (res.code == 200) {
          this.addData = false;
          this.getVideoList();
          this.$message({
            type: "success",
            message: "修改成功",
          });
        } else {
          this.imageloading = false;
          this.addData = false
        }
      });
    },

    // 资料类型
    auditProviderListType(row) {
      switch (row.type) {
        case 0:
          return "文本";
        case 1:
          return "选项";
        case 2:
          return "图片";
        case 3:
          return "视频";
        case 4:
          return "营销呼叫";
        default:
          return "--";
      }
    },
    // 封面
    handleAvatarChangeIconZ(file, fileList) {
      //选中文件触发的change事件
      console.log(file);
      const isLt2M = file.raw.size / 1024 / 1024 < 1  //限制上传文件的大小
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      } else {
        this.imageloading = true;
        this.formData.coverUrl = URL.createObjectURL(file.raw); //赋值图片的url，用于图片回显功能
        let data = new FormData();
        data.append("file", file.raw);
        uploadImg(data).then((res) => {
          if (res.data.code == 200) {
            this.imageloading = false;
            this.formData.coverUrl = res.data.data.url;
            this.photoDisabledType = false
          }else{
            this.imageloading = false;
          }
        });
      }

    },
    removeUpload(file) {
      if (file) {
        this.changUploadShow = 0;
      }
    },
    // 视频上传成功之后调用的方法
    videoSuccess(res, file, fileList) {
      // this.getFirstPngUrl(file, 1, res);
      console.log(res, file, fileList);
      if (res.code == 200) {
        this.formData.url = res.data.url;
        this.dialogVisible = false;
        this.disabledType = false
        this.isShowUploadVideo = true;
        this.videoUploadPercent = 0;
      }
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {    //注意在data中添加对应的变量名
      this.dialogVisible = true;
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },

    daonload(urls, name) {
      let url = urls + '?response-content-type=application/octet-stream'
      console.log(url)
      fetch(url).then(res => res.blob()).then(blob => {
        const a = document.createElement('a');
        document.body.appendChild(a)
        a.style.display = 'none'
        const url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name; //视频下载后的名称
        a.click();
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url);
      })
    },

  },
};
</script>

<style lang="scss" scoped>
.strategy-text {
  width: 100%;
  border-bottom: solid 1px;
  font-size: 20px;
}


.video {
  width: 100%;
  display: flex;
  justify-content: space-around;

}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar {
  height: 100px;
  width: 100px;
}

// .el-button {
//     width: 300px;
//     height: 90px;
//     transform: translateX(-50%);
//     margin: 10px 50% 15px;
//     font-size: 18px;
// }


.avatar-uploader-icon {
  border: 1px dashed #a5a3a3 !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}

.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
</style>
