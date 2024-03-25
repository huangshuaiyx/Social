<template>
    <div class="app-container" v-loading="loading">
        <el-row v-for="(x, i) in auditdata" :key="i">
            <el-col :span="24" class="card-box">
                <el-card>
                    <div slot="header"><span>基本信息</span></div>
                    <div class="el-table el-table--enable-row-hover el-table--medium ">
                        <table cellspacing="0" style="width: 100%" id="table-min">
                            <tbody>
                                <tr>
                                    <td>
                                        <div id="title" class="cell">昵称</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.nickname }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">{{ x.taskInfo.userTypeStr }}长ID</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.userId }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">{{ x.taskInfo.userTypeStr }}短ID</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.userCode }}
                                        </div>
                                    </td>
                                    <td id="title" v-show="property == '3004' || property == '3005'">
                                        <div class="cell">自拍/头像：</div>
                                    </td>
                                    <td v-show="property == '3004' || property == '3005'">
                                        <div class="cell">
                                            <el-image style="width: 100px; height: 100px" :src="x.taskInfo.face"
                                                :preview-src-list="[x.taskInfo.face]" fit="cover">
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
                    <div class="nickname">
                        <div class="el-table el-table--enable-row-hover el-table--medium">
                            <table cellspacing="0" style="width: 100%; align: center">
                                <tbody>
                                    <tr>
                                        <td>修改内容</td>
                                        <td>修改后</td>
                                        <td>修改前</td>
                                    </tr>
                                    <tr>
                                        <td style="border: none;">{{ typesd(property) }}</td>
                                        <td style="border: none;">
                                            <template>
                                                <span
                                                    v-if="property == '3002' || property == '3003' || property == '4002' || property == '4003'">
                                                    {{ x.taskInfo.afterValue }}</span>
                                                <span v-if="property == '3001'">
                                                    {{ x.taskInfo.afterValue }}</span>
                                                <!-- <el-image v-if="property == '4001'"
                                                    style="width: 40px; height: 40px" :src="x.taskInfo.afterValue"
                                                    :preview-src-list="[x.taskInfo.afterValue]">
                                                </el-image> -->
                                                <el-image
                                                    v-if="property == '4004' || property == '3004' || property == '4001'"
                                                    style="width: 100px; height: 100px" :src="x.taskInfo.afterValue[0]"
                                                    :preview-src-list="x.taskInfo.afterValue" fit="cover">
                                                </el-image>

                                                <el-popover trigger="hover" placement="top" prop="afterValue"
                                                    v-if="property == '3005' || property == '4005'">
                                                    <video width="150" height="150" controls>
                                                        <source :src="x.taskInfo.afterValue" type="video/mp4" />
                                                    </video>
                                                    <div slot="reference" class="name-wrapper">
                                                        <video width="100" height="150" controls
                                                        >
                                                            <source :src="x.taskInfo.afterValue" type="video/mp4" />
                                                        </video>
                                                    </div>
                                                </el-popover>
                                            </template>
                                        </td>
                                        <td style="border: none;" v-if="x.taskInfo.beforeValue != undefined">
                                            <template>
                                                <span
                                                    v-if="property == '3002' || property == '3003' || property == '4002' || property == '4003'">
                                                    {{ x.taskInfo.beforeValue }}</span>
                                                <span v-if="property == '3001'">
                                                    {{ x.taskInfo.beforeValue }}</span>
                                                <el-image
                                                    v-if="property == '4004' || property == '3004' || property == '4001'"
                                                    style="width: 50px; height: 80px" :src="x.taskInfo.beforeValue[0]"
                                                    :preview-src-list="x.taskInfo.beforeValue">
                                                </el-image>

                                                <el-popover trigger="hover" placement="top" prop="afterValue"
                                                    v-if="property == '3005' || property == '4005'">
                                                    <video width="150" height="150" controls>
                                                        <source :src="x.taskInfo.beforeValue" type="video/mp4" />
                                                    </video>
                                                    <div slot="reference" class="name-wrapper">
                                                        <video width="100" height="150" controls
                                                        >
                                                            <source :src="x.taskInfo.beforeValue" type="video/mp4" />
                                                        </video>
                                                    </div>
                                                </el-popover>
                                            </template>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="helloImg" v-if="property == '3003'">
                                <div v-for="(w, e) in x.taskInfo.auditResource" :key="e">
                                    <el-image style="width: 100px; height: 150px" :src="w.url"
                                        :preview-src-list="[w.url]">
                                    </el-image>
                                    <i class="el-icon-delete" @click="detleClick(w, e, x.taskInfo)"></i>
                                </div>
                            </div>
                        </div>
                        <div class="nickname-right">
                            <div class="nickname-right-top">
                                <p>审核结果（必选）</p>
                                <p class="nickname-right-top-p2">
                                    <el-radio-group v-model="x.taskInfo.auditStatus" @input="nameinput(x.taskInfo)"
                                        :disabled="x.taskInfo.choiceDisabled">
                                        <el-radio :label="3">通过</el-radio>
                                        <el-radio :label="2">不通过</el-radio>
                                    </el-radio-group>
                                </p>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '3001' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in nameDictType" :key="i"
                                    :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '4003' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in nameDictType" :key="i"
                                    :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '3004' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in faceDictType" :key="i"
                                    :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '4004' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in faceDictType" :key="i"
                                    :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '4001' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in faceDictType" :key="i"
                                    :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '3003' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in callDictType" :key="i"
                                    :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '4002' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in aboutDictType"
                                    :key="i" :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '3002' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in aboutDictType"
                                    :key="i" :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '3005' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in videoDictType"
                                    :key="i" :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="property == '4005' && x.taskInfo.auditStatus == 2">
                                <el-radio-group v-model="x.taskInfo.failReasons" v-for="(c, i) in videoDictType"
                                    :key="i" :disabled="x.taskInfo.choiceDisabled">
                                    <el-radio :label="c.dictValue">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-bottom">
                                <p>审核备注</p>
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" maxlength="200"
                                    v-model="x.auditRemark" :disabled="x.taskInfo.choiceDisabled">
                                </el-input>
                            </div>
                            <el-button class="elButton" type="danger" @click="examine(x)"
                                :disabled="x.taskInfo.choiceDisabled">审核</el-button>
                        </div>
                        <!-- <div>
                            <el-button class="elButton" type="danger" @click="examine(x)">审核</el-button>
                        </div> -->
                    </div>
                </el-card>
            </el-col>
        </el-row>
       <div class="footer">
            <el-button class="footerButton" type="primary" @click="SubmitClick" v-show="loading == false">下一批</el-button>
            <el-button class="footerButton" style="background-color: skyblue;" type="primary" @click="SubmitClick('over')" v-show="loading == false">提交并结束</el-button>
       </div>
    </div>
</template>

<script>
import {
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
} from "@/api/operate/auditDetail/index.js";
import {
    deleteAuditResource,
} from "@/api/operate/examine/audit/audit";
export default {
    name: "Server",

    data() {
        return {
            formData: [],
            property: "",
            // 遮罩层
            loading: false,
            // 审核ID
            auditId: null,
            // 主播ID
            providerUserId: null,
            // 基本信息
            baseInfo: {},
            // 资料信息
            dataInfo: {
                face: "",
                albums: [],
            },
            userId: JSON.parse(localStorage.getItem("userId")),
            poster: "",
            auditdata: [],
            nameDictType: [],
            faceDictType: [],
            callDictType: [],
            aboutDictType: [],
            videoDictType: [],
            typeData: { dictTypes: ["nickname_info_audit_fail_reason", "face_info_audit_fail_reason", "video_info_audit_fail_reason", "call_info_audit_fail_reason", "self_introduction_info_audit_fail_reason"] },
            submitDisabled: true, // 下一批
            choiceDisabled: false, // 单选禁用框
        };
    },
    created() {

        this.$store.dispatch("queryDictListByType", this.typeData).then(res => {
            this.nameDictType = res.data.nickname_info_audit_fail_reason,
                this.faceDictType = res.data.face_info_audit_fail_reason,
                this.callDictType = res.data.call_info_audit_fail_reason,
                this.aboutDictType = res.data.self_introduction_info_audit_fail_reason,
                this.videoDictType = res.data.video_info_audit_fail_reason
        });
    },
    mounted() {
        this.init()
        // 获取地址上的参数
        // let str = window.location.href;
        // let urls = str.split("?");
        // let params = urls[1].split("&");
        // this.auditId = params[0].split("=")[1];
        // this.providerUserId = params[1].split("=")[1];
    },
    methods: {
        auditFormat(row) {
            switch (row) {
                case 1:
                    return "正常";
                case 2:
                    return "禁用";
                case 3:
                    return "注销";
                default:
                    return "--";
            }
        },
        /** 下一批 */
        SubmitClick(value) {
            let obj = this.auditdata.every((o) => {
                if (o.taskInfo.choiceDisabled == true) {
                    return true
                }
            });
            if (obj == true) {
               if(value != 'over'){
                this.$parent.getmethod()
                this.init()
               }else{
                this.$router.push({
                    path:"/operate/anchorReview/reviewList"
                })
               }
                // let qwe = {}
                // let taskLists = []
                // let arr = []
                // this.auditdata.map(x => {
                //     let qwe = {
                //         auditResult: {
                //             auditId: x.taskInfo.auditId,
                //             userCode: x.taskInfo.userCode,
                //             auditStatus: x.taskInfo.auditStatus,
                //             failReasons: [x.taskInfo.failReasons],
                //             auditRemark: x.taskInfo.auditRemark,
                //             operatTerminal: 1,
                //         },
                //         taskId: x.taskId,
                //     }
                //     arr.push(qwe)
                // })
                // let sad = {
                //     taskType: this.property,
                //     taskList: arr
                // }
                // console.log(sad)
            } else {
                let asd = this.auditdata.map(o => {
                    if (o.taskInfo.choiceDisabled == false) {
                        return o.taskInfo.userCode
                    }
                })

                this.$message({
                            type: "error",
                            message: `请选择${asd}审核结果`,
                        });

            }

        },
        // 提交审核结果
        examine(x) {
            console.log(x.taskInfo)

            let obj = false
            if (x.taskInfo.auditStatus == 3) {
                obj = true
            } else if (x.taskInfo.auditStatus == 2 && x.taskInfo.failReasons.length != 0) {
                obj = true
            } else {
                obj = false
                this.$message({
                    type: "error",
                    message: `请选择${x.taskInfo.userCode}审核结果`,
                });
            }
            let auditFormData = {
                //    审核备注
                auditRemark: x.taskInfo.auditRemark,
                // 审核结果
                auditStatus: x.taskInfo.auditStatus,
                //被审核用户的类型
                operatTerminal: x.taskInfo.userType,
                // 这条审核记录的Id
                auditInfoId: x.taskInfo.auditId,
                failReasons: x.taskInfo.failReasons != "" ? x.taskInfo.failReasons : "",
            }
            if (obj == true) {
                // providerDataAudit(auditFormData).then((res) => {
                //     if (res.code == 200) {
                //         localStorage.clear("value");
                //         this.$message({
                //             message: "审核成功",
                //             type: "success",
                //         });
                //         // window.history.go(-1);
                //         x.taskInfo.choiceDisabled = true
                //     } else {
                //         x.taskInfo.choiceDisabled = false
                //     }
                // });
                if (this.property == "4003") {
                    nickNameSubmitAudit(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "4001") {
                    faceSubmitAudit(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "4005") {
                    videoSubmitAudit(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "4002") {
                    selfIntroductionSubmitAudit(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "4004") {
                    albumSubmitAudit(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "3001") {
                    auditNickName(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "3002") {
                    auditSelfIntroduction(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "3003") {
                    auditCall(auditFormData).then((res) => {
                        if (res.code == 200) {
                            localStorage.clear("value");
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "3004") {
                    auditAlbum(auditFormData).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                } else if (this.property == "3005") {
                    auditVideo(auditFormData).then((res) => {
                        if (res.code == 200) {
                            this.$message({
                                message: "审核成功",
                                type: "success",
                            });
                            x.taskInfo.choiceDisabled = true
                        }
                    });
                }
            }

        },
        getstatus(val) {
            switch (val) {
                case 100:
                    return "A";
                case 80:
                    return "B";
                case 60:
                    return "C";
                case 40:
                    return "D";
                case 20:
                    return "E";
                default:
                    return "--";
            }
        },
        // 状态转文字
        typesd(val) {
            switch (val) {
                case "3001":
                    return "主播昵称";
                case "3002":
                    return "主播自我介绍";
                case "3003":
                    return "主播自动打招呼";
                case "3004":
                    return "主播相册";
                case "3005":
                    return "主播视频";
                case "4001":
                    return "用户头像";
                case "4002":
                    return "用户自我介绍";
                case "4003":
                    return "用户昵称";
                case "4004":
                    return "用户相册";
                case "4005":
                    return "用户视频";
                default:
                    return "--";
            }
        },
        /** 删除相册 */
        delAlbum(albumId) {
            this.$confirm("是否不通过?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    let data = {
                        resourceId: albumId,
                    };
                    // delResource(data).then(() => {
                    //     this.$message({
                    //         type: "success",
                    //         message: "删除成功",
                    //     });
                    // });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        nameinput(val) {
            if (val.auditStatus == 3) {
                val.failReasons = []
            }
            // let obj = this.auditdata.every((o) => {
            //     if (o.taskInfo.auditStatus == 3) {
            //         return true
            //     } else {
            //         if (o.taskInfo.auditStatus == 2 && o.taskInfo.failReasons != '') {
            //             return true
            //         }
            //     }
            // });
            // if (obj == true) {
            //     this.submitDisabled = false
            // } else {
            //     this.submitDisabled = true
            // }
        },
        init() {
            this.$store.dispatch('query', { userId: this.userId }).then(res => {
                if (res.data == undefined) {
                    this.$store.dispatch("tagsView/delView", this.$route);
                    this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                } else {
                    this.loading = false
                    this.property = res.data.taskType
                    if (res.data.taskList.length != 0) {
                        let arr = res.data.taskList
                        arr.forEach(x => {
                            this.$set(x.taskInfo, "failReasons", "")
                            this.$set(x.taskInfo, "auditStatus", 1)
                            this.$set(x.taskInfo, "auditRemark", 'null')
                            this.$set(x.taskInfo, "choiceDisabled", false)
                        })
                        this.auditdata = arr
                        console.log(arr, "啊水水")
                    } else {
                        this.$store.dispatch("tagsView/delView", this.$route);
                        this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                    }
                }

            })
        },
        /** 打招呼删除图片 */
        detleClick(val, e, v) {
            console.log(val)
            this.$confirm("是否不通过?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let data
                this.auditdata.map(x => {
                    data = {
                        "auditId": v.auditId,
                        "resourceId": val.id,
                        "resourceType": 5,
                        "auditSource": 1
                    };
                })
                deleteAuditResource(data).then(() => {
                    // this.initial();
                    v.auditResource.splice(e, 1)
                    this.$message({
                        type: "success",
                        message: "删除成功",
                    });
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

<style scoped lang="scss">
.delBtn {
    position: relative;
    top: -80px;
    right: 40px;
    padding: 0;
}

.nickname {
    display: flex;
    justify-content: space-between;

}

.nickname-right {
    width: 505px;
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

::v-deep.el-checkbox-group {
    margin-right: 15px;
}

.el-radio-group {
    margin: 5px;
}

.nickname-right-bottom {
    display: flex;
}

.el-textarea {
    width: 50%;
    margin-left: 80px;
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
    margin-left: 200px;
    margin-top: 10px;
    display: flex;
}

.helloImg>div {
    width: 100px;
    height: 150px;
    margin-left:15px;
    position: relative;
}

.helloImg>div>img {
    width: 100px;
    height: 150px;

}

.helloImg>div>i {
    position: absolute;
    right: 5px;
    top: 5px;
}

.elButton {
    width: 120px;
    height: 40px;
}

tbody,
th,
td {
    text-align: left;
}
.footer{
    display: flex;
    justify-content: center;
    .footerButton{
    /* width: ; */
    margin-left: 0%;
    margin-right: 20px;
    transform: translateX(0%);
}
}
</style>
