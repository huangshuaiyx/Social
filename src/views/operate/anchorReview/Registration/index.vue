<template>
    <div class="app-container" v-loading="loading">
        <el-row v-for="(x, i) in formData" :key="i">
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
                                            {{ x.taskInfo.baseInfo.nickName }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">主播长ID</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.userId }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">主播短ID</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.userCode }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">年龄</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.age }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">代理号</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.agentCode }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="title" class="cell">审核ID：</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.auditId }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">国家</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.country }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">语言</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.bestLanguage }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">英语水平</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.englishLevel }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">角色</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.userType == 2 ? "主播" : "用户" }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div id="title" class="cell">状态</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ auditFormat(x.taskInfo.baseInfo.accountStatus) }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">注册时间</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ x.taskInfo.baseInfo.regTime }}
                                        </div>
                                    </td>
                                    <td>
                                        <div id="title" class="cell">注册渠道</div>
                                    </td>
                                    <td>
                                        <div class="cell">
                                            {{ getstatussd(x.taskInfo.baseInfo.bindPlatform) }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-card>
                <el-card v-for="(v, c) in x.taskInfo.auditInfo" :key="c">
                    <div slot="header"><span>审核内容</span></div>
                    <div class="nickname">
                        <div class="nickname-p1">{{ getstatus(v) }}</div>
                        <p class="nickname-p2" v-if="v.auditType == 1 || v.auditType == 4">{{ v.auditContent }}</p>
                        <p class="nickname-p2" v-if="v.auditType == 3 && v.subType == 1">{{ v.auditContent }}</p>
                        <p class="nickname-p4" v-if="v.auditType == 2 && v.subType == 2">
                            <video controls="true" autoplay :src="v.auditContent"></video>
                        </p>
                        <p class="nickname-p3" v-if="v.auditType == 2 && v.subType == 1">
                            <!-- <img :src="x.auditContent" alt=""> -->
                            <el-image style="width: 100px; height: 100px" :src="v.auditContent"
                                :preview-src-list="[v.auditContent]" fit="cover">
                            </el-image>
                        </p>

                        <p class="nickname-p3" v-if="v.auditType == 2 && v.subType == 3">
                            <!-- <img :src="x.auditContent" alt=""> -->
                            <el-image style="width: 100px; height: 100px" :src="v.auditContent"
                                :preview-src-list="[v.auditContent]" fit="cover">
                            </el-image>
                        </p>

                        <div class="nickname-p5" v-if="v.auditType == 5">
                            <!-- <img :src="x.auditContent" alt=""> -->
                            <div v-for="(q, w) in v.auditResource" :key="w">
                                <el-image style="width: 100px; height: 100px" :src="q.url" :preview-src-list="v.auditResourcesrc">
                                </el-image>
                                <!-- <i class="el-icon-delete" @click="elImgClick(q.id, w, v)"></i> -->
                                <!-- <el-button class="el-button-delete" icon="el-icon-delete"
                                    @click="elImgClick(q.id, w, i)">不通过</el-button> -->
                                <el-radio-group v-model="q.radiogroup" @change="radionameinput(q)" style="display: block;">
                                  <el-radio :label="3">通过</el-radio>
                                  <el-radio :label="2">不通过</el-radio>
                                </el-radio-group>
                                <div style="width: 370px;" v-if="q.radiogroup == 2">
                                    <el-radio-group v-model="q.nopassValue" v-for="(c, i) in faceDictType" :key="i">
                                      <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                    </el-radio-group>
                                    <el-input style="margin-left: 0px; width: 80%;" type="textarea" :rows="3" placeholder="请输入内容" maxlength="200" v-model="q.auditRemark"></el-input>
                                </div>
                                <div v-else style="width: 370px;"></div>
                            </div>

                        </div>

                        <div class="nickname-right" v-show="v.auditType != 5">
                            <div class="nickname-right-top">
                                <p>审核结果（必选）</p>
                                <p class="nickname-right-top-p2">
                                    <el-radio-group v-model="v.auditStatus" @input="nameinput(v)"
                                        :disabled="x.submitDisabled">
                                        <el-radio :label="3">通过</el-radio>
                                        <el-radio :label="2">不通过</el-radio>
                                    </el-radio-group>
                                </p>
                            </div>
                            <div class="nickname-right-center" v-show="v.auditType == 4 && v.auditStatus == 2">
                                <el-radio-group v-model="v.failReasons" v-for="(c, i) in nameDictType" :key="i"
                                    :disabled="x.submitDisabled">
                                    <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="v.auditType == 1 && v.auditStatus == 2">
                                <el-radio-group v-model="v.failReasons" v-for="(c, i) in nameDictType" :key="i"
                                    :disabled="x.submitDisabled">
                                    <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="v.auditType == 2 && v.subType == 1 && v.auditStatus == 2">
                                <el-radio-group v-model="v.failReasons" v-for="(c, i) in faceDictType" :key="i"
                                    :disabled="x.submitDisabled">
                                    <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="v.auditType == 2 && v.subType == 3 && v.auditStatus == 2">
                                <el-radio-group v-model="v.failReasons" v-for="(c, i) in faceDictType" :key="i"
                                    :disabled="x.submitDisabled">
                                    <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center" v-show="v.auditType == 3 && v.auditStatus == 2">
                                <el-radio-group v-model="v.failReasons" v-for="(c, i) in callDictType" :key="i"
                                    :disabled="x.submitDisabled">
                                    <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="v.auditType == 4 && v.subType == 2 && v.auditStatus == 2">
                                <el-radio-group v-model="v.failReasons" v-for="(c, i) in aboutDictType" :key="i"
                                    :disabled="x.submitDisabled">
                                    <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-center"
                                v-show="v.auditType == 2 && v.subType == 2 && v.auditStatus == 2">
                                <el-radio-group v-model="v.failReasons" v-for="(c, i) in videoDictType" :key="i"
                                    :disabled="x.submitDisabled">
                                    <el-radio :label="c">{{ c.dictLabel }}</el-radio>
                                </el-radio-group>
                            </div>
                            <div class="nickname-right-bottom">
                                <p>审核备注</p>
                                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="v.auditRemark"
                                    :disabled="x.submitDisabled" maxlength="200">
                                </el-input>
                            </div>
                        </div>
                    </div>
                    <div class="helloImg" v-if="v.auditType == 3">
                        <div v-for="(w, e) in v.auditResource" :key="e">
                            <el-image style="width: 100px; height: 120px" :src="w.url" :preview-src-list="[w.url]">
                            </el-image>
                            <!-- <i class="el-icon-delete" @click="detleClick(w, e, v)"></i> -->
                            <el-button class="el-button-delete" icon="el-icon-delete"
                                @click="detleClick(w, e, i)">不通过</el-button>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <div class="footer">
                <el-button type="danger" @click="SubmitClick(x, i,'next')" :disabled="x.submitDisabled" v-show="loading == false"
                    class="el-button-sub">提交并下一个
                </el-button>
                <el-button type="danger" @click="SubmitClick(x, i,'over')" :disabled="x.submitDisabled" v-show="loading == false"
                    class="el-button-sub">提交并结束
                </el-button>
            </div>
        </el-row>

    </div>
</template>

<script>
import {
    deleteAuditResource,
    albumAudit,
    registerAudit
} from "@/api/operate/examine/audit/audit";
import { getQueryString } from "../../../../utils/index";

export default {
    name: "Server",
    data() {
        return {
            // 遮罩层
            loading: true,
            // 审核ID
            auditId: null,
            // 主播ID
            providerUserId: null,
            // cache信息
            cache: [],
            // 基本信息
            baseInfo: {},
            // 资料信息
            dataInfo: {
                face: "",
                albums: [],
            },
            // 历史审核资料
            histories: [],
            poster: "",
            submitDisabled: false,
            userId: JSON.parse(localStorage.getItem("userId")),
            formData: [],
            nameDictType: [],
            faceDictType: [],
            callDictType: [],
            aboutDictType: [],
            videoDictType: [],
            typeData: { dictTypes: ["nickname_info_audit_fail_reason", "face_info_audit_fail_reason", "video_info_audit_fail_reason", "call_info_audit_fail_reason", "self_introduction_info_audit_fail_reason"] }
        };
    },
    created() {
        this.initial()
    },
    mounted() {

        // let res = {
        //     "code": 200,
        //     "msg": "OK",
        //     "data": {
        //         "taskType": "1001",
        //         "taskList": [
        //             {
        //                 "taskId": "63b51171ca823f553a4a1f84",
        //                 "productId": "2001",
        //                 "appId": "200101",
        //                 "userId": "6246ae69e4b0521f1bed9b8f",
        //                 "userType": 2,
        //                 "addTime": "2023-01-04 11:11:05",
        //                 "taskInfo": {
        //                     "baseInfo": {
        //                         "nickName": "Yyyyy in the e",
        //                         "userId": "62ccd849e4b06c15b080f514",
        //                         "userCode": "2939953",
        //                         "age": 26,
        //                         "agentCode": "123456",
        //                         "auditId": "639b20ff411aa35f78d76227",
        //                         "country": "Ấn Độ",
        //                         "englishLevel": "1",
        //                         "bestLanguage": "1",
        //                         "userType": 2,
        //                         "accountStatus": 1,
        //                         "regTime": "2022-07-12 05:11:21",
        //                         "bindPlatform": 4
        //                     },
        //                     "auditInfo": [
        //                         {
        //                             "auditType": 1,
        //                             "subType": 1,
        //                             "auditContent": "Yyyyy in the e",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 2,
        //                             "subType": 1,
        //                             "auditContent": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2022/08/6300bb4fe4b0b9e92d9e3c60.jpeg",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 2,
        //                             "subType": 2,
        //                             "auditContent": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2022/12/63a268cee4b035f5da6d6bd7.mp4",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 4,
        //                             "subType": 1,
        //                             "auditContent": "Tuuhgy the oppo\n",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 3,
        //                             "subType": 1,
        //                             "auditContent": "Yyyyy in the e",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         }
        //                     ],
        //                     "auditHistory": []
        //                 }
        //             },
        //             {
        //                 "taskId": "63b51171ca823f553a4a1f84",
        //                 "productId": "2001",
        //                 "appId": "200101",
        //                 "userId": "6246ae69e4b0521f1bed9b8f",
        //                 "userType": 2,
        //                 "addTime": "2023-01-04 11:11:05",
        //                 "taskInfo": {
        //                     "baseInfo": {
        //                         "nickName": "Yyyyy in the e",
        //                         "userId": "62ccd849e4b06c15b080f514",
        //                         "userCode": "12343534",
        //                         "age": 26,
        //                         "agentCode": "123456",
        //                         "auditId": "639b20ff411aa35f78d76227",
        //                         "country": "Ấn Độ",
        //                         "englishLevel": "1",
        //                         "bestLanguage": "1",
        //                         "userType": 2,
        //                         "accountStatus": 1,
        //                         "regTime": "2022-07-12 05:11:21",
        //                         "bindPlatform": 4
        //                     },
        //                     "auditInfo": [
        //                         {
        //                             "auditType": 1,
        //                             "subType": 1,
        //                             "auditContent": "Yyyyy in the e",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 2,
        //                             "subType": 1,
        //                             "auditContent": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2022/08/6300bb4fe4b0b9e92d9e3c60.jpeg",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 2,
        //                             "subType": 2,
        //                             "auditContent": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2022/12/63a268cee4b035f5da6d6bd7.mp4",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 4,
        //                             "subType": 1,
        //                             "auditContent": "Tuuhgy the oppo\n",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": null
        //                         },
        //                         {
        //                             "auditType": 3,
        //                             "subType": 1,
        //                             "auditContent": "Yyyyy in the e",
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": [{
        //                                 "id": "63d7351ae4b05790b11fff68",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://video.heyyogabobi.com/otovideochat/2001/200101/ums/2023/01/63d73505e4b06d2dfd67949e.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d734e5e4b05790b11fff4b",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://video.heyyogabobi.com/otovideochat/2001/200101/ums/2023/01/63d734d2e4b06d2dfd67949d.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },]
        //                         },
        //                         {
        //                             "auditType": 5,
        //                             "subType": 1,
        //                             "auditContent": [],
        //                             "auditStatus": 4,
        //                             "auditRemark": "不合规",
        //                             "auditResource": [{
        //                                 "id": "63d7351ae4b05790b11fff68",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/04/643fbcf4e4b0b22a4be01bf0.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d734e5e4b05790b11fff4b",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/04/643fbcf4e4b0b22a4be01bf0.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d734cce4b05790b11fff3f",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://video.heyyogabobi.com/otovideochat/2001/200101/ums/2023/01/63d734cae4b06d2dfd67949c.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d734c2e4b05790b11fff39",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/04/643fbcf4e4b0b22a4be01bf0.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d734ace4b05790b11fff2f",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/04/643fbce9e4b0b22a4be01bee.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d73489e4b05790b11fff1a",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/04/643fbce9e4b0b22a4be01bee.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d73479e4b05790b11fff12",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/04/643fbce9e4b0b22a4be01bee.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d73471e4b05790b11fff0f",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://s3.vchatgood.com/otovideochat/2001/200101/ums/2023/04/643fbce9e4b0b22a4be01bee.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d73460e4b05790b11fff05",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://video.heyyogabobi.com/otovideochat/2001/200101/ums/2023/01/63d7345de4b06d2dfd679496.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d73454e4b05790b11ffefe",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://video.heyyogabobi.com/otovideochat/2001/200101/ums/2023/01/63d73447e4b06d2dfd679495.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d73441e4b05790b11ffef3",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://video.heyyogabobi.com/otovideochat/2001/200101/ums/2023/01/63d7343fe4b06d2dfd679494.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             },
        //                             {
        //                                 "id": "63d73437e4b05790b11ffeee",
        //                                 "productId": "2001",
        //                                 "appId": "200101",
        //                                 "userId": "63d732dde4b05790b11ffe5e",
        //                                 "type": 1,
        //                                 "videoCoverPicture": null,
        //                                 "url": "https://video.heyyogabobi.com/otovideochat/2001/200101/ums/2023/01/63d73435e4b06d2dfd679493.jpeg",
        //                                 "width": null,
        //                                 "height": null,
        //                                 "duration": null,
        //                                 "size": null,
        //                                 "ext": null
        //                             }]
        //                         }
        //                     ],
        //                     "auditHistory": []
        //                 }
        //             }
        //         ]
        //     },
        //     "timestamp": "1672973941354"
        // }

        // if (res.code == 200) {
        //     this.loading = false
        //     this.property = res.data.taskType
        //     this.formData = res.data.taskList
        //     if (this.formData.length == 0) {
        //         this.$store.dispatch("tagsView/delView", this.$route);
        //         this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
        //     } else {
        //         this.formData.map(x => {
        //             x.taskInfo.auditInfo.forEach(x => {
        //                 this.$set(x, "failReasons", [])
        //                 this.$set(x, "auditStatus", 1)
        //                 this.$set(x, "auditRemark", null)
        //             })
        //             this.$set(x, "submitDisabled", false)
        //         })
        //         console.log(this.formData)
        //     }
        // }

        this.$store.dispatch("queryDictListByType", this.typeData).then(res => {
            this.nameDictType = res.data.nickname_info_audit_fail_reason,
                this.faceDictType = res.data.face_info_audit_fail_reason,
                this.callDictType = res.data.call_info_audit_fail_reason,
                this.aboutDictType = res.data.self_introduction_info_audit_fail_reason,
                this.videoDictType = res.data.video_info_audit_fail_reason
        });
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
                case 4:
                    return "冻结";
                default:
                    return "--";
            }
        },
        /** 提交审核结果 */
        SubmitClick(val, i, type) {
            console.log(val, i, this.formData)
            let obj
            obj = val.taskInfo.auditInfo.every((o) => {
                console.log(o)
                console.log(o)
                if (o.auditType != 5) {
                    if (o.auditStatus == 3) {
                        return true
                    } else {
                        if (o.auditStatus == 2 && o.failReasons.length != 0) {
                            return true
                        }
                    }
                } else {
                      return  o.auditResource.every(item =>{
                        console.log(item);
                        if(item.radiogroup == 3){
                            return true
                        }else{
                            if(item.radiogroup == 2 && item.nopassValue.dictValue){
                                return true
                            }
                        }
                    })
                }
            });

            console.log(obj)
            if (obj == true) {
                let taskLists = []
                val.taskInfo.auditInfo.map((x,index) => {
                    console.log(x);
                    if(index != val.taskInfo.auditInfo.length - 1 ){
                        taskLists.push({
                        auditType: x.auditType,
                        subType: x.subType,
                        auditStatus: x.auditStatus,
                        failReasons: x.failReasons != "" ? [x.failReasons?.dictValue] : [],
                        auditRemark: x.auditRemark,
                        auditOptionId:x.failReasons?.id
                    })
                    }
                    if(Array.isArray(x.auditResource) && x.auditType != 3){
                    console.log(x.auditResource);
                    x.auditResource.forEach(item=>{
                    taskLists.push({
                        auditType: x.auditType,
                        subType: x.subType,
                        auditStatus: item.radiogroup,
                        failReasons: item.nopassValue != undefined ? [item.nopassValue?.dictValue] : [],
                        auditRemark: item.auditRemark, 
                        auditOptionId:  item.nopassValue != undefined ? item.nopassValue?.id : {},
                        resId: item.id
                    })
                  })
                }
                })
                let sad = {
                    auditId: val.taskInfo.baseInfo.auditId,
                    userId: val.taskInfo.baseInfo.userId,
                }
                sad['auditInfos'] = taskLists
                console.log(sad)
                registerAudit(sad).then(res => {
                    console.log(res)
                    if (res.code == 200) {
                        this.$message({
                            type: "success",
                            message: "审核成功",
                        });
                        if (i == this.formData.length - 1) {
                            if(type == 'over'){
                                this.$router.push({
                                    path:"/operate/anchorReview/reviewList"
                                })
                                return
                            }
                            this.$parent.getmethod()
                            this.initial()
                        } else {
                            val.submitDisabled = true
                        }
                    } else {
                        // this.$parent.getmethod()
                        // this.initial()
                        this.$store.dispatch("tagsView/delView", this.$route);
                        this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                        this.$message({
                            type: "error",
                            message: `数据已经被审核了`,
                        });

                    }
                })
            } else {
                let solk
                val.taskInfo.auditInfo.forEach(q => {
                    if (q.auditType != 5) {
                        if (val.taskInfo.auditStatus != 3 && val.taskInfo.auditStatus != 2 && val.taskInfo.failReasons != "") {
                            return solk = true
                        }
                    }
                })

                console.log(solk, val)
                this.$message({
                    type: "error",
                    message: `请选择${val.taskInfo.baseInfo.userCode}审核结果`,
                });
            }
        },
        getstatus(val) {
            if (val.auditType == 1) {
                return "昵称"
            } else if (val.auditType == 2 && val.subType == 2) {
                return "视频"
            } else if (val.auditType == 2 && val.subType == 1) {
                return "头像"
            } else if (val.auditType == 3) {
                return "招呼语"
            } else if (val.auditType == 4) {
                return "关于我"
            } else if (val.auditType == 5) {
                return "相册"
            } else if (val.auditType == 2 && val.subType == 3) {
                return "自拍"
            }
        },
        /** 删除图片 */
        detleClick(val, e, v) {
            console.log(val, e, v)
            this.$confirm("删除当前照片, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let data
                this.formData.map(x => {
                    data = {
                        "auditId": x.taskInfo.baseInfo.auditId,
                        "resourceId": val.id,
                        "resourceType": 5,
                        "auditSource": 1
                    };
                })

                deleteAuditResource(data).then(() => {
                    // this.initial();
                    this.formData[v].taskInfo.auditInfo.map((x, i) => {
                        if (x.auditType == 3) {
                            console.log(x, v)
                            x.auditResource.splice(e, 1)
                        }
                    })
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

        // 删除相册
        elImgClick(val, e, v) {
            console.log(val, e, v)
            // this.$confirm("删除当前照片, 是否继续?", "提示", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     type: "warning",
            // }).then(() => {
            //     albumAudit({ resourceId: val, auditStatus: 2 }).then(() => {
            //         // this.initial();
            //         // v.splice(e, 1)
            //         console.log(this.formData[v])
            //         this.formData[v].taskInfo.auditInfo.map((x, i) => {
            //             if (x.auditType == 5) {
            //                 console.log(x, v)
            //                 x.auditResource.splice(e, 1)
            //             }
            //         })
            //         this.$message({
            //             type: "success",
            //             message: "删除成功",
            //         });
            //     });
            // })
            //     .catch(() => {
            //         this.$message({
            //             type: "info",
            //             message: "已取消删除",
            //         });
            //     });
        },

        nameinput(val) {
            console.log(val, val.failReasons)
            if (val.auditStatus == 3) {
                val.failReasons = []
            }
        },
        radionameinput(value){
            console.log(value);
            if (value.radiogroup == 3) {
                value.nopassValue = {}
            }
        },
        // radionameinput(val) {
        //   console.log(val, val.nopassValue)
        //   if (val.radiogroup == 3) {
        //     val.nopassValue= {}
        //   }
        // },
        // 初始
        initial() {
            this.$store.dispatch('query', { userId: this.userId }).then(res => {
                if (res.code == 200) {
                    this.loading = false
                    // this.formData = res.data.taskList
                    if (res.data.taskList.length == 0) {
                        this.$store.dispatch("tagsView/delView", this.$route);
                        this.$router.replace({ path: "/operate/anchorReview/reviewList" }); // 关闭之后要返回的页面
                    } else {
                        this.property = res.data.taskType
                        res.data.taskList.map(v => {
                            v.taskInfo.auditInfo.forEach(x => {
                                this.$set(x, "failReasons", [])
                                this.$set(x, "auditStatus", 1)
                                this.$set(x, "auditRemark", null)
                            })
                            this.$set(v, "submitDisabled", false)
                           if(v.taskInfo.auditInfo&& v.taskInfo.auditInfo.length){
                            v.taskInfo.auditInfo.forEach(item=>{
                                if(item.auditResource&&item.auditResource.length){
                                    item.auditResourcesrc = []
                                    item.auditResource.forEach(it=>{
                                        item.auditResourcesrc.push(it.url)
                                    })
                                    if(item.auditResource instanceof Array ) {
                                        item.auditResource.forEach(it=>{
                                        it.radiogroup = 3
                                        it.nopassValue = {}
                                        it.auditRemark = ''
                                    })
                                    }
                                }
                            })
                           }
                        })
                        this.formData = res.data.taskList
                        
                        console.log(this.formData);
                    }
                }
            })
        },
        getstatussd(val) {
            switch (val) {
                case 1:
                    return "google ";
                case 2:
                    return "facebook ";
                case 3:
                    return "apple ";
                case 4:
                    return "账号密码";
                default:
                    return "--";
            }
        },
    },
};
</script>

<style scoped>
.footer{
   text-align: center;
}
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
    flex-shrink: 0;
    width: 60px;
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

.nickname-p5 {
    /* width: 600px; */
    height: auto;
    padding: 0 !important;
    display: flex;
    flex-wrap: wrap;
    /* margin-right: 50%; */

}

.nickname-p5>p {
    margin: 5px;
    position: relative;
    height: 160px;
}

.nickname-p5>.el-image {
    width: 60px;
    height: 60px;
    border-radius: 5px;
}

::v-deep .el-icon-delete {
    color: red;
}

::v-deep .el-button-delete {
    position: absolute;
    top: 125px;
    left: 0px;
}


.el-button-sub {
    width: 300px;
    height: 90px;
    /* transform: translateX(-50%);
    margin: 10px 50% 15px; */
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
</style>
