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
                                            {{ dataInfo.nickname }}
                                        </div>
                                    </td>
                                    <td id="title">
                                        <div class="cell">{{ ablutText == "2" ? "主播长ID：" : "用户长ID：" }}</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ auditUserId }}
                                        </div>
                                    </td>
                                    <td id="title">
                                        <div class="cell">{{ ablutText == "1" ? "用户短ID：" : "主播短ID：" }}</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ dataInfo.userCode }}
                                        </div>
                                    </td>

                                    <td id="title">
                                        <!-- v-show="auditUserType == 6 || auditUserType == 4" -->
                                        <!-- v-show="auditUserType == 6 || auditUserType == 4" -->
                                        <div class="cell" >自拍/头像：</div>
                                    </td>
                                    <td >
                                        <div class="cell">
                                            <el-image style="width: 100px; height: 100px" :src="dataInfo.face"
                                                :preview-src-list="[dataInfo.face]" fit="cover">
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
            <el-col :span="24" class="card-box">
                <el-card>
                    <div slot="header"><span>修改资料信息</span></div>
                    <div class="el-table el-table--enable-row-hover el-table--medium">
                        <table cellspacing="0" style="width: 80%; align: center">
                            <tbody>
                                <tr>
                                    <td>修改内容</td>
                                    <td>修改后</td>
                                    <td>修改前</td>
                                </tr>
                                <tr>
                                    <td style="width:200px">{{ typf }}</td>
                                    <td>
                                        <template>
                                            <!-- <p v-if="
                                                auditUserType == 1 ||
                                                auditUserType == 5
                                            " class="span-spani">
                                                {{ dataInfo.afterValue }}</p> -->
                                            <el-tooltip v-if="
                                            auditUserType == 1 ||
                                            auditUserType == 5" class="item" effect="dark"
                                                :content="dataInfo.afterValue" placement="top-start">
                                                <p>{{ dataInfo.afterValue }}</p>
                                            </el-tooltip>
                                            <p style="margin-top:10px;margin-left:10px" v-if="
                                                auditUserType == 8
                                            ">
                                                {{ dataInfo.afterValue }}</p>
                                            <el-popover trigger="hover" placement="top" prop="afterValue" v-if="
                                                auditUserType == 2 ||
                                                auditUserType == 3
                                            ">
                                                <img :src="dataInfo.afterValue" alt="" style="width: 200px" />
                                                <!-- <div slot="reference" class="name-wrapper">
                                                    <img :src="dataInfo.afterValue" style="width: 40px" alt="" />
                                                </div> -->
                                            </el-popover>
                                            <!-- 判断是相册 -->
                                            <div class="demo-image__preview" v-if="auditUserType == 6">

                                                <div v-for="(item, i) in dataInfo.afterValue" :key="i">
                                                    <el-image style="width: 80px; height: 100px" :src="
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
                                            <div style="width:120px; height:150px" v-if="auditUserType == 4">
                                                <video width="100%" height="100%" controls="true" autoplay
                                                    :src="dataInfo.afterValue">
                                                </video>
                                            </div>
                                            <div class="helloImg" v-if="auditUserType == 8">
                                                <div v-for="(w, e) in dataInfo.auditResource" :key="e">
                                                    <el-image style="width: 100px; height: 150px" :src="w.url"
                                                        :preview-src-list="[w.url]">
                                                    </el-image>
                                                    <i class="el-icon-delete" @click="detleClick(w, e)"></i>
                                                </div>
                                            </div>
                                        </template>
                                    </td>
                                    <td>
                                        <template>
                                            <el-tooltip v-if="
                                            auditUserType == 1 ||
                                            auditUserType == 5" class="item" effect="dark"
                                                :content="dataInfo.beforeValue" placement="top-start">
                                                <p>{{ dataInfo.beforeValue }}</p>
                                            </el-tooltip>
                                            <p style="margin-top:10px;margin-left:10px" v-if="
                                                auditUserType == 8
                                            ">
                                                {{ dataInfo.beforeValue }}</p>
                                            <el-popover trigger="hover" placement="top" prop="beforeValue" v-if="
                                                auditUserType == 2 ||
                                                auditUserType == 3
                                            ">
                                                <img :src="dataInfo.beforeValue" alt="" style="width: 200px" />
                                                <!-- <div slot="reference" class="name-wrapper">
                                                    <img :src="dataInfo.beforeValue" style="width: 40px" alt="" />
                                                </div> -->
                                            </el-popover>
                                            <div class="demo-image__preview" v-if="auditUserType == 6">
                                                <div v-if="dataInfo.beforeValue != null">
                                                    <el-image style="width: 80px; height: 100px"
                                                        v-for="(item, i) in dataInfo.beforeValue" :key="i" :src="
                                                            item
                                                        " :preview-src-list="
    dataInfo.beforeValue != null
? dataInfo.beforeValue
: []">
                                                    </el-image>
                                                </div>
                                                <div v-else>--</div>
                                            </div>
                                            <div class="demo-image__preview" style="width:120px; height:150px" v-if="auditUserType == 4">
                                                <video width="100%" height="100%" controls="true" autoplay
                                                    :src="dataInfo.beforeValue" v-if="dataInfo.beforeValue != null">
                                                </video>
                                                <div v-else>--</div>
                                            </div>
                                        </template>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="nickname-right">
                            <div class="nickname-right-top">
                                <p>审核结果（必选）</p>
                                <p class="nickname-right-top-p2">
                                    <el-radio-group v-model="auditFormData.auditStatus" @input="nameinput">
                                        <el-radio :label="3">通过</el-radio>
                                        <el-radio :label="2">不通过</el-radio>
                                    </el-radio-group>
                                </p>
                            </div>
                            <div class="nickname-right-center" v-show="auditFormData.auditStatus == 2">
                                <div class="nickname-right-center"
                                    v-show="auditUserType == 1 || auditUserType == 5 || auditUserType == 8">
                                    <el-radio-group v-model="auditFormData.auditReason" v-for="(c, i) in nameDictType"
                                        :key="i">
                                        <el-radio :label="c.dictValue+'+'+c.id">{{ c.dictLabel }}</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="nickname-right-center" v-show="auditUserType == 2 || auditUserType == 3">
                                    <el-radio-group v-model="auditFormData.auditReason" v-for="(c, i) in faceDictType"
                                        :key="i">
                                        <el-radio :label="c.dictValue+'+'+c.id">{{ c.dictLabel }}</el-radio>
                                    </el-radio-group>
                                </div>
                                <!-- <div class="nickname-right-center" v-show=" auditUserType == 2">
                                  <el-radio-group v-model="auditFormData.auditReason"
                                      v-for="(c, i) in callDictType" :key="i">
                                      <el-radio :label="c.dictValue+'+'+c.id">{{ c.dictLabel }}</el-radio>
                                  </el-radio-group>
                              </div> -->
                                <!-- <div class="nickname-right-center" v-show="">
                                    <el-radio-group v-model="auditFormData.auditReason" v-for="(c, i) in aboutDictType"
                                        :key="i">
                                        <el-radio :label="c.dictValue+'+'+c.id">{{ c.dictLabel }}</el-radio>
                                    </el-radio-group>
                                </div> -->
                                <div class="nickname-right-center" v-show="auditUserType == 4">
                                    <el-radio-group v-model="auditFormData.auditReason" v-for="(c, i) in videoDictType"
                                        :key="i">
                                        <el-radio :label="c.dictValue+'+'+c.id">{{ c.dictLabel }}</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="nickname-right-center" v-show="auditUserType == 6">
                                    <el-radio-group v-model="auditFormData.auditReason" v-for="(c, i) in albumDictType"
                                        :key="i">
                                        <el-radio :label="c.dictValue+'+'+c.id">{{ c.dictLabel }}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="nickname-right-bottom">
                                <p>审核备注</p>
                                <el-input type="textarea" :rows="4" placeholder="请输入内容" maxlength="200"
                                    v-model="auditFormData.auditRemark">
                                </el-input>
                            </div>
                        </div>
                    </div>

                </el-card>

            </el-col>

        </el-row>

        <!-- 添加或修改参数配置对话框 -->
        <!-- <el-dialog title="修改状态" :visible.sync="open" width="400px" append-to-body>
          <el-radio-group v-model="radio">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">封禁</el-radio>
          </el-radio-group>
          <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitForm">确 定</el-button>
              <el-button @click="cancel">取 消</el-button>
          </div>
      </el-dialog> -->
        <el-button type="danger" @click="submit">提交审核结果</el-button>
    </div>
</template>

<script>
import {
    submitAuditResult,
    getDataReview,
    providerDataAudit,
    nickNameSubmitAudit,
    faceSubmitAudit,
    selfIntroductionSubmitAudit,
    albumSubmitAudit,
    videoSubmitAudit,
    auditNickName,
    auditSelfIntroduction,
    auditVideo,
    auditAlbum,
    auditCall,
    getCallAuditDetails,
    delResource
} from "@/api/operate/auditDetail/index.js";
import { getQueryString } from "../../../../utils/index";

export default {
    name: "Server",
    data() {
        return {
            // 遮罩层
            loading: true,
            // 用户类型
            auditType: null,
            auditUserId: null,
            // 资料类型
            auditUserType: null,
            // 资料信息
            dataInfo: {},
            open: false,
            userText: "",
            ablutText: "",
            // 审核资料
            auditFormData: {
                // 审核备注
                auditRemark: "",
                // 审核结果
                auditStatus: 1,
                // 审核ID
                auditInfoId: "",
                //被审核用户的类型
                operatTerminal: 1,
                auditReason: [],
                userCode: ""
            },
            typf: "",
            nameDictType: [],
            faceDictType: [],
            callDictType: [],
            aboutDictType: [],
            videoDictType: [],
            albumDictType: [],
            typeData: { dictTypes: ["nickname_info_audit_fail_reason", "face_info_audit_fail_reason", "video_info_audit_fail_reason", "call_info_audit_fail_reason", "self_introduction_info_audit_fail_reason", "album_info_audit_fail_reason"] }
        };
    },
    created() {
        this.$store.dispatch("queryDictListByType", this.typeData).then(res => {
            console.log(res)
            this.nameDictType = res.data.nickname_info_audit_fail_reason,
                this.faceDictType = res.data.face_info_audit_fail_reason,
                this.callDictType = res.data.call_info_audit_fail_reason,
                this.aboutDictType = res.data.self_introduction_info_audit_fail_reason,
                this.videoDictType = res.data.video_info_audit_fail_reason,
                this.albumDictType = res.data.album_info_audit_fail_reason
        });

        this.ablutText = getQueryString("type")
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
            this.auditUserType = JSON.parse(
                localStorage.getItem("value")
            ).auditType;
            this.auditFormData.auditInfoId = JSON.parse(
                localStorage.getItem("value")
            ).auditInfoId;
            this.auditFormData.userCode = JSON.parse(
                localStorage.getItem("value")
            ).userCode;
            this.auditUserId = JSON.parse(
                localStorage.getItem("value")
            ).auditUserId;

            if (this.auditUserType != 8) {
                getDataReview(data).then((response) => {
                    if (response.code == 200) {
                        console.log(response.data, "数据");
                        this.dataInfo = response.data;
                    }
                });
            } else {
                getCallAuditDetails({
                    auditInfoId: JSON.parse(
                        localStorage.getItem("value")
                    ).auditInfoId
                }).then((response) => {
                    if (response.code == 200) {
                        console.log(response.data, "数据");
                        this.dataInfo = response.data;
                    }
                });
            }

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
                case 8:
                    return "招呼语";
                default:
                    return "--";
            }
        },
        //提交审核
        submit() {
            let obj = false
            if (this.auditFormData.auditStatus == 3) {
                obj = true
            } else if (this.auditFormData.auditStatus == 2 && this.auditFormData.auditReason.length != 0) {
                obj = true
            } else {
                obj = false
                this.$message({
                    type: "error",
                    message: `请选择${this.auditFormData.userCode}审核结果`,
                });
            }
            console.log(obj, this.auditFormData)
            if(this.auditFormData.auditStatus == 2){
                this.auditFormData['auditOptionId'] = this.auditFormData.auditReason.split('+')[1] 
                this.auditFormData.auditReason = this.auditFormData.auditReason.split('+')[0] 
            }else{
                this.auditFormData['auditOptionId'] = ''
                this.auditFormData.auditReason = ''
            }
            console.log(this.auditFormData);
            // return
            if (obj == true) {
                if (getQueryString("type") == 2) {
                    // providerDataAudit(this.auditFormData).then((res) => {
                    //     if (res.code == 200) {
                    //         localStorage.clear("value");
                    //         this.$message({
                    //             message: "修改成功",
                    //             type: "success",
                    //         });
                    //         window.history.go(-1);
                    //     }
                    // });
                    if (this.auditUserType == 1) {
                        auditNickName(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 2) {
                        faceSubmitAudit(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 3) {

                    } else if (this.auditUserType == 4) {
                        auditVideo(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 5) {
                        auditSelfIntroduction(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 6) {
                        auditAlbum(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 8) {
                        auditCall(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    }
                } else {
                    if (this.auditUserType == 1) {
                        nickNameSubmitAudit(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 2) {
                        faceSubmitAudit(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 3) {

                    } else if (this.auditUserType == 4) {
                        videoSubmitAudit(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 5) {
                        selfIntroductionSubmitAudit(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    } else if (this.auditUserType == 6) {
                        albumSubmitAudit(this.auditFormData).then((res) => {
                            if (res.code == 200) {
                                localStorage.clear("value");
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                });
                                window.history.go(-1);
                            }
                        });
                    }
                }

            }

        },
        nameinput() {
            if (this.auditFormData.auditStatus == 3) {
                this.auditFormData.auditReason = []
            }
        },
        /** 删除图片 */
        detleClick(val, e) {
            console.log(this.dataInfo)

            this.$confirm("删除当前照片, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let data = {
                    "resourceId": val.id,
                };
                delResource(data).then(() => {
                    this.dataInfo.auditResource.splice(e, 1)
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
                    this.getDataReview();
                });
            })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
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

#title {
    width: 90px;
}


.nickname-right {
    width: 600px;
    height: auto;
}

.nickname-right-top {
    display: flex;
}

.nickname-right-center {
    margin-left: 50px;
    display: flex;
    flex-wrap: wrap;
}

::v-deep.el-radio-group {
    margin-right: 15px;
}

.el-radio-group {
    margin: 5px;
}

.nickname-right-bottom {
    display: flex;
}

.el-textarea {
    width: 70%;
    height: 100px;
    margin-left: 40px;
    margin-top: 10px;
}

.nickname-right-top-p2 {
    margin-left: 20px;
}

.nickname-p1 {
    line-height: 100px;
}

.nickname-p2 {
    line-height: 100px;
}

.nickname-p3 {
    width: 60px;
    height: 60px;
    margin-top: 35px;
}

.nickname-p3>img {
    width: 60px;
    height: 60px;
}

.nickname-p4 {
    width: 150px;
    height: 200px;
    padding: 0 !important;
    margin: 0 !important;
}

.nickname-p4>video {
    width: 150px;
    height: 200px;
}

.el-button {
    width: 300px;
    height: 90px;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 20px;
    font-size: 18px;
}

.helloImg {
    width: 60%;
    height: auto;
    // margin-left: 300px;
    margin-top: 10px;
    display: flex;
}

.helloImg>div {
    width: 100px;
    height: 150px;
    margin: 0 15px;
    position: relative;
}

.helloImg>div>.el-image {
    width: 100px;
    height: 150px;

}

.helloImg>div>i {
    position: absolute;
    right: 5px;
    top: 5px;
}

.el-table {
    display: flex;
}

.helloeImg {
    width: 100%;
    height: 150px;
    margin-left: 200px;

    img {
        width: 100px;
        height: 150px;
        margin: 0 15px;
    }
}

.item {
    width: 300px;
    overflow: hidden;
    margin: 0;
    word-wrap: break-word;
}
</style>
