<template>
    <div class="app-container">
        <el-form ref="queryForm" :inline="true" label-width="68px">
            <el-form-item>
                <el-button type="primary" size="mini" @click="handleCheck()" style="width: 100px">添加
                </el-button>
            </el-form-item>
        </el-form>

        <el-table v-loading="loading" :data="umsInfos">
            <el-table-column label="类型" align="center" prop="msgType">
                <template slot-scope="scope">
                    <p>{{ asd(scope.row.msgType) }}</p>
                </template>
            </el-table-column>
            <el-table-column label="标题" align="center" prop="title" />
            <el-table-column label="文本" align="center" prop="content">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.content" placement="top-start">
                        <p style="    width: 250px;height: 37px;">{{ scope.row.content }}</p>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="跳转类型" align="center" prop="jumpType">
                <template slot-scope="scope">
                    <p style="color:#1890ff">{{ scope.row.jumpType == 1 ? "外链" : "内链" }}</p>
                </template>
            </el-table-column>
            <el-table-column label="图片" align="center">
                <template slot-scope="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 40px; height: 40px" :src="scope.row.imgUrl"
                            :preview-src-list="[scope.row.imgUrl]">
                            <div slot="error" class="image-slot">
                                <img src="../../../assets/images/moren.png" style="width: 100%" alt="" />
                            </div>
                        </el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="链接" align="center" prop="">
                <template slot-scope="scope">
                    <p @click="tiaozhuan(scope.row.link)" style="cursor:pointer; color:#1890ff">{{ scope.row.link }}</p>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getStrategyMessagePageList" />

        <!-- 添加消息 -->
        <el-dialog title="系统消息" :visible.sync="addData" width="50%" center :close-on-press-escape="false"
            :close-on-click-modal="false">
            <div>
                <p>
                    <span>消息类型：</span>
                    <el-select v-model="formData.msgType" placeholder="请选择消息类型"
                        @change="languageChange(formData.msgType)" style="margin-left: 42px">
                        <el-option v-for="item in language" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </p>
                <div>
                    <div class="quite" v-show="formData.msgType == 1">
                        <div style="display: flex;">
                            <p style="width:75px">文本:</p>
                            <el-input type="textarea" autosize :rows="3" placeholder="请输入内容" v-model="formData.textarea"
                                maxlength="500">
                            </el-input>
                        </div>
                    </div>
                    <!-- <div class="quite" v-show="formData.msgType == 2">
                        <div style="width:400px;display: flex;">
                            <p style="width:88px">图片:</p>
                            <el-upload class="avatar-uploader" :action="''" :auto-upload="false" :show-file-list="false"
                                :on-change="handleAvatarChangeIconF" v-loading="faceloading" accept=".jpg,.jpeg,.png">
                                <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                    </div> -->
                    <div class="quite" v-show="formData.msgType == 2">
                        <div style="display: flex;">
                            <p style="width:75px">文本:</p>
                            <el-input type="textarea" :rows="3" autosize placeholder="请输入内容" v-model="formData.text"
                                maxlength="500">
                            </el-input>
                        </div>
                        <div style="display: flex;margin-top:20px">
                            <p style="width:75px">链接:</p>
                            <el-input v-model="formData.link" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="quite" v-show="formData.msgType == 3">
                        <div style="display: flex;">
                            <p style="width:75px">图片</p>
                            <el-upload class="avatar-uploader" :action="''" :auto-upload="false" :show-file-list="false"
                                :on-change="handleAvatarChangeIconF" v-loading="faceloading" accept=".jpg,.jpeg,.png">
                                <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div style="display: flex;margin-top:20px">
                            <p style="width:75px">链接:</p>
                            <el-input v-model="formData.link" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="quite" v-show="formData.msgType == 4">
                        <div style="display: flex;">
                            <p style="width:75px">标题:</p>
                            <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="formData.title">
                            </el-input>
                        </div>
                        <div style="display: flex;margin-top:20px">
                            <p style="width:75px">图片:</p>
                            <el-upload class="avatar-uploader" :action="''" :auto-upload="false" :show-file-list="false"
                                :on-change="handleAvatarChangeIconF" v-loading="faceloading" accept=".jpg,.jpeg,.png">
                                <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar" />
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div style="display: flex;margin-top:20px">
                            <p style="width:75px">链接:</p>
                            <el-input v-model="formData.link" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="tiaozhaun" v-show="formData.msgType != null && formData.msgType != 1">
                        <p style="width:75px">跳转类型:</p>
                        <el-radio-group v-model="formData.jumpType">
                            <el-radio :label="1">外链</el-radio>
                            <el-radio :label="0">内链</el-radio>
                        </el-radio-group>
                    </div>
                </div>

                <div class="batch" v-show="formData.msgType != null">
                    <p>批量选择: </p>
                    <p>
                        <el-input type="textarea" autosize placeholder="例如：userid,userid" v-model="formData.toUserId">
                        </el-input>
                    </p>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addData = false">取 消</el-button>
                <el-button type="primary" @click="determineOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    selectSystemMessageList,
    sendBatchMsg
} from "@/api/operate/systemMessage/index";
import {
    uploadImg,
} from "@/api/operate/marketingAnchor/anchorList/index";
export default {
    name: "Config",
    data() {
        return {
            // 遮罩层
            loading: false,
            // 导出遮罩层
            exportLoading: false,
            // 总条数
            total: 0,
            // 表格数据
            umsInfos: [],
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,

            },
            // 系统消息
            language: [
                {
                    value: "1",
                    label: "文本",
                },
                {
                    value: "2",
                    label: "文本+链接",
                },
                {
                    value: "3",
                    label: "图片+链接",
                },
                {
                    value: "4",
                    label: "标题+图片+链接",
                }
            ],
            addData: false,
            /**头像遮罩 */
            faceloading: false,
            formData: {
                textarea: null, // 文本
                link: null, // 链接
                msgType: null,  // 类型
                imgUrl: null, // 图片
                toUserId: null,
                title: null,
                text: null,
                jumpType: 1
            },
        };
    },
    created() {
        this.getStrategyMessagePageList();
    },
    methods: {
        /** 查询用户信息 */
        getStrategyMessagePageList() {
            this.loading = true;
            selectSystemMessageList(this.queryParams).then((response) => {
                this.umsInfos = response.data.list;
                this.total = response.data.total;
                this.loading = false;
            });
        },
        /** 添加 */
        handleCheck(row, type) {
            console.log(row, type);
            this.addData = true;
            this.formData = {
                textarea: null, // 文本
                link: null, // 链接
                msgType: null,  // 类型
                imgUrl: null, // 图片
                toUserId: null,
                title: null,
                text: null,
                jumpType: 1
            }
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
            this.getStrategyMessagePageList();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams = {
                pageNum: 1,
                pageSize: 10,

            };
            this.time = [];
            this.resetForm("queryForm");
            this.handleQuery();
        },
        /**时间的确定 */
        timeChang() {
            this.queryParams.parmas.startDate = `${this.time[0]} 00:00:00`;
            this.queryParams.parmas.endDate = `${this.time[1]} 23:59:59`;
            this.getStrategyMessagePageList();
        },
        /** 语言选择 */
        languageChange(val) {
            this.formData.msgType = val
            console.log(val)
        },


        /** 弹框确定 */
        determineOk() {
            if (this.formData.msgType != null) {
                if (this.formData.toUserId != null) {
                    if (/.*[\u4e00-\u9fa5]+.*$/.test(this.formData.toUserId)) {
                        this.$message.error('不能有文字');
                    } else {
                        if (this.formData.msgType == 1) {
                            if (this.formData.textarea != null && this.formData.textarea != "") {
                                this.addData = false;
                                sendBatchMsg({ link: this.formData.link, jumpType: this.formData.jumpType, msgType: this.formData.msgType, imgUrl: this.formData.imgUrl, title: this.formData.title, content: this.formData.textarea, toUserId: this.formData.toUserId }).then(res => {
                                    if (res.code == 200) {
                                        this.getStrategyMessagePageList();
                                    }
                                })
                            } else {
                                this.$message.error('请输入文本');
                            }
                        } else if (this.formData.msgType == 2) {
                            if (this.formData.link != null && this.formData.link != "") {
                                if (this.formData.text != null && this.formData.text != "") {
                                    this.addData = false;
                                    sendBatchMsg({ link: this.formData.link, jumpType: this.formData.jumpType, msgType: this.formData.msgType, imgUrl: this.formData.imgUrl, content: this.formData.text, toUserId: this.formData.toUserId }).then(res => {
                                        if (res.code == 200) {
                                            this.getStrategyMessagePageList();
                                        }
                                    })
                                } else {
                                    this.$message.error('请选择文本');
                                }

                            } else {
                                this.$message.error('请输入链接 ');
                            }
                        } else if (this.formData.msgType == 3) {
                            if (this.formData.link != null && this.formData.link != "") {
                                if (this.formData.imgUrl != null && this.formData.imgUrl != "") {
                                    this.addData = false;
                                    sendBatchMsg({ link: this.formData.link, jumpType: this.formData.jumpType, msgType: this.formData.msgType, imgUrl: this.formData.imgUrl, toUserId: this.formData.toUserId }).then(res => {
                                        if (res.code == 200) {
                                            this.getStrategyMessagePageList();
                                        }
                                    })
                                } else {
                                    this.$message.error('请输入图片');
                                }

                            } else {
                                this.$message.error('请输入链接 ');
                            }
                        } else if (this.formData.msgType == 4) {
                            if (this.formData.link != null && this.formData.link != "") {
                                if (this.formData.imgUrl != null && this.formData.imgUrl != "") {
                                    if (this.formData.title != null && this.formData.title != "") {
                                        this.addData = false;
                                        sendBatchMsg({ link: this.formData.link, jumpType: this.formData.jumpType, msgType: this.formData.msgType, imgUrl: this.formData.imgUrl, title: this.formData.title, content: this.formData.text, toUserId: this.formData.toUserId }).then(res => {
                                            if (res.code == 200) {
                                                this.getStrategyMessagePageList();
                                            }
                                        })
                                    } else {
                                        this.$message.error('请输入标题');
                                    }

                                } else {
                                    this.$message.error('请输入图片');
                                }

                            } else {
                                this.$message.error('请输入链接 ');
                            }
                        }
                    }

                } else {
                    this.$message.error('请输入userid');
                }

            } else {
                this.$message.error('请选择类型');
            }

            console.log(this.formData)
        },
        // 头像
        handleAvatarChangeIconF(file, fileList) {
            //选中文件触发的change事件
            // const isLt2M = file.raw.size / 1024 / 1024 < 0.5  //限制上传文件的大小
            this.faceloading = true;
            let data = new FormData();
            data.append("file", file.raw);
            uploadImg(data).then((res) => {
                if (res.data.code == 200) {
                    this.faceloading = false;
                    console.log(res.data.data.url)
                    this.formData.imgUrl = res.data.data.url
                }
            });
        },
        /**跳转url */
        tiaozhuan(val) {
            window.open(val)
        },
        asd(val) {
            switch (val) {
                case 1:
                    return "纯文本";
                case 2:
                    return "文本+链接";
                case 3:
                    return "图片+链接";
                case 4:
                    return "图片+链接+标题";
                default:
                    return "--";
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.strategy-text {
    width: 100%;
    border-bottom: solid 1px;
    font-size: 20px;
}

.quite {
    padding: 5px 10px;
    position: relative;
    margin: 10px 30px;

    .tyle {
        margin: 10px 0;

        div {
            display: flex;
            justify-content: flex-start;

            span {
                line-height: 50px;
                margin-right: 50px;
            }

            p {
                display: flex;
                justify-content: flex-start;
            }
        }
    }

    .cesdf {
        display: flex;
        justify-content: flex-start
    }

    .yanchi {
        width: 490px;
        display: flex;
        justify-content: flex-start;

        span {
            margin: 9px 10px;
        }
    }

    .but {
        position: absolute;
        top: 10px;
        right: 20px;

    }

    .avatar-uploader {
        height: 100px;
        width: 100px;
        border: solid 1px;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }

    .avatar-uploader {
        border: 1px dashed #d9d9d9;
        margin: 0 8px;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }

}

.batch {
    width: 100%;
    display: flex;

    p:nth-child(1) {
        width: 110px;
    }

    p:nth-child(2) {
        width: 90%;
    }
}

.avatar {
    height: 100px;
    width: 100px;
}

.avatar-uploader {
    height: 100px;
    width: 100px;
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader {
    border: 1px dashed #d9d9d9;
    margin: 0 8px;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.tiaozhaun {
    width: 100%;
    height: auto;
    display: flex;

    .el-radio-group {
        margin-top: 15px;
        margin-left: 20px;
    }
}

.el-input {
    width: 50%;
}

.el-textarea {
    width: 55%;
}
</style>
